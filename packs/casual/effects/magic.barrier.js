/** A quick barrier: a honeycomb wall of glowing hexagon tiles blooms out from the centre with a flash and sparks, holds, then breaks into fragments. */
export default {
  name: 'magic.barrier',
  category: 'magic',
  whenToUse: 'A hero throws up a quick energy wall: a barrier or block ability, a projectile-blocking shield wall, a deflect skill in a MOBA or hero shooter. Play it just in front of the character, toward the attack. For a shield popping on around the character use magic.shield; for a shield that lasts use state.shield or state.dome; for a weapon parry use hit.parry.',
  duration: 0.7, loop: false, tint: '#47c8ff',
  tags: ['barrier', 'wall', 'block', 'hexagon', 'force field', 'deflect', 'moba', 'ability'],
  build(c) {
    const col = c.color('#47c8ff');
    const light = c.lighten(col, 0.6);
    // hexagon tiles turned point-up, so the six neighbours sit at 0, 60, 120 ... degrees and share edges
    const tile = (p) => c.sys(Object.assign({ tex: 'hexshard', blend: 'add', speed: 0, life: 0.55, size: 40, rotation: Math.PI / 6, color: '#ffffff',
      behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.1, 1.25], [0.18, 1], [0.75, 1], [1, 1.12]])),
        c.colorOverLife(c.grad([['#ffffff', 0], [col, 0.3], [col, 1]], [[1, 0], [1, 0.6], [0, 1]]))], order: 2 }, p));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 160, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.6, size: 180, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.15], [0.35, 0.7], [0, 1]]))], order: 0 }),
      // the centre tile, then the ring of six around it
      tile({ bursts: [{ count: 1 }] }),
      tile({ bursts: [{ time: 0.05, count: 6 }], shape: { type: 'circle', radius: 36, thickness: 0, even: true } }),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: 0.05, count: 12 }], shape: { type: 'circle', radius: 55, thickness: 0 },
        speed: [140, 280], life: [0.3, 0.42], size: [4, 6], color: [light, '#ffffff'], stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4))], order: 3 })),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.08, count: [2, 3] }], shape: { type: 'circle', radius: 40 },
        speed: 0, life: [0.3, 0.4], size: [22, 30], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [1, 0]]))], order: 4 }),
      // the wall breaks up: small hexagon fragments fly off and fall
      c.sys(c.vol({ tex: 'hexshard', blend: 'add', bursts: [{ time: 0.42, count: [6, 8] }], shape: { type: 'circle', radius: 40 },
        speed: [80, 180], life: [0.22, 0.28], size: [12, 18], rotation: [0, 6.28], color: light,
        behaviors: [c.gravity(500), c.spin(-6, 6), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.3))], order: 3 })),
    ];
  },
};
