/** A quest marker over the head: a gold star breathes in a soft yellow glow, a ring pulses out from it and sparkles twinkle and drift up around it. Loops until stopped. */
export default {
  name: 'state.quest',
  category: 'state',
  whenToUse: 'An NPC, villager or quest giver has a task, a delivery or a reward to hand in for the player: a quest available or ready to turn in in an RPG, an adventure or a village sim, a shopkeeper with a new offer. Follow the head and stop it when the player accepts or finishes the quest. For a place on the map to go to use world.beacon; for a target to defeat use state.marked; for an item that wants attention use state.sparkle.',
  duration: 1.2, loop: true, anchor: 'head', tint: '#ffd23a',
  tags: ['quest', 'npc', 'task', 'quest giver', 'mission', 'villager', 'marker', 'rpg'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    // the head anchor already sits a little above the head; the marker hangs just over it
    const L = 1.2, Y = 16;
    const breathe = (a, b) => c.sizeOverLife(c.curve([[0, a], [0.5, b], [1, a]]));
    const alpha = (a, b) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[a, 0], [b, 0.5], [a, 1]]));
    return [
      // the standing parts are `cut`, so the marker goes the moment the game stops it
      // a soft yellow glow, breathing
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 96, offset: [0, Y], color: col,
        behaviors: [breathe(0.85, 1.12), alpha(0.35, 0.7)], order: 0 }),
      // the gold star: solid so it reads on light backgrounds, with a bright star laid over it
      c.sys({ tex: 'star', blend: 'normal', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 34, offset: [0, Y], color: col,
        behaviors: [breathe(0.92, 1.1)], order: 2 }),
      c.sys({ tex: 'star', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 26, offset: [0, Y], color: light,
        behaviors: [breathe(0.92, 1.1), alpha(0.4, 0.85)], order: 3 }),
      // a ring pulsing out from the star once a beat
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: L, bursts: [{ time: 0.45, count: 1 }], life: 0.6, size: 90, offset: [0, Y], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.8, 0.15], [0, 1]]))], order: 1 }),
      // a white glint flashing on the star at the top of each breath
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: L, bursts: [{ time: 0.5, count: 1 }], life: 0.35, size: 40, offset: [8, Y + 8], rotation: 0.3, color: '#ffffff',
        behaviors: [c.spin(2), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [1, 0]]))], order: 4 }),
      // sparkles twinkling around the star and drifting up
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 6, shape: { type: 'circle', radius: 30, thickness: 0.5 }, offset: [0, Y],
        speed: [4, 12], life: [0.7, 1.0], size: [7, 12], rotation: [0, 0.8], color: [light, '#ffffff'],
        behaviors: [c.force(0, 60), c.limitSpeed(32, 1), c.sizeOverLife(c.pop(0.25, 0.6))], order: 4 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 5, shape: { type: 'circle', radius: 24 }, offset: [0, Y - 6],
        speed: [4, 12], life: [0.9, 1.3], size: [3, 6], color: light,
        behaviors: [c.force(0, 70), c.limitSpeed(40, 1), c.noise(1.5, 6), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 1 })),
    ];
  },
};
