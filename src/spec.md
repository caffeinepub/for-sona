# Specification

## Summary
**Goal:** Replace the quiz page corner sticker with a cute teddy-bear-style cartoon sticker.

**Planned changes:**
- Add a new teddy-bear cartoon sticker image asset under `frontend/public/assets/generated/` with a sanitized filename and ensure it is loadable via `/assets/generated/<filename>`.
- Update `frontend/src/components/sections/QuizSection.tsx` to swap the existing corner sticker image source to the new teddy-bear sticker path in both the quiz question card and quiz results card, keeping the current placement/sizing/rotation and avoiding overlap with text/buttons.

**User-visible outcome:** The quiz question and results cards show a teddy bear corner sticker instead of the current kawaii Valentine sticker, with the quiz behavior otherwise unchanged.
