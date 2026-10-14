/** A black hole: a dark core ringed with violet light, with everything around it spiralling in. Loops until stopped. */
export default {
  name: 'magic.blackhole',
  category: 'magic',
  whenToUse: 'A gravity well or vortex that pulls things in: a black hole spell, a singularity grenade, a void portal, a whirlpool, a space hazard. Play it at the centre and stop it when it collapses (then play explosion.magic).',
  duration: 1, loop: true, tint: '#8a4dff',
  tags: ['black hole', 'vortex', 'gravity', 'void', 'singularity', 'space', 'pull', 'spell'],
  build(c) {
    const col = c.color('#8a4dff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }], life: 1, size: 220, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.55, 0], [0.75, 0.5], [0.55, 1]]))], order: 0 }),
      c.sys({ tex: 'disc', blend: 'normal', loop: true, duration: 1, bursts: [{ count: 1 }], life: 1, size: 70, color: '#07030f',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.95], [0.5, 1.05], [1, 0.95]]))], order: 3 }),
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }], life: 1, size: 86, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.95], [0.5, 1.05], [1, 0.95]]))], order: 4 }),
      // matter spiralling in
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 34, shape: { type: 'circle', radius: 150, thickness: 0 },
        speed: [-200, -160], life: [0.7, 0.8], size: [4, 8], color: [light, '#ffffff'], stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.orbit(4), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.85, 0.8], [1, 0]]))], order: 2 })),
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }, { time: 0.5, count: 1 }], life: 0.8, size: 280, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.3]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.5, 0.4], [0, 1]]))], order: 1 }),
    ];
  },
};
