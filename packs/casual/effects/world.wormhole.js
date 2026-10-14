/** A wormhole: blue and violet rings shrink one after another into a bright point far away, lights spiral in and streaks rush toward the centre. Loops until stopped. */
export default {
  name: 'world.wormhole',
  category: 'world',
  whenToUse: 'A wormhole, space tunnel or hyperspace gate hanging in space: a jump point between sectors, a sci-fi level exit, a time tunnel, a shortcut in a space race; play it at its centre and leave it running, facing the viewer (for a magic portal or warp gate use magic.portal, for something that pulls things in use magic.blackhole, for a ship jumping away use move.warp).',
  duration: 1, loop: true, tint: '#6a7dff',
  tags: ['wormhole', 'tunnel', 'space', 'hyperspace', 'gate', 'sci-fi', 'vortex', 'jump point'],
  build(c) {
    const col = c.color('#6a7dff');
    const light = c.lighten(col, 0.55);
    const violet = c.mix(col, '#ff6ad5', 0.4);
    // a steady light that cross-fades into its next copy each cycle
    const steady = (lo, hi) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [lo, 0.05], [hi, 0.5], [lo, 0.95], [0, 1]]));
    // tunnel rings: big at the mouth, shrinking fast then slower, like rings receding down a tube
    const rings = (color, times, order) => c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1, bursts: times.map((time) => ({ time, count: 1 })), life: 1, size: 300, color,
      behaviors: [c.sizeOverLife(c.curve([[0, 1], [0.35, 0.42], [0.7, 0.17], [1, 0.04]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.12], [0.8, 0.6], [0, 1]]))], order });
    return [
      // the deep glow of the tunnel
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }], life: 1.05, size: 320, color: col, behaviors: [steady(0.35, 0.45)], order: 0 }),
      rings(col, [0, 0.5], 1),
      rings(violet, [0.25, 0.75], 1),
      // lights spiralling in from the rim. orbit() turns a particle's position but not its velocity, so an
      // inward speed s with a turn rate w swings it round a point s/w off centre: a quarter-turn curve from the
      // rim (140) to about 60 px from the centre, reached at about 0.55 s, where the life ends inside the glow.
      // (A strong orbit with a weak inward speed would only circle the rim and never come in.)
      c.sys({ tex: 'glow', blend: 'add', loop: true, rate: 64, shape: { type: 'circle', radius: 140, thickness: 0 },
        speed: [-210, -180], life: [0.52, 0.6], size: [8, 14], color: [light, violet],
        behaviors: [c.orbit(1.4), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.6))], order: 2 }),
      // streaks rushing in toward the centre
      c.sys({ tex: 'glow', blend: 'add', loop: true, rate: 20, shape: { type: 'circle', radius: 170, thickness: 0 },
        speed: [-420, -340], life: 0.38, size: [4, 7], color: ['#ffffff', light], stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.3], [0.8, 0.8], [0, 1]]))], order: 3 }),
      // the bright far end of the tunnel
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.5, bursts: [{ count: 1 }], life: 0.525, size: 110, color: light, behaviors: [steady(0.6, 0.9)], order: 4 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.5, bursts: [{ count: 1 }], life: 0.525, size: 40, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1.15], [1, 0.85]])), steady(1, 1)], order: 5 }),
    ];
  },
};
