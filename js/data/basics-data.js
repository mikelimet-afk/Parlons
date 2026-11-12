window.FR = window.FR || {}; FR.DICT_MORE = FR.DICT_MORE || [];
FR.BASICS = {
  // [letter, French name (spoken), sounds like in English, example word, translation]
  alphabet: [
    ['A', 'a', 'ah', 'ami', 'friend'], ['B', 'bé', 'bay', 'bonjour', 'hello'], ['C', 'cé', 'say', 'café', 'coffee'], ['D', 'dé', 'day', 'demain', 'tomorrow'],
    ['E', 'e', 'uh', 'le', 'the'], ['F', 'effe', 'ef', 'fleur', 'flower'], ['G', 'gé', 'zhay', 'gare', 'station'], ['H', 'ache', 'ash (always silent in words)', 'hôtel', 'hotel'],
    ['I', 'i', 'ee', 'île', 'island'], ['J', 'ji', 'zhee', 'jour', 'day'], ['K', 'ka', 'kah', 'kilo', 'kilo'], ['L', 'elle', 'el', 'lune', 'moon'],
    ['M', 'emme', 'em', 'mer', 'sea'], ['N', 'enne', 'en', 'nuit', 'night'], ['O', 'o', 'oh', 'eau', 'water'], ['P', 'pé', 'pay', 'pain', 'bread'],
    ['Q', 'qu', 'kew (round your lips)', 'quatre', 'four'], ['R', 'erre', 'air, rolled at the back of the throat', 'rue', 'street'], ['S', 'esse', 'ess', 'soleil', 'sun'], ['T', 'té', 'tay', 'table', 'table'],
    ['U', 'u', 'ew — say "ee" with rounded lips', 'tu', 'you'], ['V', 'vé', 'vay', 'ville', 'city'], ['W', 'double vé', 'doo-bluh-vay', 'week-end', 'weekend'], ['X', 'ixe', 'eeks', 'taxi', 'taxi'],
    ['Y', 'i grec', 'ee grek', 'yeux', 'eyes'], ['Z', 'zède', 'zed', 'zéro', 'zero']
  ],
  // [character, name, how it sounds, rule, examples "fr=en;fr=en"]
  accents: [
    ['é', 'accent aigu', '"ay", a closed e', 'Only on e. The most common accent.', 'été=summer;café=coffee;école=school'],
    ['è', 'accent grave', '"eh", an open e', 'Usually before a final silent e or a final s.', 'mère=mother;très=very;père=father'],
    ['à ù', 'accent grave', 'no change in sound', 'Tells words apart: a (has) / à (to), ou (or) / où (where).', 'à=to, at;où=where;là=there'],
    ['ê', 'accent circonflexe', '"eh", like è', 'Often marks a lost s — compare forêt / forest.', 'fête=party;forêt=forest;tête=head'],
    ['â î ô û', 'accent circonflexe', 'â and ô are slightly longer; î and û do not change', 'Also often a lost s: hôpital / hospital, château / castle.', 'château=castle;île=island;hôpital=hospital;sûr=sure'],
    ['ë ï ü', 'tréma', 'say both vowels separately', 'The two dots split a pair of vowels: Noël = no-el, not "nole".', 'Noël=Christmas;naïf=naive;maïs=corn'],
    ['ç', 'cédille', '"s" (not "k")', 'Only under c, before a, o or u, to keep the soft s sound.', 'ça=that;garçon=boy;leçon=lesson'],
    ['œ', 'e dans l\'o', '"uh", like the e in "her"', 'The letters o and e joined together.', 'sœur=sister;cœur=heart;œuf=egg']
  ],
  // Common words: [group key, [[fr, en], …]]
  words: [
    ['bw_polite', [['bonjour', 'hello, good morning'], ['bonsoir', 'good evening'], ['salut', 'hi, bye (casual)'], ['au revoir', 'goodbye'], ['à bientôt', 'see you soon'], ['merci', 'thank you'], ['merci beaucoup', 'thank you very much'], ['de rien', 'you\'re welcome'], ['je vous en prie', 'you\'re welcome (formal)'], ['s\'il vous plaît', 'please (formal)'], ['s\'il te plaît', 'please (casual)'], ['pardon', 'sorry, excuse me'], ['excusez-moi', 'excuse me'], ['désolé', 'sorry']]],
    ['bw_yesno', [['oui', 'yes'], ['non', 'no'], ['si', 'yes (answering a negative question)'], ['d\'accord', 'OK, all right'], ['peut-être', 'maybe'], ['bien sûr', 'of course'], ['pas du tout', 'not at all'], ['pas encore', 'not yet'], ['moi aussi', 'me too'], ['moi non plus', 'me neither']]],
    ['bw_quest', [['qui ?', 'who?'], ['quoi ?', 'what? (casual)'], ['qu\'est-ce que… ?', 'what…?'], ['où ?', 'where?'], ['quand ?', 'when?'], ['comment ?', 'how?'], ['pourquoi ?', 'why?'], ['combien ?', 'how much? how many?'], ['quel / quelle ?', 'which? what?'], ['est-ce que… ?', 'turns a sentence into a yes/no question']]],
    ['bw_little', [['et', 'and'], ['ou', 'or'], ['mais', 'but'], ['avec', 'with'], ['sans', 'without'], ['pour', 'for'], ['dans', 'in'], ['sur', 'on'], ['sous', 'under'], ['très', 'very'], ['aussi', 'also, too'], ['ici', 'here'], ['là', 'there'], ['maintenant', 'now'], ['aujourd\'hui', 'today'], ['demain', 'tomorrow'], ['hier', 'yesterday']]],
    ['bw_survive', [['Je ne comprends pas.', 'I don\'t understand.'], ['Pouvez-vous répéter ?', 'Can you repeat that?'], ['Parlez plus lentement, s\'il vous plaît.', 'Please speak more slowly.'], ['Je ne sais pas.', 'I don\'t know.'], ['Comment dit-on… en français ?', 'How do you say… in French?'], ['Où sont les toilettes ?', 'Where is the toilet?'], ['Combien ça coûte ?', 'How much does it cost?'], ['Je m\'appelle…', 'My name is…'], ['J\'ai besoin d\'aide.', 'I need help.'], ['Je suis perdu.', 'I\'m lost.']]]
  ],
  // [French, English, country/region]
  cities: [
    ['Paris', 'Paris', 'France'], ['Marseille', 'Marseille', 'France'], ['Lyon', 'Lyon', 'France'], ['Toulouse', 'Toulouse', 'France'], ['Nice', 'Nice', 'France'], ['Nantes', 'Nantes', 'France'],
    ['Strasbourg', 'Strasbourg', 'France'], ['Bordeaux', 'Bordeaux', 'France'], ['Lille', 'Lille', 'France'], ['Montpellier', 'Montpellier', 'France'],
    ['Bruxelles', 'Brussels', 'Belgique'], ['Genève', 'Geneva', 'Suisse'], ['Montréal', 'Montreal', 'Canada'], ['Québec', 'Quebec City', 'Canada'],
    ['Dakar', 'Dakar', 'Sénégal'], ['Abidjan', 'Abidjan', 'Côte d\'Ivoire'], ['Casablanca', 'Casablanca', 'Maroc'], ['Tunis', 'Tunis', 'Tunisie'],
    ['Londres', 'London', 'Royaume-Uni'], ['Pékin', 'Beijing', 'Chine'], ['Moscou', 'Moscow', 'Russie'], ['Venise', 'Venice', 'Italie'],
    ['Lisbonne', 'Lisbon', 'Portugal'], ['Vienne', 'Vienna', 'Autriche'], ['Le Caire', 'Cairo', 'Égypte'], ['La Nouvelle-Orléans', 'New Orleans', 'États-Unis'], ['Manille', 'Manila', 'Philippines']
  ],
  // [French with article, English, "in / to", nationality]
  countries: [
    ['la France', 'France', 'en France', 'français, française'], ['le Canada', 'Canada', 'au Canada', 'canadien, canadienne'], ['les États-Unis', 'the United States', 'aux États-Unis', 'américain, américaine'],
    ['la Belgique', 'Belgium', 'en Belgique', 'belge'], ['la Suisse', 'Switzerland', 'en Suisse', 'suisse'], ['l\'Allemagne', 'Germany', 'en Allemagne', 'allemand, allemande'],
    ['l\'Espagne', 'Spain', 'en Espagne', 'espagnol, espagnole'], ['l\'Italie', 'Italy', 'en Italie', 'italien, italienne'], ['le Portugal', 'Portugal', 'au Portugal', 'portugais, portugaise'],
    ['le Royaume-Uni', 'the United Kingdom', 'au Royaume-Uni', 'britannique'], ['l\'Angleterre', 'England', 'en Angleterre', 'anglais, anglaise'], ['l\'Irlande', 'Ireland', 'en Irlande', 'irlandais, irlandaise'],
    ['les Pays-Bas', 'the Netherlands', 'aux Pays-Bas', 'néerlandais, néerlandaise'], ['la Grèce', 'Greece', 'en Grèce', 'grec, grecque'], ['la Russie', 'Russia', 'en Russie', 'russe'],
    ['la Chine', 'China', 'en Chine', 'chinois, chinoise'], ['le Japon', 'Japan', 'au Japon', 'japonais, japonaise'], ['la Corée du Sud', 'South Korea', 'en Corée du Sud', 'coréen, coréenne'],
    ['l\'Inde', 'India', 'en Inde', 'indien, indienne'], ['les Philippines', 'the Philippines', 'aux Philippines', 'philippin, philippine'], ['le Vietnam', 'Vietnam', 'au Vietnam', 'vietnamien, vietnamienne'],
    ['l\'Australie', 'Australia', 'en Australie', 'australien, australienne'], ['le Mexique', 'Mexico', 'au Mexique', 'mexicain, mexicaine'], ['le Brésil', 'Brazil', 'au Brésil', 'brésilien, brésilienne'],
    ['l\'Argentine', 'Argentina', 'en Argentine', 'argentin, argentine'], ['le Maroc', 'Morocco', 'au Maroc', 'marocain, marocaine'], ['l\'Algérie', 'Algeria', 'en Algérie', 'algérien, algérienne'],
    ['la Tunisie', 'Tunisia', 'en Tunisie', 'tunisien, tunisienne'], ['le Sénégal', 'Senegal', 'au Sénégal', 'sénégalais, sénégalaise'], ['la Côte d\'Ivoire', 'Ivory Coast', 'en Côte d\'Ivoire', 'ivoirien, ivoirienne'],
    ['l\'Égypte', 'Egypt', 'en Égypte', 'égyptien, égyptienne'], ['la Turquie', 'Turkey', 'en Turquie', 'turc, turque'], ['Haïti', 'Haiti', 'en Haïti', 'haïtien, haïtienne']
  ],
  continents: [['l\'Europe', 'Europe'], ['l\'Afrique', 'Africa'], ['l\'Asie', 'Asia'], ['l\'Amérique du Nord', 'North America'], ['l\'Amérique du Sud', 'South America'], ['l\'Océanie', 'Oceania'], ['l\'Antarctique', 'Antarctica']],
  streets: [['la rue', 'street'], ['l\'avenue', 'avenue'], ['le boulevard', 'boulevard'], ['la place', 'square'], ['le quai', 'embankment, platform'], ['l\'impasse', 'dead end'], ['l\'allée', 'path, drive'], ['la ruelle', 'alley, lane'], ['le chemin', 'path, way'], ['la route', 'road'], ['l\'autoroute', 'motorway, highway'], ['le pont', 'bridge'], ['le carrefour', 'crossroads'], ['le rond-point', 'roundabout']]
};
// Country and place nouns also go into the dictionary (with their gender) so the gender quiz can use them.
FR.DICT_MORE.push(`
#places|Countries, cities & streets|Pays, villes et rues
France|France|f|J'habite en France.|I live in France.
Canada|Canada|m|Elle travaille au Canada.|She works in Canada.
États-Unis|the United States|m|Il part aux États-Unis.|He is leaving for the United States.
Belgique|Belgium|f|On parle français en Belgique.|French is spoken in Belgium.
Suisse|Switzerland|f|Genève est en Suisse.|Geneva is in Switzerland.
Allemagne|Germany|f|Berlin est la capitale de l'Allemagne.|Berlin is the capital of Germany.
Espagne|Spain|f|Nous allons en Espagne cet été.|We are going to Spain this summer.
Italie|Italy|f|Rome est en Italie.|Rome is in Italy.
Portugal|Portugal|m|Lisbonne est au Portugal.|Lisbon is in Portugal.
Royaume-Uni|the United Kingdom|m|Londres est au Royaume-Uni.|London is in the United Kingdom.
Angleterre|England|f|Il étudie en Angleterre.|He studies in England.
Irlande|Ireland|f|Il pleut souvent en Irlande.|It often rains in Ireland.
Pays-Bas|the Netherlands|m|Amsterdam est aux Pays-Bas.|Amsterdam is in the Netherlands.
Grèce|Greece|f|Les îles de Grèce sont belles.|The islands of Greece are beautiful.
Russie|Russia|f|La Russie est un pays immense.|Russia is a huge country.
Chine|China|f|Elle a voyagé en Chine.|She travelled to China.
Japon|Japan|m|Je rêve d'aller au Japon.|I dream of going to Japan.
Corée du Sud|South Korea|f|Séoul est en Corée du Sud.|Seoul is in South Korea.
Inde|India|f|L'Inde a beaucoup de langues.|India has many languages.
Philippines|the Philippines|f|Manille est aux Philippines.|Manila is in the Philippines.
Vietnam|Vietnam|m|On parlait français au Vietnam autrefois.|French used to be spoken in Vietnam.
Australie|Australia|f|L'Australie est très loin.|Australia is very far away.
Mexique|Mexico|m|Il habite au Mexique.|He lives in Mexico.
Brésil|Brazil|m|On parle portugais au Brésil.|Portuguese is spoken in Brazil.
Argentine|Argentina|f|Buenos Aires est en Argentine.|Buenos Aires is in Argentina.
Maroc|Morocco|m|Casablanca est au Maroc.|Casablanca is in Morocco.
Algérie|Algeria|f|Alger est la capitale de l'Algérie.|Algiers is the capital of Algeria.
Tunisie|Tunisia|f|Tunis est en Tunisie.|Tunis is in Tunisia.
Sénégal|Senegal|m|Dakar est au Sénégal.|Dakar is in Senegal.
Côte d'Ivoire|Ivory Coast|f|Abidjan est en Côte d'Ivoire.|Abidjan is in Ivory Coast.
Égypte|Egypt|f|Les pyramides sont en Égypte.|The pyramids are in Egypt.
Turquie|Turkey|f|Istanbul est en Turquie.|Istanbul is in Turkey.
Europe|Europe|f|La France est en Europe.|France is in Europe.
Afrique|Africa|f|Le français est parlé en Afrique.|French is spoken in Africa.
Asie|Asia|f|Le Japon est en Asie.|Japan is in Asia.
Amérique|America|f|Il a traversé l'Amérique.|He crossed America.
Londres|London|p|Il habite à Londres.|He lives in London.
Pékin|Beijing|p|Elle part à Pékin.|She is leaving for Beijing.
Moscou|Moscow|p|Moscou est en Russie.|Moscow is in Russia.
Venise|Venice|p|Venise est une ville sur l'eau.|Venice is a city on the water.
Lisbonne|Lisbon|p|Lisbonne est au bord de l'océan.|Lisbon is on the ocean.
Bruxelles|Brussels|p|Bruxelles est la capitale de la Belgique.|Brussels is the capital of Belgium.
Genève|Geneva|p|Genève est au bord d'un lac.|Geneva is on a lake.
Manille|Manila|p|Manille est une grande ville.|Manila is a big city.
avenue|avenue|f|J'habite avenue de la République.|I live on Avenue de la République.
quai|embankment, platform|m|On se promène sur les quais de la Seine.|We stroll along the banks of the Seine.
impasse|dead end|f|La maison est au fond de l'impasse.|The house is at the end of the dead end.
allée|path, drive|f|Une allée bordée d'arbres.|A tree-lined path.
ruelle|alley, lane|f|Une petite ruelle sombre.|A small dark alley.
continent|continent|m|L'Afrique est un grand continent.|Africa is a big continent.
capitale de pays|national capital|f|Paris est une capitale de pays.|Paris is a national capital.
nationalité française|French nationality|f|Il a la nationalité française.|He has French nationality.
anglais|English (language, person)|a|Je parle anglais.|I speak English.
américain|American|a|Mon ami est américain.|My friend is American.
canadien|Canadian|a|Elle est canadienne.|She is Canadian.
belge|Belgian|a|Les frites belges sont célèbres.|Belgian chips are famous.
suisse|Swiss|a|Le chocolat suisse est délicieux.|Swiss chocolate is delicious.
allemand|German|a|Il parle allemand.|He speaks German.
espagnol|Spanish|a|J'apprends l'espagnol.|I'm learning Spanish.
italien|Italian|a|La cuisine italienne.|Italian cooking.
chinois|Chinese|a|Un restaurant chinois.|A Chinese restaurant.
japonais|Japanese|a|Elle étudie le japonais.|She studies Japanese.
philippin|Filipino|a|Mon collègue est philippin.|My colleague is Filipino.
`);
