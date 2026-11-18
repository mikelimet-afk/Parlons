// Natural voices. Device voices (Web Speech) vary a lot: many phones expose a single French voice,
// so "male" used to be a female voice pitched down. Natural mode instead runs a neural voice
// (Piper) inside the app: Tom (male) and Siwis (female), downloaded once (~60 MB each), then offline.
// Canadian French has no neural Piper voice, so Canada uses the device's fr-CA voices when present.
(function () {
  // The +esm build resolves the library's bare imports (onnxruntime-web). Its built-in wasm path points
  // at an older onnxruntime, so we read the bundled version and pass matching wasm files ourselves.
  const LIB = 'https://cdn.jsdelivr.net/npm/@mintplex-labs/piper-tts-web@1.0.5/+esm';
  const PIPER = 'https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize';
  let ortVer = null;
  const sessions = {}; // voiceId -> Promise<TtsSession>; the library keeps one global session, so we hold our own
  const NEURAL = { m: 'fr_FR-tom-medium', f: 'fr_FR-siwis-medium' };
  const st = () => FR.state.settings;
  let lib = null, audio = null, token = 0;
  const have = FR._have = {};
  const cache = new Map(); // voice|text -> object URL

  FR.neuralOk = () => !!(window.WebAssembly && window.isSecureContext && navigator.storage && navigator.storage.getDirectory);
  const getLib = () => lib || (lib = Promise.all([import(LIB), fetch(LIB).then(r => r.text())]).then(([L, src]) => {
    const m = src.match(/onnxruntime-web@([\d.]+)/); ortVer = m ? m[1] : '1.27.0'; return L;
  }).catch(e => { lib = null; throw e; }));
  // The session fetches the model itself (and saves it for offline use). Downloading separately first
  // can read back a half-written file, so we don't. A corrupt saved model is deleted and fetched again once.
  const session = (L, id) => sessions[id] || (sessions[id] = (async () => {
    const first = !have[id];
    let last = -1;
    const progress = p => {
      if (!/\.onnx$/.test(p.url || '') || !p.total) return;
      const pc = Math.floor(p.loaded * 100 / p.total / 25) * 25;
      if (pc > last) { last = pc; FR.toast(pc ? FR.tt('v_dl_p', { p: pc }) : FR.tt('v_dl')); }
    };
    const make = () => {
      L.TtsSession._instance = null; // the library shares one session; force a new one for this voice
      return L.TtsSession.create({ voiceId: id, progress: first ? progress : undefined, wasmPaths: { onnxWasm: 'https://cdn.jsdelivr.net/npm/onnxruntime-web@' + ortVer + '/dist/', piperData: PIPER + '.data', piperWasm: PIPER + '.wasm' } });
    };
    let s;
    try { s = await make(); } catch (e) {
      if (!/protobuf|graph|parse|load model/i.test(String(e))) throw e;
      await L.remove(id).catch(() => {}); s = await make();
    }
    have[id] = 1;
    if (first) FR.toast(FR.tt('v_dl_ok'));
    return s;
  })().catch(e => { delete sessions[id]; throw e; }));
  // Which neural voices are already saved on this device.
  FR.neuralStored = async () => { try { const L = await getLib(); (await L.stored()).forEach(v => have[v] = 1); } catch (e) {} return have; };
  if (FR.neuralOk()) setTimeout(() => FR.neuralStored().then(() => { if (document.body.dataset.r === 'settings' && FR.refresh) FR.refresh(); }), 1500);

  const isCA = v => /^fr[-_]CA/i.test(v.lang);
  const devVoices = (accent, g) => FR.frVoices().filter(v => (accent === 'ca' ? isCA(v) : !isCA(v)) && (!g || FR.voiceGender(v) === g));

  // Decide who speaks: { kind: 'neural', id } or { kind: 'device', voice }.
  FR.pickVoice = () => {
    const s = st(), g = s.voiceGender || 'f', accent = s.voiceAccent || 'fr', natural = (s.voiceStyle || 'natural') === 'natural';
    const all = FR.frVoices();
    if (s.voiceName) { const v = all.find(x => x.name === s.voiceName); if (v) return { kind: 'device', voice: v }; }
    const rank = list => list.slice().sort((a, b) => FR.voiceQuality(b) - FR.voiceQuality(a))[0];
    if (accent === 'ca') {
      const v = rank(devVoices('ca', g));
      if (v) return { kind: 'device', voice: v };
    } else if (natural && FR.neuralOk()) return { kind: 'neural', id: NEURAL[g] };
    else {
      const v = rank(devVoices('fr', g));
      if (v) return { kind: 'device', voice: v };
    }
    // The device has no voice of that gender (or accent): use the neural one rather than fake it.
    if (FR.neuralOk()) return { kind: 'neural', id: NEURAL[g], fallback: true };
    return { kind: 'device', voice: rank(devVoices(accent)) || rank(all) || null };
  };

  FR.stopSpeak = () => {
    token++;
    if (audio) { audio.onended = audio.onerror = null; audio.pause(); audio = null; }
    if (FR.canSpeak()) speechSynthesis.cancel();
  };

  const deviceSay = (t, voice, onend) => {
    if (!FR.canSpeak()) { FR.toast(FR.tt('no_voice')); if (onend) onend(); return; }
    const u = new SpeechSynthesisUtterance(t);
    u.lang = voice ? voice.lang : (st().voiceAccent === 'ca' ? 'fr-CA' : 'fr-FR'); u.rate = st().voice || 0.9;
    if (voice) u.voice = voice;
    if (onend) { u.onend = onend; u.onerror = onend; }
    speechSynthesis.speak(u);
  };

  const neuralSay = async (t, id, onend, my) => {
    const key = id + '|' + t;
    let url = cache.get(key);
    if (!url) {
      const L = await getLib();
      const blob = await (await session(L, id)).predict(t);
      url = URL.createObjectURL(blob);
      cache.set(key, url);
      if (cache.size > 80) { const k = cache.keys().next().value; URL.revokeObjectURL(cache.get(k)); cache.delete(k); }
    }
    if (my !== token) return; // something else was asked for meanwhile
    audio = new Audio(url);
    audio.playbackRate = Math.min(1.5, Math.max(0.6, (st().voice || 0.9) / 0.9));
    audio.preservesPitch = true;
    if (onend) { audio.onended = onend; audio.onerror = onend; }
    await audio.play();
  };

  FR.speak = (text, onend) => {
    FR.stopSpeak();
    const my = token;
    let t = String(text).replace(/_+/g, ' ').replace(/\s+/g, ' ').trim();
    if (!t) { if (onend) onend(); return; }
    const pv = FR.pickVoice();
    if (pv.kind === 'neural') {
      neuralSay(t, pv.id, onend, my).catch(e => {
        console.warn('Natural voice failed, using a device voice:', e);
        // Offline before the download, or the browser refused: fall back to a device voice.
        if (my !== token) return;
        const v = devVoices(st().voiceAccent || 'fr', st().voiceGender)[0] || FR.frVoices()[0];
        deviceSay(t, v, onend);
      });
    } else {
      try { deviceSay(t, pv.voice, onend); } catch (e) { if (onend) onend(); }
    }
  };
})();
