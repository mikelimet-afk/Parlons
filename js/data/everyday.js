window.FR = window.FR || {};
// Formal vs colloquial pairs: [formal, casual, meaning, note]
FR.PAIRS = [
['Comment allez-vous ?', 'Ça va ?', 'How are you?', 'The answer to both can simply be "Ça va, merci".'],
['Je ne sais pas.', 'Je sais pas. / Chais pas.', 'I don\'t know.', 'In speech the "ne" almost always disappears.'],
['Qu\'est-ce que vous faites ?', 'Tu fais quoi ?', 'What are you doing?', 'Casual questions put the question word at the end.'],
['Nous allons au cinéma.', 'On va au ciné.', 'We\'re going to the cinema.', '"On" replaces "nous" in nearly all spoken French.'],
['Pourriez-vous répéter, s\'il vous plaît ?', 'Tu peux répéter ?', 'Could you repeat that?', '"Hein ?" and "Quoi ?" exist but sound abrupt.'],
['Je vous remercie.', 'Merci, c\'est sympa.', 'Thank you.', ''],
['Il n\'y a pas de problème.', 'Pas de souci. / T\'inquiète.', 'No problem.', '"T\'inquiète" is short for "ne t\'inquiète pas".'],
['D\'accord.', 'OK. / Ça marche.', 'All right.', ''],
['Au revoir, bonne journée.', 'Salut ! / À plus !', 'Goodbye.', '"À plus" is short for "à plus tard"; in texts: A+.'],
['C\'est très bien.', 'C\'est top. / C\'est génial.', 'That\'s great.', ''],
['Je suis très fatigué.', 'Je suis crevé.', 'I\'m very tired.', ''],
['mon travail', 'mon boulot', 'my job', ''],
['un ami', 'un pote', 'a friend', ''],
['Voulez-vous boire quelque chose ?', 'Tu veux boire un truc ?', 'Would you like something to drink?', '"Un truc" = a thing, something.'],
['Je n\'ai pas compris.', 'J\'ai pas compris.', 'I didn\'t understand.', ''],
['Excusez-moi de vous déranger.', 'Désolé de te déranger.', 'Sorry to bother you.', ''],
['Il y a beaucoup de monde.', 'Y a plein de monde.', 'There are a lot of people.', '"Il y a" shrinks to "y a" in speech.'],
['Cela ne fait rien.', 'C\'est pas grave.', 'It doesn\'t matter.', '']
];

