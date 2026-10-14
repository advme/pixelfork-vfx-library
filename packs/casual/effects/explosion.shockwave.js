/** A pure energy shockwave: a white-hot core, three bright rings racing out one after another, a level ring across the middle and streaks of light. No fire, no smoke. */
export default {
  name: 'explosion.shockwave',
  category: 'explosion',
  whenToUse: 'A pure energy blast with no fire: a force push, a pulse grenade, a power-up released in a wave that knocks enemies back, a sci-fi reactor pulse, a super move unleashed. Play it at the centre; tint it for the energy colour. For a punch, shout or sonic boom pushing air out in rings use hit.sonic; for a slam on the ground use hit.heavy; for an electric EMP use explosion.electric; for a spell blast use explosion.magic.',
  duration: 0.65, loop: false, tint: '#6fe0ff',
  tags: ['shockwave', 'pulse', 'energy', 'force push', 'blast wave', 'wave', 'knockback', 'explosion'],
  build(c) {
    const col = c.color('#6fe0ff');
    const light = c.lighten(col, 0.6);
    // 3D: the middle ring lies level at the blast's own height (not snapped down to the floor)
    const level = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const out = () => c.sizeOverLife(c.curve([[0, 0.05], [0.25, 0.65], [1, 1]]));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 240, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.15))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.15, size: 130, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      // three rings racing out one after another
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.09, count: 1 }, { time: 0.18, count: 1 }], life: 0.45, size: 360, color: col,
        behaviors: [out(), c.colorOverLife(c.fade(0.1))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 260, color: '#ffffff',
        behaviors: [out(), c.colorOverLife(c.fade(0.1))], order: 3 }),
      level({ blend: 'add', bursts: [{ time: 0.03, count: 1 }], life: 0.5, size: 420, color: light,
        behaviors: [out(), c.colorOverLife(c.fade(0.15))], order: 1 }),
      // streaks of light shooting out
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [18, 22] }], shape: { type: 'circle', radius: 12, thickness: 0 },
        speed: [450, 750], life: [0.22, 0.35], size: [4, 7], color: [light, '#ffffff'], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.25)), c.colorOverLife(c.fade(0.4))], order: 4 })),
      // motes left hanging in the air
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.08, count: [8, 10] }], shape: { type: 'circle', radius: 70 },
        speed: [30, 90], life: [0.4, 0.55], size: [8, 14], color: light,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [0.5, 0.3], [0.7, 1], [1, 0]]))], order: 4 })),
    ];
  },
};
