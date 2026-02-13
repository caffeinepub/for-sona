import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PublicVersion {
    promotedAt: bigint;
    promotedBy: Principal;
    versionNumber: bigint;
    buildData: string;
}
export interface DraftVersion {
    createdAt: bigint;
    createdBy: Principal;
    versionNumber: bigint;
    buildData: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createDraftVersion(versionNumber: bigint, buildData: string): Promise<void>;
    deleteDraftVersion(versionNumber: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDraftVersion(versionNumber: bigint): Promise<DraftVersion | null>;
    getLatestPublicMessage(): Promise<string>;
    getLiveVersion(): Promise<PublicVersion | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listDraftVersions(): Promise<Array<DraftVersion>>;
    promoteDraftToLive(versionNumber: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitPublicMessage(newMessage: string): Promise<void>;
}
