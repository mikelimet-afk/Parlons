window.FR = window.FR || {};
// Interface strings: key -> [English, French]. {x} are placeholders.
FR.S = {
  // navigation
  home: ['Home', 'Accueil'], tab_dict: ['Dictionary', 'Dico'], lessons: ['Lessons', 'Leçons'], dictionary: ['Dictionary', 'Dictionnaire'], reading: ['Reading', 'Lecture'], progress: ['Progress', 'Progrès'],
  practice_mix: ['Practice mix', 'Entraînement libre'], gender_quiz: ['Gender quiz', 'Quiz des genres'], rules: ['Rules', 'Règles'], everyday: ['Everyday French', 'Français de tous les jours'],
  exam: ['TEF / TCF', 'TEF / TCF'], coach: ['Coach', 'Coach'], settings: ['Settings', 'Réglages'], back: ['Back', 'Retour'], today: ['Today', 'Aujourd\'hui'],
  in_progress: ['Exercise in progress', 'Exercice en cours'], exam_in_progress: ['Mock exam in progress', 'Examen blanc en cours'], rp_in_progress: ['Roleplay in progress', 'Jeu de rôle en cours'], resume: ['Resume', 'Reprendre'],
  // generic
  start: ['Start', 'Commencer'], continue: ['Continue', 'Continuer'], check: ['Check', 'Vérifier'], open: ['Open', 'Ouvrir'], practise: ['Practise', 'S\'entraîner'], review: ['Review', 'Réviser'], play: ['Play', 'Jouer'], test: ['Test', 'Tester'],
  tap_again: ['Tap again to confirm', 'Touchez encore pour confirmer'], nothing: ['Nothing to practise here yet.', 'Rien à travailler ici pour l\'instant.'], no_results: ['Nothing found.', 'Aucun résultat.'],
  questions: ['questions', 'questions'], examples: ['Examples', 'Exemples'], words: ['Words', 'Mots'], best: ['best', 'meilleur score'], accuracy: ['accuracy', 'réussite'], sessions: ['sessions', 'séances'], due: ['to review', 'à réviser'],
  // long-press popup
  pron: ['say:', 'prononcez :'], no_entry: ['Not in the dictionary yet.', 'Pas encore dans le dictionnaire.'], form_of: ['a form of', 'forme de'], open_dict: ['Open in dictionary', 'Voir dans le dictionnaire'],
  no_voice: ['No French voice is available on this device.', 'Aucune voix française disponible sur cet appareil.'],
  hint_press: ['Tip: long-press any word to see its translation and how to say it.', 'Astuce : appuyez longuement sur un mot pour voir sa traduction et sa prononciation.'],
  // home
  home_sub: ['A little French every day.', 'Un peu de français chaque jour.'], streak: ['day streak', 'jours de suite'], today_goal: ['today\'s goal', 'objectif du jour'], explore: ['Explore', 'Explorer'], next_up: ['Next up', 'À suivre'],
  target_left: ['{n} days until your target date ({d}).', '{n} jours avant votre date cible ({d}).'],
  step_comeback: ['Warm-up review', 'Révision de reprise'], step_comeback_d: ['Your streak was interrupted. Go over these topics once, then new lessons open again.', 'Votre série a été interrompue. Revoyez ces thèmes une fois, puis les nouvelles leçons se rouvrent.'],
  step_review: ['{n} items to review', '{n} éléments à réviser'], step_review_d: ['Reviewing first makes room for new material.', 'Réviser d\'abord fait de la place pour la nouveauté.'], step_review_wait: ['Your next new lesson opens in {t}. A review fits nicely until then.', 'Votre prochaine leçon s\'ouvre dans {t}. Une révision en attendant ?'],
  start_review: ['Start review', 'Commencer la révision'], step_cp_d: ['All lessons of this chapter are done. Pass the quiz at 70% to unlock the next chapter.', 'Toutes les leçons du chapitre sont faites. Réussissez le quiz à 70 % pour débloquer la suite.'], start_quiz: ['Start the quiz', 'Commencer le quiz'],
  step_lesson_d: ['Your next lesson is ready.', 'Votre prochaine leçon est prête.'], open_lesson: ['Open lesson', 'Ouvrir la leçon'],
  step_wait: ['Next new lesson in {t}', 'Prochaine leçon dans {t}'], step_wait_d: ['Spacing lessons out helps them stick. Meanwhile you can practise or read.', 'Espacer les leçons aide à mémoriser. En attendant, entraînez-vous ou lisez.'],
  step_free: ['Course complete', 'Parcours terminé'], step_free_d: ['Keep it alive with mixed practice, reading and roleplays.', 'Entretenez vos acquis : entraînement, lecture et jeux de rôle.'],
  gate_t: ['Your {n}-day streak ended', 'Votre série de {n} jours s\'est arrêtée'], gate_d: ['No drama. Before moving on, repeat these topics once:', 'Rien de grave. Avant de continuer, revoyez une fois ces thèmes :'], gate_short: ['Finish the warm-up review first.', 'Terminez d\'abord la révision de reprise.'], start_comeback: ['Start the warm-up', 'Commencer la reprise'],
  // learn
  learn_sub: ['Lessons inside an open chapter can be done in any order.', 'Les leçons d\'un chapitre ouvert se font dans l\'ordre que vous voulez.'], chapter: ['Chapter', 'Chapitre'], checkpoint: ['Chapter quiz', 'Quiz du chapitre'],
  passed: ['passed', 'réussi'], cp_ready: ['ready', 'prêt'], cp_locked: ['finish the lessons first', 'terminez d\'abord les leçons'], ch_locked: ['Pass the previous chapter quiz to unlock this chapter.', 'Réussissez le quiz du chapitre précédent pour débloquer celui-ci.'],
  spacing_note: ['Next new lesson opens in {t} (your spacing setting). Reviews and practice stay open.', 'Prochaine nouvelle leçon dans {t} (votre réglage). Révisions et entraînement restent ouverts.'],
  key_points: ['Key points', 'Points clés'], start_lesson: ['Start lesson', 'Commencer la leçon'], redo_lesson: ['Do the lesson again', 'Refaire la leçon'], only_this: ['Quiz me on this lesson only', 'Quiz sur cette leçon seulement'], mix_related: ['Mix with related lessons', 'Mélanger avec les leçons liées'],
  // session
  busy_t: ['You have an exercise in progress', 'Vous avez un exercice en cours'], start_new: ['Start the new one instead', 'Commencer le nouveau'], again: ['once more', 'encore une fois'],
  q_means: ['What does this mean?', 'Que veut dire ce mot ?'], q_howsay: ['How do you say this in French?', 'Comment dit-on en français ?'], q_gender: ['Masculine or feminine?', 'Masculin ou féminin ?'], q_fill: ['Fill in the blank', 'Complétez la phrase'], q_build: ['Build this sentence in French', 'Construisez la phrase en français'],
  masc: ['Masculine · le / un', 'Masculin · le / un'], fem: ['Feminine · la / une', 'Féminin · la / une'], both: ['Both', 'Les deux'],
  tap_words: ['Tap the words in order', 'Touchez les mots dans l\'ordre'], not_quite: ['Not quite', 'Pas tout à fait'], correct_is: ['Correct answer:', 'Bonne réponse :'], end_session: ['End this session', 'Terminer la séance'],
  nudge_rest: ['You have been at it for a while. A five-minute break now will help what you just learned settle.', 'Vous travaillez depuis un moment. Cinq minutes de pause aideront à fixer ce que vous venez d\'apprendre.'],
  nudge_tired: ['Several misses in a row — often a sign of fatigue, not ability. Finish this one, then rest.', 'Plusieurs erreurs de suite : souvent de la fatigue, pas un manque de niveau. Finissez, puis reposez-vous.'],
  res_line: ['{r} of {n} correct on the first try', '{r} sur {n} du premier coup'], cp_fail: ['You need 70% to pass. Review the items below and try again.', 'Il faut 70 % pour réussir. Revoyez les points ci-dessous et réessayez.'], to_review: ['Worth another look', 'À revoir'],
  review_t: ['Review', 'Révision'], practice_t: ['Practice mix', 'Entraînement libre'], comeback_t: ['Warm-up review', 'Révision de reprise'], gender_t: ['Gender quiz', 'Quiz des genres'],
  coach_enough: ['That is plenty for today. Short sessions spread over days beat one long one — come back tomorrow for the review.', 'C\'est largement assez pour aujourd\'hui. Plusieurs séances courtes valent mieux qu\'une longue.'],
  coach_rest: ['Good work. You have studied long enough for a break: step away for ten minutes before anything new.', 'Beau travail. Vous méritez une pause : dix minutes avant toute nouveauté.'],
  coach_slow: ['That one was tough. Slow down: reread the key points, then try a short practice on just this topic.', 'C\'était difficile. Ralentissez : relisez les points clés, puis refaites un court entraînement.'],
  coach_push: ['You are clearly ready for more. One more lesson would fit well right now.', 'Vous êtes visiblement en forme. Une leçon de plus passerait très bien.'],
  coach_great: ['Excellent — and your daily goal is done. Anything more today is a bonus.', 'Excellent — et l\'objectif du jour est atteint. Tout le reste est du bonus.'],
  coach_ok: ['Solid session. The items you missed will come back in your next review.', 'Bonne séance. Les points manqués reviendront dans la prochaine révision.'],
  coach_goal: ['Daily goal reached. The items you missed will come back in your next review.', 'Objectif du jour atteint. Les points manqués reviendront à la prochaine révision.'],
  // celebrations
  cel_chapter: ['Chapter complete!', 'Chapitre terminé !'], cel_all: ['You have finished the whole course. Félicitations !', 'Vous avez terminé tout le parcours. Félicitations !'], cel_ms: ['Milestone reached', 'Étape franchie'],
  cel_bonus: ['Streak reward: new bonus words unlocked in your dictionary.', 'Récompense : de nouveaux mots bonus dans votre dictionnaire.'], cel_streak1: ['Day one. Come back tomorrow to start earning bonus words.', 'Premier jour. Revenez demain pour gagner des mots bonus.'], cel_streak: ['Your streak continues.', 'Votre série continue.'],
  cel_back: ['You are back on track', 'C\'est reparti'], cel_back_sub: ['New lessons are open again.', 'Les nouvelles leçons sont rouvertes.'],
  // practice, gender
  practice_sub: ['Pick any lessons, in any order. Weak items come up first.', 'Choisissez les leçons que vous voulez. Les points faibles passent en premier.'], mix_toggle: ['Mix in related lessons (previous, next and linked topics)', 'Ajouter les leçons liées (précédente, suivante, thèmes proches)'],
  gender_intro: ['French nouns are masculine or feminine — there is no neuter. A few nouns for people take both. Endings give strong hints:', 'Les noms français sont masculins ou féminins — pas de neutre. Quelques noms de personnes prennent les deux. Les terminaisons aident :'],
  gender_acc: ['Your gender accuracy: {p}% over {n} answers', 'Votre réussite sur les genres : {p} % sur {n} réponses'], gender_met: ['Quiz me on nouns I have met', 'Quiz sur les noms déjà vus'], gender_all: ['Quiz me on every noun', 'Quiz sur tous les noms'],
  // dictionary
  search_ph: ['Search French or English…', 'Chercher en français ou en anglais…'], f_all: ['All', 'Tout'], f_nouns: ['Nouns', 'Noms'], f_verbs: ['Verbs', 'Verbes'], f_adj: ['Adjectives', 'Adjectifs'], f_other: ['Other', 'Autres'], f_bonus: ['Bonus', 'Bonus'],
  streak_reward: ['streak reward', 'récompense de série'], memory: ['Memory', 'Mémoire'], dict_count: ['{n} words · {b} bonus words still locked', '{n} mots · {b} mots bonus à débloquer'],
  // rules
  rules_sub: ['Quick answers to the questions that come up again and again.', 'Des réponses rapides aux questions qui reviennent sans cesse.'], practise_rule: ['Practise this rule', 'S\'entraîner sur cette règle'], open_rule: ['Open the rule', 'Voir la règle'],
  // everyday
  everyday_sub: ['The French in textbooks and the French people actually speak.', 'Le français des manuels et celui qu\'on parle vraiment.'], ev_pairs: ['Formal vs casual', 'Formel / familier'], ev_rp: ['Roleplay', 'Jeux de rôle'], formal: ['formal', 'formel'], casual: ['casual', 'familier'],
  rp_reply: ['Choose the reply that fits the situation', 'Choisissez la réponse adaptée à la situation'], rp_done: ['The right register matters as much as the right grammar.', 'Le bon registre compte autant que la bonne grammaire.'], again_btn: ['Play again', 'Rejouer'],
  // reading
  read_sub: ['Short, medium and long reads on different subjects.', 'Des textes courts, moyens et longs sur différents sujets.'], len_s: ['Short', 'Court'], len_m: ['Medium', 'Moyen'], len_l: ['Long', 'Long'],
  show_en: ['English under each sentence', 'Anglais sous chaque phrase'], listen_all: ['Listen', 'Écouter'], hint_read: ['Long-press a word to hear it and see how it is pronounced.', 'Appuyez longuement sur un mot pour l\'entendre et voir sa prononciation.'],
  mark_read: ['I have read it', 'J\'ai lu ce texte'], read_done: ['Read', 'Lu'], read_xp: ['Passage read — XP added.', 'Texte lu — XP ajoutés.'],
  // progress
  xp_total: ['XP', 'XP'], words_learned: ['words learned', 'mots appris'], course_prog: ['Course progress', 'Avancement du parcours'],
  course_line: ['{l} of {t} lessons · {c} of {ct} chapters · {m} words mastered · best streak {b} days.', '{l} leçons sur {t} · {c} chapitres sur {ct} · {m} mots maîtrisés · meilleure série : {b} jours.'],
  last14: ['Last 14 days', '14 derniers jours'], focus: ['Where to focus', 'Sur quoi insister'], adv_early: ['Answer a few more questions and advice will appear here.', 'Encore quelques réponses et des conseils apparaîtront ici.'], adv_none: ['No weak spot stands out right now. Keep going.', 'Aucun point faible marqué en ce moment. Continuez.'],
  adv_gender: ['Noun genders: {p}% correct. Use the gender quiz and learn each noun with its article.', 'Genre des noms : {p} % de réussite. Faites le quiz et apprenez chaque nom avec son article.'],
  adv_grammar: ['Grammar: {p}% correct. Reread the rule before practising again.', 'Grammaire : {p} % de réussite. Relisez la règle avant de vous réentraîner.'],
  adv_vocab: ['Vocabulary: {p}% correct. Browse the dictionary examples, then run a review.', 'Vocabulaire : {p} % de réussite. Parcourez les exemples du dictionnaire, puis révisez.'],
  adv_order: ['Sentence building: {p}% correct. Read the example sentences aloud to get the rhythm.', 'Construction de phrases : {p} % de réussite. Lisez les exemples à voix haute.'],
  adv_register: ['Formal vs casual: {p}% correct. Replay the roleplays.', 'Formel / familier : {p} % de réussite. Rejouez les jeux de rôle.'],
  mistakes: ['Common mistakes', 'Erreurs fréquentes'], no_mistakes: ['No mistakes recorded yet.', 'Aucune erreur enregistrée.'], milestones: ['Milestones', 'Étapes'], no_ms: ['Your first milestone is one lesson away.', 'Votre première étape est à une leçon d\'ici.'], next_ms: ['Coming up', 'À venir'],
  history: ['History', 'Historique'], show_all: ['Show all', 'Tout afficher'], show_less: ['Show less', 'Réduire'], no_hist: ['Nothing yet.', 'Rien pour l\'instant.'],
  // glance
  gl_done: ['Daily goal reached. Félicitations !', 'Objectif du jour atteint. Félicitations !'], gl_some: ['Nice work so far — {n} XP to today\'s goal.', 'Beau début — encore {n} XP pour l\'objectif du jour.'], gl_none: ['Nothing yet today. Ready when you are.', 'Rien encore aujourd\'hui. Quand vous voulez.'],
  gl_left: ['{n} lessons to go before the chapter quiz', 'encore {n} leçons avant le quiz du chapitre'], gl_cp: ['the chapter quiz is next', 'le quiz du chapitre est le prochain'], gl_next: ['Next time: {l}.', 'La prochaine fois : {l}.'], gl_soon: ['A chapter quiz is coming up soon.', 'Un quiz de chapitre arrive bientôt.'], gl_cp_next: ['Next time: the chapter quiz.', 'La prochaine fois : le quiz du chapitre.'],
  streak_n: ['{n}-day streak', 'Série de {n} jours'], streak_safe: ['safe for today', 'validée pour aujourd\'hui'], streak_open: ['one session today keeps it going', 'une séance aujourd\'hui la prolonge'], gl_history: ['History & overall progress', 'Historique et progression'],
  // coach
  coach_sub: ['Runs entirely on your device: it tracks what you know, schedules reviews and adjusts the pace.', 'Fonctionne sur votre appareil : il suit vos acquis, planifie les révisions et règle le rythme.'],
  pacing: ['Pacing', 'Rythme'], pace_now: ['Current pace: {p}.', 'Rythme actuel : {p}.'], pace_auto: ['Chosen automatically from your recent answers.', 'Choisi automatiquement d\'après vos réponses récentes.'], pace_nodata: ['Not enough answers yet to adapt.', 'Pas encore assez de réponses pour adapter.'], pace_acc: ['Recent accuracy: {p}%. The sweet spot for learning is roughly 75–90%.', 'Réussite récente : {p} %. La zone idéale pour apprendre se situe vers 75–90 %.'],
  p_auto: ['Automatic', 'Automatique'], p_easy: ['Easy', 'Doux'], p_medium: ['Medium', 'Moyen'], p_hard: ['Hard', 'Intense'],
  ask: ['Ask the coach', 'Demander au coach'], ask_ph: ['Ask about a word, a rule, your progress…', 'Un mot, une règle, vos progrès…'],
  ai_q1: ['What should I do next?', 'Que faire ensuite ?'], ai_q2: ['What are my weak spots?', 'Quels sont mes points faibles ?'], ai_q3: ['How is my streak?', 'Où en est ma série ?'], ai_q4: ['When do I use du or de la?', 'Quand utiliser du ou de la ?'], ai_q5: ['Gender of maison?', 'Quel est le genre de maison ?'],
  ai_best: ['Best so far: {n} days.', 'Record : {n} jours.'], ai_words: ['{n} words learned.', '{n} mots appris.'], ai_exam: ['The TEF / TCF section has the formats, tips and a timed mock for each exam.', 'La section TEF / TCF présente les formats, des conseils et un examen blanc chronométré.'],
  ai_help: ['I can tell you what to do next, show your weak spots, your streak and progress, explain a rule ("when do I use au?"), or look up a word ("gender of voiture").', 'Je peux vous dire quoi faire ensuite, montrer vos points faibles, votre série, vos progrès, expliquer une règle ou chercher un mot.'],
  // settings
  language: ['Language', 'Langue'], theme: ['Theme', 'Thème'], th_simple: ['Simple', 'Simple'], th_minimal: ['Minimalist', 'Minimaliste'], th_frenchy: ['Frenchy', 'À la française'], motion: ['Animations', 'Animations'], mo_full: ['Full', 'Complètes'], mo_calm: ['Reduced', 'Réduites'],
  pd_auto: ['Adapts to you: pushes when your answers are above 90%, eases off below 75%, and suggests breaks.', 'S\'adapte à vous : accélère au-dessus de 90 % de réussite, ralentit sous 75 %, et propose des pauses.'],
  pd_easy: ['8 questions per lesson, 50 XP a day, break suggested after 15 minutes.', '8 questions par leçon, 50 XP par jour, pause proposée après 15 minutes.'],
  pd_medium: ['12 questions per lesson, 100 XP a day, break suggested after 25 minutes.', '12 questions par leçon, 100 XP par jour, pause proposée après 25 minutes.'],
  pd_hard: ['16 questions per lesson, 160 XP a day, break suggested after 35 minutes.', '16 questions par leçon, 160 XP par jour, pause proposée après 35 minutes.'],
  spacing: ['Time between new lessons', 'Délai entre deux nouvelles leçons'], spacing_d: ['How long to wait after finishing a new lesson before the next one opens. Reviews and practice are never blocked.', 'Temps d\'attente après une nouvelle leçon avant la suivante. Révisions et entraînement restent toujours ouverts.'], sp_none: ['None', 'Aucun'],
  reminder: ['Daily reminder', 'Rappel quotidien'], reminder_d: ['A quiet reminder at this time if you have not studied yet. In the browser it only works while the app is open.', 'Un rappel discret à cette heure si vous n\'avez pas encore travaillé. Dans le navigateur, seulement quand l\'app est ouverte.'], notif_on: ['Allow notifications', 'Autoriser les notifications'], notif_ok: ['Notifications allowed.', 'Notifications autorisées.'], notif_no: ['Notifications are not available.', 'Notifications indisponibles.'],
  remind_msg: ['Time for a little French?', 'Un peu de français ?'],
  voice: ['Voice speed', 'Vitesse de la voix'], v_slow: ['Slow', 'Lente'], v_normal: ['Normal', 'Normale'], v_natural: ['Natural', 'Naturelle'],
  target: ['Target date', 'Date cible'], target_d: ['When you want to reach B1. Shown as a countdown on the home screen.', 'La date à laquelle vous visez le B1. Affichée en compte à rebours sur l\'accueil.'],
  data: ['Your data', 'Vos données'], data_d: ['Everything is saved on this device. Export a backup before changing phone or browser.', 'Tout est enregistré sur cet appareil. Exportez une sauvegarde avant de changer de téléphone ou de navigateur.'], export: ['Export backup', 'Exporter'], import: ['Import backup', 'Importer'], reset: ['Erase everything', 'Tout effacer'], import_ok: ['Backup restored.', 'Sauvegarde restaurée.'], import_bad: ['That file is not a valid backup.', 'Ce fichier n\'est pas une sauvegarde valide.'],
  // exams
  exam_sub: ['Formats, tips and a short timed mock for each exam.', 'Formats, conseils et un court examen blanc chronométré pour chaque test.'], x_format: ['Format at a glance', 'Le format en bref'], x_tips: ['Tips and tricks', 'Conseils et astuces'],
  x_mock_d: ['Mock exam: {n} tasks, {m} minutes, difficulty rising from A1 to B2. Answers are shown only at the end, like the real thing.', 'Examen blanc : {n} tâches, {m} minutes, difficulté croissante de A1 à B2. Les réponses n\'apparaissent qu\'à la fin.'],
  x_past: ['Previous scores:', 'Scores précédents :'], x_start: ['Start the mock exam', 'Commencer l\'examen blanc'], x_official: ['Formats change from time to time. Always confirm details and dates on the official TCF (France Éducation international) or TEF (CCI Paris Île-de-France) site before you register.', 'Les formats évoluent. Vérifiez toujours les détails et les dates sur le site officiel du TCF ou du TEF avant de vous inscrire.'],
  x_words: ['words', 'mots'], x_speak_note: ['Speak your answer aloud — recording yourself on your phone helps. You will see a checklist and a model answer at the end.', 'Répondez à voix haute — enregistrez-vous si possible. Une grille et un exemple de réponse s\'affichent à la fin.'],
  x_listen: ['Play the recording', 'Écouter l\'enregistrement'], x_plays: ['Two plays here. In the real exam you usually hear it once.', 'Deux écoutes ici. À l\'examen, une seule en général.'], x_noplays: ['No plays left for this question.', 'Plus d\'écoute pour cette question.'], x_noaudio: ['No French voice on this device, so the script is shown instead.', 'Pas de voix française sur cet appareil : le texte est affiché.'],
  x_prev: ['Previous', 'Précédent'], x_next: ['Next', 'Suivant'], x_finish: ['Finish the exam', 'Terminer l\'examen'], x_time_up: ['Time is up.', 'Le temps est écoulé.'],
  x_result: ['mock result', 'résultat'], x_band: ['Rough level:', 'Niveau indicatif :'], x_disclaimer: ['A rough indication from a short practice set — not an official score.', 'Une indication approximative sur un court entraînement — pas un score officiel.'],
  x_check: ['Check your answer against this list', 'Vérifiez votre réponse avec cette grille'], x_model: ['Show a model answer', 'Voir un exemple de réponse'], x_your: ['Your answer:', 'Votre réponse :'], x_correct: ['Correct answer:', 'Bonne réponse :']
};
