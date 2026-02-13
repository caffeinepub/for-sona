# Promotion Scripts

This directory contains utility scripts for managing draft and live versions of the application.

## Promote Draft Version to Live

The `promote-draft-to-live.ts` script promotes any draft version to be the public/live version that users see when they visit the application URL.

### Prerequisites

1. **Backend deployed**: The backend canister must be running (local or IC network)
2. **Draft version exists**: The target draft version must have been created previously
3. **Admin access**: You need a valid admin token (`CAFFEINE_ADMIN_TOKEN`)
4. **Dependencies installed**: Run `pnpm install` in the frontend directory

### Usage

The script accepts the draft version number via CLI argument or environment variable.

#### Option 1: CLI Argument (Recommended)

