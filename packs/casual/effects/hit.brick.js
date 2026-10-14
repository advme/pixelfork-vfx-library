/** A brick smashes into hard pixel squares in its own colour: a white pop, chunky pieces falling away, bright bits and a puff of pixel dust. */
export default {
  name: 'hit.brick',
  category: 'hit',
  whenToUse: 'A brick is smashed by the ball in a breakout, brick-breaker or arkanoid game, or a block is knocked out in an arcade block game; play it on the brick and tint it with the brick colour. For a crate, wall or rock broken in an action game use hit.block; for an enemy blown up in pixel art use explosion.pixel.',
  duration: 0.55, loop: false, tint: '#ff5a6e',
  tags: ['brick', 'breakout', 'arkanoid', 'brick breaker', 'block', 'arcade', 'pixel', 'break'],
  build(c) {
    const col = c.color('#ff5a6e');
    const dark = c.darken(col, 0.3);
    const light = c.lighten(col, 0.5);
    return [
      // a short coloured glow behind it, so the hit reads on a dark arcade background
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 110, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 0 }),
      // pixel dust hanging where the brick was
      c.sys(c.vol({ tex: 'pixel', blend: 'normal', bursts: [{ time: 0.04, count: [4, 5] }], shape: { type: 'circle', radius: 16 },
        speed: [20, 60], life: [0.35, 0.5], size: [10, 14], color: c.mix(col, '#ffffff', 0.7),
        behaviors: [c.force(0, 60), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 0]]))], order: 1 })),
      // the brick's pieces: chunky squares falling away (solid cubes in 3D)
      c.sys(c.chunks({ tex: 'pixel', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 14 },
        speed: [150, 300], life: [0.4, 0.55], size: [10, 15], color: [col, dark],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.gravity(1100), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 2 }, 'box')),
      // small bright bits flying out faster
      c.sys(c.vol({ tex: 'pixel', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 10 },
        speed: [220, 420], life: [0.25, 0.4], size: [4, 7], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(700), c.sizeOverLife(c.curve([[0, 1], [0.6, 1], [1, 0]]))], order: 3 })),
      // a hard white pop the size of the brick
      c.sys({ tex: 'pixel', blend: 'normal', bursts: [{ count: 1 }], life: 0.08, size: 56, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [1, 1.25]])), c.colorOverLife(c.fade(0.4))], order: 5 }),
    ];
  },
};
