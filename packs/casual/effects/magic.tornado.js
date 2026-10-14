/** A whirlwind: dust and leaves spiral up around a funnel of wind. Loops until stopped. */
export default {
  name: 'magic.tornado',
  category: 'magic',
  whenToUse: 'A tornado, whirlwind, wind spell, cyclone or dust devil: a wind attack that stays, a storm hazard, a spinning move. Play it on the ground (follow it if it moves); stop it when it dies down.',
  duration: 1, loop: true, anchor: 'feet', tint: '#d8e6f0',
  tags: ['tornado', 'whirlwind', 'wind', 'cyclone', 'spin', 'storm', 'air', 'spell'],
  build(c) {
    const col = c.color('#d8e6f0');
    // 3D: a ring on the ground that spirals up and out into a funnel; 2D: the same spiral seen face-on
    const swirl = (p) => c.sys(c.ground(Object.assign({ loop: true, shape: { type: 'circle', radius: 16, thickness: 0 } }, p)));
    return [
      swirl({ tex: 'puff', blend: 'normal', rate: 34, speed: [55, 85], life: [0.9, 1.2], size: [34, 50], rotation: [0, 6.28], color: [col, c.darken(col, 0.2)],
        behaviors: [c.orbit(7), c.force(0, 300), c.limitSpeed(220, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.2], [0.4, 0.7], [0, 1]]))], order: 1 }),
      swirl({ tex: 'glow', blend: 'add', rate: 40, speed: [60, 100], life: [0.6, 0.9], size: [4, 7], color: '#ffffff', stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.orbit(9), c.force(0, 340), c.limitSpeed(260, 1), c.colorOverLife(c.fade(0.5))], order: 2 }),
      swirl({ tex: 'leaf', blend: 'normal', rate: 12, speed: [60, 100], life: [0.8, 1.1], size: [8, 13], rotation: [0, 6.28], color: ['#8bc34a', '#c9a24a'],
        behaviors: [c.orbit(8), c.force(0, 300), c.limitSpeed(240, 1), c.spin(-8, 8), c.colorOverLife(c.fade(0.7))], order: 3 }),
    ];
  },
};
