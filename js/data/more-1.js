window.FR = window.FR || {};
// More practice added to existing lessons: describing people (family, cousins, friends), everyday verbs in the
// present, past and future, two verb rules, and the days / months / parts of the day for Basics → Time.
// New questions are appended after the old ones, so saved progress on earlier questions keeps its place.
(function () {
  const MORE = {
    etre: {
      g: [['Ma grand-mère est ___ et mon grand-père est grand.', ['petit', 'petite', 'petits'], 1, 'Grand-mère is feminine: petite.'],
          ['Mes cousins sont ___.', ['grand', 'grande', 'grands'], 2, 'Cousins is masculine plural: grands.'],
          ['Mon amie Léa est très ___.', ['gentil', 'gentille', 'gentils'], 1, 'The feminine of gentil doubles the l: gentille.'],
          ['Mon père ___ grand et ma mère est petite.', ['est', 'es', 'sont'], 0, 'One person (il): mon père est.'],
          ['Mes parents ___ jeunes.', ['est', 'sommes', 'sont'], 2, 'Several people (ils): mes parents sont.'],
          ['Ma cousine est ___ et mon cousin est blond.', ['brun', 'brune', 'bruns'], 1, 'Cousine is feminine: brune.'],
          ['Mon ami Marc est ___.', ['sportif', 'sportive', 'sportives'], 0, 'Marc is a man: sportif (a woman: sportive).'],
          ['Ma tante est ___.', ['heureux', 'heureuse', 'heureuses'], 1, '-eux becomes -euse in the feminine.'],
          ['Mes amies sont ___.', ['content', 'contentes', 'contents'], 1, 'Amies is feminine plural: add -es.'],
          ['Nous ___ fatigués.', ['sont', 'êtes', 'sommes'], 2, 'nous sommes.']],
      s: [['Ma grand-mère est petite et mon grand-père est grand.', 'My grandmother is short and my grandfather is tall.'],
          ['Mon cousin est grand et ma cousine est petite.', 'My (male) cousin is tall and my (female) cousin is short.'],
          ['Mes parents sont jeunes et mes grands-parents sont vieux.', 'My parents are young and my grandparents are old.'],
          ['Mon amie est brune et mon ami est blond.', 'My (female) friend has dark hair and my (male) friend is blond.'],
          ['Ma mère est gentille et mon père est drôle.', 'My mother is kind and my father is funny.'],
          ['Mon oncle est grand mais ma tante est petite.', 'My uncle is tall but my aunt is short.']]
    },
    verbes: {
      g: [['Elle ___ du gâteau.', ['mange', 'manges', 'mangent'], 0, 'elle mange: the same -e ending as je mange.'],
          ['Mon frère ___ du lait.', ['boit', 'bois', 'boivent'], 0, 'Boire is irregular: il boit.'],
          ['Mes grands-parents ___ la télé le soir.', ['regarde', 'regardons', 'regardent'], 2, 'ils regardent (the -ent is silent).'],
          ['Ma cousine ___ très bien.', ['chante', 'chantes', 'chantent'], 0, 'elle chante.'],
          ['Nous ___ au parc avec nos amis.', ['jouez', 'jouons', 'jouent'], 1, 'nous jouons.'],
          ['Mon père ___ le journal.', ['lit', 'lis', 'lisent'], 0, 'Lire is irregular: il lit.'],
          ['Vous ___ ce mot comment ?', ['prononcez', 'prononçons', 'prononce'], 0, 'vous prononcez.'],
          ['Les enfants ___ dans la piscine.', ['nage', 'nagez', 'nagent'], 2, 'ils nagent.'],
          ['Ma mère ___ le dîner.', ['prépare', 'prépares', 'préparent'], 0, 'elle prépare.'],
          ['Je ___ mon travail à cinq heures.', ['finis', 'finit', 'finissons'], 0, 'Finir: je finis.'],
          ['Mon ami ___ une lettre.', ['écrit', 'écris', 'écrivent'], 0, 'Écrire: il écrit.'],
          ['Je veux ___ le r français.', ['prononcer', 'prononce', 'prononcé'], 0, 'After another verb (veux), keep the infinitive.']],
      s: [['Elle mange du gâteau avec ses amis.', 'She is eating cake with her friends.'],
          ['Mon grand-père lit le journal le matin.', 'My grandfather reads the newspaper in the morning.'],
          ['Mes cousins jouent au football le samedi.', 'My cousins play football on Saturdays.'],
          ['Ma sœur et moi regardons un film.', 'My sister and I are watching a film.']]
    },
    pcavoir: {
      g: [['Hier, elle ___ du gâteau.', ['a mangé', 'est mangé', 'mange'], 0, 'Passé composé with avoir: elle a mangé.'],
          ['Mes parents ___ un film hier soir.', ['ont regardé', 'sont regardés', 'regardent'], 0, 'avoir + regardé.'],
          ['Ma cousine ___ une lettre à sa grand-mère.', ['a écrit', 'a écrire', 'est écrit'], 0, 'The past participle of écrire is écrit.'],
          ['Nous ___ au restaurant samedi.', ['avons mangé', 'sommes mangés', 'mangeons'], 0, 'nous avons mangé.'],
          ['Mon ami ___ son examen.', ['a fini', 'a finu', 'est fini'], 0, 'Finir → fini.'],
          ['J\'___ mon cousin la semaine dernière.', ['ai vu', 'ai voir', 'suis vu'], 0, 'Voir → vu.']],
      s: [['Hier, j\'ai mangé chez mes grands-parents.', 'Yesterday, I ate at my grandparents\' house.'],
          ['Ma cousine a fini ses devoirs.', 'My cousin finished her homework.']]
    },
    pcetre: {
      g: [['Ma grand-mère ___ au marché.', ['est allée', 'a allé', 'est allé'], 0, 'Aller takes être, and the participle agrees: allée.'],
          ['Mes cousins ___ hier.', ['sont arrivés', 'ont arrivé', 'sont arrivé'], 0, 'être + arrivés (masculine plural).'],
          ['Mon amie ___ à huit heures.', ['est partie', 'a parti', 'est parti'], 0, 'Partir takes être: partie for a woman.']],
      s: [['Mes grands-parents sont venus dimanche.', 'My grandparents came on Sunday.']]
    },
    imparfait: {
      g: [['Quand j\'étais petit, je ___ chez ma grand-mère.', ['mangeais', 'ai mangé', 'mangerai'], 0, 'A habit in the past: imparfait.'],
          ['Mon grand-père ___ très grand.', ['était', 'sera', 'est été'], 0, 'Describing the past: imparfait (était).'],
          ['Avant, mes cousins ___ à la campagne.', ['habitaient', 'habiteront', 'habitez'], 0, 'imparfait: ils habitaient.']],
      s: [['Quand j\'étais petite, ma grand-mère était grande.', 'When I was little, my grandmother was tall.']]
    },
    futur: {
      g: [['Demain, elle ___ du gâteau.', ['mangera', 'mangeait', 'a mangé'], 0, 'Futur simple: mangera.'],
          ['L\'année prochaine, mes cousins ___ en France.', ['iront', 'allaient', 'sont allés'], 0, 'Aller → ir-: ils iront.'],
          ['Ma sœur ___ médecin.', ['sera', 'était', 'a été'], 0, 'Être → ser-: elle sera.'],
          ['Nous ___ nos grands-parents dimanche prochain.', ['verrons', 'voyions', 'avons vu'], 0, 'Voir → verr-: nous verrons.']],
      s: [['Demain, nous mangerons chez mon oncle.', 'Tomorrow, we will eat at my uncle\'s house.']]
    },
    aller: {
      g: [['Ce soir, je ___ manger avec mes amis.', ['vais', 'va', 'vont'], 0, 'Futur proche: je vais + infinitive.'],
          ['Mon cousin va ___ demain.', ['arriver', 'arrivé', 'arrive'], 0, 'After aller, the verb stays in the infinitive: arriver.'],
          ['Mes parents ___ partir en vacances.', ['vont', 'va', 'allons'], 0, 'ils vont + infinitive.']],
      s: [['Ma cousine va venir la semaine prochaine.', 'My cousin is going to come next week.']]
    },
    adjectifs: {
      g: [['Mon frère est ___ grand que mon père.', ['plus', 'très', 'beaucoup'], 0, 'Comparing: plus … que.'],
          ['Ma grand-mère est ___ âgée que mon grand-père.', ['moins', 'moins de', 'pas'], 0, 'moins … que = less … than.'],
          ['Mon amie est aussi ___ que moi.', ['grand', 'grande', 'grands'], 1, 'Amie is feminine: grande.']],
      s: [['Mon cousin est plus grand que moi.', 'My cousin is taller than me.'],
          ['Ma cousine est aussi drôle que son frère.', 'My cousin is as funny as her brother.']]
    }
  };
  (FR.COURSE || []).forEach(ch => ch.lessons.forEach(l => {
    const m = MORE[l.id]; if (!m) return;
    l.g.push(...(m.g || [])); l.s.push(...(m.s || []));
  }));

  // Two rules for verbs, shown first on the rules page.
  (FR.RULES || (FR.RULES = [])).unshift(
    { id: 'infinitif', t: ['Infinitive or conjugated? prononcer or je prononce', 'Infinitif ou conjugué ? prononcer ou je prononce'], lesson: 'verbes',
      sum: ['The infinitive (prononcer, manger, finir) is the dictionary form. As soon as a verb has its own subject, it changes to match it.', 'L\'infinitif (prononcer, manger, finir) est la forme du dictionnaire. Dès qu\'un verbe a son sujet, il se conjugue.'],
      pts: [['je prononce, vous prononcez', ['after a subject (je, tu, il, elle, nous, vous, ils, elles, or a name), the verb changes', 'après un sujet, le verbe se conjugue']],
            ['je veux prononcer', ['right after another verb (vouloir, pouvoir, devoir, aimer, aller, savoir …), the second verb stays in the infinitive', 'après un autre verbe, le second reste à l\'infinitif']],
            ['pour prononcer, sans manger', ['after à, de, pour, sans, avant de: always the infinitive', 'après à, de, pour, sans, avant de : toujours l\'infinitif']],
            ['j\'ai prononcé', ['for a finished past action: avoir or être + the past participle (-é, -i, -u …)', 'pour le passé composé : avoir ou être + participe passé']],
            ['prononcer · prononcé · prononcez', ['-er, -é and -ez all sound the same ("ay"); only the spelling shows which one it is', '-er, -é et -ez se prononcent pareil ; seule l\'orthographe change']]],
      ex: [['Je prononce mal ce mot.', 'I pronounce this word badly.'], ['Vous prononcez très bien !', 'You pronounce very well!'], ['Je veux apprendre à prononcer le r.', 'I want to learn to pronounce the r.'],
           ['Hier, j\'ai mangé avec ma cousine.', 'Yesterday, I ate with my cousin.'], ['Demain, nous allons manger chez mes grands-parents.', 'Tomorrow, we are going to eat at my grandparents\'.']] },
    { id: 'tenses', t: ['Past, present and future at a glance', 'Passé, présent et futur en un coup d\'œil'], lesson: 'futur',
      sum: ['Five tenses cover almost everything you will say. Here they are with manger (to eat). Use the verb tables above for any other verb.', 'Cinq temps suffisent presque toujours. Les voici avec manger. Utilisez les tableaux ci-dessus pour les autres verbes.'],
      pts: [['je mange', ['present: I eat, I am eating, I do eat', 'présent']],
            ['j\'ai mangé', ['passé composé: I ate, I have eaten (one finished action)', 'passé composé : une action terminée']],
            ['je mangeais', ['imparfait: I was eating, I used to eat (description, habit)', 'imparfait : description, habitude']],
            ['je vais manger', ['futur proche: I am going to eat (soon, planned)', 'futur proche : bientôt, prévu']],
            ['je mangerai', ['futur simple: I will eat', 'futur simple']]],
      ex: [['Ma grand-mère mange du gâteau.', 'My grandmother is eating cake.'], ['Hier, elle a mangé du gâteau.', 'Yesterday, she ate cake.'], ['Avant, elle mangeait du gâteau tous les jours.', 'She used to eat cake every day.'],
           ['Ce soir, elle va manger du gâteau.', 'Tonight, she is going to eat cake.'], ['Demain, elle mangera du gâteau.', 'Tomorrow, she will eat cake.']] }
  );

  // Basics → Time: days, months, parts of the day, before / after, and phrases for making plans.
  FR.BASICS = FR.BASICS || {};
  FR.BASICS.when = {
    days: [['lundi', 'Monday'], ['mardi', 'Tuesday'], ['mercredi', 'Wednesday'], ['jeudi', 'Thursday'], ['vendredi', 'Friday'], ['samedi', 'Saturday'], ['dimanche', 'Sunday']],
    months: [['janvier', 'January'], ['février', 'February'], ['mars', 'March'], ['avril', 'April'], ['mai', 'May'], ['juin', 'June'], ['juillet', 'July'], ['août', 'August'], ['septembre', 'September'], ['octobre', 'October'], ['novembre', 'November'], ['décembre', 'December']],
    parts: [['l\'aube', 'dawn'], ['le matin', 'morning'], ['midi', 'noon'], ['l\'après-midi', 'afternoon'], ['le soir', 'evening'], ['le crépuscule', 'dusk'], ['la nuit', 'night'], ['minuit', 'midnight']],
    rel: [['aujourd\'hui', 'today'], ['demain', 'tomorrow'], ['hier', 'yesterday'], ['après-demain', 'the day after tomorrow'], ['avant-hier', 'the day before yesterday'],
          ['ce matin', 'this morning'], ['cet après-midi', 'this afternoon'], ['ce soir', 'tonight, this evening'], ['demain matin', 'tomorrow morning'], ['hier soir', 'last night, yesterday evening'],
          ['la semaine prochaine', 'next week'], ['la semaine dernière', 'last week'], ['ce week-end', 'this weekend'], ['lundi prochain', 'next Monday'], ['lundi dernier', 'last Monday'],
          ['le mois prochain', 'next month'], ['le mois dernier', 'last month'], ['l\'année prochaine', 'next year'], ['l\'année dernière', 'last year']],
    phrases: [['Je suis disponible demain matin.', 'I\'m available tomorrow morning.'], ['Je travaille lundi.', 'I have work on Monday.'],
              ['Tu es occupé ce soir ?', 'Are you busy tonight? (to a man; occupée to a woman)'], ['Tu es libre demain ?', 'Are you free tomorrow?'],
              ['Vous êtes occupé la semaine prochaine ?', 'Are you busy next week? (polite)'], ['Je ne suis pas libre ce week-end.', 'I\'m not free this weekend.'],
              ['On se voit samedi après-midi ?', 'Shall we meet on Saturday afternoon?'], ['Je suis libre à partir de midi.', 'I\'m free from noon.'],
              ['Quel jour sommes-nous ? — Nous sommes mardi.', 'What day is it? — It\'s Tuesday.'], ['C\'est quand, ton anniversaire ? — C\'est le trois mars.', 'When is your birthday? — It\'s the 3rd of March.'],
              ['Je pars en vacances en juillet.', 'I\'m going on holiday in July.'], ['Hier soir, j\'ai travaillé tard.', 'Last night I worked late.'],
              ['Je me lève tôt le matin.', 'I get up early in the morning.'], ['Le magasin est fermé le dimanche.', 'The shop is closed on Sundays.'],
              ['À demain ! À lundi ! À la semaine prochaine !', 'See you tomorrow! See you Monday! See you next week!']],
    tips: [['Days and months have no capital letter: lundi, janvier.', 'Pas de majuscule aux jours et aux mois : lundi, janvier.'],
           ['lundi = this Monday; le lundi = every Monday.', 'lundi = ce lundi ; le lundi = tous les lundis.'],
           ['en janvier (in January), but le 14 juillet (on 14 July). Dates use le + number: le premier mai, le deux mai.', 'en janvier, mais le 14 juillet. Le premier mai, le deux mai.'],
           ['le matin / le soir for a moment; la matinée / la soirée when you mean the whole stretch: toute la soirée.', 'le matin, le soir : un moment ; la matinée, la soirée : la durée.']]
  };
})();
