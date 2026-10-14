/** A broken wire or machine: bursts of sparks spit out at uneven moments, each with a bright snap. Loops until stopped. */
export default {
  name: 'world.sparks',
  category: 'world',
  whenToUse: 'Something sparks on and off: a torn power cable, a damaged machine or robot, a short circuit, a grinder or welding, a broken street light, a sci-fi corridor. Play it at the break and leave it running.',
  duration: 1.4, loop: true, tint: '#ffd27a',
  tags: ['sparks', 'wire', 'electric', 'broken', 'machine', 'welding', 'short circuit', 'sci-fi', 'industrial'],
  build(c) {
    const col = c.color('#ffd27a');
    const at = [{ time: 0, count: [8, 12] }, { time: 0.16, count: [4, 6] }, { time: 0.9, count: [10, 14] }];
    return [
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, duration: 1.4, bursts: at, shape: { type: 'circle', radius: 3, thickness: 0 },
        speed: [250, 600], life: [0.3, 0.6], size: [3, 6], color: ['#ffffff', col], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1400), c.colorOverLife(c.fade(0.5))], order: 2 })),
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: 1.4, bursts: at.map((b) => ({ time: b.time, count: 1 })), life: 0.08, size: 60, rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.colorOverLife(c.fade(0.3))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.4, bursts: at.map((b) => ({ time: b.time, count: 1 })), life: 0.14, size: 90, color: col,
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 1 }),
    ];
  },
};
