window.FR = window.FR || {};
// Idioms and texting French. Line: category|French|English|example (fr)|example (en)|note
FR.EXPR_CATS = { idiom: ['Idioms', 'Expressions imagées'], text: ['Texting & meeting up', 'Textos et rendez-vous'] };
FR.EXPRS = `
idiom|C'est pas la mer à boire.|It's not a big deal.|Ranger ta chambre, c'est pas la mer à boire !|Tidying your room isn't a big deal!|Literally "it's not drinking the sea". Said to encourage someone facing a task.
idiom|C'est du gâteau.|It's easy. / It's a piece of cake.|L'examen ? C'était du gâteau.|The exam? It was a piece of cake.|The negative, "c'est pas du gâteau", means it's tough.
idiom|C'est pas tes oignons.|It's none of your business.|Avec qui je sors, c'est pas tes oignons.|Who I go out with is none of your business.|Literally "they're not your onions". A bit cheeky — only with people you know. Also "occupe-toi de tes oignons" (mind your own business).
idiom|C'est pas la mort.|It's not the end of the world.|T'as raté ton bus ? C'est pas la mort, il y en a un autre.|You missed your bus? It's not the end of the world, there's another one.|Literally "it's not death". Used to play something down.
idiom|C'est pas ma tasse de thé.|It's not my cup of tea.|Le jazz, c'est pas ma tasse de thé.|Jazz isn't my cup of tea.|Same image as in English. Formal writing keeps the "ne": ce n'est pas ma tasse de thé.
text|Tu fais quoi ?|What are you doing?|Salut, tu fais quoi ce soir ?|Hey, what are you doing tonight?|Very common in casual texting. Formal: Qu'est-ce que vous faites ?
text|J'arrive.|I'm on my way. / I'm coming.|Attends-moi deux minutes, j'arrive.|Wait for me two minutes, I'm on my way.|Literally "I'm arriving". Used when you're almost there — or not quite yet!
text|Ça te dit ?|Are you up for it? / Fancy it?|On va boire un café, ça te dit ?|We're going for a coffee, are you up for it?|A natural way to make a suggestion. With vous: Ça vous dit ?
text|À toute !|See you soon! / See you in a bit!|Je pars maintenant, à toute !|I'm leaving now, see you in a bit!|Short for "à tout à l'heure" (see you later today).
text|Je te tiens au courant.|I'll keep you posted.|Je regarde les horaires et je te tiens au courant.|I'll check the times and keep you posted.|Useful when you'll update someone later. With vous: Je vous tiens au courant.
text|T'es où ?|Where are you?|On est devant le cinéma. T'es où ?|We're in front of the cinema. Where are you?|Spoken form of "Tu es où ?" — super common when meeting up.
text|Bien rentré(e) ?|Did you get home okay?|Coucou, bien rentrée ?|Hey, did you get home okay?|A caring text after seeing someone. Add the -e for a woman: bien rentrée.
text|Ça marche.|Sounds good. / Works for me.|19 h devant la gare ? Ça marche.|7 p.m. in front of the station? Sounds good.|It means the plan works for you.
text|On se capte plus tard ?|Shall we catch up later?|Je suis occupé maintenant, on se capte plus tard ?|I'm busy right now, shall we catch up later?|Very natural in modern casual French. "Capter" = to pick up a signal; here, to get in touch.
`.trim().split('\n').map(l => l.split('|'));
