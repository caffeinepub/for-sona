# Specification

## Summary
**Goal:** Add the uploaded Kawaii sticker asset to the app and fix the Quiz section sticker image path so the sticker displays reliably.

**Planned changes:**
- Add the uploaded image `🖤 Kawaii Valentine's Stickers!-1.jpg` to `frontend/public/assets/generated/` with a sanitized filename (lowercase, hyphen-separated) so it is directly accessible via `/assets/generated/<sanitized-filename>.jpg`.
- Update `frontend/src/components/sections/QuizSection.tsx` so both corner sticker `<img>` elements use the sanitized, correct `/assets/generated/...` path and render on both the quiz question card and results card.

**User-visible outcome:** The Kawaii sticker appears correctly in the Quiz section (both during questions and on results) without broken images.
