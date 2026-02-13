import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

actor {
  type UserProfile = {
    name : Text;
  };

  type DraftVersion = {
    versionNumber : Nat;
    buildData : Text;
    createdBy : Principal;
    createdAt : Int;
  };

  type PublicVersion = {
    versionNumber : Nat;
    buildData : Text;
    promotedBy : Principal;
    promotedAt : Int;
  };

  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  include MixinStorage();

  let userProfiles = Map.empty<Principal, UserProfile>();
  let draftVersions = Map.empty<Nat, DraftVersion>();
  var liveVersion : ?PublicVersion = null;

  // New persistent public message state
  var latestPublicMessage : Text = "Welcome to the Persistent State POC.";

  // Public persistent message (no auth required)
  public query ({ caller }) func getLatestPublicMessage() : async Text {
    latestPublicMessage;
  };

  public shared ({ caller }) func submitPublicMessage(newMessage : Text) : async () {
    latestPublicMessage := newMessage;
  };

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Draft version management
  public shared ({ caller }) func createDraftVersion(versionNumber : Nat, buildData : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create draft versions");
    };

    let draft : DraftVersion = {
      versionNumber = versionNumber;
      buildData = buildData;
      createdBy = caller;
      createdAt = Time.now();
    };

    draftVersions.add(versionNumber, draft);
  };

  public query ({ caller }) func getDraftVersion(versionNumber : Nat) : async ?DraftVersion {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view draft versions");
    };
    draftVersions.get(versionNumber);
  };

  public query ({ caller }) func listDraftVersions() : async [DraftVersion] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list draft versions");
    };

    draftVersions.values().toArray();
  };

  // Promote draft to live version (admin-only)
  public shared ({ caller }) func promoteDraftToLive(versionNumber : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can promote draft versions to live");
    };

    let draft = switch (draftVersions.get(versionNumber)) {
      case (null) { Runtime.trap("Draft version not found") };
      case (?d) { d };
    };

    let publicVersion : PublicVersion = {
      versionNumber = draft.versionNumber;
      buildData = draft.buildData;
      promotedBy = caller;
      promotedAt = Time.now();
    };

    liveVersion := ?publicVersion;
  };

  // Get live version (public access - no authentication required)
  public query func getLiveVersion() : async ?PublicVersion {
    liveVersion;
  };

  // Delete draft version (admin or owner)
  public shared ({ caller }) func deleteDraftVersion(versionNumber : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete draft versions");
    };

    let draft = switch (draftVersions.get(versionNumber)) {
      case (null) { Runtime.trap("Draft version not found") };
      case (?d) { d };
    };

    // Only owner can delete their draft, unless caller is admin
    if (draft.createdBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Cannot delete someone else's draft version");
    };

    draftVersions.remove(versionNumber);
  };
};
