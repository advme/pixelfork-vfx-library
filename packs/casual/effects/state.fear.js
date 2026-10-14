/** Scared: shivering purple wisps tremble around the body inside a shaking haze, and cold sweat drops fly off the head. Loops until stopped. */
export default {
  name: 'state.fear',
  category: 'state',
  whenToUse: 'A character is scared, terrified or panicking for a while: a fear spell, a ghost or monster frightens them, a horror moment, a cowardly enemy fleeing. Follow the body; stop it when the fear wears off. For a sudden one-off fright use state.surprise; for one quick nervous sweat use state.sweat; for a lasting curse use state.cursed.',
  duration: 1, loop: true, tint: '#9b5cff',
  tags: ['fear', 'scared', 'terror', 'panic', 'horror', 'flee', 'shiver', 'status'],
  build(c) {
    const col = c.color('#9b5cff');
    const light = c.lighten(col, 0.45);
    const dark = c.darken(col, 0.4);
    const sweat = '#a8e4ff';
    // a cold drop flicked off one side of the head (side 1 = right, -1 = left)
    const drop = (side) => c.sys({ tex: 'drop', blend: 'normal', loop: true, rate: 1.6, shape: { type: 'cone', radius: 5, angle: 0.35 }, dir: Math.PI / 2 - side * 0.7, offset: [side * 28, 42],
      speed: [120, 170], life: [0.5, 0.6], size: [12, 16], rotation: -side * 0.6, color: [sweat, '#ffffff'],
      behaviors: [c.gravity(650), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [0.8, 1], [1, 0]]))], order: 4 });
    return [
      // a dim haze that trembles
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1, bursts: [{ count: 1 }], life: 1, size: 140, color: col,
        behaviors: [c.noise(14, 3), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.42, 0], [0.55, 0.5], [0.42, 1]]))], order: 0 }),
      // dark shivering wisps around the outline
      c.sys(c.vol({ tex: 'puff', blend: 'normal', loop: true, rate: 10, shape: { type: 'circle', radius: 46, thickness: 0.3 },
        speed: [6, 16], life: [0.9, 1.3], size: [24, 38], rotation: [0, 6.28], color: [dark, col],
        behaviors: [c.force(0, 50), c.noise(12, 4), c.spin(-1, 1), c.sizeOverLife(c.grow(0.4)),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.3], [0, 1]]))], order: 1 })),
      // bright wisps shaking around the body
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 16, shape: { type: 'circle', radius: 48, thickness: 0.3 },
        speed: [8, 20], life: [0.6, 0.9], size: [12, 20], color: [light, col],
        behaviors: [c.force(0, 40), c.noise(16, 4), c.sizeOverLife(c.pop(0.25, 0.6)), c.colorOverLife(c.fade(0.5))], order: 2 })),
      drop(1),
      drop(-1),
    ];
  },
};
