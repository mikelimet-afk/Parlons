window.FR = window.FR || {};
// Formal vs casual phrases, by category. Line: category|formal|casual|meaning|note (optional)
FR.PHRASE_CATS = { greet: ['Greetings & goodbyes', 'Salutations'], resp: ['Responses & reactions', 'Réponses et réactions'], ask: ['Questions', 'Questions'], polite: ['Politeness & apologies', 'Politesse et excuses'], feel: ['Feelings & opinions', 'Sentiments et opinions'], plans: ['Plans & invitations', 'Projets et invitations'], shop: ['Shops & restaurants', 'Magasins et restaurants'], phone: ['Phone & messages', 'Téléphone et messages'], help: ['Problems & help', 'Problèmes et aide'] };
FR.PAIRS = `
greet|Bonjour, comment allez-vous ?|Salut, ça va ?|Hello, how are you?|The answer to both can simply be "Ça va, merci".
greet|Bonsoir, madame.|Salut !|Good evening.|Bonsoir replaces bonjour from about 6 pm.
greet|Enchanté de faire votre connaissance.|Enchanté. / Salut, moi c'est Léa.|Pleased to meet you.|
greet|Je vous présente mon collègue.|Je te présente un pote.|Let me introduce my colleague / a mate.|
greet|Comment vous appelez-vous ?|Tu t'appelles comment ?|What's your name?|Casual questions put the question word at the end.
greet|Au revoir, bonne journée.|Salut ! / À plus !|Goodbye.|"À plus" is short for "à plus tard"; in texts: A+.
greet|À bientôt, j'espère.|À la prochaine !|See you soon.|
greet|Bonne soirée à vous.|Bonne soirée !|Have a nice evening.|
greet|Je vous souhaite un bon week-end.|Bon week-end !|Have a good weekend.|
greet|Cela fait longtemps que nous ne nous sommes pas vus.|Ça fait une paye !|It's been ages.|"Une paye" is slang for a long time.
greet|Mes amitiés à votre famille.|Bisous à tout le monde !|Give my regards to your family.|"Bisous" = kisses; very common between friends.
resp|D'accord.|OK. / Ça marche.|All right.|
resp|Je ne sais pas.|Je sais pas. / Chais pas.|I don't know.|In speech the "ne" almost always disappears.
resp|Je n'ai pas compris.|J'ai pas compris.|I didn't understand.|
resp|C'est très bien.|C'est top. / C'est génial.|That's great.|
resp|Cela ne fait rien.|C'est pas grave.|It doesn't matter.|
resp|Il n'y a pas de problème.|Pas de souci. / T'inquiète.|No problem.|"T'inquiète" is short for "ne t'inquiète pas".
resp|Vous avez tout à fait raison.|T'as raison. / Carrément.|You're absolutely right.|"T'as" is the spoken form of "tu as".
resp|Je ne suis pas d'accord.|Pas du tout ! / N'importe quoi !|I don't agree.|"N'importe quoi !" (rubbish!) can sound rude.
resp|C'est vraiment surprenant.|Sans blague ! / C'est pas vrai !|That's really surprising.|
resp|Je n'en ai aucune idée.|Aucune idée.|I have no idea.|
resp|Cela m'est égal.|Bof. / Comme tu veux.|I don't mind.|"Bof" shows a lack of enthusiasm.
resp|Avec plaisir.|Volontiers ! / Grave !|With pleasure.|"Grave" as "totally!" is youth slang.
ask|Qu'est-ce que vous faites ?|Tu fais quoi ?|What are you doing?|
ask|Pourriez-vous répéter, s'il vous plaît ?|Tu peux répéter ?|Could you repeat that?|"Hein ?" and "Quoi ?" exist but sound abrupt.
ask|Où se trouve la gare, s'il vous plaît ?|Elle est où, la gare ?|Where is the station?|
ask|À quelle heure commence le film ?|Le film, c'est à quelle heure ?|What time does the film start?|
ask|Que voulez-vous dire ?|Tu veux dire quoi ?|What do you mean?|
ask|Avez-vous un moment ?|T'as deux minutes ?|Do you have a moment?|
ask|Que s'est-il passé ?|Qu'est-ce qui s'est passé ? / Il s'est passé quoi ?|What happened?|
ask|Pourquoi êtes-vous en retard ?|Pourquoi t'es en retard ?|Why are you late?|
ask|Combien cela coûte-t-il ?|C'est combien ?|How much is it?|
polite|Je vous remercie.|Merci, c'est sympa.|Thank you.|
polite|Je vous en prie.|De rien. / Pas de quoi.|You're welcome.|
polite|Excusez-moi de vous déranger.|Désolé de te déranger.|Sorry to bother you.|
polite|Je suis vraiment désolé.|Pardon, pardon !|I'm really sorry.|
polite|Pourriez-vous m'aider, s'il vous plaît ?|Tu peux m'aider ?|Could you help me, please?|
polite|Je vous prie de m'excuser.|Excuse-moi.|Please excuse me.|
polite|Après vous, je vous en prie.|Vas-y, passe.|After you.|
polite|Ce n'est rien.|C'est rien.|It's nothing.|
feel|Je suis très fatigué.|Je suis crevé.|I'm very tired.|
feel|Je suis très content.|Je suis trop content !|I'm really happy.|"Trop" means "really" in casual speech.
feel|Cela m'ennuie beaucoup.|Ça me saoule.|That really annoys me.|"Saouler" literally means to make drunk.
feel|J'ai très faim.|J'ai la dalle.|I'm starving.|
feel|Je n'ai pas envie de sortir.|J'ai la flemme de sortir.|I don't feel like going out.|
feel|Je trouve cela magnifique.|C'est trop beau.|I think it's beautiful.|
feel|À mon avis, c'est une erreur.|Pour moi, c'est nul.|In my opinion, it's a mistake.|
feel|J'ai eu très peur.|J'ai flippé.|I was really scared.|
feel|Cela me plaît beaucoup.|J'adore. / Je kiffe.|I like it a lot.|"Kiffer" is youth slang.
feel|Je suis inquiet.|Je stresse.|I'm worried.|
plans|Nous allons au cinéma.|On va au ciné.|We're going to the cinema.|"On" replaces "nous" in nearly all spoken French.
plans|Voulez-vous boire quelque chose ?|Tu veux boire un truc ?|Would you like something to drink?|"Un truc" = a thing, something.
plans|Seriez-vous libre samedi soir ?|T'es dispo samedi soir ?|Are you free on Saturday evening?|"Dispo" is short for disponible.
plans|Je vous invite à dîner.|Je t'invite, c'est moi qui paie.|I'm treating you to dinner.|
plans|Rendez-vous à huit heures devant le restaurant.|On se retrouve à huit heures devant le resto.|Let's meet at eight outside the restaurant.|"Resto" = restaurant.
plans|Je ne pourrai pas venir, malheureusement.|Je peux pas venir, désolé.|Unfortunately I won't be able to come.|
plans|Il y a beaucoup de monde.|Y a plein de monde.|There are a lot of people.|"Il y a" shrinks to "y a" in speech.
plans|Nous verrons bien.|On verra.|We'll see.|
plans|Je dois partir maintenant.|Faut que j'y aille.|I have to go now.|
shop|Je voudrais un café, s'il vous plaît.|Un café, s'il vous plaît.|A coffee, please.|"Je voudrais" is the polite way to ask.
shop|L'addition, s'il vous plaît.|On peut payer ?|The bill, please.|
shop|Je regarde seulement, merci.|Je regarde, merci.|I'm just looking, thanks.|
shop|Est-ce que je peux payer par carte ?|Je peux payer par carte ?|Can I pay by card?|
shop|Avez-vous une table pour deux ?|Vous avez une table pour deux ?|Do you have a table for two?|Waiters are always addressed with vous.
shop|C'est trop cher pour moi.|C'est hors de prix !|It's too expensive for me.|
shop|Gardez la monnaie.|C'est bon, gardez tout.|Keep the change.|
phone|Allô, bonjour, c'est madame Martin à l'appareil.|Allô, c'est moi !|Hello, it's Mrs Martin speaking.|
phone|Pourrais-je parler à monsieur Dubois ?|Il est là, Paul ?|May I speak to Mr Dubois?|
phone|Ne quittez pas, je vous le passe.|Attends, je te le passe.|Hold on, I'll put him on.|
phone|Je vous rappelle plus tard.|Je te rappelle.|I'll call you back later.|
phone|Je vous envoie un courriel.|Je t'envoie un mail.|I'll send you an email.|"Courriel" is the official word, used a lot in Quebec.
phone|Pouvez-vous laisser un message ?|Laisse un message.|Can you leave a message?|
phone|Je n'ai plus de batterie.|J'ai plus de batterie.|My battery is dead.|
help|J'ai perdu mon portefeuille.|J'ai paumé mon portefeuille.|I lost my wallet.|"Paumer" is slang for perdre.
help|Pouvez-vous appeler un médecin ?|Appelle un médecin !|Can you call a doctor?|In an emergency, dial 112 in Europe.
help|Je ne me sens pas bien.|Ça va pas trop.|I don't feel well.|
help|Ma voiture est en panne.|Ma bagnole est en rade.|My car has broken down.|
help|Il y a un problème avec ma chambre.|Y a un souci avec ma chambre.|There's a problem with my room.|
help|Je me suis perdu.|Je suis paumé.|I'm lost.|
help|Au secours !|À l'aide !|Help!|
`.trim().split('\n').map(l => l.split('|'));
