/** Active camouflage: a faint shimmer over the body, pale glints, little hexagon cells flashing, ripples spreading and light-bending streaks running up. Loops until stopped. */
export default {
  name: 'state.cloak',
  category: 'state',
  whenToUse: 'A character uses active camouflage, a cloaking device or stealth tech (a spy gadget, a stealth suit in a sci-fi shooter, a cloaked robot, drone or ship): follow the body while it is cloaked (draw the character faint yourself) and stop it when it reappears; for a ghost or magic invisibility use state.invisible.',
  duration: 1.2, loop: true, tint: '#cfefff',
  tags: ['cloak', 'camouflage', 'stealth', 'invisible', 'sci-fi', 'spy', 'shimmer', 'status'],
  build(c) {
    const col = c.color('#cfefff');
    // where things appear: the body's outline area (a box in 2D, a sphere around it in 3D)
    const body = () => (c.is3d ? { type: 'circle', radius: 36 } : { type: 'rect', w: 50, h: 80, thickness: 1 });
    return [
      // a barely-there shimmer over the whole body, flickering
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.26, size: 110, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.12, 0.05], [0.2, 0.2], [0.08, 0.3], [0.16, 0.55], [0.07, 0.65], [0.18, 0.85], [0.12, 0.95], [0, 1]]))], order: 0 }),
      // light-bending streaks running up the body
      c.sys({ tex: 'glow', blend: 'add', loop: true, rate: 12, shape: { type: 'rect', w: 44, h: 0 }, offset: [0, -40],
        speed: 0, life: [0.45, 0.6], size: [3, 5], color: col, stretch: { speed: 0.02, length: 3 },
        behaviors: [c.force(0, 900), c.limitSpeed(140, 1), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.55, 0.25], [0.4, 0.7], [0, 1]]))], order: 1 }),
      // ripples: faint rings spreading where the cloak bends the light
      c.sys(c.vol({ tex: 'ring', blend: 'add', loop: true, rate: 3.5, shape: body(), speed: 0, life: [0.6, 0.9], size: [26, 44], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.2], [0, 1]]))], order: 1 })),
      // little hexagon cells of the camouflage mesh flashing
      c.sys(c.vol({ tex: 'hexshard', blend: 'add', loop: true, rate: 6, shape: body(), speed: 0, life: [0.25, 0.45], size: [10, 16], rotation: Math.PI / 6, color: col,
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.6)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.75, 1]]))], order: 2 })),
      // pale glints
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 11, shape: body(), speed: 0, life: [0.3, 0.6], size: [8, 14], rotation: [0, 0.8], color: ['#ffffff', col],
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [1, 1]]))], order: 3 })),
    ];
  },
};
