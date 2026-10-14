/** A jetpack firing: two small roaring flames with white-hot cores blasting down out of twin nozzles, puffs of smoke and sparks left behind. Loops until stopped. */
export default {
  name: 'move.jetpack',
  category: 'move',
  whenToUse: 'A character flies or hovers with a jetpack, rocket boots or jump jets: follow the character\'s feet, or an empty object at the nozzles, while it thrusts (never the body\'s centre, which hides the flames inside a 3D model; in 2D dir is the way the flames point, in degrees, default -90 = down; in 3D pass direction and keep it aimed with handle.aim(v)) and stop it when the thrust stops; for a car or kart boost use vehicle.nitro, for a flying rocket or missile use weapon.rocket.',
  duration: 0.5, loop: true, anchor: 'feet', tint: '#ff9a2a',
  tags: ['jetpack', 'jet', 'thrust', 'flame', 'rocket boots', 'hover', 'fly', 'sci-fi'],
  build(c) {
    const col = c.color('#ff9a2a');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? -Math.PI / 2 : c.dir;
    // the two nozzles sit side by side, across the flames; in 2D everything starts a little past the nozzle so the
    // stretched sparks, which trail BACK from their particles, do not reach up into the character
    const ax = Math.cos(dir), ay = Math.sin(dir), px = -ay * 11, py = ax * 11;
    const fwd = c.is3d ? 0 : 6;
    const at = (side, more) => [side * px + ax * (fwd + (more || 0)), side * py + ay * (fwd + (more || 0))];
    // the flame sprite's point is up at rotation 0; turn it to point along the jet
    const point = dir - Math.PI / 2;
    const jet = (p) => c.sys(c.spray(Object.assign({ blend: 'add', loop: true, dir }, p)));
    // each jet: a coloured flame that tapers as it blasts away (yellow-white at the nozzle, deep orange at the tip)
    // around a small white-hot inner flame
    const nozzle = (side) => [
      jet({ tex: 'flame', rate: 44, offset: at(side), shape: { type: 'cone', radius: 3, angle: 0.12 }, speed: [190, 260], life: [0.12, 0.17], size: [18, 24],
        rotation: [point - 0.15, point + 0.15], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.2, 1], [1, 0.25]])),
          c.colorOverLife(c.grad([[light, 0], [col, 0.4], [c.darken(col, 0.25), 1]], [[1, 0], [0.9, 0.5], [0, 1]]))], order: 2 }),
      jet({ tex: 'flame', rate: 40, offset: at(side), shape: { type: 'cone', radius: 1.5, angle: 0.05 }, speed: [150, 210], life: [0.07, 0.1], size: [10, 13],
        rotation: [point - 0.1, point + 0.1], color: '#fff6d8',
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.6))], order: 3 }),
    ];
    return [
      // smoke puffing out below and hanging in the air behind
      jet({ tex: 'puff', blend: 'normal', world: true, rate: 14, offset: at(0, 30), shape: { type: 'cone', radius: 10, angle: 0.35 },
        speed: [60, 110], life: [0.6, 0.9], size: [12, 18], rotation: [0, 6.28], color: ['#ececec', '#b8b8b8'],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 25), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 2.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.65, 0], [0.4, 0.5], [0, 1]]))], order: 0 }),
      // the hot glow at the nozzles
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 0.2, bursts: [{ count: 1 }], life: 0.23, size: 56, offset: at(0, 4), color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1.1], [1, 0.85]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.13], [1, 0.5], [0.75, 0.87], [0, 1]]))], order: 1 }),
      ...nozzle(1), ...nozzle(-1),
      // sparks spat out of the flames and left behind: born 16 px down the jet (22 px in 2D), so their streaks
      // (at most about 20 px at birth, trailing BACK) end at the nozzle instead of reaching up into the character
      jet({ tex: 'glow', world: true, rate: 16, offset: at(0, 16), shape: { type: 'cone', radius: 8, angle: 0.35 }, speed: [180, 360], life: [0.15, 0.3], size: [2.5, 4], color: light,
        stretch: { speed: 0.01, length: 1.5 }, behaviors: [c.gravity(600), c.colorOverLife(c.fade(0.4))], order: 4 }),
    ];
  },
};
