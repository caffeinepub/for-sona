# Specification

## Summary
**Goal:** Replace the Hero section’s main photo with the newly uploaded WhatsApp PNG while keeping the existing image-load fallback behavior.

**Planned changes:**
- Add a sanitized-filename copy of `WhatsApp Image 2026-02-11 at 7.14.23 AM.png` under `frontend/public/assets/generated/`.
- Update `frontend/src/components/sections/HeroSection.tsx` to reference the new PNG asset path (replacing `/assets/generated/cute-hero-photo-v2.dim_1600x2000.jpg`) while preserving the existing `imageError` fallback behavior.

**User-visible outcome:** The Hero section displays the newly uploaded photo as the hero image, and still shows the existing “Photo coming soon” fallback if the image fails to load.
