/** A spear or rapier thrust: one long bright streak pierces forward, a shock ring flares at the tip and sparks fly on. */
export default {
  name: 'hit.thrust',
  category: 'hit',
  whenToUse: 'A spear, lance, rapier, pike, trident or horn stabs straight into a target; play it on the target and aim it the way the point travels with dir in 2D (degrees, default right) or direction: [x, y, z] in 3D, and for a sideways sword swing use hit.slash instead.',
  duration: 0.35, loop: false, tint: '#ffe07a',
  tags: ['thrust', 'stab', 'spear', 'lance', 'rapier', 'pierce', 'fencing', 'poke'],
  build(c) {
    const col = c.color('#ffe07a');
    const light = c.lighten(col, 0.8);
    const dir = c.dir === undefined ? 0 : c.dir;
    // the shock ring around the point: side-on across the thrust in 2D, round and facing the camera in 3D
    const tipRing = c.is3d ? { tex: 'ring' } : { tex: 'ellipse', rotation: dir + Math.PI / 2 };
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 110, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys(Object.assign(tipRing, { blend: 'add', bursts: [{ count: 1 }, { time: 0.06, count: 1 }], life: 0.24, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.4, 0.8], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 })),
      // the thrust: long streaks shooting forward; they trail back toward the attacker and pierce through the target
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 3 }], shape: { type: 'cone', radius: 3, angle: 0.02 }, dir,
        speed: [950, 1200], life: [0.16, 0.2], size: [16, 19], color: col,
        stretch: { speed: 0.006, length: 4 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.45)), c.sizeOverLife(c.curve([[0, 0.9], [0.3, 1], [1, 0.3]]))], order: 2 })),
      c.sys(c.spray({ tex: 'disc', blend: 'add', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 1, angle: 0.01 }, dir,
        speed: 1100, life: 0.18, size: 7, color: light,
        stretch: { speed: 0.01, length: 13 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.45)), c.sizeOverLife(c.curve([[0, 0.9], [0.3, 1], [1, 0.3]]))], order: 3 })),
      // a glint where the point lands
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.02, count: 1 }], life: 0.14, size: 70, rotation: dir, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.3))], order: 4 }),
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ time: 0.02, count: [10, 13] }], shape: { type: 'cone', radius: 4, angle: 0.45 }, dir,
        speed: [350, 700], life: [0.2, 0.32], size: [4, 7], color: [light, col],
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(500), c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 4 })),
    ];
  },
};
