/** The edge of a battle-royale storm: a glowing wall of blue-purple light and dark storm clouds rising from the ground, with energy streaks, sparks and little lightning flickers (2D: a row; 3D: a ring). Loops until stopped. */
export default {
  name: 'world.stormzone',
  category: 'world',
  whenToUse: 'The edge of a shrinking safe zone in a battle royale or .io arena (the storm, the gas, the blue zone, the ring of death) that hurts players caught outside: in 3D play it on the ground at the zone\'s centre and size it to the zone (size 1 is a ring 160 px in radius, about two character heights), replaying it at the new size as the zone shrinks; in 2D it is a 320 px row of wall, so play it on the zone edge and use several side by side. For a zone a team is capturing use world.capture; for a force-field door use world.forcefield.',
  duration: 2, loop: true, anchor: 'feet', tint: '#8a5cff',
  tags: ['storm', 'zone', 'battle royale', 'safe zone', 'gas', 'ring', 'wall', 'io'],
  build(c) {
    const col = c.color('#8a5cff');
    const light = c.lighten(col, 0.55);
    const deep = c.darken(col, 0.45);
    // the zone edge: a ring on the ground in 3D, a flat row along the ground in 2D
    const R = 160;
    const edge = () => (c.is3d ? { type: 'circle', radius: R, thickness: 0 } : { type: 'rect', w: 2 * R, h: 0 });
    // one layer of the wall, born along the edge and pushed up by forces (prewarmed, so the wall is standing at once)
    // the flat 2D row has fewer layers overlapping than the 3D ring seen at an angle, so it glows a little stronger
    const glowPeak = c.is3d ? 0.2 : 0.3;
    const wall = (rate3d, rate2d, p) => c.sys(c.ground(Object.assign({ loop: true, prewarm: true, rate: c.is3d ? rate3d : rate2d, shape: edge(), speed: 0 }, p)));
    return [
      // dark storm clouds giving the wall body on bright ground
      wall(20, 8, { tex: 'puff', blend: 'normal', life: [1.6, 2], size: [50, 80], rotation: [0, 6.28], color: deep,
        behaviors: [c.force(0, 80), c.limitSpeed(50, 1), c.spin(-0.4, 0.4), c.sizeOverLife(c.curve([[0, 0.6], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.35, 0.25], [0.25, 0.65], [0, 1]]))], order: 0 }),
      // the glowing blue-purple wall
      wall(50, 22, { tex: 'glow', blend: 'add', life: [1.4, 1.8], size: [50, 80], color: [col, light],
        behaviors: [c.force(0, 150), c.limitSpeed(90, 1), c.sizeOverLife(c.curve([[0, 0.6], [1, 1.1]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [glowPeak, 0.2], [glowPeak * 0.8, 0.6], [0, 1]]))], order: 1 }),
      // a bright band where the wall meets the ground
      wall(22, 8, { tex: 'glow', blend: 'add', life: [1, 1.3], size: [40, 60], color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.4, 0.3], [0.4, 0.7], [0, 1]]))], order: 2 }),
      // energy streaks shooting up the wall (they fade in, so the slow start never shows)
      wall(50, 26, { tex: 'glow', blend: 'add', life: [0.6, 0.8], size: [4, 6], color: [light, '#ffffff'], stretch: { speed: 0.015, length: 3 },
        behaviors: [c.force(0, 700), c.limitSpeed(300, 1), c.colorOverLife(c.fadeInOut(0.25, 0.6))], order: 3 }),
      // sparks drifting up through it
      wall(24, 8, { tex: 'spark', blend: 'add', life: [0.8, 1.1], size: [6, 10], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.force(0, 200), c.limitSpeed(110, 1), c.noise(2, 12), c.sizeOverLife(c.pop(0.2, 0.6))], order: 4 }),
      // lightning flickering inside the wall
      c.sys(c.ground({ tex: 'bolt', blend: 'add', loop: true, rate: c.is3d ? 3 : 1.5, offset: [0, 55],
        shape: c.is3d ? { type: 'circle', radius: R, thickness: 0 } : { type: 'rect', w: 2 * R, h: 60, thickness: 1 },
        speed: 0, life: 0.18, size: [26, 40], rotation: [-0.3, 0.3], color: ['#ffffff', light],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.2, 1.1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.8, 0.5], [0, 1]]))], order: 5 })),
      // 3D: the zone line itself, glowing on the floor
      c.is3d
        ? c.sys(c.flat({ tex: 'ring', blend: 'add', loop: true, cut: true, duration: 2, bursts: [{ count: 1 }], life: 2, size: R / 0.4, color: light,
          behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.9, 0.5], [0.6, 1]]))], order: 2 }))
        : null,
    ];
  },
};
