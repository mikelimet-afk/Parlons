# Design: reviews that make you remember

Status: approved and built · Part 1 of 4 (then the TCF Canada track, dictionary gaps, TEF Canada)

## Why

Parlons exists to make its learners fluent. For its main user, the goal is a high TCF Canada score (NCLC 7 or above in all four skills) for Canadian immigration. Other learners use it with no exam in mind.

Today a review can be finished without recalling anything. Most questions are picked from four buttons. The user often answers while working, in about 20-minute blocks. When busy they tap through, guess when unsure, and get the item right on the retry by elimination. They don't remember the mistake. The fix has to make every review demand real recall, and make mistakes stick, without making the app feel heavier.

## Goals

- The better you know an item, the harder its question form, so familiar words are produced, not recognised.
- When stuck, there's a better move than guessing: a clue after a pause, and a Help button.
- Every mistake shows a one-line reason, and the item returns in the same session in a different form.
- Works when answering in snatched moments while working: each question makes sense on its own, sessions resume where they stopped, and listening can be switched off for now.

## Non-goals

- No new home-screen button or separate "deep review" mode (approach B was rejected because it adds clutter and an easy way out).
- No change to lessons' first-time teaching flow, the 0–6 memory levels or their intervals.
- No AI dependency. Everything works offline. The AI tutor can come later as an extra "explain more".
- No 3-minute busy mode for now (typical sessions are 20 minutes).

## Anti-goals (would be a failure even if it works)

- Reviews feel like a punishment: so much typing that a 20-minute block covers only a handful of items.
- Help becomes the new button-mashing: taking the answer from Help every time keeps the item looking "learned".
- Mistake explanations that are vague or wrong ("incorrect, try again").

## Approaches considered

- **A. Rework the existing review (chosen).** Question form scales with how well you know the item, plus the help ladder and in-session retests. It reuses the engine, adds nothing to the home screen, and C's sentence questions are used at the top levels.
- B. Separate deep-review mode next to the current one. Quicker to build, but adds a button and leaves the tap-through path open on busy days.
- C. Every review is a typed sentence. Strongest recall, slowest per item, and needs example sentences for ~190 words first.

## How it works

### 1. The question form follows the memory level

When a review builds a question for a word, the form depends on how well that word is known (the highest level among its items):

| Level | Form |
|---|---|
| 0–1 (new or shaky) | Pick from buttons, as today. |
| 2–3 | Type the French from the English (existing typing question: accents forgiven with a note, wrong article caught). |
| 4–6 | Type the missing word inside its example sentence, with the English sentence shown. If the word has no example, fall back to plain typing. |

- Grammar items (fill-the-blank) follow the same rule: buttons at 0–1, then typed blanks.
- Gender items stay as buttons. Typing an article adds nothing over choosing it.
- Sentence-building tiles stay as they are.
- Lessons themselves are unchanged. This applies to review sessions and the mixed practice built from due items.

### 2. Help ladder

- If no answer is given for **5 seconds**, a clue appears without being asked for:
  - For a typed word: the first letter, the number of letters, and the example sentence with the word blanked.
  - For buttons: the example sentence with the word blanked.
- A **Help me** button is always visible.
  - First press: the clue (if not shown yet). Second press: the answer plus its reason line.
- An item answered after taking the answer from Help counts as "helped". Its level doesn't go up or down, it's due again tomorrow, and it's retested in this session.
- An item answered correctly after only seeing the clue counts as correct, but its level rises one step less than normal.
- The progress screen counts "helped" separately, so leaning on Help is visible and not hidden inside "correct".

### 3. Mistakes that stick

After any wrong or helped answer, a reason line appears under the correct answer. It's always concrete, and comes from data the app already has:

- **Picked the wrong word:** what the word you picked actually means ("*la gare* = the station; *the train* is *le train*").
- **Gender:** the gender plus the existing gender rule hint (e.g. -ème words are usually masculine).
- **Accent or spelling:** the existing highlighted letters.
- **Grammar blank:** the lesson's tip for that point, or the matching rule from the grammar section.

The missed item comes back **in the same session after at least 3 other questions**, in a stricter form:
- If you missed the button version, the retest is typed.
- If you missed the typed version, it's typed inside the sentence. If there's no sentence, the retest shows the reason line again before the typing box.

At most two retests per item per session. After that it's simply due tomorrow.

### 4. Built for answering while working

- Every question shows enough on its own (prompt, English, sentence) that you don't need to remember the previous screen.
- Sessions already save after each answer. A review left half-done resumes from the same question.
- Listening questions get a **"Can't listen now"** link that swaps them for a reading version for the rest of the session. It doesn't count against the item.
- The 5-second clue timer pauses while the tab or app is hidden.

### 5. Session size

Review length stays tied to the pace setting (8 / 12 / 20 items before retests). Typed questions take longer, so the target is that a medium review with retests fits in about 10 minutes, leaving the rest of a 20-minute block for a lesson. Check this in testing and adjust the item count if needed.

## Decided with the user

- Approach A.
- Help is allowed and isn't counted as wrong, but the item comes back sooner.
- Clues appear on their own when a question is taking too long.
- TCF Canada is the exam focus (part 2). Other learners need no exam to use the app.

## Builder's calls (marked as mine; open to change)

- Clue delay of 5 seconds (changed from 8 at the user's request); the clue-only answer gives one level less than normal.
- Retest gap of 3 questions; at most 2 retests per item.
- Thresholds of 2 (typing) and 4 (sentence).
- Gender and tile questions keep their forms.
- The reason-line wording for each mistake type.

## Left to the builder

- Exact layout of the clue and Help button on phone and desktop, in the app's existing style.
- How "helped" is shown on the progress screen.
- Text strings in English and French, written in plain, human wording (to be passed through the humanizer once drafted).
