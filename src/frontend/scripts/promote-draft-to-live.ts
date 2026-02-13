#!/usr/bin/env node
/**
 * Promotion Script: Draft Version → Live
 * 
 * This script promotes any draft version to the public/live version.
 * It uses the backend's promoteDraftToLive method with admin authentication.
 * 
 * Usage:
 *   CAFFEINE_ADMIN_TOKEN=your-token node --loader ts-node/esm scripts/promote-draft-to-live.ts <version-number>
 *   CAFFEINE_ADMIN_TOKEN=your-token DRAFT_VERSION=43 node --loader ts-node/esm scripts/promote-draft-to-live.ts
 * 
 * Requirements:
 *   - Admin authentication via CAFFEINE_ADMIN_TOKEN environment variable
 *   - Backend canister must be deployed and running
 *   - Target draft version must exist in the backend
 */

import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import fetch from 'isomorphic-fetch';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Type definitions from backend
interface backendInterface {
  promoteDraftToLive(versionNumber: bigint): Promise<void>;
  getLiveVersion(): Promise<any>;
  _initializeAccessControlWithSecret(token: string): Promise<void>;
}

/**
 * Load canister ID from the local or production canister_ids.json
 */
function getCanisterId(): string {
  try {
    // Try local first
    const localPath = resolve(__dirname, '../../.dfx/local/canister_ids.json');
    const localIds = JSON.parse(readFileSync(localPath, 'utf-8'));
    if (localIds.backend?.local) {
      return localIds.backend.local;
    }
  } catch (error) {
    // Local not found, try production
  }

  try {
    const prodPath = resolve(__dirname, '../../canister_ids.json');
    const prodIds = JSON.parse(readFileSync(prodPath, 'utf-8'));
    if (prodIds.backend?.ic) {
      return prodIds.backend.ic;
    }
  } catch (error) {
    throw new Error('Could not find canister ID. Make sure the backend is deployed.');
  }

  throw new Error('Could not find backend canister ID in canister_ids.json');
}

/**
 * Load the IDL factory from the generated declarations
 */
async function getIdlFactory() {
  try {
    const declarationsPath = resolve(__dirname, '../src/declarations/backend/backend.did.js');
    const module = await import(declarationsPath);
    return module.idlFactory;
  } catch (error) {
    throw new Error(`Could not load IDL factory: ${error}`);
  }
}

/**
 * Determine the host URL based on environment
 */
function getHost(): string {
  const network = process.env.DFX_NETWORK || 'local';
  
  if (network === 'ic' || network === 'mainnet') {
    return 'https://icp-api.io';
  }
  
  return 'http://127.0.0.1:4943';
}

/**
 * Get admin token from environment variable
 */
function getAdminToken(): string {
  const token = process.env.CAFFEINE_ADMIN_TOKEN;
  
  if (!token) {
    throw new Error(
      'Admin token required. Set the CAFFEINE_ADMIN_TOKEN environment variable:\n' +
      '  CAFFEINE_ADMIN_TOKEN=your-token node --loader ts-node/esm scripts/promote-draft-to-live.ts <version>'
    );
  }
  
  return token;
}

/**
 * Get target draft version from CLI argument or environment variable
 */
function getDraftVersion(): number {
  // Try CLI argument first
  const cliArg = process.argv[2];
  if (cliArg) {
    const version = parseInt(cliArg, 10);
    if (isNaN(version) || version < 1) {
      throw new Error(`Invalid version number: ${cliArg}. Must be a positive integer.`);
    }
    return version;
  }
  
  // Try environment variable
  const envVar = process.env.DRAFT_VERSION;
  if (envVar) {
    const version = parseInt(envVar, 10);
    if (isNaN(version) || version < 1) {
      throw new Error(`Invalid DRAFT_VERSION: ${envVar}. Must be a positive integer.`);
    }
    return version;
  }
  
  throw new Error(
    'Draft version number required. Provide via:\n' +
    '  - CLI argument: node script.js 43\n' +
    '  - Environment variable: DRAFT_VERSION=43'
  );
}

/**
 * Create an actor to interact with the backend canister
 */
async function createActor(): Promise<backendInterface> {
  const canisterId = getCanisterId();
  const idlFactory = await getIdlFactory();
  const host = getHost();
  
  console.log(`📡 Connecting to canister: ${canisterId}`);
  console.log(`🌐 Host: ${host}`);
  
  const agent = await HttpAgent.create({
    host,
    fetch,
  });
  
  // Fetch root key for local development (never do this in production)
  if (host.includes('127.0.0.1') || host.includes('localhost')) {
    console.log('🔑 Fetching root key (local development)...');
    await agent.fetchRootKey();
  }
  
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId: Principal.fromText(canisterId),
  }) as backendInterface;
  
  return actor;
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting Draft Version → Live Promotion\n');
  
  try {
    // Step 1: Get draft version number
    const draftVersion = getDraftVersion();
    console.log(`🎯 Target draft version: ${draftVersion}\n`);
    
    // Step 2: Get admin token
    const adminToken = getAdminToken();
    console.log('✅ Admin token loaded\n');
    
    // Step 3: Create actor
    const actor = await createActor();
    console.log('✅ Actor created\n');
    
    // Step 4: Initialize access control with admin token
    console.log('🔐 Initializing admin access...');
    await actor._initializeAccessControlWithSecret(adminToken);
    console.log('✅ Admin access initialized\n');
    
    // Step 5: Check current live version
    console.log('📋 Checking current live version...');
    const currentLive = await actor.getLiveVersion();
    if (currentLive) {
      console.log(`   Current live version: ${currentLive.versionNumber}`);
      console.log(`   Promoted at: ${new Date(Number(currentLive.promotedAt) / 1000000).toISOString()}`);
    } else {
      console.log('   No live version currently set');
    }
    console.log('');
    
    // Step 6: Promote draft to live
    console.log(`🎬 Promoting Draft Version ${draftVersion} to live...`);
    await actor.promoteDraftToLive(BigInt(draftVersion));
    console.log(`✅ Draft Version ${draftVersion} promoted successfully!\n`);
    
    // Step 7: Verify the promotion
    console.log('🔍 Verifying promotion...');
    const newLive = await actor.getLiveVersion();
    if (newLive && newLive.versionNumber === BigInt(draftVersion)) {
      console.log('✅ Verification successful!');
      console.log(`   Live version: ${newLive.versionNumber}`);
      console.log(`   Promoted at: ${new Date(Number(newLive.promotedAt) / 1000000).toISOString()}`);
      console.log(`   Promoted by: ${newLive.promotedBy.toString()}`);
    } else {
      console.error(`❌ Verification failed: Live version does not match expected version ${draftVersion}`);
      process.exit(1);
    }
    
    console.log(`\n🎉 Success! Draft Version ${draftVersion} is now the public live version.`);
    console.log('💡 Open your app URL in an incognito window to see the changes.');
    
  } catch (error: any) {
    console.error('\n❌ Error during promotion:');
    console.error(error.message || error);
    
    if (error.message?.includes('Unauthorized')) {
      console.error('\n💡 Tip: Make sure you are using a valid admin token.');
    } else if (error.message?.includes('Draft version not found')) {
      console.error('\n💡 Tip: Make sure the specified draft version exists in the backend.');
    }
    
    process.exit(1);
  }
}

// Run the script
main();
