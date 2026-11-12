# Parlons ! — a personal French course

A French-learning web app that runs entirely in the browser: no account, no server, no build step.
Goal it was built for: reach **B1 by the end of 2027** (B2 welcome), with TEF/TCF practice along the way.

It is an installable PWA, so it works offline and can later be wrapped as an Android APK.

## Run it

- **Quickest:** double-click `index.html`. Everything works except offline caching.
- **Local server (recommended):** `powershell -ExecutionPolicy Bypass -File tools\serve.ps1`, then open <http://localhost:8123/>.
- **GitHub Pages:** push this folder to a GitHub repository, then *Settings → Pages → Deploy from branch → main / root*.
  The app is then at `https://<user>.github.io/<repo>/` and can be installed from the browser menu ("Add to Home screen").

## What is inside

| Section | What it does |
|---|---|
| **Lessons** | 5 chapters, 20 lessons (A1 → early B1). Lessons inside an open chapter can be done in any order. Each chapter ends with a quiz; passing it (70%) unlocks the next chapter with a celebration and a milestone. |
| **Practice mix** | Pick any lessons and optionally mix in related ones (previous, next, linked topics). Weak items come first. |
| **Gender quiz** | Masculine / feminine / both, with the ending rule (or the exception) explained after each answer. French has no neuter. |
| **Rules** | 15 short reference cards: le / la / l', du / de la, au / aux, tu / vous, passé composé vs imparfait, subjunctive… |
| **Everyday French** | Formal vs colloquial pairs, and roleplays where you pick the reply that fits the situation. |
| **Reading** | 48 passages (8 each for daily life, travel, press, academic, cinema, pop culture) in short / medium / long, with a per-sentence English toggle. Listen plays one sentence at a time with an adjustable pause, and can be paused or stopped. |
| **TEF / TCF** | Format summary and tips for each exam, plus a 20-minute timed mock for each (listening, reading, structures, writing and speaking tasks with checklists and model answers). |
| **Dictionary** | About 2,400 entries with gender, pronunciation and an example. Filter by theme (20 themed packs of ~100 words) and quiz yourself on any theme. 30 colloquial "bonus" words unlock through the streak. |
| **Progress** | Streak, XP, 14-day chart, milestones, common mistakes, focus advice, history. |
| **Coach** | The on-device "AI": a rule-based engine that schedules reviews, adapts the pace, and answers simple questions. |

Everywhere: **long-press a word** to see its translation, how to pronounce it, and hear it. The interface switches between English and French with the button in the header.

## How the learning logic works

- **Spaced repetition.** Every word, grammar item and sentence sits in a memory box (0–6). A right answer moves it up, a wrong one moves it down two. Review intervals expand: 1, 2, 4, 8, 16, 32 days. This follows the spacing and testing effects (reviewing just before you would forget, and retrieving rather than rereading).
- **Pacing** (Settings → Pacing): easy / medium / hard set the questions per lesson, the daily XP goal and when a break is suggested. *Automatic* looks at your last 40 answers and aims for roughly 75–90% correct — above that it pushes, below it eases off. It also suggests a rest after a long stretch or a run of misses, and tells you when you have done enough for the day.
- **Streak.** One finished activity a day keeps it. From day 2 each day unlocks 2 bonus words (5 on every 7th day). If the streak breaks, the three weakest completed lessons must be repeated once before new lessons open again.
- **Time between lessons** (Settings): a minimum wait after finishing a new lesson before the next one opens. Reviews and practice are never blocked.
- **Sessions are saved.** Leave an exercise, mock exam or roleplay at any time; a bar at the top shows it is in progress and takes you back.

Honest limits: the "coach" is rule-based, not a language model — it cannot hold a conversation or mark free writing. Pronunciations for words outside the dictionary are approximate (marked ≈). Daily reminders only fire while the app is open, until it is packaged as an APK.

## Adding content

All content is plain data in `js/data/`:

- `words-1.js` … `words-10.js` — themed packs, one word per line: `french|english|code|example|translation` (code: m, f, mf for nouns; v, a, d, p… for other types)
- `dictionary.js` — lesson words, one per line: `french|english|type|gender|pronunciation|example|translation|note|lesson id`
- `course.js` — chapters and lessons (tips, fill-in-the-blank items, sentences to rebuild)
- `rules.js`, `everyday.js`, `passages.js` — rules, formal/casual pairs and roleplays, reading passages
- `js/exam.js` — exam facts, tips and mock items

A lesson's words are simply the dictionary entries whose last field is that lesson's `id`. The themed packs bring the dictionary to roughly the vocabulary size expected around B1; the lessons themselves still cover only the first 160 words and core grammar.

## Turning it into an APK later

1. Publish on GitHub Pages (above).
2. Easiest route: <https://www.pwabuilder.com> → enter the Pages URL → *Package for stores → Android* → download the APK.
3. Alternative for a fully offline app with native notifications and speech: wrap the folder with [Capacitor](https://capacitorjs.com) and add its Local Notifications and Text-to-Speech plugins (Android's built-in WebView has no speech synthesis).

Before packaging, export PNG icons (192 px and 512 px) from `icon.svg` and list them in `manifest.webmanifest`.

## Data

Progress is stored in the browser's local storage on the device. Use *Settings → Your data → Export backup* before changing phone or browser.
