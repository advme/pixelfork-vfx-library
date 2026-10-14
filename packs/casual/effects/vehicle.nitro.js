/** A nitro boost: a roaring blue flame jet out of the exhaust, with sparks streaming behind. Loops until stopped. */
export default {
  name: 'vehicle.nitro',
  category: 'vehicle',
  whenToUse: 'A car, kart, rocket or jetpack boosts: nitro, turbo, afterburner. Follow the exhaust or nozzle; in 3D pass direction (backward, out of the nozzle) and keep it current with handle.aim(v). Stop it when the boost ends.',
  duration: 1, loop: true, tint: '#47b6ff',
  tags: ['nitro', 'boost', 'turbo', 'flame', 'racing', 'afterburner', 'jet', 'vehicle'],
  build(c) {
    const col = c.color('#47b6ff');
    const light = c.lighten(col, 0.7);
    const dir = c.dir === undefined ? Math.PI : c.dir;
    // a stretched sprite trails BACK from its particle by about size x (length + speed x stretch.speed); keep the
    // tails short and start the jet just past the nozzle (2D), so the flame does not reach back into the car
    const out = c.is3d ? undefined : [Math.cos(dir) * 24, Math.sin(dir) * 24];
    const flame = (p) => c.sys(c.spray(Object.assign({ tex: 'glow', blend: 'add', loop: true, dir, offset: out }, p)));
    return [
      // the jet: a white core inside a coloured flame, attached to the nozzle
      flame({ rate: 80, shape: { type: 'cone', radius: 3, angle: 0.06 }, speed: [520, 760], life: [0.12, 0.18], size: [22, 30], color: '#ffffff',
        stretch: { speed: 0.003, length: 0.5 }, behaviors: [c.sizeOverLife(c.shrink())], order: 3 }),
      flame({ rate: 70, shape: { type: 'cone', radius: 6, angle: 0.16 }, speed: [380, 600], life: [0.14, 0.2], size: [40, 58], color: [col, light],
        stretch: { speed: 0.003, length: 0.5 }, behaviors: [c.sizeOverLife(c.curve([[0, 0.7], [0.4, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.4))], order: 2 }),
      // licks of flame around the jet
      c.sys(c.spray({ tex: 'flame', blend: 'add', loop: true, rate: 30, dir, shape: { type: 'cone', radius: 8, angle: 0.3 }, speed: [160, 280], life: [0.1, 0.18], size: [26, 38], rotation: [-0.4, 0.4], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 2 })),
      // sparks left behind in the air
      flame({ world: true, rate: 26, shape: { type: 'cone', radius: 4, angle: 0.3 }, speed: [260, 560], life: [0.18, 0.32], size: [3, 6], color: light,
        stretch: { speed: c.is3d ? 0.01 : 0.02, length: 1.5 }, behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 4 }),
      // the hot glow at the nozzle
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.3, bursts: [{ count: 1 }], life: 0.3, size: 80, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1.1], [1, 0.85]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [1, 0.5], [0.8, 1]]))], order: 1 }),
    ];
  },
};
