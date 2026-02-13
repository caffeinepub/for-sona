# Specification

## Summary
**Goal:** Add a public, no-login “latest message” area that lets anyone submit a message and displays only the newest one, persisted across refreshes and canister upgrades.

**Planned changes:**
- Backend: Add stable storage for a single “latest public message” value and expose two public (no-auth) methods to fetch the latest message and submit/overwrite it.
- Frontend: Add a new section/page below the existing Closing/“Message” section that fetches and displays the latest message on load, and includes an English text input + submit control for anonymous posting.
- Integration: Update candid/declarations so the React app can call the new methods via the existing actor creation flow, including anonymous usage.

**User-visible outcome:** Visitors can view the current latest public message and submit a new one without signing in; after submitting, only the newest message is shown, and it remains visible after a page refresh.
