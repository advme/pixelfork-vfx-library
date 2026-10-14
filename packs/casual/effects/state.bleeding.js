/** Bleeding: cartoon drops of blood fall now and then from a wound. Loops until stopped. */
export default {
  name: 'state.bleeding',
  category: 'state',
  whenToUse: 'A character keeps losing health over time from a wound: bleeding damage, a cut, a damage-over-time status, critically hurt. Follow the wound or the body; stop it when healed. Tint it for other fluids (green for aliens, black for oil).',
  duration: 1, loop: true, tint: '#d6203a',
  tags: ['bleeding', 'blood', 'wound', 'damage over time', 'hurt', 'injury', 'dot', 'status'],
  build(c) {
    const col = c.color('#d6203a');
    return [
      c.sys({ tex: 'drop', blend: 'normal', loop: true, rate: 4, shape: { type: 'circle', radius: 14 },
        speed: [10, 40], life: [0.5, 0.7], size: [8, 12], rotation: Math.PI, color: [col, c.darken(col, 0.25)],
        behaviors: [c.gravity(1000), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.8]])), c.colorOverLife(c.fade(0.8))], order: 2 }),
      c.sys({ tex: 'disc', blend: 'normal', loop: true, duration: 0.8, bursts: [{ count: [2, 3] }], shape: { type: 'circle', radius: 10 },
        speed: [80, 160], life: [0.25, 0.4], size: [3, 5], color: col,
        behaviors: [c.gravity(1000), c.colorOverLife(c.fade(0.5))], order: 1 }),
    ];
  },
};
