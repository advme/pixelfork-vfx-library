/** Surfing: a rooster tail of spray thrown up behind the board, white mist, glints in the drops and a line of foam left on the water. Loops until stopped. */
export default {
  name: 'move.surf',
  category: 'move',
  whenToUse: 'A character rides a board or skis on water: surfing a wave, wakeboarding, water-skiing, a kite surfer, a hoverboard skimming a lake, a character or animal sliding across water; follow the tail of the board at the water line and stop it when they fall or stop (in 2D dir is the way the spray flies, default 125 degrees = up and back for a rider going right; in 3D pass direction pointing back and well up, about 45 degrees), and use vehicle.wake for the foam trail of a boat or jet ski, move.splash for a single splash.',
  duration: 1, loop: true, tint: '#7fd4ff',
  tags: ['surf', 'surfing', 'wakeboard', 'water ski', 'spray', 'foam', 'wave', 'beach', 'move'],
  build(c) {
    const col = c.color('#7fd4ff');
    const light = c.lighten(col, 0.7);
    const dir = c.dir === undefined ? Math.PI - 0.95 : c.dir;
    // foam lies on the water where it was left; 3D: spread over the water plane (c.ground) and not snapped to the
    // ground, the water is above it; 2D: a line on the surface
    const foam = (p) => (c.is3d ? c.sys(c.flat(c.ground(p), { snap: false })) : c.sys(p));
    return [
      foam({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 18, shape: c.is3d ? { type: 'circle', radius: 10 } : { type: 'rect', w: 30, h: 0 },
        speed: c.is3d ? [15, 40] : 0, life: [0.8, 1.2], size: [18, 28], rotation: [0, 6.28], color: c.lighten(col, 0.85),
        behaviors: [c.speedOverLife(c.decel(0.2)), c.spin(-0.5, 0.5), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.9]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.5, 0.5], [0, 1]]))], order: 0 }),
      // the rooster tail of drops, thrown steeply up and back; lives end about when the drops fall back to the
      // water line, so the stream does not keep falling through the sea
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, world: true, rate: 44, dir, shape: { type: 'cone', radius: 6, angle: 0.24 },
        speed: [300, 500], life: [0.42, 0.6], size: [4, 8], color: [light, col],
        stretch: { speed: 0.004, length: 1.4 },
        behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.7)), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 2 })),
      // white mist in the spray
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 14, dir, shape: { type: 'cone', radius: 8, angle: 0.4 },
        speed: [140, 240], life: [0.45, 0.65], size: [20, 32], rotation: [0, 6.28], color: c.lighten(col, 0.85),
        behaviors: [c.speedOverLife(c.decel(0.25)), c.gravity(250), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.45, 0.5], [0, 1]]))], order: 1 })),
      // sun glints sparkling in the drops
      c.sys(c.spray({ tex: 'spark', blend: 'add', loop: true, world: true, rate: 6, dir, shape: { type: 'cone', radius: 6, angle: 0.35 },
        speed: [220, 380], life: [0.3, 0.45], size: [9, 13], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.gravity(1100), c.sizeOverLife(c.pop(0.25, 0.5))], order: 3 })),
    ];
  },
};
