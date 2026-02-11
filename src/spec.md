# Specification

## Summary
**Goal:** Update the Hero and Quiz sections to use the two uploaded photos, and simplify the page by removing the Letter/Moments content while keeping the Closing dedication paragraph unchanged.

**Planned changes:**
- Add the two uploaded photos as static assets under `frontend/public/assets/generated`, naming the second photo for the Hero and the first photo for the Quiz side image.
- Update `HeroSection` to render the new hero image from `/assets/generated/sona-hero-photo.dim_1600x2000.jpg`, keeping the existing fallback behavior if the image fails to load.
- Update `QuizSection` layout to include the side image (`/assets/generated/sona-quiz-side-photo.dim_1200x1600.jpg`) as a visually secondary element on desktop and stacked appropriately on mobile, with an English alt attribute (e.g., "Sona").
- Remove the main page flow content/sections from “A Message From the Heart” through the Moments section (including `id="letter"` and `id="moments"`), while keeping the Closing section’s `dedicationContent.closing.message` and `dedicationContent.closing.signature` exactly as-is.
- Update top navigation to remove/disable links to the removed sections and ensure remaining links still smooth-scroll correctly.

**User-visible outcome:** The first page shows the new hero photo, the quiz page shows a smaller side photo without breaking responsiveness, and the site no longer includes the Message/Letter and Moments sections while the final dedication paragraph remains unchanged.