// Roleplays. reg = register expected. Each turn: npc line [fr, en] and/or task [en, fr]; opts = [French, English, correct?, feedback].
FR.ROLEPLAYS = [
{ id: 'boulangerie', reg: 'formal', t: ['At the bakery', 'À la boulangerie'], who: ['You are a customer. You don\'t know the baker: use vous.', 'Vous êtes client. Vous ne connaissez pas la boulangère : dites vous.'],
  turns: [
  { npc: ['Bonjour ! Vous désirez ?', 'Hello! What would you like?'], opts: [
    ['Bonjour ! Je voudrais une baguette, s\'il vous plaît.', 'Hello! I would like a baguette, please.', 1, 'Perfect: bonjour, the polite "je voudrais" and "s\'il vous plaît".'],
    ['Salut ! File-moi une baguette.', 'Hi! Hand me a baguette.', 0, '"Salut" and "file-moi" are slang between friends — rude to a shopkeeper.'],
    ['Je veux une baguette.', 'I want a baguette.', 0, 'Grammatically fine, but with no bonjour and "je veux" it sounds like an order.']] },
  { npc: ['Et avec ceci ?', 'Anything else?'], opts: [
    ['Rien.', 'Nothing.', 0, 'Too curt. Soften it with "merci".'],
    ['Ce sera tout, merci.', 'That will be all, thank you.', 1, 'The standard polite formula.'],
    ['Nan, c\'est bon.', 'Nah, I\'m good.', 0, '"Nan" is very casual — fine with friends, not in a shop.']] },
  { task: ['Ask how much it costs.', 'Demandez le prix.'], opts: [
    ['Combien tu veux ?', 'How much do you want?', 0, 'Uses tu, and sounds like haggling.'],
    ['C\'est combien, ton truc ?', 'How much is your thing?', 0, '"Ton truc" is far too familiar here.'],
    ['Ça fait combien, s\'il vous plaît ?', 'How much is that, please?', 1, 'Natural and polite — exactly what people say at the till.']] },
  { npc: ['Un euro vingt. Merci, bonne journée !', 'One euro twenty. Thanks, have a nice day!'], opts: [
    ['Merci, bonne journée à vous aussi !', 'Thanks, have a nice day too!', 1, 'Returning the wish with "à vous aussi" is the polite reflex.'],
    ['Ouais, toi aussi.', 'Yeah, you too.', 0, '"Ouais" and "toi" are too familiar with a stranger.'],
    ['Ciao, à plus !', 'Ciao, see ya!', 0, 'Friendly, but that\'s how you leave your friends.']] }
  ]},
{ id: 'ami', reg: 'casual', t: ['Coffee with a friend', 'Un café avec un ami'], who: ['You meet a close friend. Being too formal here sounds cold or sarcastic.', 'Vous retrouvez un ami proche. Être trop formel paraîtrait froid ou ironique.'],
  turns: [
  { npc: ['Salut ! Ça va ?', 'Hi! How\'s it going?'], opts: [
    ['Je vais très bien, je vous remercie. Et vous-même ?', 'I am very well, thank you. And yourself?', 0, 'Correct French, but with a friend "vous" creates distance.'],
    ['Ça va, et toi ?', 'Good, and you?', 1, 'Short and natural.'],
    ['Bonjour, monsieur.', 'Good morning, sir.', 0, 'Your friend would think you were joking.']] },
  { task: ['Ask what your friend wants to drink.', 'Demandez à votre ami ce qu\'il veut boire.'], opts: [
    ['Tu veux boire quoi ?', 'What do you want to drink?', 1, 'Casual word order with "quoi" at the end — exactly right.'],
    ['Que désirez-vous boire ?', 'What do you wish to drink?', 0, 'That\'s how a waiter speaks.'],
    ['Voulez-vous une boisson ?', 'Would you like a beverage?', 0, 'Too formal for a friend.']] },
  { npc: ['T\'as fait quoi ce week-end ?', 'What did you do this weekend?'], opts: [
    ['Cela ne vous regarde pas.', 'That is none of your business.', 0, 'Rude and formal at the same time!'],
    ['Je n\'ai rien fait de particulier, monsieur.', 'I did nothing in particular, sir.', 0, 'The grammar is perfect, the tone is wrong.'],
    ['Pas grand-chose, j\'ai regardé une série.', 'Not much, I watched a series.', 1, '"Pas grand-chose" is the everyday way to say "not much".']] },
  { npc: ['On se fait un ciné ce soir ?', 'Shall we catch a movie tonight?'], opts: [
    ['J\'accepte votre proposition avec plaisir.', 'I accept your proposal with pleasure.', 0, 'This belongs in a business letter.'],
    ['Carrément, ça marche !', 'Absolutely, sounds good!', 1, 'Two very common casual ways to say yes.'],
    ['Non.', 'No.', 0, 'A bare "non" is harsh. Try "Désolé, ce soir je peux pas."']] }
  ]},
{ id: 'chemin', reg: 'formal', t: ['Asking for directions', 'Demander son chemin'], who: ['You stop a stranger in the street: vous, and plenty of politeness.', 'Vous arrêtez une inconnue dans la rue : vous, et beaucoup de politesse.'],
  turns: [
  { task: ['Get a passer-by\'s attention politely.', 'Attirez poliment l\'attention d\'une passante.'], opts: [
    ['Hé, toi !', 'Hey, you!', 0, 'Aggressive with a stranger.'],
    ['Excusez-moi, madame…', 'Excuse me, ma\'am…', 1, 'The classic opener.'],
    ['Eh, madame, viens ici !', 'Hey, ma\'am, come here!', 0, 'An order using tu — two mistakes in one.']] },
  { task: ['Ask where the station is.', 'Demandez où est la gare.'], opts: [
    ['Dis-moi où est la gare.', 'Tell me where the station is.', 0, 'An order in the tu form.'],
    ['Elle est où, la gare ?', 'Where\'s the station?', 0, 'Fine with friends, abrupt with a stranger.'],
    ['Pourriez-vous me dire où se trouve la gare, s\'il vous plaît ?', 'Could you tell me where the station is, please?', 1, '"Pourriez-vous" is the most polite way to ask a favour.']] },
  { npc: ['Vous allez tout droit, puis vous tournez à gauche.', 'You go straight on, then you turn left.'], task: ['You didn\'t catch that.', 'Vous n\'avez pas compris.'], opts: [
    ['Pardon, pourriez-vous répéter plus lentement ?', 'Sorry, could you repeat more slowly?', 1, 'A sentence every learner should know by heart.'],
    ['Hein ?', 'Huh?', 0, 'Very common, but rude with a stranger.'],
    ['Quoi ?', 'What?', 0, 'Abrupt. Use "Pardon ?" instead.']] },
  { npc: ['Tout droit, puis à gauche. C\'est à cinq minutes.', 'Straight on, then left. It\'s five minutes away.'], opts: [
    ['Merci, t\'es sympa.', 'Thanks, you\'re nice.', 0, 'Warm, but it uses tu with a stranger.'],
    ['OK, salut.', 'OK, bye.', 0, 'Too casual, and no thanks.'],
    ['Merci beaucoup, c\'est très gentil !', 'Thank you very much, that\'s very kind!', 1, 'Warm and polite.']] }
  ]},
{ id: 'medecin', reg: 'formal', t: ['Phoning the doctor\'s office', 'Appeler le cabinet médical'], who: ['You call to book an appointment. Phone French is formal and full of set phrases.', 'Vous appelez pour prendre rendez-vous. Le français au téléphone est formel.'],
  turns: [
  { npc: ['Cabinet du docteur Martin, bonjour.', 'Doctor Martin\'s office, hello.'], opts: [
    ['Allô ? C\'est qui ?', 'Hello? Who\'s this?', 0, 'They just told you — and "c\'est qui ?" is very casual.'],
    ['Bonjour, je voudrais prendre rendez-vous, s\'il vous plaît.', 'Hello, I would like to make an appointment, please.', 1, '"Prendre rendez-vous" is the set phrase.'],
    ['Salut, je veux voir le docteur.', 'Hi, I want to see the doctor.', 0, '"Salut" and "je veux" are both too direct here.']] },
  { npc: ['Bien sûr. C\'est à quel nom ?', 'Of course. What name is it under?'], opts: [
    ['C\'est au nom de Dubois.', 'It\'s under the name Dubois.', 1, '"Au nom de…" mirrors the question exactly.'],
    ['Moi, c\'est Dubois, et toi ?', 'I\'m Dubois, and you?', 0, 'That\'s how you introduce yourself at a party.'],
    ['Pourquoi tu demandes ?', 'Why are you asking?', 0, 'Suspicious and uses tu.']] },
  { npc: ['Demain à dix heures, ça vous convient ?', 'Tomorrow at ten, does that suit you?'], opts: [
    ['Ouais, ça roule.', 'Yeah, that works.', 0, '"Ça roule" is friendly slang.'],
    ['Bof, si tu veux.', 'Meh, if you want.', 0, 'Unenthusiastic and uses tu.'],
    ['Oui, c\'est parfait, merci.', 'Yes, that\'s perfect, thank you.', 1, 'Clear and polite.']] },
  { task: ['End the call politely.', 'Terminez l\'appel poliment.'], opts: [
    ['Merci beaucoup, au revoir et bonne journée.', 'Thank you very much, goodbye and have a nice day.', 1, 'The full polite ending.'],
    ['Allez, ciao !', 'Right, ciao!', 0, 'For friends only.'],
    ['À plus !', 'See ya!', 0, 'For friends only.']] }
  ]},
{ id: 'texto', reg: 'casual', t: ['Texting a friend', 'Un texto à une amie'], who: ['Your friend Léa texts you. Keep it short and relaxed.', 'Votre amie Léa vous écrit. Restez court et détendu.'],
  turns: [
  { npc: ['Coucou ! Tu fais quoi ce soir ?', 'Hey! What are you up to tonight?'], opts: [
    ['Rien de spécial, pourquoi ?', 'Nothing special, why?', 1, 'Natural and keeps the conversation going.'],
    ['Je n\'ai aucun engagement prévu ce soir.', 'I have no engagement planned this evening.', 0, 'Sounds like a secretary answering.'],
    ['Madame, je suis disponible.', 'Madam, I am available.', 0, 'Far too formal for a text between friends.']] },
  { npc: ['Ça te dit de venir manger à la maison ?', 'Do you fancy coming over to eat?'], opts: [
    ['Je vous remercie pour cette aimable invitation.', 'I thank you for this kind invitation.', 0, 'Perfect for a wedding invitation, odd for a friend.'],
    ['Avec plaisir ! J\'apporte quoi ?', 'With pleasure! What shall I bring?', 1, 'Offering to bring something is the polite reflex in France.'],
    ['Oui.', 'Yes.', 0, 'A bit dry — add some enthusiasm.']] },
  { npc: ['Juste un dessert si tu veux. 20 h ?', 'Just a dessert if you like. 8 pm?'], opts: [
    ['Cet horaire me convient parfaitement.', 'This time suits me perfectly.', 0, 'Office-email register.'],
    ['Je confirme ma présence à vingt heures.', 'I confirm my attendance at 8 pm.', 0, 'That is how you answer a formal invitation.'],
    ['Ça marche, à tout à l\'heure !', 'Sounds good, see you later!', 1, '"À tout à l\'heure" because you will meet later the same day.']] }
  ]}
];
