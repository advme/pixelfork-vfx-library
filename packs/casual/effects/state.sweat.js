/** Nervous sweat: a couple of cartoon sweat drops fly off the character's head. */
export default {
  name: 'state.sweat',
  category: 'state',
  whenToUse: 'A cartoon moment of nerves, effort or embarrassment: a close call, a hard push, panic, a puzzle that is tricky, a character caught out, heat. Play it at the head; repeat it while the effort lasts.',
  duration: 0.8, loop: false, tint: '#8fd4ff',
  tags: ['sweat', 'nervous', 'panic', 'effort', 'embarrassed', 'hot', 'anime', 'emotion', 'status'],
  build(c) {
    const col = c.color('#8fd4ff');
    return [
      c.sys({ tex: 'drop', blend: 'normal', bursts: [{ count: 1 }, { time: 0.12, count: 1 }], shape: { type: 'cone', radius: 6, angle: 0.5 }, dir: Math.PI * 0.32, offset: [16, 6],
        speed: [140, 200], life: [0.55, 0.65], size: [12, 16], rotation: -0.6, color: [col, c.lighten(col, 0.4)],
        behaviors: [c.gravity(700), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [0.8, 1], [1, 0]]))], order: 2 }),
      c.sys({ tex: 'drop', blend: 'normal', bursts: [{ time: 0.06, count: 1 }], shape: { type: 'cone', radius: 6, angle: 0.5 }, dir: Math.PI * 0.68, offset: [-16, 6],
        speed: [140, 200], life: [0.55, 0.65], size: [10, 14], rotation: 0.6, color: col,
        behaviors: [c.gravity(700), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [0.8, 1], [1, 0]]))], order: 2 }),
    ];
  },
};
