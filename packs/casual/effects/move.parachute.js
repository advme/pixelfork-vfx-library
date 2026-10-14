/** A parachute or glider opening: a soft flash and an air ring pop, a puff of air bursts out, wind lines rush up past it and sparkles twinkle. */
export default {
  name: 'move.parachute',
  category: 'move',
  whenToUse: 'A parachute, a paraglider, an umbrella, a hang glider or a cape opens to slow a fall: a skydiver or a battle-royale drop deploying the chute, a supply crate\'s chute popping, a floaty umbrella jump; play it once on the canopy as it opens, then use move.glide while gliding.',
  duration: 0.5, loop: false, tint: '#ffffff',
  tags: ['parachute', 'skydive', 'paraglider', 'umbrella', 'deploy', 'airdrop', 'air', 'move'],
  build(c) {
    const col = c.color('#ffffff');
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 130, color: '#ffffff',
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1.1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the air the canopy catches, bursting out from under it
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 22, thickness: 0.4 },
        speed: [120, 220], life: [0.35, 0.5], size: [22, 36], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.06)), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.55, 0.5], [0, 1]]))], order: 2 })),
      // wind lines rushing up past it as the fall is braked
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 10] }, { time: 0.08, count: [4, 5] }], dir: Math.PI / 2, offset: [0, -40],
        shape: { type: 'cone', radius: 46, angle: 0.05, thickness: 1 },
        speed: [420, 620], life: [0.2, 0.3], size: [4, 6], color: c.lighten(col, 0.6),
        stretch: { speed: c.is3d ? 0.012 : 0.02, length: 2 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fadeInOut(0.1, 0.5))], order: 3 }, 'up')),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: [5, 6] }], shape: { type: 'circle', radius: 34 },
        speed: [50, 120], life: [0.35, 0.48], size: [12, 18], rotation: [0, 6.28], color: [c.mix(col, '#ffe680', 0.5), '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.spin(-3, 3), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
