/** An egg appears: a warm pop of light, a bright cream ring and a gold one snap out, golden sparkles twinkle and a white feather or two float down. */
export default {
  name: 'gather.egg',
  category: 'gather',
  whenToUse: 'A hen lays an egg or an egg is collected in a farm or animal game: picking eggs from a nest, a coop producing, a bird laying, an egg-hunt find. Play it on the egg. For picking crops use gather.harvest; for a generic item pickup use pickup.sparkle.',
  duration: 0.75, loop: false, tint: '#ffe08a',
  tags: ['egg', 'chicken', 'hen', 'nest', 'farm', 'collect', 'feather', 'animal'],
  build(c) {
    const col = c.color('#ffe08a');
    const light = c.lighten(col, 0.6);
    const cream = c.lighten(col, 0.35);
    const gold = c.mix(col, '#ffb52e', 0.3);
    return [
      // the warm pop of light
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.26, size: 110, color: cream,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.25))], order: 0 }),
      // a bright cream ring snapping out
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: 115, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.6, 0.9], [1, 1]])), c.colorOverLife(c.fade(0.55))], order: 1 }),
      // and a gold ring just behind it
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.05, count: 1 }], life: 0.3, size: 90, color: gold,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.6, 0.9], [1, 1]])), c.colorOverLife(c.fade(0.6))], order: 1 }),
      // bright dots popping out
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 10 },
        speed: [150, 260], life: [0.28, 0.4], size: [4, 6], color: [gold, light],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.shrink())], order: 2 })),
      // golden sparkles twinkling around the egg
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 14 },
        speed: [80, 170], life: [0.32, 0.48], size: [14, 22], rotation: [0, 0.8], color: [cream, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.spin(-3, 3), c.sizeOverLife(c.pop(0.2, 0.55))], order: 3 })),
      // a white feather or two, popped up, then swaying down. Gravity brings them back and a speed limit that
      // drops after the pop keeps the fall slow and floaty (a speedOverLife would also scale gravity down to nothing)
      c.sys(c.vol({ tex: 'leaf', blend: 'normal', bursts: [{ count: [1, 2] }], shape: { type: 'circle', radius: 10, arc: Math.PI },
        speed: [140, 190], life: [0.65, 0.75], size: [14, 18], rotation: [0, 6.28], color: ['#ffffff', '#fff3e0'],
        behaviors: [c.gravity(500), c.limitSpeed([[0, 400], [0.4, 400], [0.5, 55], [1, 55]], 1), c.noise(2, 16), c.spin(-3, 3), c.sizeOverLife(c.pop(0.1, 0.8)), c.colorOverLife(c.fade(0.7))], order: 4 })),
    ];
  },
};
