window.FR = window.FR || {};
// One entry per line:  french|english|part of speech|gender (m, f, mf)|pronunciation|example|example in English|usage note|topic
// "topic" is the lesson id the word belongs to ("genre" = extra nouns for the gender quiz, "bonus" = streak rewards).
FR.DICT_RAW = `
bonjour|hello, good morning|interj||bon-ZHOOR|Bonjour, madame !|Hello, ma'am!|Say it every time you walk into a shop or start a conversation.|greet
salut|hi, bye|interj||sa-LEW|Salut, ça va ?|Hi, how's it going?|Casual: friends and family only.|greet
bonsoir|good evening|interj||bon-SWAR|Bonsoir à tous.|Good evening, everyone.|Replaces bonjour from about 6 pm.|greet
merci|thank you|interj||mehr-SEE|Merci beaucoup !|Thank you very much!|The usual answer is "de rien" or, more politely, "je vous en prie".|greet
s'il vous plaît|please|phrase||seel voo PLEH|Un café, s'il vous plaît.|A coffee, please.|Formal or plural. With a friend: s'il te plaît.|greet
au revoir|goodbye|phrase||oh ruh-VWAR|Au revoir et bonne journée !|Goodbye and have a nice day!|Neutral; works everywhere.|greet
pardon|sorry, excuse me|interj||par-DOHN|Pardon, je suis en retard.|Sorry, I'm late.|Also used to get past someone or ask them to repeat.|greet
enchanté|pleased to meet you|adj||ahn-shahn-TAY|Enchanté, je m'appelle Paul.|Pleased to meet you, my name is Paul.|A woman writes enchantée (same sound).|greet
homme|man|noun|m|um|L'homme est grand.|The man is tall.|The h is silent, so le becomes l'.|articles
femme|woman, wife|noun|f|fam|La femme parle français.|The woman speaks French.|Pronounced "fam", not "fem".|articles
enfant|child|noun|mf|ahn-FAHN|L'enfant joue dans le jardin.|The child is playing in the garden.|un enfant (boy or unknown), une enfant (girl).|articles
ami|friend|noun|m|a-MEE|C'est mon ami Luc.|This is my friend Luc.|Feminine: une amie.|articles
garçon|boy|noun|m|gar-SOHN|Le garçon a dix ans.|The boy is ten years old.||articles
fille|girl, daughter|noun|f|fee-y|La fille de Marie est ici.|Marie's daughter is here.|Means both girl and daughter; context decides.|articles
livre|book|noun|m|leevr|Je lis un livre.|I am reading a book.|Careful: une livre is a pound (weight or money).|articles
école|school|noun|f|ay-KOL|L'école est fermée aujourd'hui.|The school is closed today.||articles
être|to be|verb||ehtr|Je suis étudiant.|I am a student.|je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.|etre
content|happy, glad|adj||kohn-TAHN|Je suis content de te voir.|I'm glad to see you.|Feminine: contente (the t is then pronounced).|etre
fatigué|tired|adj||fa-tee-GAY|Elle est très fatiguée.|She is very tired.||etre
grand|tall, big|adj||grahn|Mon frère est grand.|My brother is tall.|Goes before the noun: un grand jardin.|etre
petit|small, short|adj||puh-TEE|C'est un petit village.|It's a small village.|Goes before the noun. Feminine: petite (puh-TEET).|etre
étudiant|student|noun|m|ay-tew-DYAHN|Il est étudiant à Paris.|He is a student in Paris.|No article after être with professions: il est étudiant.|etre
professeur|teacher|noun|m|pro-feh-SUHR|Le professeur est sympa.|The teacher is nice.|Short form: prof. For a woman: la professeure or la prof.|etre
français|French|adj||frahn-SEH|Je parle un peu français.|I speak a little French.|No capital letter for the language or the adjective.|etre
un|one, a|num||uhn|J'ai un frère.|I have one brother.|Becomes une before a feminine noun.|nombres
deux|two|num||duh|Deux cafés, s'il vous plaît.|Two coffees, please.||nombres
trois|three|num||trwa|J'ai trois enfants.|I have three children.||nombres
quatre|four|num||katr|Il y a quatre chaises.|There are four chairs.||nombres
cinq|five|num||sank|Le train part dans cinq minutes.|The train leaves in five minutes.||nombres
dix|ten|num||dees|Ça coûte dix euros.|It costs ten euros.|Pronounced "dee" before a consonant: dix livres.|nombres
vingt|twenty|num||van|Elle a vingt ans.|She is twenty years old.|The g and t are silent.|nombres
cent|one hundred|num||sahn|Il y a cent personnes.|There are a hundred people.|No "un" before cent.|nombres
pain|bread|noun|m|pan|Je vais acheter du pain.|I'm going to buy some bread.||food
eau|water|noun|f|oh|Une carafe d'eau, s'il vous plaît.|A jug of water, please.|Feminine despite the -eau ending.|food
fromage|cheese|noun|m|fro-MAZH|J'adore le fromage français.|I love French cheese.||food
café|coffee, café|noun|m|ka-FAY|On prend un café ?|Shall we have a coffee?|Un café is an espresso by default.|food
pomme|apple|noun|f|pum|Je mange une pomme.|I am eating an apple.|Pomme de terre = potato.|food
lait|milk|noun|m|leh|Tu veux du lait dans ton café ?|Do you want milk in your coffee?||food
viande|meat|noun|f|vyahnd|Il ne mange pas de viande.|He doesn't eat meat.||food
vin|wine|noun|m|van|Un verre de vin rouge.|A glass of red wine.||food
mère|mother|noun|f|mehr|Ma mère habite à Lyon.|My mother lives in Lyon.|Casual: maman.|famille
père|father|noun|m|pehr|Mon père est médecin.|My father is a doctor.|Casual: papa.|famille
frère|brother|noun|m|frehr|J'ai un grand frère.|I have an older brother.||famille
sœur|sister|noun|f|suhr|Ma sœur a deux enfants.|My sister has two children.||famille
fils|son|noun|m|feess|Leur fils a huit ans.|Their son is eight.|The l is silent and the s is pronounced.|famille
mari|husband|noun|m|ma-REE|Son mari travaille à la banque.|Her husband works at the bank.|Wife is femme.|famille
famille|family|noun|f|fa-MEE-y|J'ai une grande famille.|I have a big family.||famille
grand-mère|grandmother|noun|f|grahn-MEHR|Ma grand-mère a quatre-vingts ans.|My grandmother is eighty.|Casual: mamie.|famille
avoir|to have|verb||a-VWAR|J'ai deux sœurs.|I have two sisters.|j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont. Also used for age, hunger and thirst.|maison
maison|house, home|noun|f|meh-ZOHN|Je rentre à la maison.|I'm going home.||maison
chambre|bedroom|noun|f|shahmbr|Ma chambre est petite.|My bedroom is small.||maison
cuisine|kitchen, cooking|noun|f|kwee-ZEEN|Il est dans la cuisine.|He is in the kitchen.|Also means cooking: la cuisine française.|maison
table|table|noun|f|tabl|Le livre est sur la table.|The book is on the table.||maison
lit|bed|noun|m|lee|Je suis au lit.|I'm in bed.||maison
porte|door|noun|f|port|Ferme la porte, s'il te plaît.|Close the door, please.||maison
clé|key|noun|f|klay|J'ai perdu ma clé.|I lost my key.|Also spelled clef.|maison
parler|to speak, to talk|verb||par-LAY|Vous parlez anglais ?|Do you speak English?|Regular -er verb. parler à = to talk to.|verbes
manger|to eat|verb||mahn-ZHAY|Nous mangeons à midi.|We eat at noon.|nous mangeons keeps the e.|verbes
aimer|to like, to love|verb||eh-MAY|J'aime beaucoup ce film.|I really like this movie.|aimer + person = to love; aimer bien = to like.|verbes
habiter|to live (somewhere)|verb||a-bee-TAY|J'habite à Marseille.|I live in Marseille.|j'habite: je drops its e before the silent h.|verbes
travailler|to work|verb||tra-va-YAY|Elle travaille dans un hôpital.|She works in a hospital.||verbes
regarder|to watch, to look at|verb||ruh-gar-DAY|On regarde un film ce soir ?|Shall we watch a movie tonight?|No preposition: regarder la télé.|verbes
écouter|to listen to|verb||ay-koo-TAY|J'écoute la radio.|I listen to the radio.|No preposition: écouter la musique.|verbes
chercher|to look for|verb||shehr-SHAY|Je cherche mes clés.|I'm looking for my keys.|No preposition: chercher quelque chose.|verbes
ville|city, town|noun|f|veel|Lyon est une grande ville.|Lyon is a big city.|en ville = in town, downtown.|ville
rue|street|noun|f|rew|J'habite rue Victor Hugo.|I live on Victor Hugo Street.|dans la rue = in the street.|ville
gare|train station|noun|f|gar|La gare est près d'ici.|The station is near here.||ville
magasin|shop, store|noun|m|ma-ga-ZAN|Le magasin ferme à 19 heures.|The shop closes at 7 pm.||ville
boulangerie|bakery|noun|f|boo-lahn-zhuh-REE|Je vais à la boulangerie.|I'm going to the bakery.||ville
hôpital|hospital|noun|m|o-pee-TAL|Elle travaille à l'hôpital.|She works at the hospital.|Plural: les hôpitaux.|ville
banque|bank|noun|f|bahnk|La banque est fermée le dimanche.|The bank is closed on Sundays.||ville
musée|museum|noun|m|mew-ZAY|Le musée est gratuit aujourd'hui.|The museum is free today.|Masculine despite the -ée ending.|ville
aller|to go|verb||a-LAY|Je vais au travail.|I'm going to work.|je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont.|aller
train|train|noun|m|tran|Le train est en retard.|The train is late.|en train = by train.|aller
voiture|car|noun|f|vwa-TEWR|Ma voiture est en panne.|My car has broken down.|en voiture = by car.|aller
vélo|bike|noun|m|vay-LO|Je vais au travail à vélo.|I go to work by bike.|à vélo, not en vélo, in careful French.|aller
avion|plane|noun|m|a-VYOHN|L'avion décolle à midi.|The plane takes off at noon.||aller
billet|ticket|noun|m|bee-YAY|J'ai acheté deux billets.|I bought two tickets.|For trains, planes, shows. A metro ticket is un ticket.|aller
valise|suitcase|noun|f|va-LEEZ|Ma valise est trop lourde.|My suitcase is too heavy.|faire sa valise = to pack.|aller
plage|beach|noun|f|plazh|On va à la plage demain.|We're going to the beach tomorrow.|Feminine: an exception to the -age pattern.|aller
jour|day|noun|m|zhoor|Quel jour sommes-nous ?|What day is it?||temps
semaine|week|noun|f|suh-MEN|Je travaille cinq jours par semaine.|I work five days a week.||temps
aujourd'hui|today|adv||oh-zhoor-DWEE|Aujourd'hui, il fait beau.|Today the weather is nice.||temps
demain|tomorrow|adv||duh-MAN|À demain !|See you tomorrow!||temps
hier|yesterday|adv||ee-YEHR|Hier, j'ai travaillé tard.|Yesterday I worked late.||temps
matin|morning|noun|m|ma-TAN|Je cours le matin.|I run in the morning.|le matin = every morning; ce matin = this morning.|temps
soir|evening|noun|m|swar|On sort ce soir ?|Are we going out tonight?||temps
heure|hour, time|noun|f|uhr|Quelle heure est-il ?|What time is it?|Il est trois heures = it's three o'clock.|temps
pourquoi|why|adv||poor-KWA|Pourquoi tu ris ?|Why are you laughing?|Answer with parce que.|questions
quand|when|adv||kahn|Quand est-ce que tu arrives ?|When are you arriving?||questions
où|where|adv||oo|Où sont les toilettes ?|Where are the toilets?|With the accent. Without it, ou means "or".|questions
comment|how|adv||ko-MAHN|Comment tu t'appelles ?|What's your name?||questions
combien|how much, how many|adv||kohm-BYAN|C'est combien ?|How much is it?|combien de + noun: combien de temps ?|questions
qui|who|pron||kee|Qui est là ?|Who's there?||questions
quoi|what|pron||kwa|Tu fais quoi ?|What are you doing?|Casual, at the end of the question. Formal: que / qu'est-ce que.|questions
parce que|because|conj||pars-kuh|Je reste parce que je suis fatigué.|I'm staying because I'm tired.|Becomes parce qu' before a vowel.|questions
faire|to do, to make|verb||fehr|J'ai fait un gâteau.|I made a cake.|Past participle: fait. Also for weather: il fait froid.|pcavoir
prendre|to take|verb||prahndr|Elle a pris le bus.|She took the bus.|Past participle: pris. Also for food and drink: je prends un café.|pcavoir
voir|to see|verb||vwar|Tu as vu ce film ?|Have you seen this movie?|Past participle: vu.|pcavoir
vouloir|to want|verb||voo-LWAR|Je veux apprendre le français.|I want to learn French.|Past participle: voulu. Polite form: je voudrais.|pcavoir
pouvoir|can, to be able to|verb||poo-VWAR|Tu peux m'aider ?|Can you help me?|Past participle: pu.|pcavoir
devoir|must, to have to|verb||duh-VWAR|Je dois partir.|I have to leave.|Past participle: dû.|pcavoir
dire|to say, to tell|verb||deer|Qu'est-ce que tu as dit ?|What did you say?|Past participle: dit. vous dites (irregular).|pcavoir
savoir|to know (a fact, how to)|verb||sa-VWAR|Je ne sais pas.|I don't know.|Past participle: su. For people and places use connaître.|pcavoir
venir|to come|verb||vuh-NEER|Tu viens avec nous ?|Are you coming with us?|Uses être in the past: je suis venu(e).|pcetre
partir|to leave|verb||par-TEER|Le train est parti à l'heure.|The train left on time.|Uses être in the past.|pcetre
arriver|to arrive, to happen|verb||a-ree-VAY|Nous sommes arrivés hier.|We arrived yesterday.|Uses être in the past. Qu'est-ce qui est arrivé ? = What happened?|pcetre
rester|to stay|verb||res-TAY|Je suis resté à la maison.|I stayed at home.|False friend: it does not mean "to rest" (se reposer).|pcetre
sortir|to go out|verb||sor-TEER|Elle est sortie avec des amis.|She went out with friends.|Uses être in the past.|pcetre
entrer|to enter, to come in|verb||ahn-TRAY|Il est entré dans le magasin.|He went into the shop.|entrer dans + place.|pcetre
tomber|to fall|verb||tohm-BAY|Je suis tombé dans la rue.|I fell in the street.|tomber amoureux = to fall in love.|pcetre
monter|to go up, to get on|verb||mohn-TAY|Elle est montée dans le train.|She got on the train.|Opposite: descendre.|pcetre
souvent|often|adv||soo-VAHN|Je vais souvent au cinéma.|I often go to the cinema.|Placed right after the verb.|imparfait
toujours|always, still|adv||too-ZHOOR|Il est toujours en retard.|He is always late.||imparfait
jamais|never|adv||zha-MEH|Je ne bois jamais de café.|I never drink coffee.|ne ... jamais wraps the verb.|imparfait
parfois|sometimes|adv||par-FWA|Parfois, je travaille le samedi.|Sometimes I work on Saturdays.||imparfait
avant|before|adv||a-VAHN|Avant, j'habitais à Nice.|Before, I used to live in Nice.|A classic trigger for the imparfait.|imparfait
maintenant|now|adv||mant-NAHN|Maintenant, j'habite à Paris.|Now I live in Paris.||imparfait
enfance|childhood|noun|f|ahn-FAHNS|J'ai passé mon enfance en Bretagne.|I spent my childhood in Brittany.||imparfait
souvenir|memory, souvenir|noun|m|soo-vuh-NEER|C'est un bon souvenir.|It's a good memory.|se souvenir de = to remember.|imparfait
beau|beautiful, handsome|adj||boh|Quel beau jardin !|What a beautiful garden!|Before the noun. Feminine: belle. Before a masculine vowel: bel.|adjectifs
nouveau|new|adj||noo-VOH|J'ai un nouveau travail.|I have a new job.|Feminine: nouvelle. Before a masculine vowel: nouvel.|adjectifs
vieux|old|adj||vyuh|C'est un vieux film.|It's an old movie.|Feminine: vieille. Before a masculine vowel: vieil.|adjectifs
bon|good|adj||bohn|C'est un bon restaurant.|It's a good restaurant.|Feminine: bonne. Comparative: meilleur.|adjectifs
mauvais|bad|adj||moh-VEH|Il fait mauvais aujourd'hui.|The weather is bad today.||adjectifs
meilleur|better, best|adj||meh-YUHR|C'est le meilleur café de la ville.|It's the best coffee in town.|Comparative of bon. Never "plus bon".|adjectifs
cher|expensive, dear|adj||shehr|Ce restaurant est trop cher.|This restaurant is too expensive.|Feminine: chère.|adjectifs
facile|easy|adj||fa-SEEL|Le français n'est pas facile.|French isn't easy.|Opposite: difficile.|adjectifs
donner|to give|verb||do-NAY|Je lui donne mon numéro.|I'm giving him my number.|donner quelque chose à quelqu'un.|pronoms
envoyer|to send|verb||ahn-vwa-YAY|Je t'envoie un message.|I'll send you a message.|j'envoie, nous envoyons.|pronoms
appeler|to call|verb||ap-LAY|Je t'appelle ce soir.|I'll call you tonight.|je m'appelle = my name is.|pronoms
connaître|to know (a person, a place)|verb||ko-NEHTR|Tu connais Lyon ?|Do you know Lyon?|For facts, use savoir.|pronoms
cadeau|present, gift|noun|m|ka-DOH|C'est un cadeau pour toi.|It's a present for you.|Plural: cadeaux.|pronoms
lettre|letter|noun|f|lehtr|J'écris une lettre.|I'm writing a letter.||pronoms
message|message|noun|m|meh-SAZH|Tu as reçu mon message ?|Did you get my message?||pronoms
voisin|neighbour|noun|m|vwa-ZAN|Mon voisin est très gentil.|My neighbour is very kind.|Feminine: voisine.|pronoms
avenir|future|noun|m|av-NEER|Je pense à l'avenir.|I'm thinking about the future.|à l'avenir = in future.|futur
projet|plan, project|noun|m|pro-ZHEH|Tu as des projets pour l'été ?|Do you have plans for the summer?||futur
voyage|trip, journey|noun|m|vwa-YAZH|Bon voyage !|Have a good trip!|faire un voyage = to take a trip.|futur
travail|work, job|noun|m|tra-VAY|Je cherche du travail.|I'm looking for work.|Plural: travaux.|futur
espérer|to hope|verb||es-pay-RAY|J'espère que tu vas bien.|I hope you're well.|Followed by the indicative, not the subjunctive.|futur
réussir|to succeed, to pass|verb||ray-ew-SEER|Elle a réussi son examen.|She passed her exam.|réussir à + infinitive.|futur
devenir|to become|verb||duh-vuh-NEER|Il veut devenir médecin.|He wants to become a doctor.|Future stem: deviendr-. Uses être in the past.|futur
bientôt|soon|adv||byan-TOH|À bientôt !|See you soon!||futur
aide|help|noun|f|ed|J'ai besoin d'aide.|I need help.|À l'aide ! = Help!|conditionnel
conseil|piece of advice|noun|m|kohn-SAY|Je peux te donner un conseil ?|Can I give you some advice?|Countable in French: un conseil, des conseils.|conditionnel
chance|luck|noun|f|shahns|Bonne chance !|Good luck!|avoir de la chance = to be lucky.|conditionnel
rêve|dream|noun|m|rev|C'est mon rêve.|It's my dream.||conditionnel
gagner|to win, to earn|verb||ga-NYAY|Elle a gagné le match.|She won the match.|gagner de l'argent = to earn money.|conditionnel
essayer|to try|verb||eh-say-YAY|Je vais essayer.|I'm going to try.|essayer de + infinitive.|conditionnel
peut-être|maybe|adv||puh-TEHTR|Peut-être demain.|Maybe tomorrow.||conditionnel
volontiers|gladly, with pleasure|adv||vo-lohn-TYAY|— Un café ? — Volontiers !|— A coffee? — Gladly!|A polite way to accept an offer.|conditionnel
penser|to think|verb||pahn-SAY|Je pense que tu as raison.|I think you're right.|penser à = think about; penser de = have an opinion of.|subjonctif
croire|to believe|verb||krwar|Je te crois.|I believe you.|je ne crois pas que + subjunctive.|subjonctif
il faut|it is necessary, one must|phrase||eel foh|Il faut partir maintenant.|We have to leave now.|From falloir. il faut que + subjunctive.|subjonctif
opinion|opinion|noun|f|o-pee-NYOHN|À mon avis, c'est une bonne opinion.|In my view, it's a good opinion.||subjonctif
important|important|adj||an-por-TAHN|C'est très important pour moi.|It's very important to me.|il est important que + subjunctive.|subjonctif
nécessaire|necessary|adj||nay-seh-SEHR|Ce n'est pas nécessaire.|It's not necessary.||subjonctif
bien que|although|conj||byan kuh|Bien qu'il pleuve, on sort.|Although it's raining, we're going out.|Always followed by the subjunctive.|subjonctif
pour que|so that|conj||poor kuh|Je parle lentement pour que tu comprennes.|I speak slowly so that you understand.|Always followed by the subjunctive.|subjonctif
question|question|noun|f|kes-TYOHN|J'ai une question.|I have a question.|poser une question = to ask a question.|genre
solution|solution|noun|f|so-lew-SYOHN|Il y a toujours une solution.|There is always a solution.||genre
télévision|television|noun|f|tay-lay-vee-ZYOHN|Je regarde la télévision.|I'm watching television.|Short: la télé.|genre
liberté|freedom|noun|f|lee-behr-TAY|La liberté est précieuse.|Freedom is precious.||genre
société|society, company|noun|f|so-syay-TAY|La société change vite.|Society is changing fast.||genre
université|university|noun|f|ew-nee-vehr-see-TAY|Elle étudie à l'université.|She studies at university.|Casual: la fac.|genre
nature|nature|noun|f|na-TEWR|J'aime marcher dans la nature.|I like walking in nature.||genre
culture|culture|noun|f|kewl-TEWR|La culture française m'intéresse.|French culture interests me.||genre
différence|difference|noun|f|dee-fay-RAHNS|Quelle est la différence ?|What is the difference?||genre
vie|life|noun|f|vee|C'est la vie !|That's life!||genre
pharmacie|pharmacy|noun|f|far-ma-SEE|La pharmacie est ouverte.|The pharmacy is open.||genre
image|picture, image|noun|f|ee-MAZH|C'est une belle image.|It's a beautiful picture.|Feminine: an exception to the -age pattern.|genre
page|page|noun|f|pazh|Ouvrez le livre à la page dix.|Open the book at page ten.|Feminine: an exception to the -age pattern.|genre
village|village|noun|m|vee-LAZH|J'habite dans un petit village.|I live in a small village.||genre
moment|moment|noun|m|mo-MAHN|Un moment, s'il vous plaît.|One moment, please.||genre
appartement|flat, apartment|noun|m|a-par-tuh-MAHN|Mon appartement est au troisième étage.|My flat is on the third floor.||genre
gouvernement|government|noun|m|goo-vehr-nuh-MAHN|Le gouvernement a annoncé une réforme.|The government announced a reform.||genre
bureau|office, desk|noun|m|bew-ROH|Je suis au bureau.|I'm at the office.|Plural: bureaux.|genre
bateau|boat|noun|m|ba-TOH|Le bateau part à midi.|The boat leaves at noon.||genre
tourisme|tourism|noun|m|too-REEZM|Le tourisme est important ici.|Tourism is important here.||genre
miroir|mirror|noun|m|mee-RWAR|Il y a un miroir dans l'entrée.|There is a mirror in the hallway.||genre
lycée|high school|noun|m|lee-SAY|Mon fils est au lycée.|My son is in high school.|Masculine despite the -ée ending.|genre
problème|problem|noun|m|pro-BLEM|Pas de problème !|No problem!|Masculine, like most words in -ème.|genre
touriste|tourist|noun|mf|too-REEST|Les touristes aiment Paris.|Tourists love Paris.|un touriste or une touriste.|genre
artiste|artist|noun|mf|ar-TEEST|C'est une artiste connue.|She is a well-known artist.|un artiste or une artiste.|genre
truc|thing, thingy|noun|m|trewk|C'est quoi, ce truc ?|What's this thing?|Colloquial for chose.|bonus
boulot|job, work|noun|m|boo-LOH|J'ai trop de boulot.|I've got too much work.|Colloquial for travail.|bonus
pote|buddy, mate|noun|mf|pot|Je sors avec des potes.|I'm going out with some mates.|Colloquial for ami.|bonus
bouquin|book|noun|m|boo-KAN|J'ai lu un super bouquin.|I read a great book.|Colloquial for livre.|bonus
bagnole|car|noun|f|ba-NYOL|Sa bagnole est en panne.|His car has broken down.|Colloquial for voiture.|bonus
mec|guy|noun|m|mek|C'est un mec sympa.|He's a nice guy.|Very common in speech; avoid in formal settings.|bonus
flemme|laziness|noun|f|flem|J'ai la flemme de sortir.|I can't be bothered to go out.|avoir la flemme = can't be bothered.|bonus
bouffer|to eat|verb||boo-FAY|On va bouffer ?|Shall we go and eat?|Slang for manger. La bouffe = food.|bonus
kiffer|to love, to really like|verb||kee-FAY|Je kiffe cette chanson.|I love this song.|Youth slang for aimer.|bonus
râler|to grumble, to moan|verb||rah-LAY|Il râle tout le temps.|He complains all the time.|Jokingly called a national sport.|bonus
flâner|to stroll|verb||flah-NAY|J'aime flâner dans Paris.|I like strolling around Paris.|Walking with no goal, just for pleasure.|bonus
sympa|nice, friendly|adj||sam-PA|Ton frère est très sympa.|Your brother is really nice.|Short for sympathique. Never changes form.|bonus
génial|great, brilliant|adj||zhay-NYAL|C'est génial !|That's great!||bonus
chouette|great, nice|adj||shwet|C'est chouette, ici !|It's nice here!|Mild and friendly. Une chouette is also an owl.|bonus
ouf|crazy|adj||oof|C'est un truc de ouf !|That's insane!|Verlan (back slang) for fou.|bonus
crevé|exhausted|adj||kruh-VAY|Je suis crevé ce soir.|I'm shattered tonight.|Colloquial for très fatigué.|bonus
bof|meh|interj||bof|— Le film était bien ? — Bof.|— Was the movie good? — Meh.|Shows a lack of enthusiasm.|bonus
bref|anyway, in short|adv||bref|Bref, on est partis.|Anyway, we left.|Used to cut a long story short.|bonus
du coup|so, as a result|phrase||dew KOO|Il pleuvait, du coup on est restés.|It was raining, so we stayed.|Everywhere in spoken French; avoid in formal writing.|bonus
quand même|still, all the same|phrase||kahn MEM|Merci quand même !|Thanks anyway!|Also adds emphasis: c'est cher, quand même !|bonus
tant pis|too bad, never mind|phrase||tahn PEE|Il ne vient pas ? Tant pis.|He's not coming? Too bad.||bonus
tant mieux|good, so much the better|phrase||tahn MYUH|Tu as réussi ? Tant mieux !|You passed? Great!||bonus
ça marche|OK, that works|phrase||sa MARSH|— À huit heures ? — Ça marche !|— At eight? — Works for me!|Casual way to agree.|bonus
carrément|totally, absolutely|adv||ka-ray-MAHN|— Tu viens ? — Carrément !|— Are you coming? — Absolutely!|Casual, enthusiastic yes.|bonus
laisse tomber|forget it, drop it|phrase||les tohm-BAY|Laisse tomber, ce n'est pas grave.|Forget it, it doesn't matter.|Casual (tu form).|bonus
n'importe quoi|nonsense, anything|phrase||nan-port KWA|Tu dis n'importe quoi !|You're talking nonsense!||bonus
à tout à l'heure|see you later (today)|phrase||a too-ta-LUHR|Je reviens vite, à tout à l'heure !|I'll be right back, see you later!|Only when you'll meet again the same day.|bonus
pas mal|not bad, quite a lot|phrase||pa MAL|C'est pas mal du tout !|That's not bad at all!|Often real praise in French.|bonus
dépaysement|change of scenery|noun|m|day-pay-eez-MAHN|J'ai besoin de dépaysement.|I need a change of scenery.|The pleasant feeling of being somewhere unfamiliar. No exact English word.|bonus
retrouvailles|reunion|noun|f|ruh-troo-VAY|Les retrouvailles étaient émouvantes.|The reunion was moving.|Always plural. The joy of seeing someone again after a long time.|bonus
`;

