# Specification

## Summary
**Goal:** Remove the Quiz section side photo entirely and adjust the layout so no space is reserved for it on any screen size.

**Planned changes:**
- Remove quiz-photo rendering from `frontend/src/components/sections/QuizSection.tsx` (do not render `QuizImage` or any `<img>` for the quiz photo on mobile or desktop).
- Remove any quiz-photo-related fallback UI/text (e.g., “Photo could not be loaded”) and any now-unused state/imports that only supported the quiz image.
- Update the Quiz section layout to a single-column (or equivalent) layout on large screens so there is no empty/sticky right-side photo column, while keeping quiz behavior unchanged.

**User-visible outcome:** The Quiz section shows only the quiz content (no side image and no image-fallback messaging) and remains responsive and visually balanced across mobile and desktop.
