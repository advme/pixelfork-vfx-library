/** A fire-jet trap: a pilot flame flickers in the floor vent, then a roaring jet of fire blasts straight up with a flash, sparks and a puff of smoke, every 1.2 seconds. Loops until stopped. */
export default {
  name: 'world.trapfire',
  category: 'world',
  whenToUse: 'A fire-jet trap in a dungeon, temple, castle or lava level: a floor vent, grate or dragon-head nozzle that blasts flame straight up on a timer, a flame trap in an obstacle course or platformer. Play it on the floor at the vent and leave it running (the jet fires at once, then every 1.2 s); stop it to switch the trap off. For a fire that burns steadily use world.campfire or world.torch; for a single fire geyser out of the ground use explosion.mine; for spikes use world.spikes.',
  duration: 1.2, loop: true, anchor: 'feet', tint: '#ff7a1f',
  tags: ['fire', 'trap', 'flame jet', 'dungeon', 'vent', 'hazard', 'timer', 'platformer'],
  build(c) {
    const col = c.color('#ff7a1f');
    const light = c.lighten(col, 0.55);
    const L = 1.2;
    // the jet: a stream of flames for about 0.4 s at the start of every cycle, shooting straight up out of the vent
    const jet = (p) => c.sys(c.spray(Object.assign({ tex: 'flame', blend: 'add', loop: true, duration: L, shape: { type: 'cone', radius: 6, angle: 0.1 }, offset: [0, 4] }, p), 'up'));
    return [
      // the vent: a dim glow lying in the floor that keeps breathing between blasts
      c.sys(c.flat({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 80, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1.2], [0.4, 0.9], [1, 1.2]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.35, 0.4], [0.55, 0.9], [0.9, 1]]))], order: 0 })),
      // the flash of heat around the jet
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: L, bursts: [{ count: 1 }], life: 0.55, size: 180, offset: [0, 80], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.15], [0.4, 0.5], [0, 1]]))], order: 0 }),
      // the main jet of fire
      jet({ bursts: [{ count: 2, cycle: 14, interval: 0.028 }], speed: [420, 560], life: [0.32, 0.45], size: [28, 44], rotation: [-0.2, 0.2], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.35)), c.noise(4, 10), c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.5))], order: 2 }),
      // the white-hot core
      jet({ bursts: [{ count: 1, cycle: 12, interval: 0.03 }], speed: [480, 620], life: [0.22, 0.3], size: [18, 26], color: '#fff2c4',
        behaviors: [c.speedOverLife(c.decel(0.4)), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.45))], order: 3 }),
      // sparks flung out of the jet, born inside it high enough that their tails (up to ~46 px) never dip into the floor
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, duration: L, bursts: [{ time: 0.05, count: [5, 7] }, { time: 0.2, count: [3, 5] }], shape: { type: 'cone', radius: 6, angle: 0.4 }, offset: [0, 50],
        speed: [300, 520], life: [0.3, 0.5], size: [3, 5], color: ['#ffffff', light], stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.5))], order: 4 }, 'up')),
      // a puff of dark smoke left hanging at the top of the jet
      c.sys({ tex: 'puff', blend: 'normal', loop: true, duration: L, bursts: [{ time: 0.3, count: [3, 4] }], shape: { type: 'circle', radius: 14 }, offset: [0, 150],
        speed: [10, 30], life: [0.6, 0.85], size: [26, 40], rotation: [0, 6.28], color: ['#5a5050', '#3f3838'],
        behaviors: [c.force(0, 60), c.limitSpeed(50, 1), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.5]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.5, 0.2], [0.3, 0.6], [0, 1]]))], order: 1 }),
      // the pilot flame licking at the vent between blasts
      c.sys(c.ground({ tex: 'flame', blend: 'add', loop: true, rate: 9, shape: c.is3d ? { type: 'circle', radius: 8 } : { type: 'rect', w: 20, h: 0 },
        speed: 0, life: [0.22, 0.32], size: [10, 16], color: [light, col],
        behaviors: [c.force(0, 400), c.limitSpeed(90, 1), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 2 })),
    ];
  },
};
