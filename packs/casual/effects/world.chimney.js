/** Chimney smoke: round dark-grey puffs pop out of the chimney, swell and drift slowly up and sideways on the breeze. Loops until stopped. */
export default {
  name: 'world.chimney',
  category: 'world',
  whenToUse: 'Smoke rising from a chimney or smokestack that stays in place: a cosy cottage or cabin roof, a village house in winter, a factory or power-plant stack, a steam train funnel, a blacksmith\'s forge. Play it on the top of the chimney and leave it running; it drifts right (dir 180 drifts left; in 3D pass direction or dir as a compass heading). For something damaged and smoking use state.smoke; for white steam from a vent use world.steam; for a campfire use world.campfire.',
  duration: 2, loop: true, tint: '#6e6a6a',
  tags: ['chimney', 'smoke', 'house', 'cottage', 'factory', 'smokestack', 'train', 'village', 'winter'],
  build(c) {
    const col = c.color('#6e6a6a');
    const dir = c.dir === undefined ? 0 : c.dir;
    const side = Math.cos(dir) >= 0 ? 1 : -1;
    // the breeze: sideways on screen in 2D; in 3D a world wind along a compass heading (dir, or the game's direction)
    // that stays put when the camera turns. A fresh list per system: behaviours cannot be shared.
    const blow = c.is3d ? c.heading(0) : null;
    const breeze = (wind, lift) => (c.is3d ? [c.wind(blow, wind), c.force(0, lift)] : [c.force(side * wind, lift)]);
    return [
      // a wide faint haze trailing downwind
      c.sys(c.vol({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 1.5, shape: { type: 'circle', radius: 8 }, offset: [0, 40],
        speed: [5, 15], life: [4, 5], size: [40, 60], rotation: [0, 6.28], color: c.lighten(col, 0.15),
        behaviors: breeze(40, 45).concat([c.limitSpeed(55, 1), c.noise(0.4, 12), c.spin(-0.3, 0.3), c.sizeOverLife(c.curve([[0, 0.6], [1, 2.6]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.3, 0.25], [0.2, 0.6], [0, 1]]))]), order: 0 })),
      // the main puffs: they leave the chimney straight up, swell and bend over with the wind
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 3.5, shape: { type: 'cone', radius: 6, angle: 0.15 }, dir: Math.PI / 2,
        speed: [50, 80], life: [3, 4], size: [22, 32], rotation: [0, 6.28], color: [col, c.darken(col, 0.2)],
        behaviors: breeze(35, 40).concat([c.limitSpeed(60, 1), c.noise(0.6, 14), c.spin(-0.6, 0.6), c.sizeOverLife(c.curve([[0, 0.35], [0.15, 0.8], [1, 2.6]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.06], [0.7, 0.5], [0, 1]]))]), order: 1 }, 'up')),
      // small dark puffs popping out of the chimney mouth
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, rate: 6, shape: { type: 'cone', radius: 6, angle: 0.3 }, dir: Math.PI / 2,
        speed: [40, 70], life: [0.6, 0.9], size: [14, 20], rotation: [0, 6.28], color: c.darken(col, 0.25),
        behaviors: [c.speedOverLife(c.decel(0.3)), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.9, 0.5], [0, 1]]))], order: 2 }, 'up')),
    ];
  },
};
