/** A captured flag: a soft glow around the cloth, sparkles drifting up off it and the odd bright twinkle. Loops until stopped. */
export default {
  name: 'world.flag',
  category: 'world',
  whenToUse: 'A flag, banner or standard that has been captured or is held: capture the flag, a team banner on a conquered tower or castle, a flag raised on a won base. Play it on the flag cloth and stop it when the flag is lost; tint it with the owning team\'s colour. For the moment of capture play reward.checkpoint; for the zone being captured use world.capture.',
  duration: 1.0, loop: true, tint: '#ffd23a',
  tags: ['flag', 'banner', 'capture the flag', 'team', 'strategy', 'conquest', 'castle', 'glow'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    // the cloth is roughly a 70 x 44 box: particles are born all over it
    const cloth = { type: 'rect', w: 70, h: 44, thickness: 1 };
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.0, bursts: [{ count: 1 }], life: 1.0, size: 140, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.28, 0], [0.42, 0.5], [0.28, 1]]))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.0, bursts: [{ count: 1 }], life: 1.0, size: 70, color: light,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0.55, 0.5], [0.35, 1]]))], order: 1 }),
      // sparkles drifting up and away off the cloth
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 12, shape: cloth,
        speed: 0, life: [0.8, 1.2], size: [7, 13], color: [light, '#ffffff'],
        behaviors: [c.force(0, 60), c.limitSpeed(50, 1), c.noise(2, 10), c.sizeOverLife(c.pop(0.2, 0.6))], order: 3 }),
      // tiny motes rising slowly
      c.sys({ tex: 'glow', blend: 'add', loop: true, rate: 8, shape: cloth,
        speed: 0, life: [1.0, 1.4], size: [3, 6], color: light,
        behaviors: [c.force(0, 90), c.limitSpeed(70, 1), c.noise(1.5, 8), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 2 }),
      // the odd bright twinkle on the cloth
      c.sys({ tex: 'star', blend: 'add', loop: true, rate: 4, shape: cloth,
        speed: 0, life: [0.4, 0.6], size: [14, 22], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.spin(-2, 2), c.sizeOverLife(c.pop(0.35, 0.5))], order: 4 }),
    ];
  },
};
