// Online French classes (Master Mode → Developer options): the questions the teacher opens each class with,
// each in a formal (vous) and an informal (tu) version, with model answers and pronunciation.
(function () {
  const FR = window.FR, { bi, tt, esc } = FR;
  // Each item: { t: topic, m: meaning, f: formal, i: informal, n: note }
  // f / i = [question, question pronunciation, answer, answer in English, answer pronunciation]
  const QA = [
    { t: '👋 Greeting', m: 'Good evening! / Hello!',
      f: ['Bonsoir, monsieur.', 'bon-SWAHR, muh-SYUH', 'Bonsoir, monsieur.', 'Good evening, sir.', 'bon-SWAHR, muh-SYUH'],
      i: ['Salut !', 'sah-LEW', 'Salut ! / Coucou !', 'Hi!', 'sah-LEW / koo-KOO'],
      n: 'Bonsoir from about 6 p.m.; bonjour (bon-ZHOOR) earlier in the day.' },
    { t: '🙂 How are you', m: 'How are you?',
      f: ['Comment allez-vous ?', 'ko-mahn tah-lay VOO', 'Je vais bien, merci. Et vous ?', 'I\'m good, thank you. And you?', 'zhuh vay BYAN, mair-SEE. ay VOO'],
      i: ['Comment ça va ? / Ça va ?', 'ko-mahn sah VAH / sah VAH', 'Ça va bien, merci. Et toi ?', 'I\'m good, thanks. And you?', 'sah vah BYAN, mair-SEE. ay TWAH'] },
    { t: '🪪 Name', m: 'What is your name?',
      f: ['Comment vous appelez-vous ?', 'ko-mahn voo zah-play VOO', 'Je m\'appelle Daniel Limet. Et vous ?', 'My name is Daniel Limet. And you?', 'zhuh mah-PEL dah-NYEL lee-MEH. ay VOO'],
      i: ['Tu t\'appelles comment ?', 'tew tah-PEL ko-MAHN', 'Je m\'appelle Daniel. Et toi ?', 'My name is Daniel. And you?', 'zhuh mah-PEL dah-NYEL. ay TWAH'],
      n: 'Limet in French: lee-MEH (the final t is silent).' },
    { t: '🤝 Nice to meet you', m: 'Nice to meet you!',
      f: ['Enchanté.', 'ahn-shahn-TAY', 'Enchanté également, monsieur Thierry.', 'Nice to meet you too, Mr. Thierry.', 'ahn-shahn-TAY ay-gahl-MAHN, muh-SYUH tyeh-REE'],
      i: ['Enchanté !', 'ahn-shahn-TAY', 'Moi aussi !', 'Me too!', 'mwah oh-SEE'],
      n: 'Also formal: Moi de même, monsieur (mwah duh MEM). A woman writes enchantée.' },
    { t: '📍 Where you live', m: 'Where do you live?',
      f: ['Où habitez-vous ?', 'oo ah-bee-tay VOO', 'J\'habite à Parañaque. Et vous ?', 'I live in Parañaque. And you?', 'zhah-BEET ah pah-rahn-yah-KAY. ay VOO'],
      i: ['Tu habites où ?', 'tew ah-beet OO', 'J\'habite à Parañaque. Et toi ?', 'I live in Parañaque. And you?', 'zhah-BEET ah pah-rahn-yah-KAY. ay TWAH'],
      n: 'J\'habite à + city.' },
    { t: '🌏 Where you are from', m: 'Where are you from?',
      f: ['D\'où venez-vous ?', 'doo vuh-nay VOO', 'Je viens de Parañaque, aux Philippines. Et vous ?', 'I\'m from Parañaque, in the Philippines. And you?', 'zhuh VYAN duh pah-rahn-yah-KAY, oh fee-lee-PEEN. ay VOO'],
      i: ['Tu viens d\'où ?', 'tew vyan DOO', 'Je viens des Philippines. Et toi ?', 'I\'m from the Philippines. And you?', 'zhuh vyan day fee-lee-PEEN. ay TWAH'],
      n: 'Je viens de + city; des Philippines because the country name is plural.' },
    { t: '🎂 Age', m: 'How old are you?',
      f: ['Quel âge avez-vous ?', 'kel AHZH ah-vay VOO', 'J\'ai vingt-sept ans. Et vous ?', 'I am 27 years old. And you?', 'zhay van-seh-TAHN. ay VOO'],
      i: ['Tu as quel âge ?', 'tew ah kel AHZH', 'J\'ai vingt-sept ans. Et toi ?', 'I\'m 27. And you?', 'zhay van-seh-TAHN. ay TWAH'],
      n: 'Age uses avoir: j\'ai 27 ans — never je suis 27.' },
    { t: '✈️ Profession', m: 'What is your job? / What do you do?',
      f: ['Que faites-vous dans la vie ?', 'kuh fet VOO dahn lah VEE', 'Je suis contrôleur aérien depuis presque trois ans. Je travaille dans l\'industrie aéronautique.', 'I have been an air traffic controller for almost 3 years. I work in the aviation industry.', 'zhuh swee kon-troh-LUR ah-ay-RYAN duh-PWEE presk trwah ZAHN. zhuh trah-VY dahn lan-doos-TREE ah-ay-roh-noh-TEEK'],
      i: ['Tu fais quoi dans la vie ?', 'tew fay KWAH dahn lah VEE', 'Je suis contrôleur aérien. Je bosse dans l\'aviation.', 'I\'m an air traffic controller. I work in aviation.', 'zhuh swee kon-troh-LUR ah-ay-RYAN. zhuh BOSS dahn lah-vyah-SYON'],
      n: 'Also formal: Quelle est votre profession ? (kel ay votr proh-feh-SYON). No "un" before a job. Je bosse = casual "I work".' },
    { t: '🏸 Hobbies', m: 'What are your hobbies?',
      f: ['Quels sont vos loisirs ?', 'kel son voh lwah-ZEER', 'Je joue au badminton, et je viens de commencer à jouer au football.', 'I play badminton, and I just started playing football.', 'zhuh ZHOO oh bahd-meen-TON, ay zhuh vyan duh ko-mahn-SAY ah zhoo-AY oh foot-BOL'],
      i: ['Tu fais quoi pendant ton temps libre ?', 'tew fay KWAH pahn-dahn ton tahn LEEBR', 'Je joue au badminton, et depuis peu au foot.', 'I play badminton, and recently soccer.', 'zhuh ZHOO oh bahd-meen-TON, ay duh-pwee PUH oh FOOT'],
      n: 'Also informal: Quels sont tes loisirs ? (kel son tay lwah-ZEER). jouer au + sport. If he says "C\'est génial !", answer "Merci !"' },
    { t: '🎨 Favorite color', m: 'What is your favorite color?',
      f: ['Quelle est votre couleur préférée ?', 'kel ay votr koo-LUR pray-fay-RAY', 'Ma couleur préférée est le bleu. Et vous, monsieur ?', 'My favorite color is blue. And you, sir?', 'mah koo-LUR pray-fay-RAY ay luh BLUH. ay VOO, muh-SYUH'],
      i: ['Quelle est ta couleur préférée ?', 'kel ay tah koo-LUR pray-fay-RAY', 'Ma couleur préférée, c\'est le bleu. Et toi ?', 'My favorite color is blue. And you?', 'mah koo-LUR pray-fay-RAY, say luh BLUH. ay TWAH'],
      n: 'Use "le" before the color: le bleu, le rouge, le vert.' },
    { t: '🎨 Favorite colors (plural)', m: 'What are your favorite colors?',
      f: ['Quelles sont vos couleurs préférées ?', 'kel son voh koo-LUR pray-fay-RAY', 'Mes couleurs préférées sont le bleu et le vert. Et vous ?', 'My favorite colors are blue and green. And you?', 'may koo-LUR pray-fay-RAY son luh BLUH ay luh VAIR. ay VOO'],
      i: ['Quelles sont tes couleurs préférées ?', 'kel son tay koo-LUR pray-fay-RAY', 'J\'aime le bleu et le vert. Et toi ?', 'I like blue and green. And you?', 'zhem luh BLUH ay luh VAIR. ay TWAH'],
      n: 'Plural: quelles sont, vos / tes, mes, préférées. The extra -s is silent.' },
    { t: '🐶 Pets', m: 'Do you have a pet?',
      f: ['Avez-vous un animal de compagnie ?', 'ah-vay VOO uh nah-nee-MAL duh kom-pah-NYEE', 'Oui, j\'ai un chien. / Non, je n\'ai pas d\'animal.', 'Yes, I have a dog. / No, I don\'t have a pet.', 'wee, zhay uh SHYAN / non, zhuh nay pah dah-nee-MAL'],
      i: ['Tu as un animal ?', 'tew ah uh nah-nee-MAL', 'Oui, j\'ai un chien ! / Non, pas d\'animal.', 'Yes, I have a dog! / No, no pets.', 'wee, zhay uh SHYAN / non, pah dah-nee-MAL'],
      n: 'animaux de compagnie = house pets · animaux de la ferme = farm animals · animaux sauvages = wild animals.' }
  ];
  // Phrases to use during class: [formal, informal, English, formal pronunciation, informal pronunciation]
  const HELP = [
    ['Excusez-moi, pouvez-vous répéter, s\'il vous plaît ?', 'Pardon, tu peux répéter ?', 'Excuse me, can you repeat that, please?', 'ex-kew-ZAY mwah, poo-VAY voo ray-pay-TAY, seel voo PLAY', 'par-DON, tew puh ray-pay-TAY'],
    ['Pardon, je n\'ai pas compris.', 'Désolé, j\'ai pas compris.', 'Sorry, I didn\'t understand.', 'par-DON, zhuh nay pah kom-PREE', 'day-zoh-LAY, zhay pah kom-PREE'],
    ['Pouvez-vous parler plus lentement, s\'il vous plaît ?', 'Tu peux parler moins vite ?', 'Can you speak more slowly, please?', 'poo-VAY voo par-LAY plew lahnt-MAHN, seel voo PLAY', 'tew puh par-LAY mwan VEET'],
    ['Comment dit-on … en français ?', 'Comment on dit … en français ?', 'How do you say … in French?', 'ko-MAHN dee-TON … ahn frahn-SAY', 'ko-mahn ton DEE … ahn frahn-SAY'],
    ['Pas encore, monsieur.', 'Pas encore.', 'Not yet.', 'pah zahn-KOR, muh-SYUH', 'pah zahn-KOR'],
    ['D\'accord, monsieur. J\'ai compris.', 'OK, compris !', 'Got it.', 'dah-KOR, muh-SYUH. zhay kom-PREE', 'oh-KAY, kom-PREE'],
    ['Merci infiniment, monsieur.', 'Merci beaucoup !', 'Thank you so much.', 'mair-SEE an-fee-nee-MAHN, muh-SYUH', 'mair-SEE boh-KOO'],
    ['Je vous en prie.', 'De rien !', 'You\'re welcome.', 'zhuh voo zahn PREE', 'duh RYAN'],
    ['À tout à l\'heure, monsieur !', 'À tout à l\'heure ! / À plus !', 'See you later (today)!', 'ah too tah LUR, muh-SYUH', 'ah too tah LUR / ah PLUSS'],
    ['Au revoir, monsieur. À demain !', 'Salut, à demain !', 'Goodbye, see you tomorrow!', 'oh ruh-VWAHR, muh-SYUH. ah duh-MAN', 'sah-LEW, ah duh-MAN']
  ];
  const say = fr => '<button class="btn small" data-act="say" data-text="' + esc(fr.split(' / ')[0]) + '" aria-label="listen">🔊</button>';
  const line = (fr, pr, en) => '<p><b>' + esc(fr) + '</b> ' + say(fr) + '</p>' + (en ? '<p class="small">' + esc(en) + '</p>' : '') + '<p class="mute small">🗣 ' + esc(pr) + '</p>';
  const side = (label, x) => '<div class="qa-side"><h4>' + label + '</h4>' +
    '<p class="mute small">' + bi(['Question', 'Question']) + '</p>' + line(x[0], x[1]) +
    '<p class="mute small">' + bi(['Your answer', 'Votre réponse']) + '</p>' + line(x[2], x[4], x[3]) + '</div>';
  let FORMAL, CASUAL; // labels are built at render time, once settings (and the app language) are loaded
  FR.views.classes = () => (FORMAL = bi(['🎩 Formal (vous)', '🎩 Formel (vous)']), CASUAL = bi(['😊 Informal (tu)', '😊 Familier (tu)']), '') + '<h1>' + bi(['Online French classes', 'Cours de français en ligne']) + '</h1>' +
    '<p class="mute">' + bi(['The questions the teacher opens every class with, in order. Each one has a formal (vous) and an informal (tu) version, with a model answer and pronunciation. Tap 🔊 to hear it.', 'Les questions du début de chaque cours, dans l\'ordre, en version formelle (vous) et familière (tu), avec réponse modèle et prononciation.']) + '</p>' +
    '<h2>' + bi(['Opening questions', 'Questions d\'ouverture']) + '</h2><div class="stagger">' +
    QA.map((q, n) => '<section class="card"><h3>' + (n + 1) + ' · ' + esc(q.t) + '</h3><p class="mute small">' + esc(q.m) + '</p>' +
      side(FORMAL, q.f) + '<hr>' + side(CASUAL, q.i) +
      (q.n ? '<p class="hint">💡 ' + esc(q.n) + '</p>' : '') + '</section>').join('') + '</div>' +
    '<h2>' + bi(['Useful in class', 'Utile en classe']) + '</h2><div class="stagger">' +
    HELP.map(h => '<section class="card"><p class="mute small">' + esc(h[2]) + '</p>' +
      '<div class="qa-side"><h4>' + FORMAL + '</h4>' + line(h[0], h[3]) + '</div><hr>' +
      '<div class="qa-side"><h4>' + CASUAL + '</h4>' + line(h[1], h[4]) + '</div></section>').join('') + '</div>' +
    '<div class="col"><button class="btn" data-act="go" data-to="learn">← ' + tt('lessons') + '</button></div>';
})();
