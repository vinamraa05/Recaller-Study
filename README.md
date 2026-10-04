This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)

## What I Built

I built **Recaller** — an ultra-minimalist, sophisticated dual-tone black and white web application designed to eliminate cognitive clutter, defeat procrastination, and build deep long-term memory. It unifies three essential cognitive learning tools into one seamless interface:

1. **Customizable Pomodoro Clock**: A distraction-free timer with customizable focus and recovery intervals, automated 4-stage cycles, a smooth circular progress indicator, and custom Web Audio harmonic chimes.
2. **Interactive 3D Flashcards**: A spaced-recall deck system featuring 3D flip card animations, deck authoring, inline card search and management, card shuffling, and self-assessment tracking (*Got It* vs. *Review Later*).
3. **Interactive Knowledge Quizzes**: A quiz creation engine where users can craft custom multiple-choice assessments with 4 options, designate correct answers, write explanatory notes, and take quizzes with instant recall feedback and performance scoring.

### Who I Built It For & The Problem It Solves

I built **Recaller** for my close friend Alex, a master's student preparing for high-stakes certification exams while balancing a full-time job. 

Alex suffered from **study app fatigue**:
- Their workflow was fragmented across 3–4 bloated platforms (one noisy timer app full of gamified ads, a separate subscription flashcard tool, and disconnected quiz spreadsheets).
- Modern study apps were visually overstimulating — saturated colors, intrusive banners, and friction-filled paywalls broke their deep focus and exacerbated their ADHD tendencies.
- They lacked a single, serene environment where they could time a focus session and immediately review the exact flashcards or quiz questions related to that session.

**Recaller** solves this completely. By pairing an active Pomodoro timer directly with flashcard decks and quizzes under a disciplined **dual-tone monochrome (black & white)** aesthetic, Alex can sit down, enter deep work, test their retention, and track mastery without a single distraction or data-privacy concern.

---

## Demo

- **Live Demo**: Open (https://vinamraa05.github.io/Recaller-Study/) in any browser.
- **Preview Video**: Google Drive Link (https://drive.google.com/file/d/17VeQBhAPINF4SxuLOea3XdfvJKGFOHIV/view?usp=drivesdk)*

### Key Highlights
- **Zero-Friction Startup**: No logins, no cookies, zero external dependencies. Runs directly in any browser.
- **Harmonic Audio Chimes**: Generates gentle binaural chimes natively using the Web Audio API without requiring external audio assets.
- **Full Data Ownership**: 100% private. All data resides safely in the browser's `localStorage`, with 1-click JSON Export & Import backups.

---

## Code

Check out the full open-source codebase on GitHub:

{% github https://github.com/vinamraa05/Recaller-Study %}

- **GitHub Repository**: [https://github.com/vinamraa05/Recaller-Study/tree/main](https://github.com/vinamraa05/Recaller-Study/tree/main)


### Project Architecture
- `index.html`: Accessible, semantic HTML5 structure utilizing native `<dialog>` modals and SVG vector graphics.
- `styles.css`: Pure modern CSS design system with dual-tone black (`#050505`) and white (`#ffffff`) palette, 3D perspective transforms (`transform-style: preserve-3d`), and smooth responsive media queries.
- `app.js`: Lightweight, zero-dependency reactive state machine powering the Pomodoro interval loop, Web Audio synthesizer, flashcard spaced repetition engine, quiz runner, and local persistence.

---

## How I Built It

I developed **Recaller** using modern agentic coding workflows powered by the **Google Antigravity** assistant and **Gemini 3.8**:

1. **Architecture & Design Principles**:
   - Instead of pulling in megabytes of heavy node dependencies or UI component libraries that can break over time, we engineered Recaller with **timeless, vanilla web standards**.
   - A strict **dual-tone monochrome** theme was built using CSS custom properties (`--bg-primary`, `--accent-contrast`, etc.), complete with instant Light/Dark mode toggling and high-contrast accessibility.
   - For acoustics, rather than loading unreliable MP3 files that could fail due to CORS or network drops, we programmed a synthetic harmonic chime directly using the browser's `AudioContext` with exponential gain decay.

2. **Spaced Retrieval Engineering**:
   - Implemented a 3D flippable card component with GPU-accelerated CSS transforms (`rotateY(180deg)`) and full keyboard control (<kbd>Space</kbd> to flip, <kbd>&larr;</kbd>/<kbd>&rarr;</kbd> to navigate).
   - Designed a dynamic quiz builder that allows users to create questions on the fly, with keyboard shortcuts (`1`, `2`, `3`, `4`) mapped directly to answer choices for rapid retrieval practice.

3. **Autonomous Agent Guidance**:
   - The Antigravity agent was leveraged for rapid prototyping, syntax-checked validation, accessible ARIA structuring, and building comprehensive seed decks based on cognitive science (The Testing Effect, Feynman Technique, Spaced Repetition).

---

## Why Does Open Innovation Matter?

Open innovation is what made **Recaller** both possible and empowering:

- **True Data Sovereignty & Offline Resilience**: Closed-source learning tools lock user flashcards and notes behind proprietary formats and recurring subscriptions. If their server goes down or their paywall goes up, your study progress is held hostage. With open standards and open innovation, Recaller stores all data locally with transparent JSON export/import — giving learners complete ownership of their knowledge assets.
- **No Telemetry, No Algorithms, No Distraction**: Commercial study platforms profit by maximizing "engagement" and screen time through ads, push notifications, and dopamine loops. Open innovation allows us to build purely for the user's focus and wellbeing — creating a tool that respects their attention.
- **Community Hackability**: Because Recaller is built on standard HTML, CSS, and JavaScript, anyone can fork it, translate it, add their own keyboard shortcuts, or embed custom spaced repetition algorithms like SM-2 or FSRS without needing a massive build pipeline.

---

## My Agent Session

Developing Recaller was an end-to-end collaborative journey with the Google Antigravity agent:
- Ideated the unified Pomodoro + Flashcard + Quiz interaction loop.
- Designed the mathematical SVG progress ring with reactive stroke dash calculations.
- Crafted an accessible keyboard navigation layout that allows studying hands-free from the mouse.
- Seeded the application with evidence-backed cognitive psychology flashcards and quizzes so the app is immediately useful out-of-the-box.

---

## Prize Categories

- **Featured partner category**

---
**Thank You!**
