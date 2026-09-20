/**
 * Lets the VFX Maker (tools/maker.html) drive a player page that it shows in a frame.
 * Both players load this file and call vfxMakerHook(api) once they are up. It does nothing
 * unless the page was opened as  ...?maker=1  inside the maker.
 *
 *   api = { VFX, select(name), play(), stopAll(), onCategory(meta) }
 *
 * maker -> player:  { vfxMaker: 'load', code } | 'play' | 'stop' | { vfxMaker: 'slow', on } | { vfxMaker: 'auto', on }
 * player -> maker:  { vfxMaker: 'ready' } | 'loaded' (ok, name, error) | 'error' | 'stats'
 */
// hide the player's own panel before it measures itself (the 3D camera centres around it)
if (/[?&]maker=1/.test(location.search) && window.parent !== window) document.documentElement.classList.add('maker');

window.vfxMakerHook = function (api) {
  if (!document.documentElement.classList.contains('maker')) return;
  const VFX = api.VFX;
  let current = null, auto = true, timer = 0, peak = 0;
  const say = (type, extra) => window.parent.postMessage(Object.assign({ vfxMaker: type }, extra || {}), location.origin);

  function replay() {
    clearTimeout(timer);
    if (!current) return;
    api.stopAll();
    api.play();
    if (!current.loop && auto) timer = setTimeout(replay, ((current.duration || 1) + 0.8) * 1000 / (VFX.timeScale || 1));
  }

  async function load(code) {
    clearTimeout(timer);
    api.stopAll();
    current = null; peak = 0; VFX.lastError = null;
    const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
    try {
      const effect = (await import(url)).default;
      VFX.register(effect);
      current = { name: effect.name, loop: !!effect.loop, duration: effect.duration, category: effect.category };
      if (api.onCategory) api.onCategory(current);
      api.select(effect.name);
      replay();
      // a recipe that cannot be built fails on its first play
      if (VFX.lastError) { const error = VFX.lastError; current = null; clearTimeout(timer); return say('loaded', { ok: false, error }); }
      say('loaded', { ok: true, name: effect.name, loop: current.loop, duration: effect.duration, whenToUse: effect.whenToUse });
    } catch (err) {
      say('loaded', { ok: false, error: String((err && err.message) || err) });
    } finally { URL.revokeObjectURL(url); }
  }

  window.addEventListener('message', (ev) => {
    if (ev.origin !== location.origin || !ev.data || !ev.data.vfxMaker) return;
    const m = ev.data;
    if (m.vfxMaker === 'load') load(String(m.code || ''));
    else if (m.vfxMaker === 'play') replay();
    else if (m.vfxMaker === 'stop') { clearTimeout(timer); api.stopAll(); }
    else if (m.vfxMaker === 'slow') { VFX.timeScale = m.on ? 0.2 : 1; if (current) replay(); }
    else if (m.vfxMaker === 'auto') { auto = !!m.on; if (current) replay(); }
  });

  setInterval(() => {
    if (VFX.lastError && current) { const error = VFX.lastError; VFX.lastError = null; clearTimeout(timer); say('error', { error }); return; }
    let n = 0;
    VFX._state.active.forEach((h) => h.systems.forEach((s) => { n += s.particleNum; }));
    if (n > peak) peak = n;
    if (current) say('stats', { particles: n, peak });
  }, 400);

  say('ready');
};
