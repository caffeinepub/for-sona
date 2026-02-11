# Specification

## Summary
**Goal:** Replace the current hero image with a more cartoony cute illustration that is served as a static frontend asset.

**Planned changes:**
- Add a new cartoony hero image file under `frontend/public/assets/generated/` so it can be loaded directly via `/assets/generated/...`.
- Update `frontend/src/components/sections/HeroSection.tsx` to reference the new cartoony hero image in the main hero `<img>` (replacing the current `cute-hero-photo.dim_1600x2000.jpg` path).
- Keep the existing hero image fallback behavior (only show the placeholder if the image fails to load).

**User-visible outcome:** The hero section displays a new cartoony cute illustration on page load, using a static `/assets/generated/...` URL without backend image serving.
