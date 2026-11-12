// TEF / TCF section: format facts, tips, and a short timed mock exam for each.
// Mock items are original practice material written for this app, not real exam questions.
(function () {
  const FR = window.FR, E = FR.engine, { esc, bi, tt } = FR;
  const S = () => FR.state, V = FR.views, A = FR.act, AF = FR.after;

  // MCQ item: a = audio script (listening), p = text to read, q = question, o = options, c = index of the right one, l = level.
  // Open task: open = 'write' | 'speak', q = instructions, min = minimum words, checks = self-assessment list, model = sample answer.
  const X = FR.EXAMS = {
    tcf: {
      name: 'TCF', full: 'Test de connaissance du français', by: 'France Éducation international',
      facts: [
        ['Compulsory part', '3 multiple-choice sections: listening (29 questions, 25 min), language structures (18 questions, 15 min), reading (29 questions, 45 min) — about 1 h 25 in total.'],
        ['Optional part', 'Writing (3 tasks, 60 min) and speaking (3 tasks, 12 min, face to face with an examiner).'],
        ['Questions', '4 options, a single correct answer. Difficulty rises steadily from A1 to C2 inside each section.'],
        ['Result', 'A score per skill placed on the CEFR scale (A1–C2). The certificate is valid for 2 years.'],
        ['Versions', 'TCF Tout public, TCF Canada, TCF Québec and TCF IRN (French residency / nationality) differ in which sections they include and how many questions. Check which one your application needs.']],
      tips: [
        'Questions get harder as you go. For a B1 target, the first two thirds of each section are where your points are — answer them carefully, and don\'t let the last C1–C2 questions eat your time.',
        'Never leave a question blank: pick the most plausible option and move on.',
        'Listening: each recording is played once only. Use the pause before it to read the question and the four options, so you know what to listen for.',
        'Language structures gives you well under a minute per question. If you don\'t see the answer in 30 seconds, guess, mark it mentally, and keep moving.',
        'Reading: read the question first, then scan the text for the answer. The early texts are signs, ads and short messages — the answer is usually one detail (a day, a price, a condition).',
        'Wrong options are often true-sounding statements that the text simply doesn\'t say. Choose what is written, not what is likely.',
        'Writing (if you take it): task 1 is a short message (60–120 words), task 2 an article or letter (120–150 words), task 3 compares two points of view (120–180 words). Respect the word ranges.',
        'Speaking (if you take it): task 1 is a guided interview about you, task 2 an interaction where YOU ask the questions, task 3 an opinion to defend. Prepare question starters: "Est-ce que… ?", "Pourriez-vous me dire… ?", "À quelle heure… ?".'],
      min: 20,
      mock: [
        { t: ['Listening', 'Compréhension orale'], items: [
          { l: 'A1', a: 'Bonjour, je voudrais deux croissants et une baguette, s\'il vous plaît.', q: 'Où se passe cette scène ?', o: ['Dans une pharmacie', 'Dans une boulangerie', 'Dans une gare', 'Dans une banque'], c: 1 },
          { l: 'A1', a: 'Le train à destination de Lyon partira du quai numéro cinq à quatorze heures trente.', q: 'À quelle heure part le train ?', o: ['À 4 h 30', 'À 15 h 05', 'À 14 h 30', 'À 14 h 05'], c: 2 },
          { l: 'A2', a: 'Salut Julie, c\'est Marc. Je ne peux pas venir au cinéma ce soir, je dois travailler tard. On se voit samedi ?', q: 'Pourquoi Marc appelle-t-il ?', o: ['Pour annuler une sortie', 'Pour inviter Julie au cinéma', 'Pour demander du travail', 'Pour acheter des billets'], c: 0 },
          { l: 'A2', a: 'Mesdames et messieurs, en raison de travaux, le magasin fermera exceptionnellement à dix-huit heures aujourd\'hui.', q: 'Qu\'apprend-on dans cette annonce ?', o: ['Le magasin sera fermé demain', 'Le magasin ouvre un nouveau rayon', 'Les prix vont baisser', 'Le magasin ferme plus tôt que d\'habitude'], c: 3 },
          { l: 'B1', a: 'Selon une enquête récente, de plus en plus de jeunes préfèrent louer un appartement à plusieurs, non seulement pour payer moins cher, mais aussi pour ne pas vivre seuls.', q: 'Selon l\'enquête, pourquoi les jeunes choisissent-ils la colocation ?', o: ['Uniquement pour faire des économies', 'Pour des raisons à la fois économiques et sociales', 'Parce que les appartements sont trop grands', 'Pour habiter plus près de leur travail'], c: 1 },
          { l: 'B2', a: 'Si la plupart des experts saluent cette réforme, certains craignent toutefois qu\'elle ne profite qu\'aux grandes entreprises, au détriment des petits commerces.', q: 'Quelle est l\'attitude de certains experts ?', o: ['Ils soutiennent totalement la réforme', 'Ils refusent de la commenter', 'Ils expriment des réserves', 'Ils demandent qu\'elle soit appliquée plus vite'], c: 2 }] },
        { t: ['Language structures', 'Maîtrise des structures de la langue'], items: [
          { l: 'A1', q: 'Je ___ français et anglais.', o: ['parles', 'parle', 'parlons', 'parlent'], c: 1 },
          { l: 'A1', q: 'Elle habite ___ Paris.', o: ['en', 'au', 'à', 'dans'], c: 2 },
          { l: 'A2', q: 'Hier, nous ___ au restaurant.', o: ['sommes allés', 'avons allé', 'allons', 'irons'], c: 0 },
          { l: 'A2', q: 'Je n\'ai pas ___ argent sur moi.', o: ['du', 'de l\'', 'des', 'd\''], c: 3 },
          { l: 'B1', q: 'Si j\'avais plus de temps, je ___ davantage.', o: ['voyagerai', 'voyagerais', 'voyageais', 'voyage'], c: 1 },
          { l: 'B2', q: 'Bien qu\'il ___ très tard, elle a continué à travailler.', o: ['est', 'était', 'soit', 'sera'], c: 2 }] },
        { t: ['Reading', 'Compréhension écrite'], items: [
          { l: 'A1', p: 'Fermé le lundi. Ouvert du mardi au samedi, de 9 h à 19 h.', q: 'Quand peut-on venir ?', o: ['Le lundi à 10 h', 'Le dimanche à 15 h', 'Le samedi à 20 h', 'Le mercredi à 10 h'], c: 3 },
          { l: 'A1', p: 'Chère Emma, je suis en vacances à Nice. Il fait très beau et je vais à la plage tous les jours. Bises, Léo', q: 'Que fait Léo ?', o: ['Il passe ses vacances au bord de la mer', 'Il travaille à Nice', 'Il invite Emma chez lui', 'Il se plaint du mauvais temps'], c: 0 },
          { l: 'A2', p: 'À louer : studio meublé, 25 m², proche université. 520 € par mois, charges comprises. Libre le 1er septembre. Animaux non acceptés.', q: 'Quelle information est correcte ?', o: ['On peut venir avec un chat', 'Les charges sont incluses dans le prix', 'Le studio est vide, sans meubles', 'Le studio est disponible immédiatement'], c: 1 },
          { l: 'A2', p: 'Madame, je vous informe que votre colis n\'a pas pu être livré ce matin en raison de votre absence. Vous pouvez le retirer au bureau de poste à partir de demain, munie d\'une pièce d\'identité.', q: 'Que doit faire la destinataire ?', o: ['Attendre une nouvelle livraison', 'Payer des frais supplémentaires', 'Aller chercher son colis à la poste', 'Renvoyer le colis'], c: 2 },
          { l: 'B1', p: 'Longtemps considéré comme un simple loisir, le jeu vidéo est désormais étudié à l\'université. Des chercheurs s\'intéressent à ses effets sur la mémoire et la concentration, tandis que des enseignants l\'utilisent pour motiver leurs élèves.', q: 'Quelle est l\'idée principale du texte ?', o: ['Le jeu vidéo est dangereux pour la mémoire', 'Les enseignants interdisent les jeux vidéo', 'Le jeu vidéo est devenu un objet d\'étude sérieux', 'Les universités vendent des jeux vidéo'], c: 2 },
          { l: 'B2', p: 'Le succès des circuits courts ne s\'explique pas uniquement par le souci de l\'environnement. Pour de nombreux consommateurs, acheter directement au producteur, c\'est aussi retrouver un lien de confiance que la grande distribution avait fini par rompre.', q: 'D\'après l\'auteur, que recherchent surtout ces consommateurs ?', o: ['Une relation de confiance', 'Des prix plus bas', 'Des produits exotiques', 'Un gain de temps'], c: 0 }] },
        { t: ['Writing & speaking (optional papers)', 'Expression écrite et orale (épreuves facultatives)'], items: [
          { open: 'write', min: 60, q: 'Tâche 1 — Écrivez un message à un ami pour l\'inviter à votre anniversaire. Précisez la date, le lieu et ce que vous allez faire. (60 à 120 mots)',
            checks: ['Greeting and sign-off suited to a friend (Salut…, À bientôt, Bises)', 'Date, place and activities are all there', 'Uses tu consistently', '60–120 words'],
            model: 'Salut Thomas ! J\'espère que tu vas bien. Je t\'écris parce que je fête mon anniversaire samedi 14 juin et j\'aimerais beaucoup que tu viennes. La fête aura lieu chez moi, à partir de 19 heures. On va dîner dans le jardin, puis on écoutera de la musique et on dansera. Tu peux venir avec ta copine si tu veux. Est-ce que tu peux apporter une boisson ? Dis-moi vite si tu es libre ! À bientôt, Camille' },
          { open: 'speak', q: 'Tâche 2 — Interaction (préparation : 2 minutes). Vous voulez vous inscrire à un cours de français dans une école de langues. Posez des questions à l\'examinateur pour obtenir des informations (horaires, prix, niveau, inscription…).',
            checks: ['You say vous throughout', 'At least 6–8 different questions', 'A polite opening and closing', 'You vary the question forms (est-ce que, inversion, question words)'],
            model: 'Bonjour madame, je voudrais des renseignements sur vos cours de français. Quels sont les horaires des cours ? Combien coûte un trimestre ? Y a-t-il un test de niveau avant l\'inscription ? Combien d\'étudiants y a-t-il par classe ? Est-ce que le matériel est compris dans le prix ? Proposez-vous des cours du soir ? Comment peut-on s\'inscrire ? Je vous remercie, au revoir.' }] }]
    },
    tef: {
      name: 'TEF', full: 'Test d\'évaluation de français', by: 'CCI Paris Île-de-France',
      facts: [
        ['Reading', 'Compréhension écrite: 40 multiple-choice questions in 60 minutes.'],
        ['Listening', 'Compréhension orale: 40 multiple-choice questions in 40 minutes.'],
        ['Writing', 'Expression écrite, 60 min, 2 tasks: (A) continue a news story, 80 words minimum; (B) a letter giving and defending your opinion, 200 words minimum.'],
        ['Speaking', 'Expression orale, 15 min, 2 role-plays with an examiner: (A) formal — ask questions to get information, about 5 min; (B) informal — convince a friend, about 10 min.'],
        ['Result', 'A score per module mapped to CEFR levels (and to CLB/NCLC levels for Canada). Valid for 2 years.'],
        ['Versions', 'TEF Canada, TEFAQ (Québec), TEF IRN (France) and others combine these modules differently, and the test is taken on a computer. Check which version your application needs.']],
      tips: [
        'Reading and listening both move from everyday documents (signs, ads, voicemail) to press articles and debates. For B1, make sure of the everyday documents first.',
        'Answer every question — an educated guess always beats a blank.',
        'Listening: most recordings are heard once. Read the question while the instructions play, and note numbers, times and names as you hear them.',
        'Writing A (news story): stay in the past — passé composé for events, imparfait for the setting — and give the story a clear ending. Connectors earn marks: soudain, ensuite, finalement.',
        'Writing B (opinion letter): state your position in the first lines, give three arguments each with an example, and close politely. Useful frame: Tout d\'abord… De plus… Enfin… C\'est pourquoi…',
        'Count your words. Falling under the minimum (80 and 200) costs you; plan roughly 25 minutes for A and 35 for B.',
        'Speaking A is formal: use vous, and prepare a bank of ten question types — price, schedule, location, conditions, duration, registration, what is included.',
        'Speaking B is informal: use tu, sound natural, and answer objections ("C\'est trop cher" → "Oui, mais…"). The examiner will resist on purpose; keep arguing.',
        'The Everyday French section of this app trains exactly the formal / informal switch that speaking A and B test.'],
      min: 20,
      mock: [
        { t: ['Reading', 'Compréhension écrite'], items: [
          { l: 'A1', p: 'Défense de fumer dans l\'établissement.', q: 'Que signifie ce panneau ?', o: ['On vend des cigarettes ici', 'Il est interdit de fumer ici', 'Il y a un espace pour les fumeurs', 'L\'établissement est fermé'], c: 1 },
          { l: 'A2', p: 'Offre d\'emploi : restaurant cherche serveur ou serveuse pour l\'été. Expérience souhaitée. Travail le soir et le week-end. Envoyer CV par courriel.', q: 'Ce poste demande de…', o: ['travailler le matin', 'téléphoner au restaurant', 'avoir un diplôme', 'travailler en soirée'], c: 3 },
          { l: 'A2', p: 'Suite à la grève des transports, aucun bus ne circulera demain. Le métro fonctionnera normalement.', q: 'Demain, on pourra…', o: ['prendre le métro', 'prendre le bus', 'prendre le bus et le métro', 'ne prendre aucun transport'], c: 0 },
          { l: 'B1', p: 'Je vous écris pour vous faire part de mon mécontentement. La machine à laver que j\'ai achetée dans votre magasin il y a deux semaines est déjà en panne. Je vous demande donc de la remplacer ou de me rembourser.', q: 'Quel est le but de cette lettre ?', o: ['Remercier le magasin', 'Commander un appareil', 'Faire une réclamation', 'Demander un emploi'], c: 2 },
          { l: 'B1', p: 'Contrairement à une idée reçue, les Français ne lisent pas moins qu\'avant : ils lisent autrement. Les ventes de livres numériques et audio progressent, alors que celles des livres de poche reculent légèrement.', q: 'Selon le texte…', o: ['les Français ne lisent plus', 'les habitudes de lecture ont changé', 'les livres de poche se vendent de mieux en mieux', 'le livre numérique disparaît'], c: 1 },
          { l: 'B2', p: 'Loin de faire l\'unanimité, le projet de piétonnisation du centre-ville divise : si les riverains y voient la promesse d\'un quartier apaisé, les commerçants redoutent, eux, une baisse de leur fréquentation.', q: 'Face à ce projet, les commerçants sont…', o: ['enthousiastes', 'indifférents', 'à l\'origine de l\'idée', 'inquiets'], c: 3 }] },
        { t: ['Listening', 'Compréhension orale'], items: [
          { l: 'A1', a: 'Bonjour, vous êtes bien sur le répondeur du docteur Leroy. Le cabinet est ouvert du lundi au vendredi, de neuf heures à midi.', q: 'Quand le cabinet est-il ouvert ?', o: ['Le samedi', 'En semaine, le matin', 'Tous les après-midi', 'Tous les jours'], c: 1 },
          { l: 'A1', a: 'Pour aller à la poste ? C\'est facile : prenez la première rue à droite, c\'est juste en face de la banque.', q: 'Où se trouve la poste ?', o: ['En face de la banque', 'À côté de la gare', 'À gauche de la banque', 'Derrière l\'école'], c: 0 },
          { l: 'A2', a: 'Flash météo : nuages et pluie sur la moitié nord ce matin ; le soleil reviendra dans l\'après-midi. Dans le sud, grand soleil toute la journée.', q: 'Quel temps fera-t-il dans le nord cet après-midi ?', o: ['Il pleuvra', 'Il neigera', 'Il y aura du soleil', 'Il y aura de l\'orage'], c: 2 },
          { l: 'A2', a: 'Allô, maman ? J\'ai raté mon bus, je vais arriver en retard pour le dîner. Commencez sans moi !', q: 'Quel est le problème ?', o: ['La personne a perdu ses clés', 'La personne est malade', 'La personne n\'a pas faim', 'La personne sera en retard'], c: 3 },
          { l: 'B1', a: 'Moi, je trouve que le télétravail a du bon : je gagne deux heures par jour. Mais franchement, mes collègues me manquent, et à la maison j\'ai du mal à m\'arrêter de travailler.', q: 'Quelle est l\'opinion de cette personne sur le télétravail ?', o: ['Elle y est totalement favorable', 'Elle est partagée', 'Elle y est totalement opposée', 'Elle n\'a pas d\'avis'], c: 1 },
          { l: 'B2', a: 'On nous répète que la technologie va résoudre la crise climatique. Permettez-moi d\'en douter : sans changement profond de nos modes de vie, aucune innovation ne suffira.', q: 'Que pense le locuteur ?', o: ['La technologie seule ne suffira pas', 'La technologie résoudra tout', 'Il faut arrêter d\'innover', 'La crise climatique n\'existe pas'], c: 0 }] },
        { t: ['Writing', 'Expression écrite'], items: [
          { open: 'write', min: 80, q: 'Section A — Voici le début d\'un article de presse. Écrivez la suite (80 mots minimum) : « Hier soir, un habitant de Lille a eu une drôle de surprise en rentrant chez lui… »',
            checks: ['The story follows on logically from the first sentence', 'Events in the passé composé, background in the imparfait', 'At least three connectors (soudain, alors, ensuite, finalement…)', 'A clear ending', '80 words or more'],
            model: 'En ouvrant la porte, il a entendu du bruit dans la cuisine. Il pensait que c\'était un voleur, alors il a appelé la police. Quand les agents sont arrivés, ils ont découvert… un petit renard, qui mangeait tranquillement le pain posé sur la table ! L\'animal était entré par la fenêtre, que l\'habitant avait oublié de fermer le matin. Finalement, les pompiers ont attrapé le renard et l\'ont relâché dans un parc voisin. « Je fermerai toujours ma fenêtre maintenant », a déclaré l\'homme en riant.' },
          { open: 'write', min: 200, q: 'Section B — Vous avez lu cette affirmation dans un journal : « Les voitures devraient être interdites dans les centres-villes. » Écrivez une lettre au journal pour donner votre opinion, avec au moins trois arguments (200 mots minimum).',
            checks: ['Opening and closing formulas (Madame, Monsieur… / Je vous prie d\'agréer…)', 'Your opinion is stated in the first paragraph', 'Three arguments, each with an example', 'Connectors: tout d\'abord, de plus, cependant, en conclusion', '200 words or more'],
            model: 'Madame, Monsieur, J\'ai lu avec intérêt votre article sur l\'interdiction des voitures dans les centres-villes et je souhaite vous donner mon avis. Je suis plutôt favorable à cette idée. Tout d\'abord, la qualité de l\'air serait meilleure : dans les villes qui ont limité la circulation, la pollution a nettement diminué. De plus, les rues deviendraient plus sûres et plus agréables pour les piétons, les enfants et les cyclistes. Enfin, les commerces y gagneraient, car on s\'arrête plus facilement devant une vitrine quand on marche. Cependant, il faut penser aux personnes âgées ou handicapées, et aux habitants qui ont besoin de leur voiture. C\'est pourquoi je propose d\'améliorer d\'abord les transports en commun et de créer des parkings à l\'entrée de la ville. En conclusion, cette mesure me semble positive, à condition d\'être bien préparée. Je vous prie d\'agréer, Madame, Monsieur, mes salutations distinguées.' }] },
        { t: ['Speaking', 'Expression orale'], items: [
          { open: 'speak', q: 'Section A (5 minutes, registre formel) — Vous avez lu cette annonce : « Cours de cuisine française pour débutants, le samedi. » Vous téléphonez pour obtenir des informations. Posez une dizaine de questions.',
            checks: ['Vous throughout, with a greeting and thanks', 'About ten questions', 'Different topics: price, times, place, level, equipment, group size, registration', 'You react to answers instead of reading a list'],
            model: 'Bonjour, je vous appelle au sujet de votre annonce. À quelle heure commencent les cours ? Combien de temps dure une séance ? Quel est le prix ? Faut-il apporter du matériel ? Où ont lieu les cours ? Combien de personnes y a-t-il par groupe ? Faut-il avoir déjà cuisiné ? Est-ce qu\'on mange les plats à la fin ? Comment peut-on s\'inscrire ? Peut-on payer en plusieurs fois ? Très bien, je vous remercie. Au revoir.' },
          { open: 'speak', q: 'Section B (10 minutes, registre informel) — Vous voulez convaincre un ami de s\'inscrire avec vous dans une salle de sport. Il hésite : c\'est cher et il n\'a pas le temps. Présentez vos arguments et répondez à ses objections.',
            checks: ['Tu throughout, natural spoken tone', 'At least three different arguments', 'You answer each objection (price, time, motivation)', 'You keep the conversation going and conclude with a concrete proposal'],
            model: 'Écoute, j\'ai trouvé une salle de sport super près de chez toi, on devrait s\'inscrire ensemble ! Je sais, tu trouves ça cher, mais il y a une offre à vingt euros par mois, c\'est le prix de deux cafés par semaine. Et pour le temps : on peut y aller le midi, quarante-cinq minutes, ça suffit. Franchement, à deux, c\'est plus motivant. En plus, tu me disais que tu dormais mal : le sport, ça aide. Allez, on essaie la séance gratuite samedi, et tu décides après ?' }] }]
    }
  };

  const flat = ex => ex.mock.flatMap(sec => sec.items.map(it => Object.assign({ sec: sec.t }, it)));
  const clock = ms => { const s = Math.max(0, Math.round(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const band = p => p < 35 ? 'A1' : p < 55 ? 'A2' : p < 75 ? 'B1' : p < 90 ? 'B2' : 'B2+';
  const words = s => (String(s || '').trim().match(/\S+/g) || []).length;
  let timer = 0;

  V.exam = p => {
    const s = S(), cur = s.exam && X[s.exam.id];
    if (p === 'run' && cur) return run(cur);
    if (p === 'result' && s.examLast) return result();
    return '<h1>' + tt('exam') + '</h1><p class="mute">' + tt('exam_sub') + '</p>' + Object.keys(X).map(id => {
      const ex = X[id], past = s.exams.filter(e => e.id === id).slice(0, 3), n = flat(ex).length;
      return '<section class="card"><div class="ch-h"><div><small class="eyebrow">' + esc(ex.by) + '</small><h3>' + ex.name + ' <span class="mute" lang="fr">· ' + esc(ex.full) + '</span></h3></div><span class="badge">🎓</span></div>' +
        '<details><summary>' + tt('x_format') + '</summary>' + ex.facts.map(f => '<div class="pt"><b>' + esc(f[0]) + '</b><span>' + esc(f[1]) + '</span></div>').join('') + '</details>' +
        '<details><summary>' + tt('x_tips') + ' (' + ex.tips.length + ')</summary><ol class="tips">' + ex.tips.map(x => '<li>' + esc(x) + '</li>').join('') + '</ol></details>' +
        '<p class="mute small">' + tt('x_mock_d', { n, m: ex.min }) + '</p>' +
        (past.length ? '<p class="mute small">' + tt('x_past') + ' ' + past.map(e => Math.round(e.r / e.n * 100) + '%').join(' · ') + '</p>' : '') +
        '<button class="btn primary" data-act="xstart" data-id="' + id + '">' + tt(s.exam && s.exam.id === id ? 'resume' : 'x_start') + '</button></section>';
    }).join('') + '<p class="hint">' + tt('x_official') + '</p>';
  };

  function run(ex) {
    const st = S().exam, items = flat(ex), it = items[st.i], n = items.length, last = st.i === n - 1;
    let h = '<div class="sess-h"><button class="x" data-act="go" data-to="exam">✕</button><div class="bar"><i style="width:' + Math.round((st.i + 1) / n * 100) + '%"></i></div><small id="xclock" class="clock">' + clock(st.left) + '</small></div>' +
      '<small class="eyebrow">' + ex.name + ' · ' + bi(it.sec) + ' · ' + (st.i + 1) + '/' + n + '</small><div class="qcard">';
    if (it.open) {
      h += '<p lang="fr" class="xq">' + esc(it.q) + '</p>';
      if (it.open === 'write') h += '<textarea id="xtxt" class="search" rows="9" lang="fr" placeholder="…">' + esc(st.txt[st.i] || '') + '</textarea><small class="mute" id="xwc">' + words(st.txt[st.i]) + ' / ' + it.min + ' ' + tt('x_words') + '</small>';
      else h += '<p class="note">🎙 ' + tt('x_speak_note') + '</p>';
    } else {
      if (it.a) h += FR.canSpeak() ? '<button class="btn" data-act="xplay">▶ ' + tt('x_listen') + ' <small>(' + (2 - (st.plays[st.i] || 0)) + ')</small></button><p class="hint">' + tt('x_plays') + '</p>' : '<blockquote lang="fr">' + esc(it.a) + '</blockquote><p class="hint">' + tt('x_noaudio') + '</p>';
      if (it.p) h += '<blockquote lang="fr">' + esc(it.p) + '</blockquote>';
      h += '<p lang="fr" class="xq">' + esc(it.q) + '</p><div class="opts">' + it.o.map((o, i) => '<button class="opt' + (st.ans[st.i] === i ? ' sel' : '') + '" data-act="xpick" data-i="' + i + '"><span lang="fr">' + esc(o) + '</span></button>').join('') + '</div>';
    }
    return h + '</div><div class="row spread">' + (st.i ? '<button class="btn" data-act="xnav" data-d="-1">← ' + tt('x_prev') + '</button>' : '<span></span>') +
      (last ? '<button class="btn primary" data-act="xfinish">' + tt('x_finish') + '</button>' : '<button class="btn primary" data-act="xnav" data-d="1">' + tt('x_next') + ' →</button>') + '</div>';
  }

  function result() {
    const R = S().examLast, ex = X[R.id], items = flat(ex), p = Math.round(R.r / R.n * 100);
    return back() + '<div class="center result"><small class="eyebrow">' + ex.name + ' · ' + tt('x_result') + '</small><div class="ring" style="--p:' + p + '"><b>' + p + '%</b></div><p>' + tt('res_line', { r: R.r, n: R.n }) + '</p><p><span class="badge big">' + tt('x_band') + ' ' + band(p) + '</span></p><p class="mute small">' + tt('x_disclaimer') + '</p></div>' +
      '<section class="card">' + R.secs.filter(x => x.n).map(x => '<div class="pt"><b>' + bi(x.t) + '</b><span>' + x.r + '/' + x.n + '</span></div><div class="bar thin"><i style="width:' + Math.round(x.r / x.n * 100) + '%"></i></div>').join('') + '</section>' +
      items.map((it, i) => {
        if (it.open) return '<section class="card"><small class="eyebrow">' + bi(it.sec) + '</small><p lang="fr" class="xq">' + esc(it.q) + '</p>' + (R.txt[i] ? '<blockquote lang="fr">' + esc(R.txt[i]) + '</blockquote><p class="mute small">' + words(R.txt[i]) + ' ' + tt('x_words') + '</p>' : '') +
          '<h4>' + tt('x_check') + '</h4><ul class="tips">' + it.checks.map(c => '<li>' + esc(c) + '</li>').join('') + '</ul><details><summary>' + tt('x_model') + '</summary><p lang="fr">' + esc(it.model) + '</p><button class="mini" data-act="say" data-text="' + esc(it.model) + '">🔊</button></details></section>';
        const a = R.ans[i], ok = a === it.c;
        return '<section class="card xr ' + (ok ? 'ok' : 'bad') + '"><small class="eyebrow">' + (ok ? '✓' : '✗') + ' ' + bi(it.sec) + ' · ' + it.l + '</small>' + (it.a ? '<blockquote lang="fr">' + esc(it.a) + ' <button class="mini" data-act="say" data-text="' + esc(it.a) + '">🔊</button></blockquote>' : '') + (it.p ? '<blockquote lang="fr">' + esc(it.p) + '</blockquote>' : '') +
          '<p lang="fr" class="xq">' + esc(it.q) + '</p>' + (ok ? '' : '<p class="mute">' + tt('x_your') + ' <span lang="fr">' + (a == null ? '—' : esc(it.o[a])) + '</span></p>') + '<p>' + tt('x_correct') + ' <b lang="fr">' + esc(it.o[it.c]) + '</b></p></section>';
      }).join('');
  }
  const back = () => '<button class="back" data-act="go" data-to="exam">← ' + tt('exam') + '</button>';

  A.xstart = d => {
    const s = S();
    if (!s.exam || s.exam.id !== d.id) s.exam = { id: d.id, i: 0, ans: {}, txt: {}, plays: {}, left: X[d.id].min * 60000 };
    FR.save(); FR.go('exam/run');
  };
  A.xpick = d => { const st = S().exam; if (!st) return; st.ans[st.i] = +d.i; FR.save(); FR.refresh(); };
  A.xnav = d => { const st = S().exam; if (!st) return; st.i = Math.max(0, Math.min(flat(X[st.id]).length - 1, st.i + +d.d)); FR.save(); FR.refresh(true); };
  A.xplay = () => { const st = S().exam, it = flat(X[st.id])[st.i]; if ((st.plays[st.i] || 0) >= 2) { FR.toast(tt('x_noplays')); return; } st.plays[st.i] = (st.plays[st.i] || 0) + 1; FR.save(); FR.refresh(); FR.speak(it.a); };
  A.xfinish = (d, el) => {
    if (el && !el.dataset.sure) { el.dataset.sure = 1; el.innerHTML = tt('tap_again'); return; }
    const s = S(), st = s.exam; if (!st) return;
    const ex = X[st.id], items = flat(ex); let r = 0, n = 0;
    const secs = ex.mock.map(sec => ({ t: sec.t, r: 0, n: 0 }));
    let k = 0;
    ex.mock.forEach((sec, si) => sec.items.forEach(it => { if (!it.open) { n++; secs[si].n++; if (st.ans[k] === it.c) { r++; secs[si].r++; } } k++; }));
    s.examLast = { id: st.id, t: Date.now(), r, n, secs, ans: st.ans, txt: st.txt };
    s.exams.unshift({ id: st.id, t: Date.now(), r, n }); s.exam = null;
    clearInterval(timer); if (FR.canSpeak()) speechSynthesis.cancel();
    FR.go('exam/result');
    E.reward(30 + r * 3, { k: 'exam', ti: [ex.name + ' mock exam', 'Examen blanc ' + ex.name], r, n });
  };
  AF.exam = p => {
    clearInterval(timer);
    if (p !== 'run' || !S().exam) return;
    const ta = document.getElementById('xtxt');
    if (ta) ta.addEventListener('input', () => { const st = S().exam; st.txt[st.i] = ta.value; document.getElementById('xwc').firstChild.textContent = words(ta.value) + ' / ' + flat(X[st.id])[st.i].min + ' '; FR.save(); });
    timer = setInterval(() => {
      const st = S().exam;
      if (!st || document.body.dataset.r !== 'exam' || location.hash.indexOf('exam/run') < 0) { clearInterval(timer); return; }
      st.left -= 1000;
      const c = document.getElementById('xclock'); if (c) { c.textContent = clock(st.left); c.classList.toggle('low', st.left < 120000); }
      if (st.left % 5000 < 1000) FR.save();
      if (st.left <= 0) { FR.toast(tt('x_time_up')); A.xfinish(); }
    }, 1000);
  };
})();
