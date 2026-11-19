# Design: filling in B1

Status: approved ("Proceed", 2026-11-19) and built

## Why

The user is supposed to be fluent at B1 already and is aiming for NCLC 7+ on the TCF Canada. B1 had four grammar lessons and six vocabulary themes, and no reading text had questions, so nothing checked whether a text was understood.

## What gets built

1. **Two new B1 chapters, 12 grammar lessons**, set in adult life (housing, work, moving to Canada, the environment, admin, banking, studying, shopping, the news, debates).
   - c7 "Living in French": qui / que / où, dont, plus-que-parfait, si sentences, reported speech, indirect questions.
   - c8 "Saying what you think": the gérondif, two pronouns together, celui / celle, le mien, linking words, giving an opinion.
   - Each lesson has tips, 8 grammar questions, 3 sentences to build, about 20 words (new ones go in the dictionary under the lesson's theme), and a rule page.
   - Each lesson links to a short text that uses its grammar, with 3 questions.
2. **A "Comprehension" tab in Reading** with original B1 texts of different kinds: email, notice or ad, news article, opinion piece, interview, story, dialogue, letter, blog post. Each has 5 or 6 questions.
   - Question types: main message, who's who, detail, inference, word in context, purpose or tone, true / false / not mentioned.
   - Questions are in French, with the English under them when "English under each sentence" is on.
   - Each answer shows a one-line explanation. A question can name a dictionary word, which goes into reviews when the answer is wrong.
   - Score, best score and XP are kept; the history shows it.
3. **Questions for the four stories** (8 each), opened from the story's last page and from the story list.

## Approaches

- Questions inside each lesson's session: they mix with vocabulary drills, and a text doesn't fit the one-question screen.
- **A separate comprehension page, linked from lessons (chosen).** The text stays on screen while you answer, like the TCF reading section.

## Not in this part

The slowly appearing rule explanation, and B2.

## Builder's calls

- 24 library texts plus 12 lesson texts to start. All original, neutral names, Canadian settings where they fit.
- Text data lives in `js/data/b1-read-*.js` as `FR.CR`; lessons in `js/data/b1-course.js`; story questions in `js/data/story-q.js`; the view in `js/comprehension.js`.
- The new chapters unlock after the c6 checkpoint, like every other chapter.
