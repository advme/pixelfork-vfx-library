/** Soaked: drips fall off the character and a few droplets get shaken loose. Loops until stopped. */
export default {
  name: 'state.wet',
  category: 'state',
  whenToUse: 'A character is soaking wet: just out of the water, caught in rain, hit by a water attack, slimed, sweating from heat, a wet dog. Follow the character; stop it after a few seconds when they are dry.',
  duration: 1, loop: true, tint: '#7fc8ff',
  tags: ['wet', 'soaked', 'drip', 'water', 'rain', 'slime', 'dripping', 'status'],
  build(c) {
    const col = c.color('#7fc8ff');
    return [
      c.sys({ tex: 'drop', blend: 'normal', loop: true, rate: 5, shape: { type: 'rect', w: 56, h: 30, thickness: 1 }, offset: [0, 4],
        speed: 0, life: [0.5, 0.7], size: [7, 11], rotation: Math.PI, color: [col, c.lighten(col, 0.4)],
        behaviors: [c.gravity(900), c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.8]])), c.colorOverLife(c.fade(0.8))], order: 2 }),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', loop: true, rate: 3, shape: { type: 'circle', radius: 30 },
        speed: [60, 120], life: [0.3, 0.45], size: [3, 5], color: c.lighten(col, 0.5),
        behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.6))], order: 1 })),
    ];
  },
};
