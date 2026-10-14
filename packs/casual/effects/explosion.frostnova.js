/** A frost nova on the ground: a cold flash, two frost rings racing out along the floor, a ring of ice shards springing up and sliding outward, cold mist rolling flat over the ground and snowflakes glittering up. */
export default {
  name: 'explosion.frostnova',
  category: 'explosion',
  whenToUse: 'A frost tower, ice totem or freeze trap pulses and freezes the whole area around it on the ground: a frost tower\'s area attack in tower defense, an ice nova cast at a hero\'s feet, a freezing floor trap, a blizzard ability that chills every enemy nearby. Play it on the ground at the centre and size it to the area; then put state.frozen on the enemies it caught. For an ice bomb blasting in mid-air use explosion.ice, for one enemy hit by a frost shot use hit.slow or hit.ice, and for a lasting slowing zone use magic.slowfield.',
  duration: 1.0, loop: false, anchor: 'feet', tint: '#8fdcff',
  tags: ['frost', 'nova', 'freeze', 'ice', 'tower defense', 'area', 'cold', 'ground'],
  build(c) {
    const col = c.color('#8fdcff');
    const light = c.lighten(col, 0.7);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // shards spring up, slide outward and stop: travel is about speed x life x 0.17, so 35-100 px out
    const shardMotion = () => [c.speedOverLife(c.curve([[0, 1], [0.35, 0], [1, 0]])),
      c.sizeOverLife(c.curve([[0, 0.2], [0.12, 1.15], [0.2, 1], [0.8, 1], [1, 0]]))];
    const shards = c.is3d
      // 3D: solid ice shards standing up in a ring on the floor, sliding out to it
      ? [c.sys(c.ground({ tex: 'shard', render: 'mesh', geo: 'shard', upright: true, blend: 'normal', bursts: [{ count: 12 }],
        shape: { type: 'circle', radius: 24, thickness: 0, even: true },
        speed: [340, 420], life: [0.8, 0.9], size: [26, 40], color: [col, light], behaviors: shardMotion(), order: 4 }))]
      // 2D: shard sprites standing on the ground line, sliding left and right out of the centre
      : [0, Math.PI].map((d) => c.sys({ tex: 'shard', blend: 'normal', bursts: [{ count: [5, 6] }], dir: d, offset: [0, 14],
        shape: { type: 'cone', radius: 2, angle: 0.03 },
        speed: [200, 600], life: [0.8, 0.9], size: [26, 40], rotation: [-0.25, 0.25], color: [col, light], behaviors: shardMotion(), order: 4 }));
    // cold mist rolling out flat over the ground
    const mist = (p) => c.sys(c.ground(Object.assign({ tex: 'puff', blend: 'normal', speed: [200, 290], life: [0.75, 0.95], size: [40, 62], rotation: [0, 6.28], color: '#eaf8ff',
      behaviors: [c.speedOverLife(c.decel(0.08)), c.force(0, 20), c.spin(-0.8, 0.8), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.4]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.8, 0.12], [0.5, 0.55], [0, 1]]))], order: 1 }, p)));
    const mistRoll = c.is3d
      ? [mist({ bursts: [{ count: 14 }], shape: { type: 'circle', radius: 20, thickness: 0, even: true }, offset: [0, 14] })]
      : [0.12, Math.PI - 0.12].map((d) => mist({ bursts: [{ count: [6, 7] }], dir: d, shape: { type: 'cone', radius: 8, angle: 0.15 } }));
    return [
      // frost spreading over the floor: a pale patch lying on it in 3D; in 2D a flat row of soft glows along the ground
      c.is3d
        ? c.sys(c.flat({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.95, size: 300, color: col,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.3, 1], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.5, 0.15], [0.35, 0.6], [0, 1]]))], order: 0 }))
        : c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 7 }], shape: { type: 'rect', w: 220, h: 0, even: true }, speed: 0, life: 0.95, size: 64, offset: [0, 6], color: col,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.4, 0.15], [0.25, 0.6], [0, 1]]))], order: 0 }),
      ...mistRoll,
      // two frost rings racing out along the ground
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.55, size: 330, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      ring({ blend: 'add', bursts: [{ time: 0.07, count: 1 }], life: 0.45, size: 250, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      ...shards,
      // snowflakes and glints rising off the frozen ground
      c.sys(c.ground({ tex: 'snowflake', blend: 'add', rate: 40, duration: 0.35, shape: c.is3d ? { type: 'circle', radius: 100 } : { type: 'rect', w: 230, h: 0 },
        speed: 0, life: [0.5, 0.65], size: [10, 18], rotation: [0, 6.28], color: light,
        behaviors: [c.force(0, 160), c.limitSpeed(80, 1), c.spin(-3, 3), c.sizeOverLife(c.pop(0.2, 0.55))], order: 5 })),
      // the cold flash at the centre
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 200, offset: [0, 20], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 6 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.3, size: 140, offset: [0, 20], rotation: [0, 1.6], color: light,
        behaviors: [c.spin(1), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 6 }),
    ];
  },
};
