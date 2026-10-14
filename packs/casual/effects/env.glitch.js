/** A broken digital world: now and then the screen stutters, with ragged cyan and magenta pixel bars flickering at random places, hard glitch blocks jumping in and out, white tear lines sliding sideways, a colour flash and a constant fizz of white pixel noise. Loops until stopped. */
export default {
  name: 'env.glitch',
  category: 'env',
  whenToUse: 'A whole world or screen that is breaking up digitally: a cyber or computer world, a hacked or corrupted level, a virus attack, a simulation falling apart, a haunted-TV or creepypasta scene, a cyberpunk menu, a boss that corrupts the game: play it once without a position (whole screen in 2D, the area around the camera in 3D, or pass space: \'screen\' in a 3D game to lay it over the screen) and stop it when the world is fixed (tint null keeps cyan and magenta, a tint gives one colour); for one glitching character or object use state.glitch, for falling green code env.matrix.',
  duration: 3, loop: true, anchor: 'center', tint: null,
  tags: ['glitch', 'digital', 'corrupted', 'cyber', 'hacked', 'virus', 'pixel', 'broken'],
  build(c) {
    const a = c.tint || c.rgb('#2ef2ff');
    const b = c.tint ? c.lighten(c.tint, 0.5) : c.rgb('#ff3ddf');
    const rnd = (lo, hi) => lo + Math.random() * (hi - lo);
    // the area it all happens in: the screen in 2D; in 3D a sheet facing the camera, raised so little of it is under the floor
    const W = c.is3d ? 1000 : c.view.w, H = c.is3d ? 620 : c.view.h;
    const lift = c.is3d ? 200 : 0;
    const K = c.is3d ? 1.7 : 1;
    // the moments the screen stutters in each 3 s cycle (two of them come in quick pairs). Every part only
    // sometimes joins in, so each stutter looks different and the loop never repeats the same way
    const stutters = [0.15, 0.24, 1.1, 1.85, 1.93, 2.55];
    const at = (p) => stutters.map((time) => Object.assign({ time }, p));
    // blocks snap from full to half size halfway through their short life: a jump, not a smooth shrink
    const snap = () => c.sizeOverLife(c.curve([[0, 1], [0.48, 1], [0.52, 0.5], [1, 0.5]]));
    const out = [];
    // a harsh flash of colour over everything on the stutters
    out.push(c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 3, bursts: at({ count: 1, probability: 0.5 }), offset: [0, lift], life: 0.08, size: Math.max(W, H) * 1.1, color: [a, b],
      behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.22, 0], [0.22, 0.5], [0, 1]]))], order: 0 }));
    // hard glitch blocks jumping in and out all over (3D: hanging in the air around the camera)
    const blocks = (colour, shift) => {
      const p = { tex: 'pixel', blend: 'normal', loop: true, duration: 3, rate: 2,
        bursts: stutters.map((time) => ({ time: Math.min(2.95, time + shift), count: [3, 6], probability: 0.6 })),
        speed: 0, life: [0.05, 0.16], size: [12 * K, 30 * K], color: colour, behaviors: [snap()], order: 1 };
      return c.is3d ? c.sys(c.env3d(p, { w: 1100, y: 140 })) : c.sys(Object.assign(p, { shape: { type: 'rect', w: W, h: H, thickness: 1 } }));
    };
    out.push(blocks(a, 0), blocks(b, 0.03));
    // ragged pixel bars at random places: a band of pixels (one to three rows deep) along a short line, cyan and magenta in turn
    const bars = c.is3d ? 10 : 9;
    for (let i = 0; i < bars; i++) {
      const len = rnd(60, 240) * K;
      const deep = rnd(0, 14) * K;
      const y = lift + H * (-0.45 + ((i + rnd(0.1, 0.9)) * 0.9) / bars);
      const x = rnd(-0.5, 0.5) * (W - len);
      out.push(c.sys({ tex: 'pixel', blend: 'normal', loop: true, duration: 3, bursts: at({ count: Math.round((len / (9 * K)) * (1 + deep / (28 * K))), probability: 0.25 }),
        shape: { type: 'rect', w: len, h: deep, thickness: 1 }, offset: [x, y], speed: 0, life: [0.06, 0.18], size: [7 * K, 12 * K], color: i % 2 ? b : a,
        behaviors: [snap()], order: 2 }));
    }
    // white tear lines sliding sideways. They trail back (left) from the particle, so each emitter sits right of its spot
    for (let i = 0; i < 4; i++) {
      out.push(c.sys({ tex: 'disc', blend: 'add', loop: true, duration: 3, bursts: at({ count: [1, 2], probability: 0.4 }),
        shape: { type: 'cone', radius: 40 * K, angle: 0.001 }, dir: 0, offset: [rnd(-0.25, 0.35) * W, lift + H * rnd(-0.42, 0.42)],
        speed: 90 * K, life: [0.06, 0.14], size: [3 * K, 5 * K], color: ['#ffffff', i % 2 ? b : a], stretch: { speed: 0, length: 36 }, order: 4 }));
    }
    // a constant fizz of white pixel noise
    const fizz = { tex: 'pixel', blend: 'normal', loop: true, prewarm: true, duration: 3, rate: c.is3d ? 150 : 80, speed: 0, life: [0.04, 0.1], size: [2.5 * K, 5 * K], color: '#ffffff', order: 3 };
    out.push(c.is3d ? c.sys(c.env3d(fizz, { w: 1100, y: 120 })) : c.sys(Object.assign(fizz, { shape: { type: 'rect', w: W, h: H, thickness: 1 } })));
    return out;
  },
};
