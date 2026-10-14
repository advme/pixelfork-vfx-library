/** Foam lapping at a shoreline: with every little wave a line of white foam swells along the water's edge, fizzes and fades. Loops until stopped. */
export default {
  name: 'world.shore',
  category: 'world',
  whenToUse: 'Gentle surf along a beach or lake shore: foam lapping at the water\'s edge on a tropical island, a beach resort, a lakeside camp, a river bank, a calm sea. Play it on the water line and leave it running; the line runs left to right (in 3D along the X axis), size 2 makes it twice as long. For waves crashing on rocks use world.wave; for a boat\'s foam use vehicle.wake.',
  duration: 2.4, loop: true, anchor: 'feet', tint: '#ffffff',
  tags: ['shore', 'beach', 'foam', 'surf', 'coast', 'island', 'lake', 'sea'],
  build(c) {
    const col = c.color('#ffffff');
    const D = 2.4;
    // the water line: the edge of a thin rect, so the foam is spread evenly along it (a filled rect bunches it in the middle);
    // in 3D it lies on the water along X, two rows a little apart that the puffs blend into one band
    const line = { type: 'rect', w: 300, h: c.is3d ? 24 : 6, thickness: 0 };
    // 3D: foam lies flat on the water (not snapped to the ground: the water is above it)
    const foam = (p) => c.sys(c.flat(c.ground(Object.assign({ loop: true, shape: line, speed: 0 }, p)), { snap: false }));
    return [
      // the lap: a line of foam swells up along the edge, then fades back
      foam({ tex: 'puff', blend: 'normal', duration: D, bursts: [{ count: [16, 20] }], life: [1.3, 1.8], size: [24, 38], rotation: [0, 6.28], color: col,
        behaviors: [c.spin(-0.4, 0.4), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.95, 0.15], [0.6, 0.6], [0, 1]]))], order: 1 }),
      // foam that stays between laps
      foam({ tex: 'puff', blend: 'normal', rate: 12, life: [1.2, 1.7], size: [12, 20], rotation: [0, 6.28], color: col,
        behaviors: [c.spin(-0.4, 0.4), c.sizeOverLife(c.curve([[0, 0.4], [1, 1.2]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.2], [0, 1]]))], order: 0 }),
      // the foam fizzing: tiny bubbles popping
      foam({ tex: 'ring', blend: 'normal', duration: D, rate: 14, bursts: [{ time: 0.2, count: [8, 10] }], life: [0.3, 0.6], size: [3, 7], color: c.mix(col, '#bfefff', 0.4),
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.7))], order: 2 }),
      // sun glints on the wet edge
      foam({ tex: 'spark', blend: 'add', rate: 4, life: [0.25, 0.4], size: [8, 14], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.4, 0.5))], order: 3 }),
    ];
  },
};
