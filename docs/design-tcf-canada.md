# Design: the TCF Canada track

Status: approved and built · Part 2 of 4 (after reviews; before dictionary gaps and TEF Canada)

## Why

The main user needs a high TCF Canada score to improve their chances of immigrating to Canada. The level that matters is NCLC 7 or above in all four skills, which adds Express Entry points and qualifies for French-speaker draws. Other people use Parlons just to learn French, so the exam must be something you opt into, not something everyone sees.

Today the exam section has one small mock per exam (about 6 questions per part, against 39 on the real test). It treats writing and speaking as optional, which they are not for Canada, and it doesn't connect to the rest of the app. The home screen also shows 13 equal tiles, so nothing says what to do for the exam.

## Goals

- When the app first opens, it asks your goal: just learn French, TCF Canada, or TEF Canada. You can change it in Settings.
- With an exam goal, the app adds an exam track: a target (NCLC 7), a countdown to your test date, the mock, practice by part, and which of the four skills is furthest behind.
- A TCF Canada mock in the real format, with all four parts required, and two full-length mocks to start.
- Writing and speaking marked two ways: a checklist and model answer always, plus an AI score out of 20 with corrections when the AI is on.
- A tidier home screen built around what to do next.

## Non-goals

- No official score. Every estimate is labelled "estimate". The real test is graded by France Éducation International.
- No copied official papers. Every question is written for Parlons, in the style of the test.
- No TEF Canada expansion in this part. TEF keeps its current mock and tips, marked "Canada version coming".
- No change to lessons, reviews or the dictionary.

## Anti-goals

- The exam takes over the app for learners who chose "just learn French".
- An estimate that flatters: showing NCLC 7 when the person isn't close.
- A mock that only works online. Without the AI, the mock must still be complete and useful.

## Approaches considered (for marking writing and speaking)

- A. Checklist and model answer only. Offline and simple, but self-marked, so there's no estimate for the two parts that decide the score.
- B. AI marking only. Closest to real feedback, but needs internet, and the app breaks for anyone who turns the AI off.
- **C. Both (chosen).** The checklist and model answer are always there. When the AI is on, you also get a score, corrections and an NCLC estimate.

## How it works

### 1. Goal and setup

- **First launch:** one screen, "What brings you to French?", with three choices: Just learning, TCF Canada, TEF Canada. With an exam goal it also asks for the test date (optional, "not booked yet" allowed) and shows the target, NCLC 7, which can be changed.
- **Existing users:** shown the same question once, on their next visit.
- **Settings:** a "Goal" card to change any of this.

### 2. Home screen

The new order:
1. Greeting and today's progress.
2. The next step.
3. **Exam card**, only with an exam goal. It shows the days left, your latest estimate per skill against the target, and one button for the most useful exam task today.
4. Six main tiles: Lessons, Review/Practice, Reading, Everyday French, Dictionary, Exam (or Basics for "just learning").
5. Everything else (gender quiz, grammar, typing, coach, progress, tips, basics) under a "More" row.

Nothing is removed. It's only regrouped.

### 3. The exam section, TCF Canada

The section opens on your exam. The other exams are available under "Other exams".

**Full mock: four parts, each timed like the real test.**

| Part | Real test | Parlons mock |
|---|---|---|
| Listening | 39 MCQ, 35 min | 39 MCQ, 35 min, read aloud by the French voice. Each clip can be played up to twice (the real test plays it once). |
| Reading | 39 MCQ, 60 min | 39 MCQ, 60 min |
| Writing | 3 tasks, 60 min | 3 tasks, 60 min, with word counts |
| Speaking | 3 tasks, 12 min with an examiner | 3 tasks; spoken into the mic or typed; a timer per task |

- **Difficulty rises through each part, A1 to C2,** as on the real test, roughly 6 or 7 questions per level.
- **Parts can be taken separately.** Each part saves on its own, so you can do listening one day and reading the next. Leaving keeps your answers, and the quit prompt is unchanged.
- **Two complete mocks (Mock 1 and Mock 2) to start.** That's 156 multiple-choice questions plus 12 writing and speaking tasks.
- **Practice by part.** Short 10-question sets drawn from a separate pool of extra questions, so practice doesn't use up the mocks. A practice set is the 20-minute option.

### 4. Marking

**Listening and reading.**
- Right and wrong per question, with a short explanation for each.
- Your score per CEFR level, for example "B1: 5/7", so you can see where it breaks down.
- An **NCLC estimate**: harder questions count for more, and the result is mapped to the TCF 0–699 scale and then to NCLC using IRCC's table.
- The estimate is shown as a range, and only if the whole part was done.

**Writing and speaking.**
- Always: the task's checklist (what an examiner looks for) and a model answer to compare with.
- With the AI on:
  - The AI marks the text against the TCF criteria (task completed, coherence, vocabulary, grammar) and gives a score out of 20 with 3 to 5 specific corrections.
  - It converts the score to NCLC using IRCC's table. The result is labelled "AI estimate".
  - For speaking, the browser writes down what you said (French speech-to-text) and that text is marked. You see the text first and can fix obvious mistakes in the writing-down before it's marked.
- Without the AI, or offline: the checklist only, plus a note that AI marking is available when online.

**The NCLC 7 bands used** (from IRCC's TCF Canada table; to be checked again before release):

| Skill | NCLC 7 |
|---|---|
| Listening | 458–502 |
| Reading | 453–498 |
| Writing | 10–11 / 20 |
| Speaking | 10–11 / 20 |

### 5. Weakest skill

- The exam card and the coach show your latest estimate for each of the four skills.
- The lowest one, or any with no estimate yet, becomes the suggested task, for example "Speaking: no estimate yet. Try Task 2 (12 min)."
- Mock mistakes feed reviews: missed listening and reading questions add their key words to your review list.

### 6. TEF Canada

- TEF Canada appears as a choice everywhere and keeps its current mock and tips.
- It's labelled "Canada version coming", and its tips stay as a side note.
- Part 4 of the plan expands it.

## Decided with the user

- Exam is an opt-in track. Learners who aren't preparing for an exam use the app without it.
- Both exams can be chosen. TCF Canada is built in full now, and TEF tips stay a side note.
- Marking approach C.
- More mock content than today.

## Builder's calls (mine; open to change)

- Two full mocks plus a separate practice pool.
- Listening clips can be played twice.
- Six main tiles on the home screen, with the rest under "More".
- Default target NCLC 7.
- The order on the exam card.
- Speech-to-text with the chance to correct it before marking.
- Harder questions count for more in the estimate.
- Estimates shown as ranges.
- The existing TCF "Tout public" mock moves under "Other exams".

## Left to the builder

- Writing the 156 multiple-choice questions, 12 tasks with checklists and model answers, and the practice pool. All original, spread evenly across A1–C2 and everyday Canadian and French situations.
- The exact AI marking prompt and the JSON shape it returns.
- Screen layouts in the app's existing style. Strings in English and French, written plainly (humanizer pass).

## Open (only the user can answer)

- None yet. Check the bands above against IRCC's current table before release.
