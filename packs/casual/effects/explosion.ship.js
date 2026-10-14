/** A spaceship blows up: a big flash, a fireball with a cyan shock ring, hull shards and sparks flying, then small secondary blasts popping around it. */
export default {
  name: 'explosion.ship',
  category: 'explosion',
  whenToUse: 'A spaceship, fighter, UFO, drone, mech or space station is destroyed in a space shooter or sci-fi game (an enemy ship shot down, the player ship lost, a boss ship finished off): play it at the ship\'s centre (tint null keeps fire and a cyan ring, a tint recolours it all); for an explosion on the ground use explosion.small or explosion.big.',
  duration: 1.1, loop: false, tint: null,
  tags: ['spaceship', 'explosion', 'space', 'sci-fi', 'destroyed', 'shmup', 'ufo', 'boss'],
  build(c) {
    const t = c.tint;
    const fire = () => c.colorOverLife(t
      ? c.grad([[c.lighten(t, 0.85), 0], [c.lighten(t, 0.3), 0.3], [c.darken(t, 0.5), 1]], [[1, 0], [1, 0.55], [0, 1]])
      : c.grad([['#fff6c8', 0], ['#ffc23a', 0.25], ['#ff6a1f', 0.6], ['#5a2418', 1]], [[1, 0], [1, 0.55], [0, 1]]));
    const ringCol = t ? c.lighten(t, 0.4) : c.rgb('#6fe0ff');
    const sparkCol = t ? c.lighten(t, 0.6) : c.rgb('#ffd27a');
    const smoke = () => c.colorOverLife(c.grad([['#8a8a8a', 0], ['#3c3c3c', 1]], [[0, 0], [0.7, 0.15], [0.4, 0.6], [0, 1]]));
    // a secondary blast at its own spot, a moment after the main one: a quick flash and a pop of hot glows
    const pop = (time, at) => [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time, count: 1 }], offset: at, life: 0.14, size: 110, color: '#fff2c4',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.3))], order: 6 }),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time, count: [7, 9] }], shape: { type: 'circle', radius: 8 }, offset: at,
        speed: [40, 150], life: [0.28, 0.42], size: [34, 58], color: '#ffffff',
        behaviors: [fire(), c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [1, 0.3]]))], order: 5 })),
    ];
    return [
      // the flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.26, size: 340, color: '#fff7d6',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.25))], order: 6 }),
      // the shock ring: flat in 3D (a disc of energy round the ship, mid-air), plus one facing the camera
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 380, color: ringCol,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 3 }, { snap: false })),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.04, count: 1 }], life: 0.36, size: 260, color: c.lighten(ringCol, 0.5),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 4 }),
      // the fireball
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [12, 15] }], shape: { type: 'circle', radius: 16 },
        speed: [90, 260], life: [0.4, 0.62], size: [56, 96], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [fire(), c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.15]])), c.speedOverLife(c.decel(0.1)), c.spin(-2, 2)], order: 2 })),
      // a little dark smoke behind it
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.1, count: [6, 8] }], shape: { type: 'circle', radius: 24 },
        speed: [40, 120], life: [0.75, 1.0], size: [60, 96], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [smoke(), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.35]])), c.speedOverLife(c.decel(0.2)), c.spin(-1.2, 1.2)], order: 1 })),
      // hull shards: no gravity in space, they fly out, slow down and tumble
      c.sys(c.chunks({ tex: 'shard', blend: 'normal', bursts: [{ count: [10, 13] }], shape: { type: 'circle', radius: 12 },
        speed: [220, 520], life: [0.75, 1.1], size: [10, 18], rotation: [0, 6.28], color: ['#c9d3e0', '#5d6b7d'],
        behaviors: [c.speedOverLife(c.decel(0.25)), c.spin(-9, 9), c.colorOverLife(c.fade(0.7))], order: 5 }, 'shard')),
      // sparks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [22, 28] }, { time: 0.3, count: [8, 10] }], shape: { type: 'circle', radius: 10, thickness: 0 },
        speed: [350, 800], life: [0.35, 0.6], size: [4, 7], color: ['#ffffff', sparkCol], stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 6 })),
      // secondary blasts popping around the wreck
      ...pop(0.22, [-52, 30, 20]),
      ...pop(0.38, [48, -22, -26]),
      ...pop(0.52, [8, 56, 10]),
    ];
  },
};
