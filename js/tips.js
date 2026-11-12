// Tips: how the app works and how to get the most out of it.
(function () {
  const FR = window.FR, { bi, tt } = FR;
  // [icon, title, text, optional link "route|label key"]
  const TIPS = [
    ['g_feat', [
      ['👆', ['Long-press any word', 'Appui long sur un mot'], ['Hold your finger (or mouse button) on any word for half a second. A bubble shows its translation, how to pronounce it, and plays it aloud. It works everywhere: lessons, stories, menus and even this page.', 'Gardez le doigt (ou la souris) une demi-seconde sur n\'importe quel mot : une bulle affiche sa traduction et sa prononciation, et le prononce. Cela marche partout, même ici.']],
      ['🔊', ['Tap the speaker buttons', 'Les boutons haut-parleur'], ['Every 🔊 plays the French. In Reading, Listen reads one sentence at a time with pauses; you can pause, resume or stop, and choose the pause length.', 'Chaque 🔊 prononce le français. En lecture, « Écouter » lit phrase par phrase avec des pauses réglables.']],
      ['🇫🇷', ['Switch the app language', 'Changer la langue de l\'app'], ['The FR / EN button at the top switches the whole interface. Long-press a word of the interface to see it in the other language.', 'Le bouton FR / EN en haut change toute l\'interface. Un appui long sur un mot montre l\'autre langue.']],
      ['⏸', ['Leave whenever you want', 'Partez quand vous voulez'], ['Exercises, quizzes, roleplays and mock exams are saved the moment you leave. A bar at the top reminds you something is in progress; tap it to carry on.', 'Exercices, quiz, jeux de rôle et examens blancs sont enregistrés dès que vous partez. Une barre en haut vous le rappelle.']],
      ['◔', ['Your day at a glance', 'Votre journée en un coup d\'œil'], ['The Today button (or the flame on Home) shows today\'s progress, your streak, what is next and a link to your full history.', 'Le bouton Aujourd\'hui (ou la flamme) montre vos progrès du jour, votre série et la suite.']],
      ['⌨️', ['French keyboard', 'Clavier français'], ['When you type in an exercise, the in-app keyboard can switch between QWERTY and AZERTY and has a row of accented letters. Typing without accents is accepted, but the app tells you which accent was missing.', 'Le clavier intégré passe de QWERTY à AZERTY et propose les lettres accentuées. Les réponses sans accents sont acceptées, avec une remarque.']]
    ]],
    ['g_progress', [
      ['💾', ['Your progress is saved on this device', 'Vos progrès sont enregistrés sur cet appareil'], ['Everything is stored in this browser, offline. Nothing is sent anywhere. Before changing phone or browser, use Settings → Your data → Export backup, then Import it on the new device.', 'Tout est stocké dans ce navigateur, hors ligne. Avant de changer d\'appareil, exportez une sauvegarde dans les Réglages.'], 'settings|settings'],
      ['🔥', ['How the streak works', 'Comment marche la série'], ['Finish one activity a day to keep your streak. From day 2 you unlock bonus words. If the streak breaks, you repeat your three weakest lessons once before new lessons open.', 'Une activité par jour garde la série. Dès le 2e jour, des mots bonus se débloquent. Si la série casse, vous révisez vos trois leçons les plus faibles.']],
      ['🧠', ['Reviews come back at the right time', 'Les révisions reviennent au bon moment'], ['Each word moves up a level when you get it right and down when you miss it. Reviews come back after 1, 2, 4, 8, 16 and 32 days — just before you would forget.', 'Chaque mot monte d\'un niveau quand vous le réussissez. Les révisions reviennent après 1, 2, 4, 8, 16 puis 32 jours.']],
      ['🎚️', ['Pacing adapts to you', 'Le rythme s\'adapte'], ['On Automatic, the app aims for about 75–90 % correct answers: it pushes when things are easy and eases off when they are not, and suggests breaks.', 'En mode automatique, l\'app vise 75 à 90 % de bonnes réponses et propose des pauses.'], 'settings|settings']
    ]],
    ['g_learn', [
      ['⏱️', ['Little and often beats long and rare', 'Peu mais souvent'], ['Fifteen to thirty minutes a day does more than three hours on Sunday. Short sessions spread out over the week are how memory works best.', 'Quinze à trente minutes par jour valent mieux que trois heures le dimanche.']],
      ['🗣️', ['Say everything out loud', 'Dites tout à voix haute'], ['Repeat each sentence after the speaker button. Speaking, even alone, makes words stick and prepares you for the TEF/TCF oral.', 'Répétez chaque phrase après le haut-parleur : parler, même seul, fixe les mots.']],
      ['🏷️', ['Learn nouns with their article', 'Apprenez les noms avec l\'article'], ['Never learn "maison" — learn "la maison". The gender quiz and the ending rules in Rules make this much easier.', 'N\'apprenez jamais « maison », mais « la maison ».'], 'gender|gender_quiz'],
      ['📖', ['Read a little every day', 'Lisez un peu chaque jour'], ['Start with short texts with the English shown, then hide it. When you are ready, the long stories are ten pages each — one page a day is perfect.', 'Commencez par des textes courts avec l\'anglais, puis cachez-le. Une page d\'histoire par jour, c\'est parfait.'], 'read|reading'],
      ['❌', ['Mistakes are the point', 'Les erreurs sont utiles'], ['Missed items return sooner and appear in Progress → Common mistakes. Ask the coach what to work on.', 'Les erreurs reviennent plus vite et apparaissent dans les progrès. Demandez au coach.'], 'coach|coach'],
      ['🎯', ['Aim at the exam early', 'Pensez à l\'examen tôt'], ['Try a TEF or TCF mock once a month, even if it feels hard. It shows the format and tells you what to train.', 'Faites un examen blanc par mois, même si c\'est difficile.'], 'exam|exam']
    ]]
  ];
  FR.views.tips = () => '<h1>' + tt('tips') + '</h1><p class="mute">' + tt('tips_sub') + '</p>' + TIPS.map(g => '<h2>' + tt(g[0]) + '</h2><div class="stagger">' +
    g[1].map(t => '<section class="card tip"><span class="tip-i">' + t[0] + '</span><div><h3>' + bi(t[1]) + '</h3><p>' + bi(t[2]) + '</p>' + (t[3] ? '<button class="link" data-act="go" data-to="' + t[3].split('|')[0] + '">' + tt(t[3].split('|')[1]) + ' →</button>' : '') + '</div></section>').join('') + '</div>').join('');
})();