// Common function words and verb forms, used for long-press translations.
FR.GLOSS_RAW = "le=the;la=the;les=the;l=the;une=a, one;des=some;du=some, of the;de=of, from;d=of;à=to, at;au=to the, at the;aux=to the;et=and;ou=or;mais=but;donc=so;car=because;ne=not;n=not;pas=not;plus=more;moins=less;très=very;trop=too, too much;bien=well;mal=badly;aussi=also;avec=with;sans=without;pour=for;dans=in;sur=on;sous=under;chez=at the home of;en=in, by, some;y=there;par=by, per;entre=between;vers=towards;depuis=since, for;pendant=during;après=after;près=near;loin=far;je=I;j=I;tu=you;il=he, it;elle=she;on=we, one;nous=we;vous=you;ils=they;elles=they;me=me;m=me;te=you;t=you;se=oneself;s=oneself;moi=me;toi=you;lui=him, to him;leur=their, to them;mon=my;ma=my;mes=my;ton=your;ta=your;tes=your;son=his, her;sa=his, her;ses=his, her;notre=our;nos=our;votre=your;vos=your;leurs=their;ce=this, it;c=it;cet=this;cette=this;ces=these;ça=that;cela=that;que=that, what;qu=that;dont=whose, of which;si=if, so;comme=like, as;suis=am;es=are;est=is;sommes=are;êtes=are;sont=are;étais=was;était=was;étaient=were;été=been, summer;sera=will be;serai=will be;serait=would be;soit=be;ai=have;as=have;a=has;avons=have;avez=have;ont=have;avais=had;avait=had;aura=will have;eu=had;vais=am going;vas=are going;va=goes, is going;allons=are going;allez=are going;vont=are going;fais=do, make;fait=does, done, made;font=do, make;veux=want;veut=wants;voulez=want;voudrais=would like;peux=can;peut=can;pouvez=can;peuvent=can;pourriez=could;dois=must;doit=must;sais=know;sait=knows;dit=says, said;vu=seen;pris=taken;tout=all, everything;tous=all;toute=all;toutes=all;autre=other;autres=others;même=same, even;chaque=each;quelques=a few;beaucoup=a lot;peu=little, few;assez=enough;ici=here;là=there;oui=yes;non=no;alors=so, then;puis=then;encore=again, still;déjà=already;monsieur=sir;madame=ma'am;gens=people;chose=thing;monde=world;temps=time, weather;an=year;ans=years;année=year;pays=country;fois=time;film=movie;films=movies;gauche=left;droite=right;droit=straight;rendez-vous=appointment;nom=name;bravo=well done;parfait=perfect;super=great;exactement=exactly;joué=played;appelle=call, am called;habite=live;nouvelle=new;belle=beautiful;vieille=old;bonne=good;premier=first;première=first;dernier=last;dernière=last;jeunes=young people;jeune=young;pleut=is raining;quel=which, what;quelle=which, what;cinéma=cinema;restaurant=restaurant;musique=music;langue=language;langues=languages;mot=word;mots=words;histoire=story, history;argent=money;amis=friends;enfants=children;personnes=people;minutes=minutes;euros=euros";
