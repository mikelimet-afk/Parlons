// Verb tables: works out the je … ils/elles forms of a French verb in the present, passé composé,
// imparfait, futur simple and futur proche. Regular -er, -ir and -re verbs follow the rules; common
// irregular verbs and their families (prendre → comprendre, venir → devenir …) are listed below.
(function () {
  const FR = window.FR = window.FR || {};
  const SUBJ = ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles'];
  const REFL = ['me', 'te', 'se', 'nous', 'vous', 'se'];
  const vowel = s => /^[aeiouyéèêëàâîïôûùœh]/i.test(s) && !/^(hurl|haï|hai|heurt|hiss|hach|hant|hasard)/i.test(s);

  // Whole irregular verbs: p = present (6 forms), pp = past participle, f = future stem, imp = imparfait stem, e = uses être.
  const IRR = {
    'être': { p: 'suis es est sommes êtes sont', pp: 'été', f: 'ser', imp: 'ét' },
    avoir: { p: 'ai as a avons avez ont', pp: 'eu', f: 'aur' },
    aller: { p: 'vais vas va allons allez vont', pp: 'allé', f: 'ir', e: 1 },
    pouvoir: { p: 'peux peux peut pouvons pouvez peuvent', pp: 'pu', f: 'pourr' },
    vouloir: { p: 'veux veux veut voulons voulez veulent', pp: 'voulu', f: 'voudr' },
    devoir: { p: 'dois dois doit devons devez doivent', pp: 'dû', f: 'devr' },
    savoir: { p: 'sais sais sait savons savez savent', pp: 'su', f: 'saur' },
    valoir: { p: 'vaux vaux vaut valons valez valent', pp: 'valu', f: 'vaudr' },
    falloir: { p: '- - faut - - -', pp: 'fallu', f: 'faudr', imp: 'fall', only: 2 },
    pleuvoir: { p: '- - pleut - - -', pp: 'plu', f: 'pleuvr', imp: 'pleuv', only: 2 },
    'prévoir': { p: 'prévois prévois prévoit prévoyons prévoyez prévoient', pp: 'prévu', f: 'prévoir' },
    asseoir: { p: 'assieds assieds assied asseyons asseyez asseyent', pp: 'assis', f: 'assiér' },
    croire: { p: 'crois crois croit croyons croyez croient', pp: 'cru' },
    boire: { p: 'bois bois boit buvons buvez boivent', pp: 'bu' },
    mourir: { p: 'meurs meurs meurt mourons mourez meurent', pp: 'mort', f: 'mourr', e: 1 },
    'naître': { p: 'nais nais naît naissons naissez naissent', pp: 'né', e: 1 },
    bouillir: { p: 'bous bous bout bouillons bouillez bouillent', pp: 'bouilli' },
    cueillir: { p: 'cueille cueilles cueille cueillons cueillez cueillent', pp: 'cueilli', f: 'cueiller' },
    haïr: { p: 'hais hais hait haïssons haïssez haïssent', pp: 'haï' }
  };
  // Families: any verb ending in the first part is conjugated like it (comprendre like prendre).
  // [ending, present endings that replace it, past participle ending, future stem ending, uses être]
  const FAM = [
    ['prendre', 'prends prends prend prenons prenez prennent', 'pris'], ['mettre', 'mets mets met mettons mettez mettent', 'mis'],
    ['battre', 'bats bats bat battons battez battent', 'battu'], ['venir', 'viens viens vient venons venez viennent', 'venu', 'viendr'],
    ['tenir', 'tiens tiens tient tenons tenez tiennent', 'tenu', 'tiendr'], ['crire', 'cris cris crit crivons crivez crivent', 'crit'],
    ['vrir', 'vre vres vre vrons vrez vrent', 'vert'], ['frir', 'fre fres fre frons frez frent', 'fert'],
    ['aître', 'ais ais aît aissons aissez aissent', 'u'], ['uire', 'uis uis uit uisons uisez uisent', 'uit'],
    ['aindre', 'ains ains aint aignons aignez aignent', 'aint'], ['eindre', 'eins eins eint eignons eignez eignent', 'eint'],
    ['oindre', 'oins oins oint oignons oignez oignent', 'oint'], ['cevoir', 'çois çois çoit cevons cevez çoivent', 'çu', 'cevr'],
    ['quérir', 'quiers quiers quiert quérons quérez quièrent', 'quis', 'querr'], ['courir', 'cours cours court courons courez courent', 'couru', 'courr'],
    ['suivre', 'suis suis suit suivons suivez suivent', 'suivi'], ['vivre', 'vis vis vit vivons vivez vivent', 'vécu'],
    ['partir', 'pars pars part partons partez partent', 'parti'], ['sortir', 'sors sors sort sortons sortez sortent', 'sorti'],
    ['sentir', 'sens sens sent sentons sentez sentent', 'senti'], ['mentir', 'mens mens ment mentons mentez mentent', 'menti'],
    ['dormir', 'dors dors dort dormons dormez dorment', 'dormi'], ['servir', 'sers sers sert servons servez servent', 'servi'],
    ['faire', 'fais fais fait faisons faites font', 'fait', 'fer'], ['plaire', 'plais plais plaît plaisons plaisez plaisent', 'plu'],
    ['taire', 'tais tais tait taisons taisez taisent', 'tu'], ['suffire', 'suffis suffis suffit suffisons suffisez suffisent', 'suffi'],
    ['lire', 'lis lis lit lisons lisez lisent', 'lu'], ['dire', 'dis dis dit disons dites disent', 'dit'],
    ['rire', 'ris ris rit rions riez rient', 'ri'], ['voir', 'vois vois voit voyons voyez voient', 'vu', 'verr'],
    ['fuir', 'fuis fuis fuit fuyons fuyez fuient', 'fui'], ['soudre', 'sous sous sout solvons solvez solvent', 'solu'],
    ['vaincre', 'vaincs vaincs vainc vainquons vainquez vainquent', 'vaincu'], ['rompre', 'romps romps rompt rompons rompez rompent', 'rompu'],
    ['envoyer', 'envoie envoies envoie envoyons envoyez envoient', 'envoyé', 'enverr']
  ];
  // Verbs that take être in the passé composé (all reflexive verbs do too).
  const ETRE = new Set('aller venir devenir revenir parvenir intervenir survenir arriver partir repartir sortir ressortir entrer rentrer monter remonter descendre redescendre naître mourir rester tomber retomber retourner décéder apparaître'.split(' '));
  const DOUBLE = new Set('appeler rappeler épeler renouveler jeter rejeter projeter feuilleter'.split(' '));

  // Present forms and stems for a verb without "se".
  function parts(inf) {
    const x = IRR[inf];
    if (x) return { p: x.p.split(' '), pp: x.pp, f: x.f || (inf.endsWith('re') ? inf.slice(0, -1) : inf), imp: x.imp, e: x.e, only: x.only };
    for (const [end, pres, pp, fut] of FAM) {
      if (inf.endsWith(end) && inf !== 'avoir') {
        // The family's forms are written for the ending alone, so put the verb's own beginning back in front.
        const pre = inf.slice(0, inf.length - end.length), p = pres.split(' ').map(f => pre + f);
        if (end === 'dire' && pre && pre !== 're') p[4] = pre + 'disez';
        return { p, pp: pre + pp, f: fut ? pre + fut : (inf.endsWith('re') ? inf.slice(0, -1) : inf), e: ETRE.has(inf) };
      }
    }
    // Regular groups.
    if (inf.endsWith('er')) return erParts(inf);
    if (inf.endsWith('ir')) { const s = inf.slice(0, -2); return { p: [s + 'is', s + 'is', s + 'it', s + 'issons', s + 'issez', s + 'issent'], pp: s + 'i', f: inf }; }
    if (inf.endsWith('re')) { const s = inf.slice(0, -2); return { p: [s + 's', s + 's', s, s + 'ons', s + 'ez', s + 'ent'], pp: s + 'u', f: inf.slice(0, -1) }; }
    return null;
  }

  // -er verbs, with the spelling changes French makes: mangeons, commençons, achète, appelle, préfère, emploie.
  function erParts(inf) {
    const s = inf.slice(0, -2);
    let silent = s, fut = inf;
    let m;
    if (DOUBLE.has(inf) || /(appel|jet)$/.test(s)) { silent = s + s.slice(-1); fut = silent + 'er'; }
    else if ((m = s.match(/^(.*)e([^aeiouyéèêh])$/))) { silent = m[1] + 'è' + m[2]; fut = silent + 'er'; }
    else if ((m = s.match(/^(.*)é([^aeiouyéèê]{1,2})$/)) && !/(gu|qu)$/.test(m[2])) { silent = m[1] + 'è' + m[2]; }
    else if (/[ou]y$/.test(s)) { silent = s.slice(0, -1) + 'i'; fut = silent + 'er'; }
    else if (/ay$/.test(s)) { silent = s.slice(0, -1) + 'i'; fut = silent + 'er'; }
    const nous = /g$/.test(s) ? s + 'e' : /c$/.test(s) ? s.slice(0, -1) + 'ç' : s;
    return { p: [silent + 'e', silent + 'es', silent + 'e', nous + 'ons', s + 'ez', silent + 'ent'], pp: s + 'é', f: fut };
  }

  // Imparfait: the nous form without -ons, plus -ais -ais -ait -ions -iez -aient (je mangeais, nous mangions).
  function impForms(pt) {
    const stem = pt.imp || pt.p[3].replace(/ons$/, '');
    return ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'].map(e => (e[0] === 'i' ? stem.replace(/ge$/, 'g').replace(/ç$/, 'c') : stem) + e);
  }

  // Puts subject (and "me/te/se …" for reflexive verbs) in front of a form, with j' / m' before a vowel.
  function line(i, form, refl) {
    let words = form;
    if (refl) words = (vowel(form) && i !== 3 && i !== 4 ? REFL[i].slice(0, 1) + '\'' : REFL[i] + ' ') + form;
    return (i === 0 && vowel(words) ? 'j\'' : SUBJ[i] + ' ') + words;
  }

  FR.SUBJECTS = SUBJ;
  // Full tables for an infinitive ("prononcer", "se lever", "s'asseoir"), or null if it isn't a verb.
  FR.conj = function (input) {
    let inf = String(input || '').trim().toLowerCase();
    const refl = /^(se |s')/.test(inf);
    const base = inf.replace(/^(se |s')/, '');
    const pt = parts(base);
    if (!pt) return null;
    const etre = refl || pt.e || ETRE.has(base);
    const agree = (i) => etre ? (i < 3 ? '(e)' : '(e)s') : '';
    const avoirP = IRR.avoir.p.split(' '), etreP = IRR['être'].p.split(' '), allerP = IRR.aller.p.split(' ');
    const rows = f => SUBJ.map((_, i) => pt.only != null && i !== pt.only ? '' : f(i)).map(x => pt.only != null ? x.replace('il/elle ', 'il ') : x);
    const present = rows(i => line(i, pt.p[i], refl));
    const pc = rows(i => {
      const aux = (etre ? etreP : avoirP)[i];
      const ppx = pt.pp + (etre ? agree(i) : '');
      if (refl) return line(i, aux, true) + ' ' + ppx;
      return line(i, aux) + ' ' + ppx;
    });
    const imp = impForms(pt), impR = rows(i => line(i, imp[i], refl));
    const fut = ['ai', 'as', 'a', 'ons', 'ez', 'ont'], futR = rows(i => line(i, pt.f + fut[i], refl));
    const near = rows(i => line(i, allerP[i]) + ' ' + (refl ? (vowel(base) && i !== 3 && i !== 4 ? REFL[i][0] + '\'' : REFL[i] + ' ') : '') + base);
    return {
      inf: refl ? (vowel(base) ? 's\'' : 'se ') + base : base, base, refl, aux: etre ? 'être' : 'avoir', pp: pt.pp,
      tenses: [
        { id: 'pres', t: ['Present', 'Présent'], use: ['now, or regularly: I speak, I am speaking', 'maintenant ou d\'habitude'], rows: present },
        { id: 'pc', t: ['Past: passé composé', 'Passé composé'], use: ['a finished action: I spoke, I have spoken', 'une action terminée'], rows: pc },
        { id: 'imp', t: ['Past: imparfait', 'Imparfait'], use: ['how things were, or used to be: I was speaking, I used to speak', 'description, habitude dans le passé'], rows: impR },
        { id: 'fut', t: ['Future: futur simple', 'Futur simple'], use: ['I will speak', 'je parlerai'], rows: futR },
        { id: 'near', t: ['Near future: aller + infinitive', 'Futur proche'], use: ['I am going to speak', 'je vais parler'], rows: near }
      ]
    };
  };

  // Every form of every dictionary verb → its infinitive. Built the first time someone searches for a conjugated form.
  let FI = null;
  function formIndex() {
    if (FI) return FI;
    FI = {};
    (FR.words || []).forEach(w => {
      if (w.pos !== 'verb' || /[()]/.test(w.fr)) return;
      const c = FR.conj(w.fr); if (!c) return;
      c.tenses.forEach(t => t.rows.forEach(r => {
        if (!r) return;
        const f = r.replace(/^(je |j'|tu |il\/elle |nous |vous |ils\/elles )/, '').replace(/\(e\)s?$/, '');
        [f, f.replace(/^(me |m'|te |t'|se |s'|nous |vous )/, '')].forEach(k => { (FI[k] = FI[k] || []).includes(w.fr) || FI[k].push(w.fr); });
      }));
    });
    return FI;
  }
  // Finds the verb someone typed: a French infinitive, a conjugated form ("prononce"), or an English verb ("pronounce", "to eat").
  FR.verbFind = function (q) {
    q = String(q || '').trim().toLowerCase().replace(/[!?.]+$/, '');
    if (!q) return [];
    const isVerb = w => w && w.pos === 'verb';
    const en = q.replace(/^to /, '');
    const out = [];
    const add = fr => { if (fr && !out.includes(fr) && FR.conj(fr)) out.push(fr); };
    const W = FR.wordBy || {};
    if (isVerb(W[q])) add(q);
    if (isVerb(W['se ' + q])) add('se ' + q);
    if (isVerb(W['s\'' + q])) add('s\'' + q);
    // A conjugated form ("prononce", "vais", "j'ai mangé"): look it up in the tables of every dictionary verb.
    if (!out.length) {
      const form = q.replace(/^(je |j'|tu |il |elle |on |nous |vous |ils |elles |il\/elle |ils\/elles )/, '');
      (formIndex()[form] || []).forEach(add);
      if (!out.length && FR.lemma) { const r = FR.lemma(form); const e = r && (r.entry || W[r.fr]); if (isVerb(e)) add(e.fr); }
    }
    (FR.words || []).forEach(w => {
      if (!isVerb(w)) return;
      const meanings = w.en.toLowerCase().split(/[,;]/).map(s => s.trim().replace(/^to /, '').replace(/\s*\(.*?\)\s*/g, ' ').trim());
      if (meanings.includes(en)) add(w.fr);
    });
    if (!out.length && /(er|ir|re|oir)$/.test(q) && !/\s/.test(q.replace(/^se /, ''))) add(q);
    return out;
  };
})();
