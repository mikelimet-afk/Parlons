// Drawings for sports words (docs/design-sports.md), in the same flat style as js/pics.js:
// a 100 x 100 grid, two shades per colour, people built from the shared figure.
(function () {
  const FR = window.FR, D = FR.PIC_DRAW, H = FR.PIC_HELP;
  if (!D || !H) return;
  const { LINE, P, C, E, R, S, G, RING, shadow, tile, man, woman, HAIR } = H;
  const SKY = '#cfe9fb', GRASS = ['#8fcf55', '#6fb23a'], RED = ['#e8433a', '#c22e27'], DARK = '#2b2f36';
  const ER = (x, y, rx, ry, fill, st, w, rot) => '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="' + fill + '" stroke="' + st + '" stroke-width="' + w + '"' + (rot ? ' transform="rotate(' + rot + ' ' + x + ' ' + y + ')"' : '') + '/>';
  const TX = (x, y, s, c, t) => '<text x="' + x + '" y="' + y + '" font-size="' + s + '" font-weight="800" text-anchor="middle" fill="' + c + '" font-family="system-ui,Segoe UI,Arial,sans-serif">' + t + '</text>';
  // A regular polygon (the black patches on a football).
  const poly = (cx, cy, r, n, rot, f) => {
    let d = '';
    for (let i = 0; i < n; i++) { const a = (rot - 90) * Math.PI / 180 + i * 2 * Math.PI / n; d += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1) + ' '; }
    return P(d + 'Z', f);
  };
  const soccer = (x, y, r) => {
    let s = LINE(C(x, y, r, '#ffffff')) + poly(x, y, r * 0.36, 5, 0, DARK);
    for (let k = 0; k < 5; k++) { const a = (-90 + 36 + 72 * k) * Math.PI / 180; s += poly(x + r * 0.78 * Math.cos(a), y + r * 0.78 * Math.sin(a), r * 0.18, 5, 36 + 72 * k, DARK); }
    return s + E(x - r * 0.35, y - r * 0.4, r * 0.22, r * 0.12, '#ffffff', -30).replace('/>', ' opacity=".7"/>');
  };
  const tball = (x, y, r) => C(x, y, r, '#d7e84a') + P('M' + x + ' ' + (y - r) + ' A' + r + ' ' + r + ' 0 0 1 ' + x + ' ' + (y + r) + ' A' + r * 0.7 + ' ' + r + ' 0 0 0 ' + x + ' ' + (y - r) + 'Z', '#bfd03a') +
    S('M' + (x - r * 0.9) + ' ' + (y - r * 0.4) + ' Q' + x + ' ' + (y + r * 0.2) + ' ' + (x - r * 0.2) + ' ' + (y + r * 0.95), '#ffffff', 1.6) + S('M' + (x + r * 0.9) + ' ' + (y + r * 0.4) + ' Q' + x + ' ' + (y - r * 0.2) + ' ' + (x + r * 0.2) + ' ' + (y - r * 0.95), '#ffffff', 1.6);
  const bball = (x, y, r) => C(x, y, r, '#f08a35') + P('M' + x + ' ' + (y - r) + ' A' + r + ' ' + r + ' 0 0 1 ' + x + ' ' + (y + r) + ' A' + r * 0.6 + ' ' + r + ' 0 0 0 ' + x + ' ' + (y - r) + 'Z', '#d8712a') +
    S('M' + (x - r) + ' ' + y + ' L' + (x + r) + ' ' + y + ' M' + x + ' ' + (y - r) + ' L' + x + ' ' + (y + r), '#5a2e14', 1.8) +
    S('M' + (x - r * 0.7) + ' ' + (y - r * 0.7) + ' Q' + (x - r * 0.25) + ' ' + y + ' ' + (x - r * 0.7) + ' ' + (y + r * 0.7) + ' M' + (x + r * 0.7) + ' ' + (y - r * 0.7) + ' Q' + (x + r * 0.25) + ' ' + y + ' ' + (x + r * 0.7) + ' ' + (y + r * 0.7), '#5a2e14', 1.8);
  // A racket, drawn upright then turned.
  const racket = (rot, s, col) => G('rotate(' + rot + ' 50 50) translate(' + 50 * (1 - s) + ',' + 50 * (1 - s) + ') scale(' + s + ')',
    R(46.5, 58, 7, 36, DARK, 3) + R(46.5, 82, 7, 12, '#5b6470', 3) + P('M44 56 L50 66 L56 56Z', col) + ER(50, 32, 19, 25, '#ffffff', col, 5) +
    S('M38 20 L38 44 M44 10 L44 54 M50 8 L50 56 M56 10 L56 54 M62 20 L62 44 M32 22 L68 22 M31 30 L69 30 M31 38 L69 38 M33 46 L67 46', '#c3ccd6', 1));
  const pitch = () => R(2, 62, 96, 36, GRASS[0]) + R(2, 80, 96, 18, GRASS[1]);
  const netGrid = (x1, y1, x2, y2, step) => { let d = ''; for (let x = x1; x <= x2; x += step) d += 'M' + x + ' ' + y1 + ' L' + x + ' ' + y2 + ' '; for (let y = y1; y <= y2; y += step) d += 'M' + x1 + ' ' + y + ' L' + x2 + ' ' + y + ' '; return S(d, '#ffffff', 0.9).replace('/>', ' opacity=".8"/>'); };
  const goalFrame = () => netGrid(20, 34, 80, 70, 6) + S('M18 72 L18 32 L82 32 L82 72', '#ffffff', 4) + S('M18 72 L18 32 L82 32 L82 72', '#c3ccd6', 1);
  const one = (f, o) => shadow(50, 94, 17) + f(Object.assign({ s: 0.9 }, o));

  // ---------- balls and sports ----------
  D.football = () => tile(SKY, pitch() + goalFrame() + soccer(50, 80, 12));
  D.foot = D.football;
  D.tennis = () => shadow(50, 92, 30) + racket(-28, 0.9, '#e8433a') + tball(76, 74, 10);
  // A shuttlecock: cork base and a feather skirt.
  const shuttle = (x, y, s, rot) => G('translate(' + x + ',' + y + ') rotate(' + rot + ') scale(' + s + ')',
    LINE(P('M-10 -22 L10 -22 L5 0 L-5 0Z', '#ffffff')) + S('M-5 -22 L-2.5 0 M0 -22 L0 0 M5 -22 L2.5 0', '#d9e0e8', 1) + S('M-8 -13 L8 -13', '#c3ccd6', 1.2) + P('M-5 0 L5 0 Q5 8 0 8 Q-5 8 -5 0Z', '#e8433a') + P('M0 0 L5 0 Q5 8 0 8Z', '#c22e27'));
  D.badminton = () => shadow(50, 92, 30) + racket(-30, 0.82, '#8e5bc4') + shuttle(76, 58, 1, 30);
  D['volant de badminton'] = () => shadow(50, 92, 16) + shuttle(50, 58, 1.9, 0);
  D.raquette = () => shadow(50, 94, 20) + racket(-20, 1, '#3a85cf');
  D['basket-ball'] = () => shadow(50, 92, 30) + bball(50, 56, 32);
  D.volley = () => tile(SKY, pitch() + S('M6 52 L94 52', DARK, 3) + netGrid(6, 52, 94, 70, 5).replace(/#ffffff/g, DARK) + S('M6 50 L6 92 M94 50 L94 92', '#5b6470', 3) +
    LINE(C(50, 28, 15, '#ffffff'), '#c3ccd6', 2) + S('M37 22 Q50 30 63 22', '#3a85cf', 4) + S('M38 36 Q50 26 62 36', '#f2c230', 4) + S('M50 13 Q44 28 50 43', '#3a85cf', 3) + RING(50, 28, 15, '#c3ccd6', 1));
  D.sport = () => shadow(50, 92, 40) + bball(30, 62, 20) + soccer(68, 66, 17) + tball(52, 30, 10);
  D.natation = D.nager;
  D['course à pied'] = D.courir;
  D.ski = () => tile(SKY, P('M2 70 L34 30 L52 52 L66 38 L98 74 L98 98 L2 98Z', '#ffffff') + P('M34 30 L52 52 L44 58 Z', '#dfe8f1') + P('M66 38 L98 74 L80 76Z', '#dfe8f1') +
    G('rotate(-22 50 80)', R(14, 78, 72, 5, RED[0], 2.5) + R(16, 88, 72, 5, RED[1], 2.5) + P('M86 78 Q92 78 92 74', '#e8433a')) + S('M30 40 L42 92 M64 40 L58 92', '#5b6470', 2.4) + C(30, 40, 2.4, DARK) + C(64, 40, 2.4, DARK));
  D.golf = () => tile(SKY, R(2, 58, 96, 40, GRASS[0]) + E(60, 74, 30, 9, GRASS[1]) + E(66, 74, 4, 1.6, DARK) + S('M66 74 L66 26', '#e1e7ee', 2) + P('M66 26 L86 32 L66 38Z', RED[0]) +
    R(25, 82, 3, 9, '#ffffff') + LINE(C(26.5, 79, 4.5, '#ffffff')));
  D.boxe = () => shadow(50, 92, 36) + [[30, -12], [70, 12]].map(([x, r]) => G('rotate(' + r + ' ' + x + ' 54)',
    P('M' + (x - 15) + ' 50 Q' + (x - 16) + ' 28 ' + x + ' 26 Q' + (x + 16) + ' 26 ' + (x + 15) + ' 48 L' + (x + 13) + ' 66 L' + (x - 13) + ' 66Z', RED[0]) +
    P('M' + x + ' 26 Q' + (x + 16) + ' 26 ' + (x + 15) + ' 48 L' + (x + 13) + ' 66 L' + x + ' 66Z', RED[1]) + E(x - 13, 50, 6, 9, RED[1], -15) + R(x - 13, 66, 26, 14, '#ffffff', 3) + R(x - 13, 66, 26, 4, '#dfe5ec'))).join('');
  D.musculation = () => shadow(50, 84, 40) + R(16, 56, 68, 6, '#8a96a5', 3) + [10, 22, 70, 82].map((x, i) => R(x, i % 3 ? 44 : 38, 8, i % 3 ? 30 : 42, i % 2 ? '#2b2f36' : '#3a3f47', 2)).join('') + R(18, 57, 64, 2, '#c3ccd6');
  D['salle de sport'] = () => tile('#eef1f6', R(2, 74, 96, 24, '#c9a27a') + R(2, 74, 96, 3, '#b38a63') + R(8, 12, 30, 22, '#cfe9fb', 2) + R(62, 12, 30, 22, '#cfe9fb', 2) +
    G('translate(0,6)', R(26, 58, 48, 5, '#8a96a5', 2.5) + R(18, 48, 7, 25, DARK, 2) + R(75, 48, 7, 25, DARK, 2) + R(12, 52, 6, 17, '#3a3f47', 2) + R(82, 52, 6, 17, '#3a3f47', 2)));

  // ---------- places ----------
  D.terrain = () => tile(GRASS[0], R(2, 2, 96, 32, GRASS[1]).replace('/>', ' opacity=".5"/>') + R(2, 66, 96, 32, GRASS[1]).replace('/>', ' opacity=".5"/>') +
    S('M10 10 L90 10 L90 90 L10 90Z M10 50 L90 50 M34 10 L34 22 L66 22 L66 10 M34 90 L34 78 L66 78 L66 90', '#ffffff', 2) + '<circle cx="50" cy="50" r="11" fill="none" stroke="#ffffff" stroke-width="2"/>' + C(50, 50, 1.8, '#ffffff'));
  D.but = () => tile(SKY, pitch() + goalFrame());
  D.stade = () => tile(SKY, P('M4 96 L4 46 Q50 24 96 46 L96 96Z', '#8a96a5') + P('M50 30 Q76 32 96 46 L96 96 L50 96Z', '#76828f') +
    S('M8 54 Q50 36 92 54 M8 64 Q50 46 92 64', '#c3ccd6', 1.6) + [16, 30, 44, 58, 72, 84].map((x, i) => C(x, 50 - Math.sin(x / 100 * Math.PI) * 10 + 8, 2, ['#e8433a', '#3a85cf', '#f2c230'][i % 3])).join('') +
    E(50, 84, 40, 12, GRASS[0]) + E(50, 86, 34, 8, GRASS[1]).replace('/>', ' opacity=".5"/>') + S('M50 74 L50 96', '#ffffff', 1.2) +
    S('M10 46 L10 14 M90 46 L90 14', '#5b6470', 2) + R(4, 8, 12, 7, '#f2f4f7', 1.5) + R(84, 8, 12, 7, '#f2f4f7', 1.5));
  D.piscine = () => tile('#4f9ee6', R(2, 2, 96, 16, '#e7edf3') + R(2, 16, 96, 3, '#c9d3dd') + [34, 54, 74].map(y => S('M2 ' + y + ' L98 ' + y, '#f2c230', 2.4) + S('M2 ' + y + ' L98 ' + y, '#e8433a', 2.4).replace('stroke-width="2.4"', 'stroke-width="2.4" stroke-dasharray="4 6"')).join('') +
    S('M14 46 Q22 42 30 46 M60 64 Q68 60 76 64 M30 86 Q38 82 46 86', '#a6d4f6', 1.8) + S('M80 4 L80 28 M90 4 L90 28 M80 10 L90 10 M80 18 L90 18', '#b5bfca', 2.2));

  // ---------- people ----------
  D['équipe'] = () => shadow(50, 94, 42) + man({ x: -26, s: 0.66, top: RED, hair: HAIR.blond }) + woman({ x: 26, s: 0.66, top: RED, pants: 1 }) + man({ x: 0, s: 0.74, top: RED, add: TX(50, 58, 13, '#ffffff', '9') });
  D.joueur = () => one(man, { x: -8, top: RED, bot: ['#f3f5f8', '#d9e0e8'], add: TX(50, 58, 13, '#ffffff', '10') }) + soccer(80, 86, 8);
  D.joueuse = () => one(woman, { x: -8, top: ['#3a85cf', '#2b6aad'], pants: 1, bot: ['#f3f5f8', '#d9e0e8'], add: TX(50, 58, 13, '#ffffff', '7') }) + soccer(80, 86, 8);
  D.arbitre = () => one(man, { top: [DARK, '#1f2228'], bot: [DARK, '#1f2228'], armR: [68, 32, 68, 18], add: R(63, 4, 10, 13, '#f2c230', 1.5) + S('M46 38 L50 46 L54 38', '#c3ccd6', 1) + C(50, 47, 2.2, '#c9d1da') });
  D['entraîneur'] = () => one(man, { top: ['#4caf7a', '#3a9462'], armL: [34, 56, 42, 58], add: R(36, 46, 16, 20, '#b9824f', 2) + R(38.5, 50, 11, 14, '#ffffff') + S('M40 54 L47 54 M40 58 L46 58', '#8a96a5', 1) + R(41, 44, 6, 4, '#8a96a5', 1) + S('M46 38 L54 48 L58 38', '#c3ccd6', 1) + C(54, 49, 2.2, '#c9d1da') });
  D['gardien de but'] = () => shadow(50, 94, 26) + man({ s: 0.9, top: ['#7ed957', '#5fbf3c'], armL: [30, 30, 24, 16], armR: [70, 30, 76, 16], add: E(24, 14, 6.5, 7, '#f2f4f7') + E(76, 14, 6.5, 7, '#dfe5ec') + R(18, 18, 12, 4, '#f2c230', 1.5) + R(70, 18, 12, 4, '#f2c230', 1.5) });
  D.match = () => tile(SKY, pitch() + man({ x: -26, s: 0.62, top: RED, armR: [70, 50, 78, 44] }) + man({ x: 26, s: 0.62, top: ['#3a85cf', '#2b6aad'], hair: HAIR.brown, armL: [30, 50, 22, 44] }) + soccer(50, 88, 6));

  // ---------- things ----------
  D.maillot = () => shadow(50, 94, 30) + P('M30 18 L42 12 Q50 20 58 12 L70 18 L86 34 L74 46 L70 42 L70 90 L30 90 L30 42 L26 46 L14 34Z', RED[0]) +
    P('M50 17 Q54 15 58 12 L70 18 L86 34 L74 46 L70 42 L70 90 L50 90Z', RED[1]) + S('M42 12 Q50 20 58 12', '#ffffff', 2.4) + S('M14 34 L26 46 M86 34 L74 46', '#ffffff', 2.4) + TX(50, 70, 24, '#ffffff', '10');
  D['médaille'] = () => shadow(50, 94, 18) + P('M30 6 L44 6 L58 46 L46 50Z', '#3a85cf') + P('M70 6 L56 6 L42 46 L54 50Z', '#e8433a') + C(50, 66, 22, '#f2c230') + P('M50 44 A22 22 0 0 1 50 88 A15 22 0 0 0 50 44Z', '#dba51f') +
    poly(50, 66, 11, 5, 0, '#ffe07a') + poly(50, 66, 4.6, 5, 36, '#f2c230');
  D.coupe = () => shadow(50, 94, 24) + '<path d="M28 20 Q12 20 14 34 Q16 46 32 48" fill="none" stroke="#dba51f" stroke-width="5"/><path d="M72 20 Q88 20 86 34 Q84 46 68 48" fill="none" stroke="#dba51f" stroke-width="5"/>' +
    P('M26 14 L74 14 L72 34 Q68 56 50 58 Q32 56 28 34Z', '#f2c230') + P('M50 14 L74 14 L72 34 Q68 56 50 58Z', '#dba51f') + R(45, 58, 10, 14, '#dba51f') + R(34, 72, 32, 8, '#b38420', 2) + R(30, 80, 40, 12, '#8a5a3a', 2) + R(38, 84, 24, 4, '#f2c230', 1) +
    E(38, 24, 3, 7, '#ffffff').replace('/>', ' opacity=".5"/>');
  D.casque = () => shadow(50, 90, 36) + P('M12 66 Q12 24 50 22 Q88 24 88 62 L80 66 Z', '#3a85cf') + P('M50 22 Q88 24 88 62 L80 66 L50 66Z', '#2b6aad') +
    P('M30 30 Q36 40 34 52 M50 24 L50 48 M70 30 Q64 40 66 52', 'none').replace('fill="none"', 'fill="none" stroke="#1f4f86" stroke-width="5" stroke-linecap="round"') + R(10, 64, 72, 6, DARK, 3) + S('M24 70 Q30 86 46 84 Q60 82 64 70', '#5b6470', 2.2);
  D.baskets = () => shadow(50, 86, 42) + LINE(P('M8 74 L10 54 Q12 44 24 44 L40 46 Q52 36 60 50 L84 60 Q94 64 92 74Z', '#f3f5f8')) +
    P('M8 74 L92 74 Q92 82 84 82 L12 82 Q8 82 8 74Z', '#e8433a') + S('M30 50 L36 60 M38 48 L44 58 M46 46 L52 56', '#8a96a5', 2) + P('M60 50 L84 60 Q78 66 66 62Z', '#3a85cf') + S('M14 78 L86 78', '#ffffff', 1.2);
  D.score = () => shadow(50, 92, 36) + R(10, 22, 80, 54, DARK, 6) + R(14, 26, 72, 46, '#1f2228', 4) + TX(32, 62, 30, '#f2c230', '2') + TX(50, 60, 22, '#8a96a5', ':') + TX(68, 62, 30, '#f2c230', '1') + R(28, 76, 6, 16, '#5b6470') + R(66, 76, 6, 16, '#5b6470');
  D.filet = () => tile(SKY, pitch() + S('M6 40 L94 40', DARK, 3) + netGrid(6, 40, 94, 64, 5).replace(/#ffffff/g, DARK) + S('M6 38 L6 92 M94 38 L94 92', '#5b6470', 3) + tball(60, 24, 7));
})();
