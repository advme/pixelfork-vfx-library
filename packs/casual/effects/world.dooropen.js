/** A door opens: warm light pours out of the doorway with turning rays, dust puffs out at the sill and trickles from the lintel, sparkles drift out. */
export default {
  name: 'world.dooropen',
  category: 'world',
  whenToUse: 'A door, gate, portcullis, vault or dungeon entrance in the level opens and shows the way on (after a key, a switch or a cleared room); play it at the middle of the doorway and size it to the door, and use world.keyhole for the key turning in the lock or magic.portal for a warp gate.',
  duration: 1.05, loop: false, tint: '#ffd772',
  tags: ['door', 'gate', 'open', 'entrance', 'dungeon', 'light', 'platformer', 'adventure'],
  build(c) {
    const col = c.color('#ffd772');
    const light = c.lighten(col, 0.6);
    const dust = '#d9c9ad';
    const glowIn = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.35, 0.2], [0.3, 0.65], [0, 1]]));
    const puffAlpha = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.55, 0.5], [0, 1]]));
    // dust kicked out along the sill: two low side sprays in 2D, a ring rolling over the floor in 3D
    const sill = (p) => c.sys(Object.assign({ tex: 'puff', blend: 'normal', offset: [0, -58],
      speed: [120, 220], life: [0.45, 0.65], size: [22, 36], rotation: [0, 6.28], color: dust,
      behaviors: [c.speedOverLife(c.decel(0.08)), c.force(0, 30), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.2]])), puffAlpha()], order: 2 }, p));
    const sillDust = c.is3d
      ? [sill(c.ground({ bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 30, thickness: 0, even: true } }))]
      : [sill({ bursts: [{ count: [3, 4] }], shape: { type: 'cone', radius: 4, angle: 0.2 }, dir: 0.12 }),
        sill({ bursts: [{ count: [3, 4] }], shape: { type: 'cone', radius: 4, angle: 0.2 }, dir: Math.PI - 0.12 })];
    const rays = (rot, px) => c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 1.0, size: px, rotation: rot, color: col,
      behaviors: [c.spin(0.5), c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.95]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.2], [0.5, 0.65], [0, 1]]))], order: 1 });
    return [
      // a big warm glow behind the doorway
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.95, size: 240, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 1.05]])), glowIn()], order: 0 }),
      // slowly turning rays of light: two 4-point rays 45 degrees apart make an even 8-ray burst
      rays(0.2, 270), rays(0.2 + Math.PI / 4, 225),
      // the lit doorway itself: soft light filling the opening
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 12 }], shape: { type: 'rect', w: 50, h: 90, thickness: 1 },
        speed: 0, life: [0.8, 0.9], size: [50, 70], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 1]])), glowIn()], order: 1 }),
      ...sillDust,
      // dust and grit trickling down from the lintel
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.05, count: [4, 5] }], shape: { type: 'rect', w: 70, h: 0 }, offset: [0, 62],
        speed: 0, life: [0.6, 0.85], size: [10, 18], rotation: [0, 6.28], color: dust,
        behaviors: [c.gravity(260), c.limitSpeed(110, 1), c.spin(-2, 2), c.sizeOverLife(c.grow(0.6)), c.colorOverLife(c.fadeInOut(0.15, 0.6))], order: 2 }),
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ time: 0.05, count: [3, 5] }], shape: { type: 'rect', w: 70, h: 0 }, offset: [0, 62],
        speed: 0, life: [0.4, 0.55], size: [3, 5], color: c.darken(dust, 0.35),
        behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.7))], order: 2 }),
      // sparkles drifting out of the light
      c.sys({ tex: 'spark', blend: 'add', rate: 14, duration: 0.55, shape: { type: 'rect', w: 60, h: 100, thickness: 1 },
        speed: 0, life: [0.3, 0.45], size: [8, 14], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.force(0, 80), c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 }),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.15, count: [6, 8] }], shape: { type: 'circle', radius: 30 },
        speed: [80, 160], life: [0.6, 0.85], size: [9, 14], rotation: [0, 6.28], color: light,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 60), c.spin(-4, 4), c.sizeOverLife(c.pop(0.2, 0.6))], order: 4 })),
    ];
  },
};
