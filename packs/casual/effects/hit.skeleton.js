/** A skeleton falls apart: a white hit flash and glint, bones and knuckle bits flying up and tumbling down, and a cloud of grey bone dust. */
export default {
  name: 'hit.skeleton',
  category: 'hit',
  whenToUse: 'A skeleton, undead warrior, bone archer or other bony monster is hit hard or falls apart: a skeleton enemy defeated in a dungeon crawler, bones scattering in a graveyard or crypt level, a mummy or lich minion smashed. Play it on the skeleton\'s body; tint it for the bone colour. For a ghost or spirit being destroyed use explosion.soul; for an ordinary enemy poofing away use explosion.puff; for a crate or rock breaking use hit.block.',
  duration: 0.6, loop: false, tint: '#f4ecd8',
  tags: ['skeleton', 'bones', 'undead', 'dungeon', 'enemy', 'break', 'graveyard', 'rpg'],
  build(c) {
    const col = c.color('#f4ecd8');
    const shade = c.darken(col, 0.22);
    const dust = c.mix(col, '#8f8c86', 0.6);
    // a wide upward spray: bones pop up and out, then gravity brings them down
    const pop = { type: 'cone', radius: 12, angle: 1.0 };
    return [
      // the hit: a short white flash and a sharp glint
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 110, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 80, rotation: 0.35, color: '#ffffff',
        behaviors: [c.spin(3), c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0]]))], order: 5 }),
      // grey bone dust puffing out
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 16 },
        speed: [60, 170], life: [0.4, 0.6], size: [26, 44], rotation: [0, 6.28], color: [dust, c.lighten(dust, 0.25)],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 30), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))], order: 1 })),
      // the long bones: shards in 2D, solid tumbling rods in 3D
      c.sys(c.chunks({ tex: 'shard', blend: 'normal', bursts: [{ count: [6, 8] }], shape: pop,
        speed: [260, 460], life: [0.45, 0.58], size: c.is3d ? [16, 24] : [22, 30], rotation: [0, 6.28], color: [col, shade],
        behaviors: [c.gravity(1500), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 3 }, 'plank')),
      // knuckles and skull bits: round chunks
      c.sys(c.chunks({ tex: 'disc', blend: 'normal', bursts: [{ count: [4, 6] }], shape: pop,
        speed: [220, 420], life: [0.4, 0.55], size: c.is3d ? [7, 11] : [9, 13], color: [col, shade],
        behaviors: [c.gravity(1500), c.colorOverLife(c.fade(0.7))], order: 3 }, 'ball')),
      // fine grit
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 8 },
        speed: [220, 480], life: [0.3, 0.45], size: [3, 5], color: shade,
        behaviors: [c.gravity(1300), c.colorOverLife(c.fade(0.6))], order: 2 })),
    ];
  },
};
