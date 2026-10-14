/** A speed boost grabbed: a flash and ring, three chevrons shooting forward and speed streaks whooshing past. */
export default {
  name: 'pickup.speed',
  category: 'pickup',
  whenToUse: 'A speed boost item is picked up: a lightning-bolt power-up, sprint shoes, a turbo or energy can in a runner or racing game. Play it where the item was; in 2D set dir (the way the player runs, default right), in 3D pass direction. For the speed lines while the boost lasts use move.speed or vehicle.nitro; for a boost pad on the track use world.boostpad.',
  duration: 0.45, loop: false, tint: '#38e1ff',
  tags: ['speed', 'boost', 'sprint', 'turbo', 'fast', 'runner', 'racing', 'pickup'],
  build(c) {
    const col = c.color('#38e1ff');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? 0 : c.dir;
    // the chevron points up in its picture: turn it to point along dir
    const turn = dir - Math.PI / 2;
    // 2D: the streaks start a little behind the item so they whoosh through it
    const back = c.is3d ? undefined : [-Math.cos(dir) * 50, -Math.sin(dir) * 50];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 130, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // speed streaks whooshing past
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 10] }, { time: 0.06, count: [5, 6] }], shape: { type: 'cone', radius: 40, angle: 0.03, thickness: 1 }, dir, offset: back,
        speed: [800, 1100], life: [0.14, 0.22], size: [4, 7], color: ['#ffffff', light], stretch: { speed: c.is3d ? 0.01 : 0.016, length: 1.5 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.4))], order: 2 })),
      // three chevrons shooting forward one after another
      c.sys(c.spray({ tex: 'arrow', blend: 'add', bursts: [{ count: 1 }, { time: 0.07, count: 1 }, { time: 0.14, count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 }, dir,
        speed: 420, life: 0.3, size: 40, rotation: turn, color: light,
        behaviors: [c.speedOverLife(c.decel(0.25)), c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1.15], [1, 0.7]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [1, 0.5], [0, 1]]))], order: 3 })),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: 6 }], shape: { type: 'circle', radius: 10 },
        speed: [100, 200], life: [0.3, 0.42], size: [9, 14], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
