window.FR = window.FR || {}; FR.DICT_MORE = FR.DICT_MORE || []; FR.RULES = FR.RULES || []; FR.CR = FR.CR || [];
// B1 grammar (docs/design-b1.md): two chapters, 12 lessons, their words, rule pages and a short text each.
// Words: french|english|code|example|translation. A word already in the dictionary keeps its entry and joins the lesson.
(function () {
  const W = {
relatifs: ['Housing', 'Le logement', `
logement|housing, accommodation|m|Trouver un logement à Montréal prend du temps.|Finding housing in Montreal takes time.
appartement|flat, apartment|m|Notre appartement est au deuxième étage.|Our flat is on the second floor.
locataire|tenant|mf|Le locataire paie le loyer le premier du mois.|The tenant pays the rent on the first of the month.
propriétaire|owner, landlord|mf|La propriétaire habite au rez-de-chaussée.|The landlady lives on the ground floor.
loyer|rent|m|Le loyer a augmenté de cinquante dollars.|The rent went up by fifty dollars.
bail|lease|m|J'ai signé un bail d'un an.|I signed a one-year lease.
chauffage|heating|m|Le chauffage est compris dans le loyer.|Heating is included in the rent.
déménager|to move (house)|v|Nous déménageons le premier juillet.|We are moving on the first of July.
emménager|to move in|v|Ils ont emménagé dans leur nouvel appartement hier.|They moved into their new flat yesterday.
colocataire|roommate, flatmate|mf|Mon colocataire cuisine très bien.|My roommate cooks very well.
quartier|neighbourhood, area|m|C'est un quartier calme et vert.|It is a quiet, green neighbourhood.
voisin|neighbour|m|Mon voisin m'aide à porter les boîtes.|My neighbour helps me carry the boxes.
ascenseur|lift, elevator|m|L'ascenseur est en panne depuis lundi.|The lift has been out of order since Monday.
caution|deposit|f|Le propriétaire demande une caution d'un mois.|The landlord asks for a one-month deposit.
meublé|furnished|a|Je cherche un studio meublé près du centre.|I am looking for a furnished studio near the centre.
annonce|ad, listing|f|J'ai vu l'annonce sur Internet.|I saw the listing online.
signer|to sign|v|Signez ici, s'il vous plaît.|Sign here, please.
étage|floor, storey|m|Elle habite au troisième étage.|She lives on the third floor.
rez-de-chaussée|ground floor|m|La buanderie est au rez-de-chaussée.|The laundry room is on the ground floor.
qui|who, which (subject)|o|C'est une voisine qui parle quatre langues.|She is a neighbour who speaks four languages.
`],
dont: ['Work', 'Le travail', `
emploi|job, employment|m|Elle cherche un emploi dans la santé.|She is looking for a job in health care.
offre d'emploi|job offer, job posting|f|J'ai répondu à trois offres d'emploi cette semaine.|I answered three job postings this week.
candidat|candidate, applicant|m|Il y a vingt candidats pour ce poste.|There are twenty applicants for this position.
candidature|application|f|J'ai envoyé ma candidature lundi.|I sent my application on Monday.
CV|CV, résumé|m|Mettez votre expérience au début du CV.|Put your experience at the top of your CV.
entretien d'embauche|job interview|m|Mon entretien d'embauche est jeudi à dix heures.|My job interview is on Thursday at ten.
embaucher|to hire|v|L'entreprise embauche des caissiers.|The company is hiring cashiers.
salaire|salary, pay|m|Le salaire est versé toutes les deux semaines.|The pay is deposited every two weeks.
collègue|colleague|mf|Ma collègue m'a aidé avec le dossier.|My colleague helped me with the file.
patron|boss|m|Mon patron est exigeant mais juste.|My boss is demanding but fair.
expérience|experience|f|J'ai cinq ans d'expérience en vente.|I have five years of experience in sales.
compétence|skill|f|Le français est une compétence très utile ici.|French is a very useful skill here.
avoir besoin de|to need|p|J'ai besoin de ton aide.|I need your help.
être fier de|to be proud of|p|Je suis fier de mon équipe.|I am proud of my team.
s'occuper de|to take care of, to handle|v|C'est elle qui s'occupe des clients.|She is the one who handles the customers.
horaire|schedule, hours|m|Mon horaire change chaque semaine.|My schedule changes every week.
temps plein|full time|m|Je travaille à temps plein.|I work full time.
temps partiel|part time|m|Elle étudie et travaille à temps partiel.|She studies and works part time.
formation|training, education|f|L'entreprise offre une formation de deux semaines.|The company offers two weeks of training.
dont|of which, whose, about which|o|C'est le poste dont je rêve.|It is the job I dream of.
`],
pqp: ['Moving to a new country', 'S’installer dans un nouveau pays', `
immigrer|to immigrate|v|Ses parents ont immigré au Canada en 1998.|His parents immigrated to Canada in 1998.
s'installer|to settle, to move in|v|Nous nous sommes installés à Québec.|We settled in Quebec City.
immigrant|immigrant|m|Beaucoup d'immigrants apprennent le français le soir.|Many immigrants learn French in the evening.
permis de travail|work permit|m|Mon permis de travail est valable deux ans.|My work permit is valid for two years.
résidence permanente|permanent residence|f|Elle a obtenu la résidence permanente l'an dernier.|She got permanent residence last year.
citoyenneté|citizenship|f|Il prépare l'examen de citoyenneté.|He is preparing for the citizenship test.
dossier|file, application|m|Mon dossier est complet.|My file is complete.
démarche|step, procedure|f|Les démarches administratives prennent du temps.|Paperwork takes time.
formulaire|form|m|Remplissez le formulaire en lettres majuscules.|Fill in the form in capital letters.
quitter|to leave|v|J'ai quitté mon pays à vingt-cinq ans.|I left my country at twenty-five.
nostalgie|homesickness, nostalgia|f|Le dimanche, j'ai un peu de nostalgie.|On Sundays I feel a little homesick.
s'habituer à|to get used to|v|Je me suis habitué au froid.|I have got used to the cold.
accueillir|to welcome|v|Ma tante nous a accueillis à l'aéroport.|My aunt welcomed us at the airport.
douane|customs|f|On a attendu une heure à la douane.|We waited an hour at customs.
nouvel arrivant|newcomer|m|La ville offre des services aux nouveaux arrivants.|The city offers services to newcomers.
déjà|already|d|Quand je suis arrivé, il avait déjà neigé.|When I arrived, it had already snowed.
plus tôt|earlier|d|Elle était partie deux heures plus tôt.|She had left two hours earlier.
`],
si: ['The environment', 'L’environnement', `
environnement|environment|m|Il faut protéger l'environnement.|We must protect the environment.
climat|climate|m|Le climat change plus vite que prévu.|The climate is changing faster than expected.
pollution|pollution|f|La pollution de l'air baisse le dimanche.|Air pollution falls on Sundays.
recycler|to recycle|v|On recycle le papier et le plastique.|We recycle paper and plastic.
déchet|waste, rubbish|m|Chaque famille produit beaucoup de déchets.|Every family produces a lot of waste.
poubelle|bin, garbage can|f|Sors la poubelle, c'est mardi !|Take out the bin, it's Tuesday!
gaspiller|to waste|v|Ne gaspille pas l'eau.|Don't waste water.
économiser|to save (money, energy)|v|On économise de l'énergie en éteignant les lumières.|You save energy by turning off the lights.
énergie|energy|f|L'énergie solaire coûte de moins en moins cher.|Solar energy is getting cheaper and cheaper.
consommer|to consume, to use|v|Cette voiture consomme peu d'essence.|This car uses little petrol.
transport en commun|public transport|m|Je prends les transports en commun pour aller au travail.|I take public transport to work.
réchauffement climatique|global warming|m|Le réchauffement climatique touche le Nord en premier.|Global warming hits the North first.
protéger|to protect|v|Ce parc protège les ours et les loups.|This park protects bears and wolves.
compost|compost|m|Nous mettons les épluchures dans le compost.|We put the peelings in the compost.
emballage|packaging|m|Ce produit a trop d'emballage.|This product has too much packaging.
durable|sustainable, lasting|a|Elle achète des vêtements durables.|She buys clothes that last.
sécheresse|drought|f|La sécheresse a duré tout l'été.|The drought lasted all summer.
incendie de forêt|forest fire, wildfire|m|Les incendies de forêt ont été nombreux cette année.|There were many wildfires this year.
inondation|flood|f|Après l'inondation, le sous-sol était plein d'eau.|After the flood, the basement was full of water.
`],
discours: ['Admin & phone calls', 'Les démarches et le téléphone', `
rappeler|to call back|v|Je vous rappelle dans dix minutes.|I'll call you back in ten minutes.
laisser un message|to leave a message|p|Vous pouvez laisser un message après le bip.|You can leave a message after the beep.
répondeur|voicemail, answering machine|m|Je suis tombé sur son répondeur.|I got his voicemail.
patienter|to hold, to wait|v|Veuillez patienter, un agent va vous répondre.|Please hold, an agent will answer you.
numéro de dossier|file number|m|Quel est votre numéro de dossier ?|What is your file number?
pièce d'identité|ID, identity document|f|Apportez une pièce d'identité avec photo.|Bring photo ID.
justificatif de domicile|proof of address|m|Une facture d'électricité sert de justificatif de domicile.|An electricity bill works as proof of address.
préciser|to specify, to make clear|v|Pouvez-vous préciser la date ?|Can you specify the date?
affirmer|to state, to claim|v|Il affirme qu'il a envoyé le formulaire.|He claims he sent the form.
annoncer|to announce|v|Le gouvernement annonce de nouvelles règles.|The government is announcing new rules.
prévenir|to warn, to let someone know|v|Préviens-moi si tu es en retard.|Let me know if you are late.
ajouter|to add|v|Elle ajoute que le bureau ferme à midi.|She adds that the office closes at noon.
promettre|to promise|v|Il promet de rappeler demain.|He promises to call back tomorrow.
agent|agent, officer|m|L'agent m'a donné un rendez-vous.|The agent gave me an appointment.
guichet|counter, window|m|Adressez-vous au guichet numéro trois.|Go to window number three.
carte d'assurance maladie|health card|f|N'oubliez pas votre carte d'assurance maladie.|Don't forget your health card.
rendez-vous|appointment|m|J'ai rendez-vous à la mairie mardi.|I have an appointment at the town hall on Tuesday.
`],
qindirect: ['Banking & services', 'La banque et les services', `
banque|bank|f|La banque ouvre à neuf heures.|The bank opens at nine.
compte chèques|chequing account|m|J'ai ouvert un compte chèques.|I opened a chequing account.
compte épargne|savings account|m|Je mets cent dollars par mois dans mon compte épargne.|I put a hundred dollars a month in my savings account.
carte de débit|debit card|f|Je paie avec ma carte de débit.|I pay with my debit card.
carte de crédit|credit card|f|Une carte de crédit aide à bâtir son historique de crédit.|A credit card helps you build your credit history.
frais bancaires|bank fees|m|Ce compte n'a pas de frais bancaires.|This account has no bank fees.
retirer|to withdraw|v|J'ai retiré deux cents dollars.|I withdrew two hundred dollars.
déposer|to deposit|v|Je dépose mon chèque au guichet automatique.|I deposit my cheque at the ATM.
virement|transfer|m|Faites-moi un virement, c'est plus simple.|Send me a transfer, it's easier.
guichet automatique|ATM, cash machine|m|Il y a un guichet automatique au coin de la rue.|There is an ATM at the corner of the street.
taux d'intérêt|interest rate|m|Le taux d'intérêt a baissé.|The interest rate has gone down.
conseiller financier|financial adviser|m|Le conseiller financier m'a expliqué les options.|The financial adviser explained the options to me.
prêt hypothécaire|mortgage|m|Ils ont obtenu un prêt hypothécaire sur vingt-cinq ans.|They got a twenty-five-year mortgage.
rembourser|to pay back, to refund|v|Je rembourse mon prêt chaque mois.|I pay back my loan every month.
dépenser|to spend|v|Nous dépensons trop au restaurant.|We spend too much at restaurants.
budget|budget|m|Faire un budget m'aide à économiser.|Making a budget helps me save.
relevé de compte|bank statement|m|Je vérifie mon relevé de compte chaque mois.|I check my bank statement every month.
gratuit|free (no cost)|a|Le compte est gratuit pour les étudiants.|The account is free for students.
se demander|to wonder|v|Je me demande si la banque est ouverte.|I wonder whether the bank is open.
`],
gerondif: ['Studying & learning', 'Étudier et apprendre', `
réviser|to revise, to review|v|Je révise mes notes chaque soir.|I review my notes every evening.
mémoriser|to memorise|v|On mémorise mieux en répétant à voix haute.|You memorise better by repeating out loud.
prendre des notes|to take notes|p|Elle prend des notes pendant le cours.|She takes notes during class.
inscription|registration, enrolment|f|L'inscription aux cours commence en août.|Registration for classes starts in August.
progresser|to make progress|v|Tu progresses vite !|You're making fast progress!
s'améliorer|to improve, to get better|v|Mon accent s'améliore.|My accent is getting better.
erreur|mistake, error|f|Tout le monde fait des erreurs.|Everyone makes mistakes.
manuel|textbook|m|Le manuel coûte quatre-vingts dollars.|The textbook costs eighty dollars.
devoirs|homework|m|Les enfants font leurs devoirs après l'école.|The children do their homework after school.
se concentrer|to concentrate|v|Je n'arrive pas à me concentrer avec ce bruit.|I can't concentrate with this noise.
motivation|motivation|f|La motivation est plus importante que le talent.|Motivation matters more than talent.
méthode|method|f|Chacun a sa méthode pour apprendre.|Everyone has their own way of learning.
bourse|scholarship, grant|f|Elle a obtenu une bourse d'études.|She got a scholarship.
cours du soir|evening class|m|Je suis des cours du soir deux fois par semaine.|I take evening classes twice a week.
à voix haute|out loud|p|Lisez le texte à voix haute.|Read the text out loud.
en faisant|by doing, while doing|p|On apprend en faisant.|You learn by doing.
`],
doublepron: ['Shopping & returns', 'Achats et retours', `
échanger|to exchange|v|Je voudrais échanger ce pull contre une autre taille.|I would like to exchange this jumper for another size.
reçu|receipt|m|Gardez votre reçu pour un retour.|Keep your receipt for a return.
facture|bill, invoice|f|La facture arrive par courriel.|The bill comes by email.
garantie|warranty, guarantee|f|L'ordinateur est sous garantie pendant un an.|The computer is under warranty for a year.
caisse|checkout, till|f|Payez à la caisse, s'il vous plaît.|Please pay at the checkout.
client|customer|m|Le client a toujours raison ?|Is the customer always right?
commande|order|f|Ma commande n'est pas encore arrivée.|My order hasn't arrived yet.
livraison|delivery|f|La livraison est gratuite dès cinquante dollars.|Delivery is free over fifty dollars.
livrer|to deliver|v|Le colis sera livré demain.|The parcel will be delivered tomorrow.
colis|parcel, package|m|Un voisin a reçu mon colis.|A neighbour got my parcel.
taille|size|f|Vous avez ce manteau dans une plus grande taille ?|Do you have this coat in a bigger size?
défectueux|faulty, defective|a|L'appareil est défectueux, il ne s'allume pas.|The device is faulty, it doesn't turn on.
envoyer|to send|v|Je t'envoie le lien tout de suite.|I'm sending you the link right away.
soldes|sales|m|Les soldes commencent après Noël.|The sales start after Christmas.
remise|discount|f|On m'a fait une remise de dix pour cent.|They gave me a ten percent discount.
rendre|to give back, to return|v|Je te rends ton livre demain.|I'll give you your book back tomorrow.
`],
celui: ['Comparing & choosing', 'Comparer et choisir', `
choix|choice|m|Il y a trop de choix !|There is too much choice!
comparer|to compare|v|Je compare les prix avant d'acheter.|I compare prices before buying.
modèle|model|m|Ce modèle est sorti l'an dernier.|This model came out last year.
marque|brand|f|Quelle marque préfères-tu ?|Which brand do you prefer?
qualité|quality|f|La qualité est meilleure, mais le prix aussi.|The quality is better, but so is the price.
rapport qualité-prix|value for money|m|Ce restaurant a un excellent rapport qualité-prix.|This restaurant is great value for money.
avis|opinion, review|m|J'ai lu les avis des clients.|I read the customer reviews.
recommander|to recommend|v|Je te recommande ce modèle.|I recommend this model to you.
produit|product|m|Ce produit est fabriqué au Canada.|This product is made in Canada.
forfait|plan, package|m|Mon forfait comprend vingt gigaoctets.|My plan includes twenty gigabytes.
cellulaire|cell phone (Quebec)|m|J'ai oublié mon cellulaire à la maison.|I left my cell phone at home.
ordinateur portable|laptop|m|Mon ordinateur portable est trop lent.|My laptop is too slow.
écran|screen|m|L'écran est plus grand sur ce modèle.|The screen is bigger on this model.
batterie|battery|f|La batterie dure toute la journée.|The battery lasts all day.
d'occasion|second-hand, used|a|J'ai acheté un vélo d'occasion.|I bought a second-hand bike.
celui|the one (masculine)|o|Je préfère celui-ci.|I prefer this one.
celle|the one (feminine)|o|Quelle robe ? Celle qui est rouge.|Which dress? The one that is red.
`],
mien: ['Belongings & sharing', 'Les affaires et le partage', `
affaires|things, belongings|f|Range tes affaires, s'il te plaît.|Put your things away, please.
partager|to share|v|Nous partageons la cuisine.|We share the kitchen.
appartenir à|to belong to|v|Ce vélo appartient à ma sœur.|This bike belongs to my sister.
colocation|flat share|f|Je vis en colocation avec deux étudiants.|I live in a flat share with two students.
clé|key|f|J'ai perdu mes clés.|I've lost my keys.
outil|tool|m|Mon voisin me prête ses outils.|My neighbour lends me his tools.
casier|locker|m|Chaque locataire a un casier au sous-sol.|Each tenant has a locker in the basement.
tiroir|drawer|m|Les cuillères sont dans le premier tiroir.|The spoons are in the first drawer.
étiquette|label, tag|f|Mets une étiquette avec ton nom.|Put a label with your name on it.
objets trouvés|lost and found|m|Demande aux objets trouvés.|Ask at the lost and found.
parapluie|umbrella|m|Tu peux prendre mon parapluie.|You can take my umbrella.
portefeuille|wallet|m|Mon portefeuille est dans mon sac.|My wallet is in my bag.
lunettes|glasses|f|Je ne trouve plus mes lunettes.|I can't find my glasses.
concierge|caretaker, janitor|mf|Le concierge a les clés de la salle de lavage.|The caretaker has the keys to the laundry room.
le mien|mine (masculine)|o|Ce n'est pas ton parapluie, c'est le mien.|That isn't your umbrella, it's mine.
la mienne|mine (feminine)|o|Ta clé ne marche pas ? Prends la mienne.|Your key doesn't work? Take mine.
le nôtre|ours (masculine)|o|Leur appartement est plus grand que le nôtre.|Their flat is bigger than ours.
`],
connecteurs: ['News & society', 'Actualité et société', `
actualité|news, current affairs|f|Je suis l'actualité à la radio.|I follow the news on the radio.
article|article|m|As-tu lu cet article sur les loyers ?|Have you read this article about rents?
journaliste|journalist|mf|La journaliste a interrogé le maire.|The journalist interviewed the mayor.
sondage|poll, survey|m|Selon un sondage, les jeunes lisent plus.|According to a poll, young people read more.
gouvernement|government|m|Le gouvernement a annoncé un nouveau programme.|The government announced a new programme.
élection|election|f|Les élections ont lieu en octobre.|The elections take place in October.
société|society; company|f|C'est un problème de société.|It is a social issue.
pourtant|yet, and yet|d|Il a beaucoup étudié ; pourtant, il a échoué.|He studied a lot; and yet he failed.
cependant|however|d|Le projet est bon ; cependant, il coûte cher.|The project is good; however, it is expensive.
donc|so, therefore|c|Il pleut, donc je prends le bus.|It's raining, so I'm taking the bus.
alors que|while, whereas|c|Elle aime l'hiver, alors que son frère le déteste.|She likes winter, whereas her brother hates it.
par contre|on the other hand|p|Le quartier est cher ; par contre, il est très bien situé.|The area is expensive; on the other hand, it is very well located.
en effet|indeed, in fact|p|Les loyers augmentent. En effet, ils ont pris dix pour cent.|Rents are rising. Indeed, they went up ten percent.
c'est pourquoi|that's why|p|Il fait froid ; c'est pourquoi je reste à la maison.|It's cold; that's why I'm staying at home.
grâce à|thanks to|r|Grâce à toi, j'ai trouvé un emploi.|Thanks to you, I found a job.
à cause de|because of|r|Le vol est annulé à cause de la tempête.|The flight is cancelled because of the storm.
malgré|despite|r|Malgré la pluie, le festival a eu lieu.|Despite the rain, the festival went ahead.
selon|according to|r|Selon la météo, il neigera demain.|According to the forecast, it will snow tomorrow.
`],
opinion: ['Debates & opinions', 'Débats et opinions', `
opinion|opinion|f|Chacun a droit à son opinion.|Everyone is entitled to their opinion.
à mon avis|in my opinion|p|À mon avis, c'est une bonne idée.|In my opinion, it's a good idea.
selon moi|in my view|p|Selon moi, il faut attendre.|In my view, we should wait.
je trouve que|I think that, I find that|p|Je trouve que ce film est trop long.|I think this film is too long.
il me semble que|it seems to me that|p|Il me semble que tu as raison.|It seems to me that you are right.
être d'accord|to agree|p|Je suis d'accord avec toi.|I agree with you.
avantage|advantage|m|Le premier avantage, c'est le prix.|The first advantage is the price.
inconvénient|drawback, disadvantage|m|Le seul inconvénient, c'est le bruit.|The only drawback is the noise.
argument|argument, point|m|C'est un bon argument.|That's a good point.
convaincre|to convince|v|Tu m'as convaincu.|You've convinced me.
défendre|to defend, to argue for|v|Elle défend ses idées avec calme.|She argues for her ideas calmly.
débat|debate|m|Le débat a duré deux heures.|The debate lasted two hours.
télétravail|remote work, working from home|m|Je fais du télétravail le lundi et le vendredi.|I work from home on Mondays and Fridays.
il est vrai que|it is true that|p|Il est vrai que c'est cher.|It is true that it's expensive.
point de vue|point of view|m|Je comprends ton point de vue.|I understand your point of view.
avoir raison|to be right|p|Tu as raison, je me suis trompé.|You're right, I was wrong.
avoir tort|to be wrong|p|Il a tort de penser ça.|He is wrong to think that.
`]
  };
  Object.keys(W).forEach(id => FR.DICT_MORE.push('#' + id + '|' + W[id][0] + '|' + W[id][1] + '\n' + W[id][2]));
  const more = id => W[id][2].trim().split('\n').map(l => l.split('|')[0]).join(',');
  const L = (id, t, rule, rel, tips, g, s) => ({ id, t, rule, rel, tips, g, s, more: more(id), cr: 'l-' + id });

  FR.COURSE.push({ id: 'c7', lvl: 'B1', t: ['Living in French', 'Vivre en français'], lessons: [
    L('relatifs', ['Who, which, where: qui, que, où', 'Qui, que, où'], 'relatifs', ['pronoms', 'maison'],
      [['Qui replaces the subject of the next verb: la voisine qui parle. Que replaces the object: l\'appartement que j\'ai visité.', 'Qui remplace le sujet du verbe qui suit ; que remplace le complément d\'objet.'],
       ['Où is for a place and also for a time: le quartier où j\'habite, le jour où nous avons emménagé.', 'Où s\'utilise pour un lieu et aussi pour un moment : le jour où nous avons emménagé.']],
      [['C\'est l\'appartement ___ j\'ai visité hier.', ['que', 'qui', 'où'], 0, 'J\'ai visité l\'appartement: it is the object, so que.'],
       ['J\'ai une voisine ___ parle quatre langues.', ['que', 'qui', 'où'], 1, 'La voisine is the subject of parle, so qui.'],
       ['Voici le quartier ___ j\'habite.', ['que', 'qui', 'où'], 2, 'A place: où.'],
       ['Le propriétaire ___ nous avons rencontré est gentil.', ['qui', 'que', 'où'], 1, 'Nous avons rencontré le propriétaire: object, so que.'],
       ['C\'est une maison ___ a un grand jardin.', ['qui', 'que', 'dont'], 0, 'La maison is the subject of a, so qui.'],
       ['Je me souviens du jour ___ nous avons emménagé.', ['que', 'où', 'qui'], 1, 'For a moment in time, French also uses où.'],
       ['L\'annonce ___ tu m\'as envoyée est intéressante.', ['qui', 'où', 'que'], 2, 'Tu m\'as envoyé l\'annonce: object, so que.'],
       ['Le loyer, ___ augmente chaque année, devient trop cher.', ['qui', 'que', 'où'], 0, 'Le loyer is the subject of augmente, so qui.']],
      [['L\'appartement que nous avons visité est au troisième étage.', 'The flat we visited is on the third floor.'],
       ['C\'est une ville où il fait froid en hiver.', 'It is a city where it is cold in winter.'],
       ['J\'ai un colocataire qui cuisine très bien.', 'I have a roommate who cooks very well.']]),
    L('dont', ['Dont: the job I dream of', 'Le pronom dont'], 'relatifs', ['relatifs', 'verbes'],
      [['Dont replaces de + something after verbs and phrases with de: parler de, avoir besoin de, rêver de, être fier de.', 'Dont remplace de + complément : parler de, avoir besoin de, rêver de, être fier de.'],
       ['Dont also means whose: la collègue dont le mari est médecin (the colleague whose husband is a doctor).', 'Dont exprime aussi la possession : la collègue dont le mari est médecin.']],
      [['C\'est le collègue ___ je t\'ai parlé.', ['que', 'dont', 'qui'], 1, 'Parler de quelqu\'un, so dont.'],
       ['Voici le dossier ___ j\'ai besoin.', ['dont', 'que', 'où'], 0, 'Avoir besoin de, so dont.'],
       ['Le poste ___ je rêve est à Montréal.', ['que', 'où', 'dont'], 2, 'Rêver de, so dont.'],
       ['C\'est un projet ___ je suis très fier.', ['dont', 'que', 'qui'], 0, 'Être fier de, so dont.'],
       ['L\'entreprise ___ je travaille embauche.', ['dont', 'où', 'que'], 1, 'Travailler dans une entreprise is a place, so où.'],
       ['La candidate ___ nous avons choisie commence lundi.', ['dont', 'qui', 'que'], 2, 'Choisir quelqu\'un has no de, so que.'],
       ['C\'est une collègue ___ le mari est médecin.', ['que', 'dont', 'qui'], 1, 'Le mari de cette collègue, so dont le mari (whose husband).'],
       ['Le dossier ___ tu t\'occupes est urgent.', ['dont', 'que', 'où'], 0, 'S\'occuper de, so dont.']],
      [['C\'est le poste dont je rêve.', 'It is the job I dream of.'],
       ['Voici le collègue dont je t\'ai parlé.', 'Here is the colleague I told you about.'],
       ['J\'ai les compétences dont vous avez besoin.', 'I have the skills you need.']]),
    L('pqp', ['Had done: the plus-que-parfait', 'Le plus-que-parfait'], 'pqp', ['pcetre', 'imparfait'],
      [['Plus-que-parfait = avoir or être in the imparfait + past participle: j\'avais fini, elle était partie.', 'Plus-que-parfait = avoir ou être à l\'imparfait + participe passé : j\'avais fini, elle était partie.'],
       ['Use it for an action that happened before another past action: quand je suis arrivé, le train était déjà parti.', 'On l\'utilise pour une action antérieure à une autre action passée.']],
      [['Quand je suis arrivé, le train ___ déjà parti.', ['avait', 'était', 'a'], 1, 'Partir takes être: il était parti.'],
       ['Elle m\'a dit qu\'elle ___ déjà visité Québec.', ['avait', 'était', 'a'], 0, 'Visiter takes avoir: elle avait visité.'],
       ['Nous ___ quitté notre pays deux ans plus tôt.', ['étions', 'avons', 'avions'], 2, 'Quitter takes avoir, in the imparfait: nous avions quitté.'],
       ['Ils étaient fatigués parce qu\'ils n\'___ pas dormi.', ['avaient', 'étaient', 'ont'], 0, 'The not sleeping came first: ils n\'avaient pas dormi.'],
       ['Je n\'avais jamais ___ de neige avant cet hiver.', ['voir', 'vu', 'vois'], 1, 'Past participle of voir: vu.'],
       ['Quand nous sommes arrivés, nos amis ___ préparé un repas.', ['ont', 'auront', 'avaient'], 2, 'The meal was ready before we arrived: plus-que-parfait.'],
       ['Elle s\'___ installée à Halifax avant de trouver un emploi.', ['était', 'avait', 'est'], 0, 'Reflexive verbs take être: elle s\'était installée.'],
       ['Si seulement j\'___ su !', ['aurais', 'avais', 'ai'], 1, 'Si seulement + plus-que-parfait expresses a regret: if only I had known!']],
      [['Quand je suis arrivé, il avait déjà neigé.', 'When I arrived, it had already snowed.'],
       ['Elle avait rempli tous les formulaires.', 'She had filled in all the forms.'],
       ['Nous n\'avions jamais vu autant de neige.', 'We had never seen so much snow.']]),
    L('si', ['If…: si sentences', 'Les phrases avec si'], 'si', ['conditionnel', 'futur'],
      [['A real possibility: si + present, then future or present. S\'il pleut, je prendrai le bus.', 'Possibilité réelle : si + présent, puis futur ou présent.'],
       ['An imagined situation: si + imparfait, then conditional. Si j\'avais une voiture, je polluerais plus. Never put the conditional right after si.', 'Situation imaginaire : si + imparfait, puis conditionnel. Jamais de conditionnel juste après si.']],
      [['Si tu recycles, tu ___ moins de déchets.', ['produirais', 'produiras', 'produisais'], 1, 'Si + present → future: tu produiras.'],
       ['Si nous prenions le bus, nous ___ de l\'argent.', ['économiserons', 'économisons', 'économiserions'], 2, 'Si + imparfait → conditional: nous économiserions.'],
       ['S\'il ___ beau demain, on ira à vélo.', ['fait', 'ferait', 'faisait'], 0, 'A real plan for tomorrow: si + present, then future.'],
       ['Si j\'___ une voiture électrique, je polluerais moins.', ['aurais', 'avais', 'ai'], 1, 'No conditional after si: si j\'avais.'],
       ['Si on ne protège pas les forêts, il y ___ plus d\'incendies.', ['aura', 'aurait', 'avait'], 0, 'Si + present → future: il y aura.'],
       ['Que ferais-tu si tu ___ ministre ?', ['serais', 'es', 'étais'], 2, 'An imagined situation: si + imparfait, si tu étais.'],
       ['Si tu as le temps, ___-moi à trier les déchets.', ['aide', 'aiderais', 'aidais'], 0, 'Si + present can be followed by an order (imperative).'],
       ['Si les gens consommaient moins, la planète ___ mieux.', ['ira', 'irait', 'allait'], 1, 'Si + imparfait → conditional: irait.']],
      [['Si tout le monde recyclait, il y aurait moins de déchets.', 'If everyone recycled, there would be less waste.'],
       ['S\'il pleut, je prendrai le métro.', 'If it rains, I will take the subway.'],
       ['Si j\'étais toi, je prendrais le vélo.', 'If I were you, I would take the bike.']]),
    L('discours', ['Reporting what people say', 'Le discours indirect'], 'discours', ['questions', 'pronoms'],
      [['Statements become que: « Je suis malade » → elle dit qu\'elle est malade. Pronouns and possessives change to fit.', 'Une affirmation devient que + phrase : elle dit qu\'elle est malade. Les pronoms changent.'],
       ['Yes/no questions become si; qu\'est-ce que becomes ce que; qu\'est-ce qui becomes ce qui; orders become de + infinitive.', 'Question fermée → si ; qu\'est-ce que → ce que ; qu\'est-ce qui → ce qui ; ordre → de + infinitif.']],
      [['« Je suis malade. » → Elle dit qu\'elle ___ malade.', ['est', 'suis', 'soit'], 0, 'Je becomes elle, so the verb follows: elle est.'],
       ['« Tu viens ? » → Il me demande ___ je viens.', ['que', 'si', 'ce que'], 1, 'A yes/no question is reported with si.'],
       ['« Qu\'est-ce que tu veux ? » → Elle demande ___ je veux.', ['qu\'est-ce que', 'que', 'ce que'], 2, 'Qu\'est-ce que becomes ce que.'],
       ['« Rappelez demain. » → L\'agent me dit ___ rappeler demain.', ['de', 'que', 'à'], 0, 'An order is reported with de + infinitive.'],
       ['« J\'ai perdu ma carte. » → Paul dit qu\'___ perdu sa carte.', ['j\'ai', 'il a', 'il avait'], 1, 'Je becomes il and ma becomes sa; with dit (present), the tense stays.'],
       ['« Où est le guichet ? » → Elle demande ___ est le guichet.', ['où', 'si', 'que'], 0, 'Question words like où, quand, comment stay.'],
       ['« Nous arriverons à 9 h. » → Ils disent qu\'ils ___ à 9 h.', ['arriverons', 'arriveront', 'arrivent'], 1, 'Nous becomes ils: ils arriveront.'],
       ['« Qu\'est-ce qui se passe ? » → Elle demande ___ se passe.', ['ce que', 'qu\'est-ce qui', 'ce qui'], 2, 'Qu\'est-ce qui becomes ce qui.']],
      [['Elle dit qu\'elle rappellera demain.', 'She says she will call back tomorrow.'],
       ['Il me demande si j\'ai une pièce d\'identité.', 'He asks me whether I have ID.'],
       ['L\'agent nous dit de patienter.', 'The agent tells us to wait.']]),
    L('qindirect', ['Asking politely: savez-vous si…', 'Les questions indirectes'], 'discours', ['discours', 'conditionnel'],
      [['After je me demande, je voudrais savoir, pouvez-vous me dire…, the question keeps normal word order: no inversion, no est-ce que.', 'Après je me demande, je voudrais savoir, pouvez-vous me dire…, pas d\'inversion ni de est-ce que.'],
       ['Si for yes/no, ce que for "what" as an object, ce qui for "what" as a subject; où, quand, combien, comment stay the same.', 'Si pour oui/non, ce que et ce qui pour « quoi » ; où, quand, combien, comment ne changent pas.']],
      [['Pouvez-vous me dire ___ la banque ouvre ? — À 9 h.', ['si', 'à quelle heure', 'que'], 1, 'The answer is a time, so à quelle heure.'],
       ['Je me demande ___ les frais sont élevés.', ['si', 'que', 'ce que'], 0, 'A yes/no question: si.'],
       ['Savez-vous ___ coûte ce compte ?', ['si', 'ce que', 'combien'], 2, 'Asking about a price: combien.'],
       ['Je voudrais savoir ___ vous proposez aux étudiants.', ['qu\'est-ce que', 'ce que', 'que'], 1, 'Qu\'est-ce que becomes ce que in an indirect question.'],
       ['Dites-moi ___ vous intéresse.', ['ce qui', 'ce que', 'qu\'est-ce qui'], 0, 'What is the subject of intéresse: ce qui.'],
       ['Je ne sais pas où ___.', ['est-ce que le guichet est', 'est le guichet', 'le guichet est-il'], 1, 'No est-ce que or inversion with -il: où est le guichet.'],
       ['J\'aimerais savoir ___ je peux rembourser mon prêt plus tôt.', ['est-ce que', 'que', 'si'], 2, 'A yes/no question: si.'],
       ['Je me demande ___ elle a choisi cette banque.', ['pourquoi', 'ce que', 'qui'], 0, 'Asking for a reason: pourquoi stays.']],
      [['Je me demande si les frais sont élevés.', 'I wonder whether the fees are high.'],
       ['Pouvez-vous me dire où est le guichet automatique ?', 'Can you tell me where the ATM is?'],
       ['Je voudrais savoir ce que vous proposez.', 'I would like to know what you offer.']])
  ]});

  FR.COURSE.push({ id: 'c8', lvl: 'B1', t: ['Saying what you think', 'Dire ce qu’on pense'], lessons: [
    L('gerondif', ['While doing: en + -ant', 'Le gérondif'], 'gerondif', ['verbes', 'imparfait'],
      [['Take the nous form of the present, drop -ons, add -ant: nous faisons → en faisant. Three are irregular: en étant, en ayant, en sachant.', 'Forme nous du présent, sans -ons, + -ant : en faisant. Irréguliers : en étant, en ayant, en sachant.'],
       ['En + -ant says two things happen at once (elle chante en cuisinant) or how something happens (on apprend en lisant). The same person does both actions.', 'Le gérondif exprime la simultanéité ou la manière. Le sujet des deux actions est le même.']],
      [['J\'apprends le français ___ des podcasts.', ['en écouter', 'en écoutant', 'écoutant en'], 1, 'En + -ant: en écoutant.'],
       ['Il s\'est blessé en ___.', ['courant', 'courir', 'couru'], 0, 'Nous courons → en courant.'],
       ['Le gérondif de faire est en ___.', ['fesant', 'faiant', 'faisant'], 2, 'Nous faisons → faisant.'],
       ['Le gérondif de être est en ___.', ['étant', 'soyant', 'êtant'], 0, 'Irregular: en étant.'],
       ['On progresse ___ régulièrement.', ['pratiqué', 'en pratiquant', 'en pratique'], 1, 'How you progress: en pratiquant.'],
       ['Ne lis pas tes messages ___ conduisant !', ['à', 'par', 'en'], 2, 'The gérondif always starts with en.'],
       ['Le gérondif de avoir est en ___.', ['ayant', 'avant', 'aiant'], 0, 'Irregular: en ayant.'],
       ['___ révisant chaque soir, tu réussiras.', ['Par', 'En', 'À'], 1, 'En + -ant can also say on what condition: if you revise every evening.']],
      [['J\'apprends en lisant des journaux.', 'I learn by reading newspapers.'],
       ['Elle chante en faisant la cuisine.', 'She sings while cooking.'],
       ['On progresse en faisant des erreurs.', 'You make progress by making mistakes.']]),
    L('doublepron', ['Two pronouns: je le lui donne', 'Deux pronoms ensemble'], 'doublepron', ['pronoms', 'food'],
      [['Order before the verb: me, te, nous, vous → then le, la, les → then lui, leur → then y → then en. Je te le donne; je le lui donne.', 'Ordre : me/te/nous/vous, puis le/la/les, puis lui/leur, puis y, puis en.'],
       ['In a positive order the pronouns follow the verb, direct object first: donne-le-moi, envoyez-la-leur.', 'À l\'impératif affirmatif, les pronoms suivent le verbe : donne-le-moi.']],
      [['Tu me donnes le reçu ? — Oui, je ___ donne.', ['le te', 'te le', 'lui le'], 1, 'Me/te come before le: je te le donne.'],
       ['Tu as rendu la robe à ta sœur ? — Oui, je ___ ai rendue.', ['la lui', 'lui la', 'la leur'], 0, 'Le/la come before lui: je la lui ai rendue.'],
       ['Il vous envoie le colis ? — Oui, il ___ envoie.', ['le nous', 'lui l\'', 'nous l\''], 2, 'Nous before le, and le becomes l\' before a vowel: il nous l\'envoie.'],
       ['Vous montrez les photos aux clients ? — Oui, je ___ montre.', ['les leur', 'leur les', 'les lui'], 0, 'Aux clients → leur; les before leur.'],
       ['Tu me prêtes ta carte ? — Non, je ne ___ prête pas.', ['la te', 'te lui', 'te la'], 2, 'Te before la, and ne goes before both: je ne te la prête pas.'],
       ['Il y a des chaussures en solde ? — Oui, il y ___ a.', ['les', 'en', 'y'], 1, 'Y comes before en: il y en a.'],
       ['Donne-___ ! (le livre, à moi)', ['moi-le', 'me-le', 'le-moi'], 2, 'Positive order: verb, then le, then moi.'],
       ['On vous a proposé une remise ? — Oui, on ___ a proposé une.', ['nous en', 'en nous', 'nous y'], 0, 'Nous before en: on nous en a proposé une.']],
      [['Je te le donne demain.', 'I will give it to you tomorrow.'],
       ['Elle la lui a rendue hier.', 'She gave it back to him yesterday.'],
       ['Envoyez-le-moi par courriel.', 'Send it to me by email.']]),
    L('celui', ['This one, that one: celui, celle', 'Celui, celle, ceux, celles'], 'celui', ['adjectifs', 'questions'],
      [['Celui (m), celle (f), ceux (m pl), celles (f pl) replace a noun you have just named, so you don\'t repeat it.', 'Celui, celle, ceux, celles remplacent un nom déjà cité.'],
       ['They never stand alone: add -ci / -là (celui-ci), de (celui de ma sœur) or qui / que (celle qui dure).', 'Ils ne s\'emploient jamais seuls : celui-ci, celui de…, celle qui…']],
      [['J\'aime ce téléphone, mais je préfère ___ de ma sœur.', ['celle', 'celui', 'ceux'], 1, 'Téléphone is masculine singular: celui.'],
       ['Cette marque est moins chère que ___ que tu as choisie.', ['celle', 'celui', 'celles'], 0, 'Marque is feminine singular: celle.'],
       ['Ces écrans sont bons, mais ___-ci sont plus grands.', ['celles', 'celui', 'ceux'], 2, 'Écrans is masculine plural: ceux.'],
       ['Quelle batterie ? ___ qui dure le plus longtemps.', ['Celle', 'Celui', 'Ceux'], 0, 'Batterie is feminine: celle.'],
       ['Entre ces deux forfaits, je prends ___-là.', ['ce', 'celui', 'celle'], 1, 'Forfait is masculine: celui-là.'],
       ['Les avis positifs sont plus utiles que ___ qui ne disent rien.', ['celles', 'ce', 'ceux'], 2, 'Avis is masculine plural here: ceux.'],
       ['Les meilleures offres sont ___ du vendredi.', ['celles', 'ceux', 'celle'], 0, 'Offres is feminine plural: celles.'],
       ['___ qui veulent un rabais doivent s\'inscrire.', ['Celui', 'Ceux', 'Ce'], 1, 'Ceux qui = those who, for people in general.']],
      [['Je préfère celui-ci.', 'I prefer this one.'],
       ['Ce modèle est moins cher que celui de l\'an dernier.', 'This model is cheaper than last year\'s.'],
       ['Ceux qui comparent les prix économisent.', 'Those who compare prices save money.']]),
    L('mien', ['Mine, yours: le mien, le tien', 'Le mien, le tien, le nôtre'], 'mien', ['possessifs', 'maison'],
      [['The pronoun agrees with the thing owned, not the owner: ta clé → la mienne; ton vélo → le mien; tes lunettes → les miennes.', 'Le pronom s\'accorde avec l\'objet possédé : la mienne, le mien, les miennes.'],
       ['The forms: le mien, le tien, le sien, le nôtre, le vôtre, le leur (+ la / les forms). Nôtre and vôtre take a circumflex.', 'Le mien, le tien, le sien, le nôtre, le vôtre, le leur. Accent circonflexe sur nôtre et vôtre.']],
      [['Ce n\'est pas ton parapluie, c\'est ___.', ['la mienne', 'le mien', 'les miens'], 1, 'Parapluie is masculine singular: le mien.'],
       ['Ma clé ne marche pas. Je peux prendre ___ ?', ['la tienne', 'le tien', 'les tiennes'], 0, 'Clé is feminine singular: la tienne.'],
       ['Leurs enfants ont dix ans ; ___ ont six ans.', ['le nôtre', 'nos', 'les nôtres'], 2, 'Our children: plural, les nôtres.'],
       ['À qui sont ces lunettes ? — Ce sont ___ (à elle).', ['les siens', 'les siennes', 'la sienne'], 1, 'Lunettes is feminine plural: les siennes.'],
       ['Mon portefeuille est noir. Et ___, Marc ?', ['le tien', 'la tienne', 'ton'], 0, 'Portefeuille is masculine: le tien.'],
       ['Nos voisins ont un grand jardin, mais ___ est plus ensoleillé.', ['la nôtre', 'notre', 'le nôtre'], 2, 'Jardin is masculine: le nôtre.'],
       ['Vos clés sont sur la table ; ___ sont dans ma poche.', ['les miennes', 'les miens', 'mes'], 0, 'Clés is feminine plural: les miennes.'],
       ['Leur voiture est rouge ; ___ est bleue (à vous).', ['votre', 'la vôtre', 'le vôtre'], 1, 'Voiture is feminine: la vôtre.']],
      [['Ce n\'est pas ton vélo, c\'est le mien.', 'That isn\'t your bike, it\'s mine.'],
       ['Leur appartement est plus grand que le nôtre.', 'Their flat is bigger than ours.'],
       ['Ces clés sont les tiennes ?', 'Are these keys yours?']]),
    L('connecteurs', ['Linking ideas: pourtant, donc, alors que', 'Les mots de liaison'], 'connecteurs', ['opinion', 'questions'],
      [['Cause and result: grâce à (a good cause), à cause de (a bad cause), donc, c\'est pourquoi.', 'Cause et conséquence : grâce à, à cause de, donc, c\'est pourquoi.'],
       ['Contrast: pourtant (and yet, surprising), alors que (whereas), par contre (on the other hand), malgré + noun (despite).', 'Opposition : pourtant, alors que, par contre, malgré + nom.']],
      [['Il a beaucoup étudié, ___ il a raté l\'examen.', ['donc', 'pourtant', 'en effet'], 1, 'A surprising result: pourtant.'],
       ['Il pleuvait, ___ nous sommes restés à la maison.', ['donc', 'pourtant', 'alors que'], 0, 'A normal result: donc.'],
       ['Elle adore le froid, ___ son frère le déteste.', ['donc', 'grâce à', 'alors que'], 2, 'A contrast between two people: alors que.'],
       ['Le match a été annulé ___ la tempête.', ['grâce à', 'à cause de', 'malgré'], 1, 'A bad cause: à cause de.'],
       ['J\'ai trouvé un emploi ___ mon cousin.', ['grâce à', 'à cause de', 'malgré'], 0, 'A good cause: grâce à.'],
       ['___ la pluie, le festival a eu lieu.', ['Grâce à', 'Donc', 'Malgré'], 2, 'Despite the rain: malgré + noun.'],
       ['Ce quartier est cher. ___, il est très bien situé.', ['Par contre', 'Donc', 'C\'est pourquoi'], 0, 'A good point against a bad one: par contre.'],
       ['Les loyers augmentent. ___, beaucoup de jeunes vivent en colocation.', ['Pourtant', 'C\'est pourquoi', 'Malgré'], 1, 'The second sentence is a result: c\'est pourquoi.']],
      [['Il fait froid ; pourtant, il sort sans manteau.', 'It is cold; yet he goes out without a coat.'],
       ['Grâce à ce programme, j\'ai trouvé un emploi.', 'Thanks to this programme, I found a job.'],
       ['Elle travaille le jour, alors que lui travaille la nuit.', 'She works during the day, whereas he works at night.']]),
    L('opinion', ['Giving your opinion', 'Donner son opinion'], 'opinion', ['subjonctif', 'connecteurs'],
      [['Je pense que, je crois que, je trouve que, il me semble que take the indicative: je pense que c\'est vrai.', 'Je pense que, je crois que, je trouve que, il me semble que + indicatif.'],
       ['In the negative, or with doubt and possibility, use the subjunctive: je ne pense pas que ce soit vrai, je doute qu\'il ait raison.', 'À la forme négative, ou avec le doute et la possibilité : subjonctif.']],
      [['Je pense que le télétravail ___ une bonne idée.', ['soit', 'est', 'être'], 1, 'Affirmative opinion: indicative, est.'],
       ['Je ne pense pas que ce ___ une bonne idée.', ['est', 'sera', 'soit'], 2, 'Negative opinion: subjunctive, soit.'],
       ['Je doute qu\'il ___ raison.', ['ait', 'a', 'aura'], 0, 'Douter que takes the subjunctive: ait.'],
       ['À mon ___, il faut travailler au bureau.', ['opinion', 'avis', 'idée'], 1, 'The set phrase is à mon avis.'],
       ['Je suis d\'accord ___ toi.', ['à', 'de', 'avec'], 2, 'Être d\'accord avec quelqu\'un.'],
       ['Il me semble que les gens ___ plus heureux chez eux.', ['sont', 'soient', 'être'], 0, 'Il me semble que takes the indicative.'],
       ['Il est possible que le bureau ___ fermé lundi.', ['est', 'soit', 'sera'], 1, 'Il est possible que takes the subjunctive.'],
       ['Le télétravail a des avantages, ___ il a aussi des inconvénients.', ['donc', 'car', 'mais'], 2, 'A contrast: mais.']],
      [['À mon avis, le télétravail est une bonne solution.', 'In my opinion, remote work is a good solution.'],
       ['Je ne pense pas que ce soit possible.', 'I don\'t think it is possible.'],
       ['Je suis d\'accord avec toi.', 'I agree with you.']])
  ]});

  // Rule pages.
  FR.RULES.push(
    { id: 'relatifs', t: ['Qui, que, où, dont', 'Qui, que, où, dont'], lesson: 'relatifs',
      sum: ['Relative pronouns join two sentences about the same thing. The choice depends on the job the word does in the second sentence.', 'Les pronoms relatifs relient deux phrases. Le choix dépend de la fonction du mot dans la deuxième phrase.'],
      pts: [['qui', ['the subject: la voisine qui parle (la voisine parle)', 'sujet : la voisine qui parle']],
            ['que', ['the object: l\'appartement que j\'ai visité (j\'ai visité l\'appartement). Que becomes qu\' before a vowel.', 'complément d\'objet : l\'appartement que j\'ai visité. Qu\' devant une voyelle.']],
            ['où', ['a place or a time: le quartier où j\'habite, le jour où je suis arrivé', 'lieu ou moment : le quartier où j\'habite, le jour où je suis arrivé']],
            ['dont', ['replaces de + noun: le poste dont je rêve (rêver de), the colleague dont le mari… (whose)', 'remplace de + nom : le poste dont je rêve ; la collègue dont le mari…']],
            ['check', ['Rebuild the second sentence: if the noun is before the verb, qui; after it, que; after de, dont.', 'Reconstruisez la phrase : sujet → qui, objet → que, de + nom → dont.']]],
      ex: [['La femme qui habite en face est infirmière.', 'The woman who lives opposite is a nurse.'], ['Le film que j\'ai vu était triste.', 'The film I saw was sad.'], ['C\'est la ville où je suis né.', 'It is the city where I was born.'], ['Voici le livre dont je t\'ai parlé.', 'Here is the book I told you about.']] },
    { id: 'pqp', t: ['The plus-que-parfait', 'Le plus-que-parfait'], lesson: 'pqp',
      sum: ['The past before the past: what had already happened.', 'Le passé du passé : ce qui s\'était déjà passé.'],
      pts: [['form', ['avoir or être in the imparfait + past participle: j\'avais mangé, elle était venue', 'avoir ou être à l\'imparfait + participe passé']],
            ['avoir or être', ['the same choice as in the passé composé: verbs of movement and reflexive verbs take être', 'le même choix qu\'au passé composé']],
            ['when', ['an action before another past action: quand il est arrivé, nous avions fini', 'une action antérieure à une autre action passée']],
            ['regret', ['si seulement + plus-que-parfait: si seulement j\'avais su ! (if only I had known)', 'si seulement + plus-que-parfait : regret']],
            ['agreement', ['with être, the participle agrees: elle était partie, ils étaient arrivés', 'avec être, accord du participe']]],
      ex: [['Il avait déjà mangé quand je suis arrivé.', 'He had already eaten when I arrived.'], ['Elle était partie deux heures plus tôt.', 'She had left two hours earlier.'], ['Si seulement j\'avais écouté !', 'If only I had listened!']] },
    { id: 'si', t: ['Si sentences', 'Les phrases avec si'], lesson: 'si',
      sum: ['The tense after si decides the tense in the other half.', 'Le temps après si décide du temps dans l\'autre partie.'],
      pts: [['real', ['si + present → future, present or an order: s\'il pleut, je resterai ; si tu as faim, mange', 'si + présent → futur, présent ou impératif']],
            ['imagined', ['si + imparfait → conditional: si j\'avais le temps, je voyagerais', 'si + imparfait → conditionnel']],
            ['never', ['no future and no conditional straight after si: si j\'aurais ✗, si j\'avais ✓', 'jamais de futur ni de conditionnel juste après si']],
            ['si + il', ['si becomes s\' only before il and ils: s\'il, but si elle', 'si devient s\' seulement devant il et ils']],
            ['order', ['the si half can come first or second: je voyagerais si j\'avais le temps', 'la partie avec si peut venir en premier ou en second']]],
      ex: [['Si tu viens, on ira au cinéma.', 'If you come, we\'ll go to the cinema.'], ['Si j\'étais riche, j\'achèterais une maison.', 'If I were rich, I would buy a house.'], ['On recycle plus si c\'est facile.', 'People recycle more if it is easy.']] },
    { id: 'discours', t: ['Reported speech & indirect questions', 'Discours et questions indirects'], lesson: 'discours',
      sum: ['To report words or ask politely, the sentence becomes a normal statement after que, si, ce que or a question word.', 'Pour rapporter des paroles ou poser une question polie, la phrase devient une affirmation.'],
      pts: [['statement', ['que + sentence: il dit qu\'il est fatigué', 'que + phrase']],
            ['yes / no', ['si: elle demande si tu viens · je me demande s\'il pleut', 'si']],
            ['what', ['qu\'est-ce que → ce que · qu\'est-ce qui → ce qui', 'ce que, ce qui']],
            ['question words', ['où, quand, comment, pourquoi, combien stay: dites-moi où vous habitez', 'les mots interrogatifs restent']],
            ['order', ['de + infinitive: il me dit de patienter', 'de + infinitif']],
            ['word order', ['no inversion and no est-ce que: je ne sais pas où il est (not où est-il)', 'pas d\'inversion ni de est-ce que']],
            ['past', ['after a past verb (il a dit), tenses shift back: il a dit qu\'il était fatigué. You will meet this at B2.', 'après un verbe au passé, les temps changent (niveau B2)']]],
      ex: [['Elle dit qu\'elle arrivera à midi.', 'She says she\'ll arrive at noon.'], ['Pouvez-vous me dire combien ça coûte ?', 'Can you tell me how much it costs?'], ['Je me demande ce qu\'il veut.', 'I wonder what he wants.']] },
    { id: 'gerondif', t: ['The gérondif: en + -ant', 'Le gérondif'], lesson: 'gerondif',
      sum: ['En + -ant: two actions by the same person at the same time, or the way something is done.', 'Deux actions de la même personne en même temps, ou la manière.'],
      pts: [['form', ['nous form without -ons + -ant: parlons → en parlant, finissons → en finissant', 'radical de nous + -ant']],
            ['irregular', ['en étant, en ayant, en sachant', 'en étant, en ayant, en sachant']],
            ['at the same time', ['il écoute de la musique en travaillant', 'simultanéité']],
            ['how', ['on apprend en pratiquant · elle a maigri en marchant', 'manière ou moyen']],
            ['same subject', ['the subject of both actions must be the same person', 'le même sujet pour les deux actions']]],
      ex: [['Je me suis coupé en cuisinant.', 'I cut myself while cooking.'], ['En partant tôt, on évitera la circulation.', 'By leaving early, we\'ll avoid the traffic.'], ['Il est tombé en courant.', 'He fell while running.']] },
    { id: 'doublepron', t: ['Two pronouns together', 'Les doubles pronoms'], lesson: 'doublepron',
      sum: ['When two pronouns go before the verb, they follow a fixed order.', 'Deux pronoms devant le verbe suivent un ordre fixe.'],
      pts: [['order', ['me / te / nous / vous → le / la / les → lui / leur → y → en', 'me/te/nous/vous → le/la/les → lui/leur → y → en']],
            ['examples', ['je te le donne · je le lui donne · il y en a · je vous en parle', 'je te le donne, je le lui donne, il y en a']],
            ['negative', ['ne goes before both pronouns: je ne te le donne pas', 'ne devant les deux pronoms']],
            ['positive order', ['after the verb, direct object first: donne-le-moi, rends-la-leur', 'après le verbe : donne-le-moi']],
            ['past', ['the participle agrees with a direct object pronoun before it: la robe ? je la lui ai rendue', 'accord avec le COD placé avant']]],
      ex: [['Je te la prête demain.', 'I\'ll lend it to you tomorrow.'], ['Il nous en a parlé.', 'He told us about it.'], ['Montrez-les-moi.', 'Show them to me.']] },
    { id: 'celui', t: ['Celui, celle, ceux, celles', 'Les pronoms démonstratifs'], lesson: 'celui',
      sum: ['Use them to avoid repeating a noun: the one, the ones.', 'Pour ne pas répéter un nom : celui, celle, ceux, celles.'],
      pts: [['forms', ['celui (m), celle (f), ceux (m pl), celles (f pl)', 'celui, celle, ceux, celles']],
            ['-ci / -là', ['this one / that one: celui-ci, celle-là', 'celui-ci, celle-là']],
            ['de', ['belonging: celui de mon frère (my brother\'s)', 'appartenance : celui de mon frère']],
            ['qui / que', ['celle qui coûte moins cher · ceux que j\'ai achetés', 'celle qui…, ceux que…']],
            ['people', ['ceux qui = those who: ceux qui travaillent le dimanche', 'ceux qui = les gens qui']]],
      ex: [['Quel gâteau ? Celui au chocolat.', 'Which cake? The chocolate one.'], ['Mes chaussures sont plus vieilles que celles de Léa.', 'My shoes are older than Léa\'s.'], ['Celle-ci est trop petite.', 'This one is too small.']] },
    { id: 'mien', t: ['Le mien, le tien, le nôtre', 'Les pronoms possessifs'], lesson: 'mien',
      sum: ['Mine, yours, ours: they agree with the thing owned.', 'Ils s\'accordent avec l\'objet possédé.'],
      pts: [['mine', ['le mien, la mienne, les miens, les miennes', 'le mien, la mienne, les miens, les miennes']],
            ['yours (tu)', ['le tien, la tienne, les tiens, les tiennes', 'le tien, la tienne…']],
            ['his / hers', ['le sien, la sienne… (the same word for his and hers)', 'le sien, la sienne… (pour lui et pour elle)']],
            ['ours / yours / theirs', ['le nôtre, le vôtre, le leur · plural: les nôtres, les vôtres, les leurs', 'le nôtre, le vôtre, le leur']],
            ['spelling', ['notre voiture (no accent) but la nôtre (accent)', 'notre sans accent, la nôtre avec accent']],
            ['with à / de', ['à + le mien = au mien: je pense au mien', 'au mien, du mien']]],
      ex: [['Ta valise est lourde ; la mienne est légère.', 'Your suitcase is heavy; mine is light.'], ['C\'est ton avis, ce n\'est pas le mien.', 'That\'s your opinion, not mine.'], ['Leurs enfants jouent avec les nôtres.', 'Their children play with ours.']] },
    { id: 'connecteurs', t: ['Linking words', 'Les connecteurs logiques'], lesson: 'connecteurs',
      sum: ['Linking words show how ideas connect. Readers and examiners look for them.', 'Les connecteurs montrent le lien entre les idées. On les attend à l\'examen.'],
      pts: [['cause', ['parce que, car, grâce à (good), à cause de (bad), comme (at the start)', 'parce que, car, grâce à, à cause de, comme']],
            ['result', ['donc, alors, c\'est pourquoi, par conséquent', 'donc, alors, c\'est pourquoi, par conséquent']],
            ['contrast', ['mais, pourtant, cependant, par contre, alors que, malgré + noun', 'mais, pourtant, cependant, par contre, alors que, malgré']],
            ['adding', ['de plus, en plus, aussi, d\'ailleurs', 'de plus, en plus, aussi, d\'ailleurs']],
            ['explaining', ['en effet (indeed), c\'est-à-dire, par exemple', 'en effet, c\'est-à-dire, par exemple']],
            ['ordering', ['d\'abord, ensuite, puis, enfin · d\'une part … d\'autre part', 'd\'abord, ensuite, enfin']]],
      ex: [['Malgré la neige, l\'école est ouverte.', 'Despite the snow, the school is open.'], ['Il est malade, c\'est pourquoi il reste au lit.', 'He is ill, that\'s why he stays in bed.'], ['Le métro est rapide ; par contre, il est plein.', 'The subway is fast; on the other hand, it is full.']] },
    { id: 'opinion', t: ['Giving an opinion', 'Donner son opinion'], lesson: 'opinion',
      sum: ['Opinion phrases take the indicative when you are sure, and the subjunctive with negation or doubt.', 'Indicatif quand on est sûr ; subjonctif avec la négation ou le doute.'],
      pts: [['to start', ['à mon avis, selon moi, pour moi, d\'après moi', 'à mon avis, selon moi, pour moi']],
            ['+ indicative', ['je pense que, je crois que, je trouve que, il me semble que, je suis sûr que', 'je pense que, je crois que… + indicatif']],
            ['+ subjunctive', ['je ne pense pas que, je ne crois pas que, je doute que, il est possible que', 'je ne pense pas que, je doute que… + subjonctif']],
            ['agreeing', ['je suis d\'accord (avec toi), tu as raison, c\'est vrai', 'je suis d\'accord, tu as raison']],
            ['disagreeing politely', ['je ne suis pas tout à fait d\'accord · je comprends, mais… · il est vrai que…, par contre…', 'je ne suis pas tout à fait d\'accord ; je comprends, mais…']]],
      ex: [['Je trouve que c\'est trop cher.', 'I think it\'s too expensive.'], ['Je ne crois pas qu\'il vienne.', 'I don\'t think he\'s coming.'], ['Tu as raison, mais il est vrai que c\'est pratique.', 'You\'re right, but it is true that it\'s handy.']] }
  );

  // A short text for each lesson, using its grammar, with three questions.
  const T = (id, kind, t, s, q) => FR.CR.push({ id: 'l-' + id, lesson: id, kind, t, s, q });
  T('relatifs', 'notice', ['Appartement à louer', 'Flat for rent'], [
    ['À louer : grand quatre et demie à Sherbrooke, près de l\'université.', 'For rent: a large 4½ (two bedrooms) in Sherbrooke, near the university.'],
    ['C\'est un appartement qui donne sur un parc et qui reçoit beaucoup de lumière.', 'It is a flat that overlooks a park and gets a lot of light.'],
    ['Le quartier où il se trouve est calme, mais l\'autobus passe à deux minutes.', 'The area where it is located is quiet, but the bus stops two minutes away.'],
    ['Le loyer est de 1 250 $ par mois, chauffage et eau chaude inclus.', 'The rent is $1,250 a month, heating and hot water included.'],
    ['L\'électricité, que le locataire paie lui-même, coûte environ 60 $ par mois.', 'Electricity, which the tenant pays himself, costs about $60 a month.'],
    ['Le bail commence le 1er juillet, le jour où beaucoup de Québécois déménagent.', 'The lease starts on 1 July, the day when many Quebecers move.'],
    ['Animaux non acceptés. Visites le samedi seulement.', 'No pets. Viewings on Saturdays only.'],
    ['Écrivez à Mme Tremblay, la propriétaire, qui répond en français et en anglais.', 'Write to Mrs Tremblay, the landlady, who answers in French and English.']],
    [['main', 'Ce texte est…', 'This text is…', ['une annonce pour louer un appartement', 'une lettre de plainte d\'un locataire', 'un article sur les déménagements'], 0, 'It describes a flat, its price and how to visit it: a rental ad.'],
     ['detail', 'Qu\'est-ce qui n\'est pas compris dans le loyer ?', 'What is not included in the rent?', ['l\'électricité', 'le chauffage', 'l\'eau chaude'], 0, '"L\'électricité, que le locataire paie lui-même": the tenant pays it on top.'],
     ['tf', 'On peut avoir un chat dans l\'appartement.', 'You can have a cat in the flat.', null, 1, '"Animaux non acceptés": no pets, so it is false.']]);
  T('dont', 'email', ['Candidature à un poste', 'Applying for a job'], [
    ['Objet : candidature au poste d\'agent de service à la clientèle', 'Subject: application for the customer service agent position'],
    ['Madame, Monsieur,', 'Dear Sir or Madam,'],
    ['Je vous écris au sujet de l\'offre d\'emploi dont j\'ai pris connaissance sur votre site.', 'I am writing about the job posting I read on your website.'],
    ['Je travaille depuis trois ans dans un centre d\'appels, où je réponds aux clients en français et en anglais.', 'I have been working for three years in a call centre, where I answer customers in French and English.'],
    ['C\'est une expérience dont je suis fière, car mon équipe a reçu un prix l\'an dernier.', 'It is an experience I am proud of, because my team won an award last year.'],
    ['Je pense avoir les compétences dont vous avez besoin : patience, organisation et sens de l\'écoute.', 'I believe I have the skills you need: patience, organisation and good listening.'],
    ['Le poste à temps plein dont parle l\'annonce m\'intéresse particulièrement.', 'The full-time position the ad mentions interests me in particular.'],
    ['Vous trouverez mon CV en pièce jointe. Je suis disponible pour un entretien à partir du 3 mars.', 'You will find my CV attached. I am available for an interview from 3 March.'],
    ['Veuillez agréer, Madame, Monsieur, mes salutations distinguées. Samira Haddad', 'Yours faithfully, Samira Haddad']],
    [['main', 'Pourquoi Samira écrit-elle ?', 'Why is Samira writing?', ['pour poser sa candidature à un poste', 'pour se plaindre d\'un service', 'pour remercier son équipe'], 0, 'She refers to a job posting and attaches her CV: she is applying.', 'candidature'],
     ['detail', 'Quelle expérience Samira a-t-elle ?', 'What experience does Samira have?', ['trois ans dans un centre d\'appels', 'trois ans dans une université', 'un an dans un magasin'], 0, '"Je travaille depuis trois ans dans un centre d\'appels."'],
     ['word', 'Dans « dont j\'ai pris connaissance », prendre connaissance de veut dire…', 'In "dont j\'ai pris connaissance", prendre connaissance de means…', ['lire, découvrir', 'refuser', 'écrire'], 0, 'Prendre connaissance de quelque chose = to read or find out about it.']]);
  T('pqp', 'story', ['Mon premier hiver', 'My first winter'], [
    ['Je suis arrivée à Winnipeg un matin de janvier.', 'I arrived in Winnipeg one January morning.'],
    ['Avant de partir, j\'avais lu beaucoup d\'articles sur l\'hiver canadien.', 'Before leaving, I had read lots of articles about Canadian winters.'],
    ['J\'avais acheté un manteau chaud et des bottes, et je me sentais prête.', 'I had bought a warm coat and boots, and I felt ready.'],
    ['Mais personne ne m\'avait dit que l\'air pouvait faire mal au visage.', 'But nobody had told me that the air could hurt your face.'],
    ['Ce jour-là, il faisait moins trente-deux degrés.', 'That day it was minus thirty-two degrees.'],
    ['Mon cousin, qui s\'était installé ici cinq ans plus tôt, est venu me chercher à l\'aéroport.', 'My cousin, who had settled here five years earlier, came to pick me up at the airport.'],
    ['Il riait parce que j\'avais mis trois foulards.', 'He was laughing because I had put on three scarves.'],
    ['Aujourd\'hui, je me suis habituée au froid, et j\'adore même patiner sur la rivière.', 'Today I have got used to the cold, and I even love skating on the river.']],
    [['detail', 'Qu\'est-ce que la narratrice avait fait avant de partir ?', 'What had the narrator done before leaving?', ['Elle avait lu des articles sur l\'hiver.', 'Elle avait déjà visité Winnipeg.', 'Elle avait trouvé un emploi.'], 0, '"Avant de partir, j\'avais lu beaucoup d\'articles sur l\'hiver canadien."'],
     ['who', 'Qui est venu la chercher ?', 'Who came to pick her up?', ['son cousin, installé au Canada depuis cinq ans', 'un collègue de travail', 'une amie de l\'université'], 0, '"Mon cousin, qui s\'était installé ici cinq ans plus tôt, est venu me chercher."', 's\'installer'],
     ['infer', 'Pourquoi le cousin riait-il ?', 'Why was the cousin laughing?', ['Elle était trop couverte.', 'Elle avait oublié ses bottes.', 'Elle était arrivée en retard.'], 0, 'Three scarves at once: she had overdone it, which amused someone used to the cold.']]);
  T('si', 'opinion', ['Et si on changeait nos habitudes ?', 'What if we changed our habits?'], [
    ['Et si chacun faisait un petit effort ?', 'What if everyone made a small effort?'],
    ['Si nous prenions les transports en commun deux fois par semaine, nos villes seraient moins polluées.', 'If we took public transport twice a week, our cities would be less polluted.'],
    ['Si nous achetions moins d\'emballages, nos poubelles seraient à moitié vides.', 'If we bought less packaging, our bins would be half empty.'],
    ['Bien sûr, un geste seul ne sauvera pas la planète.', 'Of course, one action alone will not save the planet.'],
    ['Mais si des millions de personnes changent leurs habitudes, les entreprises suivront.', 'But if millions of people change their habits, companies will follow.'],
    ['Les gouvernements doivent aussi agir : sans de bonnes lois, nos efforts resteront limités.', 'Governments must act too: without good laws, our efforts will stay limited.'],
    ['Alors, si vous commenciez aujourd\'hui ?', 'So, how about starting today?']],
    [['main', 'Quelle est l\'idée principale du texte ?', 'What is the main idea of the text?', ['Les petits gestes de chacun comptent, avec l\'aide des lois.', 'Seuls les gouvernements peuvent protéger la planète.', 'Les transports en commun sont trop chers.'], 0, 'The writer argues for small personal changes, and adds that governments must act too.'],
     ['tone', 'Quel est le but de l\'auteur ?', 'What is the writer\'s aim?', ['convaincre les lecteurs d\'agir', 'informer sur une nouvelle loi', 'raconter un souvenir'], 0, 'Questions like "si vous commenciez aujourd\'hui ?" push the reader to act: the text is persuasive.'],
     ['detail', 'Que se passerait-il si on achetait moins d\'emballages ?', 'What would happen if we bought less packaging?', ['Les poubelles seraient à moitié vides.', 'Les villes seraient moins polluées.', 'Les entreprises fermeraient.'], 0, '"Si nous achetions moins d\'emballages, nos poubelles seraient à moitié vides."', 'emballage']]);
  T('discours', 'email', ['Message pour Léa', 'A message for Léa'], [
    ['Salut Léa, quelqu\'un du bureau des passeports a appelé pour toi vers 14 h.', 'Hi Léa, someone from the passport office called for you around 2 p.m.'],
    ['La dame dit que ton dossier est presque complet.', 'The lady says your file is almost complete.'],
    ['Elle demande si tu peux envoyer un justificatif de domicile avant vendredi.', 'She asks whether you can send proof of address before Friday.'],
    ['Elle précise qu\'une facture d\'électricité ou un bail suffit.', 'She specifies that an electricity bill or a lease is enough.'],
    ['Elle te demande aussi d\'écrire ton numéro de dossier sur chaque page.', 'She also asks you to write your file number on every page.'],
    ['Je lui ai demandé ce qui se passerait si tu étais en retard.', 'I asked her what would happen if you were late.'],
    ['Elle dit que ce n\'est pas grave, mais que ton passeport arrivera plus tard.', 'She says it doesn\'t matter, but that your passport will arrive later.'],
    ['Bonne soirée ! Karim', 'Have a good evening! Karim']],
    [['who', 'Qui a écrit ce message ?', 'Who wrote this message?', ['Karim, qui a répondu au téléphone', 'la dame du bureau des passeports', 'Léa'], 0, 'The note is signed Karim; he took the call for Léa.'],
     ['detail', 'Qu\'est-ce que Léa doit envoyer ?', 'What does Léa have to send?', ['un justificatif de domicile', 'son passeport', 'une photo'], 0, '"Elle demande si tu peux envoyer un justificatif de domicile."', 'justificatif de domicile'],
     ['infer', 'Que se passe-t-il si Léa envoie le document en retard ?', 'What happens if Léa sends the document late?', ['Son passeport arrivera plus tard.', 'Son dossier sera annulé.', 'Elle devra payer une amende.'], 0, '"Ce n\'est pas grave, mais ton passeport arrivera plus tard."']]);
  T('qindirect', 'dialogue', ['À la banque', 'At the bank'], [
    ['— Bonjour, je viens d\'arriver au Canada et je voudrais savoir comment ouvrir un compte.', '— Hello, I have just arrived in Canada and I would like to know how to open an account.'],
    ['— Bienvenue ! Pouvez-vous me dire si vous avez un permis de travail ou d\'études ?', '— Welcome! Can you tell me whether you have a work or study permit?'],
    ['— Oui, un permis de travail. Je me demande aussi s\'il y a des frais mensuels.', '— Yes, a work permit. I also wonder whether there are monthly fees.'],
    ['— Pour les nouveaux arrivants, le compte chèques est gratuit pendant un an.', '— For newcomers, the chequing account is free for a year.'],
    ['— Parfait. Et savez-vous quand je recevrai ma carte de débit ?', '— Perfect. And do you know when I will get my debit card?'],
    ['— Aujourd\'hui même. Votre carte de crédit, elle, arrivera par la poste.', '— Today. Your credit card will come by post.'],
    ['— Je ne sais pas encore ce que je ferai d\'une carte de crédit…', '— I don\'t know yet what I will do with a credit card…'],
    ['— Elle vous aidera à bâtir votre historique de crédit, ce qui est très utile ici.', '— It will help you build your credit history, which is very useful here.']],
    [['who', 'Qui parle à qui ?', 'Who is talking to whom?', ['un nouvel arrivant et un employé de banque', 'deux amis dans un café', 'un étudiant et son professeur'], 0, 'The client has just arrived in Canada and asks about an account; the other person answers for the bank.'],
     ['detail', 'Combien coûte le compte chèques la première année ?', 'How much does the chequing account cost in the first year?', ['rien', '10 $ par mois', 'ça dépend du permis'], 0, '"Le compte chèques est gratuit pendant un an."', 'gratuit'],
     ['infer', 'Pourquoi l\'employé conseille-t-il la carte de crédit ?', 'Why does the employee recommend the credit card?', ['pour bâtir un historique de crédit', 'pour payer moins de frais', 'parce que la carte de débit ne marche pas'], 0, '"Elle vous aidera à bâtir votre historique de crédit."']]);
  T('gerondif', 'interview', ['« On progresse en faisant des erreurs »', '"You make progress by making mistakes"'], [
    ['— Vous parlez très bien français. Comment l\'avez-vous appris ?', '— You speak French very well. How did you learn it?'],
    ['— Surtout en écoutant la radio dans la voiture, chaque matin.', '— Mostly by listening to the radio in the car, every morning.'],
    ['— Vous avez aussi suivi des cours ?', '— Did you also take classes?'],
    ['— Oui, le soir, en travaillant à temps plein à l\'hôpital. C\'était dur !', '— Yes, in the evenings, while working full time at the hospital. It was hard!'],
    ['— Qu\'est-ce qui vous a le plus aidée ?', '— What helped you the most?'],
    ['— Mes patients. En leur parlant tous les jours, j\'ai perdu ma peur de me tromper.', '— My patients. By talking to them every day, I lost my fear of getting it wrong.'],
    ['— Un conseil pour nos lecteurs ?', '— Any advice for our readers?'],
    ['— Ne cherchez pas la perfection. On progresse en faisant des erreurs.', '— Don\'t aim for perfection. You make progress by making mistakes.']],
    [['who', 'Où travaille la personne interviewée ?', 'Where does the interviewee work?', ['dans un hôpital', 'dans une école de langues', 'à la radio'], 0, '"En travaillant à temps plein à l\'hôpital" and "mes patients".'],
     ['detail', 'Qu\'est-ce qui l\'a le plus aidée ?', 'What helped her the most?', ['parler avec ses patients', 'les cours du soir', 'les livres de grammaire'], 0, '"Mes patients. En leur parlant tous les jours…"'],
     ['main', 'Quel est son conseil principal ?', 'What is her main advice?', ['Il ne faut pas avoir peur des erreurs.', 'Il faut suivre des cours à temps plein.', 'Il faut écouter la radio le soir.'], 0, '"Ne cherchez pas la perfection. On progresse en faisant des erreurs."', 'erreur']]);
  T('doublepron', 'email', ['Un article défectueux', 'A faulty item'], [
    ['Objet : commande n° 48213, article défectueux', 'Subject: order no. 48213, faulty item'],
    ['Bonjour,', 'Hello,'],
    ['J\'ai reçu hier la bouilloire que j\'avais commandée sur votre site.', 'Yesterday I received the kettle I had ordered on your website.'],
    ['Malheureusement, elle ne chauffe pas. Je l\'ai essayée trois fois.', 'Unfortunately, it doesn\'t heat. I tried it three times.'],
    ['Je voudrais vous la renvoyer et être remboursé.', 'I would like to send it back to you and get a refund.'],
    ['Pouvez-vous m\'envoyer une étiquette de retour ? Envoyez-la-moi par courriel, s\'il vous plaît.', 'Could you send me a return label? Please send it to me by email.'],
    ['J\'ai gardé le reçu et je peux vous le transmettre si nécessaire.', 'I have kept the receipt and can forward it to you if needed.'],
    ['Merci d\'avance. Thomas Bergeron', 'Thanks in advance. Thomas Bergeron']],
    [['main', 'Que veut Thomas ?', 'What does Thomas want?', ['renvoyer un article et être remboursé', 'commander une autre bouilloire', 'obtenir une remise sur sa prochaine commande'], 0, '"Je voudrais vous la renvoyer et être remboursé."', 'rembourser'],
     ['word', 'Dans « Envoyez-la-moi », « la » remplace…', 'In "Envoyez-la-moi", "la" stands for…', ['l\'étiquette de retour', 'la bouilloire', 'la commande'], 0, 'He has just asked for "une étiquette de retour": send it (the label) to me.'],
     ['tf', 'Thomas a perdu son reçu.', 'Thomas has lost his receipt.', null, 1, '"J\'ai gardé le reçu": he still has it, so it is false.', 'reçu']]);
  T('celui', 'dialogue', ['Au magasin de téléphones', 'At the phone shop'], [
    ['— Je cherche un nouveau cellulaire. Lequel me conseillez-vous ?', '— I\'m looking for a new cell phone. Which one do you recommend?'],
    ['— Ça dépend. Celui-ci est le plus vendu : bon écran, bonne batterie.', '— It depends. This one is the best seller: good screen, good battery.'],
    ['— Et celui-là, à côté ? Il est beaucoup moins cher.', '— And that one, next to it? It\'s much cheaper.'],
    ['— C\'est celui de l\'an dernier. Sa batterie est moins bonne, mais il a un excellent rapport qualité-prix.', '— That\'s last year\'s. Its battery is weaker, but it\'s great value for money.'],
    ['— Et pour le forfait ?', '— And the plan?'],
    ['— Nous en avons deux : celui à 35 $, avec 20 Go, et celui à 50 $, avec données illimitées.', '— We have two: the $35 one with 20 GB, and the $50 one with unlimited data.'],
    ['— J\'utilise surtout le Wi-Fi. Je vais prendre le modèle de l\'an dernier et le forfait le moins cher.', '— I mostly use Wi-Fi. I\'ll take last year\'s model and the cheapest plan.']],
    [['detail', 'Pourquoi le deuxième téléphone est-il moins cher ?', 'Why is the second phone cheaper?', ['C\'est le modèle de l\'an dernier.', 'Il n\'a pas d\'écran tactile.', 'Il est d\'occasion.'], 0, '"C\'est celui de l\'an dernier."', 'modèle'],
     ['infer', 'Combien le client va-t-il payer par mois pour son forfait ?', 'How much will the customer pay a month for the plan?', ['35 $', '50 $', '20 $'], 0, 'He takes "le forfait le moins cher", which is the $35 one.', 'forfait'],
     ['word', 'Dans « celui à 50 $ », « celui » remplace…', 'In "celui à 50 $", "celui" stands for…', ['le forfait', 'le téléphone', 'le Wi-Fi'], 0, 'They are talking about plans: celui à 50 $ = the $50 plan.']]);
  T('mien', 'notice', ['Objets trouvés', 'Lost and found'], [
    ['Avis aux résidents de l\'immeuble', 'Notice to the building\'s residents'],
    ['Depuis le début du mois, plusieurs objets ont été trouvés dans la salle de lavage.', 'Since the start of the month, several items have been found in the laundry room.'],
    ['Un parapluie noir, des lunettes de soleil et un portefeuille brun attendent leurs propriétaires.', 'A black umbrella, sunglasses and a brown wallet are waiting for their owners.'],
    ['Si l\'un de ces objets est le vôtre, passez au bureau du concierge.', 'If one of these items is yours, come to the caretaker\'s office.'],
    ['Pour le portefeuille, on vous demandera une pièce d\'identité : il faut prouver qu\'il est bien le vôtre.', 'For the wallet, you will be asked for ID: you must prove it really is yours.'],
    ['Rappel : les casiers du sous-sol sont privés. N\'utilisez que le vôtre.', 'Reminder: the basement lockers are private. Use only your own.'],
    ['Merci de votre collaboration. La gestion', 'Thank you for your cooperation. The management']],
    [['main', 'À quoi sert cet avis ?', 'What is this notice for?', ['informer des objets trouvés et rappeler une règle', 'annoncer des travaux dans la salle de lavage', 'vendre des objets d\'occasion'], 0, 'It lists found items and reminds people about the lockers.'],
     ['detail', 'Que faut-il apporter pour récupérer le portefeuille ?', 'What must you bring to get the wallet back?', ['une pièce d\'identité', 'la clé de son casier', 'une photo du portefeuille'], 0, '"On vous demandera une pièce d\'identité."', 'pièce d\'identité'],
     ['word', '« N\'utilisez que le vôtre » veut dire…', '"N\'utilisez que le vôtre" means…', ['Utilisez seulement votre casier.', 'N\'utilisez pas votre casier.', 'Utilisez le casier du voisin.'], 0, 'Ne … que = only; le vôtre = your locker.', 'casier']]);
  T('connecteurs', 'news', ['Les bibliothèques attirent plus de monde', 'Libraries are drawing more people'], [
    ['Selon un sondage publié lundi, les bibliothèques publiques reçoivent 15 % de visiteurs de plus qu\'il y a cinq ans.', 'According to a poll published on Monday, public libraries are getting 15% more visitors than five years ago.'],
    ['Pourtant, on emprunte moins de livres papier.', 'Yet people are borrowing fewer paper books.'],
    ['En effet, les gens viennent surtout pour travailler, suivre un atelier ou utiliser Internet.', 'In fact, people mostly come to work, attend a workshop or use the internet.'],
    ['Les nouveaux arrivants y trouvent aussi des cours de conversation gratuits.', 'Newcomers also find free conversation classes there.'],
    ['Grâce à ces services, les bibliothèques sont devenues de vrais lieux de rencontre.', 'Thanks to these services, libraries have become real meeting places.'],
    ['Par contre, beaucoup manquent de personnel, à cause de budgets limités.', 'On the other hand, many are short of staff because of limited budgets.'],
    ['C\'est pourquoi certaines villes demandent plus d\'argent au gouvernement.', 'That is why some cities are asking the government for more money.']],
    [['main', 'Quel est le sujet de l\'article ?', 'What is the article about?', ['le nouveau rôle des bibliothèques', 'la fin des livres papier', 'les élections municipales'], 0, 'More visitors who come for services and to meet people: libraries are changing their role.'],
     ['detail', 'Pourquoi les bibliothèques manquent-elles de personnel ?', 'Why are libraries short of staff?', ['à cause de budgets limités', 'parce que personne ne veut y travailler', 'à cause des nouveaux arrivants'], 0, '"…manquent de personnel, à cause de budgets limités."'],
     ['tf', 'On emprunte plus de livres papier qu\'avant.', 'People borrow more paper books than before.', null, 1, '"Pourtant, on emprunte moins de livres papier": false.', 'pourtant']]);
  T('opinion', 'opinion', ['Le télétravail : pour ou contre ?', 'Working from home: for or against?'], [
    ['Deux lecteurs nous ont donné leur avis sur le télétravail.', 'Two readers gave us their opinion on working from home.'],
    ['Julie, comptable : « À mon avis, c\'est une vraie révolution. Je gagne deux heures de transport par jour. »', 'Julie, accountant: "In my opinion, it is a real revolution. I save two hours of commuting a day."'],
    ['« Je trouve aussi que je suis plus concentrée chez moi, sans le bruit du bureau. »', '"I also find I concentrate better at home, without the office noise."'],
    ['Marc, informaticien : « Je ne pense pas que ce soit la solution pour tout le monde. »', 'Marc, IT specialist: "I don\'t think it is the answer for everyone."'],
    ['« Il est vrai qu\'on gagne du temps. Par contre, on se sent seul, et les nouveaux employés apprennent moins vite. »', '"It is true that you save time. On the other hand, you feel lonely, and new employees learn more slowly."'],
    ['« Selon moi, deux jours au bureau par semaine, c\'est l\'idéal. »', '"In my view, two days a week at the office is ideal."']],
    [['who', 'Qui est contre le télétravail tous les jours ?', 'Who is against working from home every day?', ['Marc', 'Julie', 'les deux'], 0, 'Marc says it is not for everyone and suggests two days at the office.'],
     ['detail', 'Quel avantage Julie mentionne-t-elle ?', 'Which advantage does Julie mention?', ['Elle gagne deux heures de transport par jour.', 'Elle gagne plus d\'argent.', 'Elle voit plus ses collègues.'], 0, '"Je gagne deux heures de transport par jour."'],
     ['infer', 'Quelle solution Marc propose-t-il ?', 'What solution does Marc suggest?', ['un mélange de bureau et de maison', 'travailler seulement au bureau', 'travailler seulement à la maison'], 0, 'Two days at the office a week means the other days at home: a mix.', 'télétravail']]);
})();
