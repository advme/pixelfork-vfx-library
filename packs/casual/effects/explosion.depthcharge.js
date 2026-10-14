/** An underwater blast: a white flash, a big white bubble that swells and bursts, a dark pressure ring racing out, white bubbles and foam blown out in every direction, then a swarm of bubbles wobbling up. */
export default {
  name: 'explosion.depthcharge',
  category: 'explosion',
  whenToUse: 'Something explodes under the water: a depth charge, a sea mine, a torpedo hitting a submarine or a wreck, an underwater bomb, a sea monster or boss blowing up below the surface; play it at the centre of the blast under water. For a blast that bursts up through the surface or a water balloon use explosion.water; for a fiery blast in the air use explosion.small or explosion.big.',
  duration: 1.3, loop: false, tint: '#5ec8ff',
  tags: ['underwater', 'depth charge', 'sea mine', 'torpedo', 'bubbles', 'submarine', 'explosion', 'ocean'],
  build(c) {
    const col = c.color('#5ec8ff');
    const light = c.lighten(col, 0.7);
    const dark = c.darken(col, 0.72);
    const alpha = (keys) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], keys));
    // a bubble swells a little as it rises and pops at the end
    const bubble = () => c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1], [0.85, 1.1], [0.93, 1.35], [1, 0]]));
    // the big bubble swells for 0.2 s, then bursts
    const swell = () => c.sizeOverLife(c.curve([[0, 0.25], [0.75, 1], [1, 1.25]]));
    return [
      // the flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 220, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the dark pressure ring racing out; a shell of pressure looks like a ring from any side, so it faces the camera
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.5, size: 300, color: dark,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.12], [1, 1]])), alpha([[0.9, 0], [0.6, 0.5], [0, 1]])], order: 1 }),
      // a pale ring close behind it
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.07, count: 1 }], life: 0.42, size: 230, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.12], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 2 }),
      // the big white bubble: a bright fill and a white skin
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.26, size: 170, color: light,
        behaviors: [swell(), alpha([[0.55, 0], [0.5, 0.75], [0, 1]])], order: 3 }),
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.26, size: 140, color: '#ffffff',
        behaviors: [swell(), alpha([[1, 0], [1, 0.72], [0, 1]])], order: 4 }),
      // white foam blown out as it bursts
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.2, count: [7, 9] }], shape: { type: 'circle', radius: 30 },
        speed: [120, 240], life: [0.55, 0.8], size: [36, 60], rotation: [0, 6.28], color: '#eefaff',
        behaviors: [c.speedOverLife(c.decel(0.08)), c.force(0, 40), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.3]])), alpha([[0.9, 0], [0.6, 0.5], [0, 1]])], order: 5 })),
      // white bubbles blown out in every direction, then slowing and turning to float up
      c.sys(c.vol({ tex: 'ring', blend: 'normal', bursts: [{ time: 0.2, count: [24, 28] }], shape: { type: 'circle', radius: 28 },
        speed: [220, 440], life: [0.8, 1.05], size: [8, 18], color: ['#ffffff', light],
        behaviors: [c.limitSpeed([[0, 440], [0.25, 75], [1, 75]], 1), c.force(0, 360), c.noise(2, 10), bubble()], order: 6 })),
      // a swarm of small bubbles rising after it
      c.sys(c.vol({ tex: 'ring', blend: 'normal', bursts: [{ time: 0.25, count: 4, cycle: 8, interval: 0.03 }], shape: { type: 'circle', radius: 56 },
        speed: [20, 70], life: [0.65, 0.85], size: [4, 9], color: light,
        behaviors: [c.force(0, 420), c.limitSpeed(170, 1), c.noise(3, 12), bubble()], order: 6 })),
    ];
  },
};
