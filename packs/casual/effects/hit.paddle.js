/** A ball bounces off a paddle: a bright flash, a squashed ripple along the paddle and a fan of sparks thrown the way the ball goes. */
export default {
  name: 'hit.paddle',
  category: 'hit',
  whenToUse: 'A ball bounces off a paddle, bumper, flipper or wall in a breakout, pong, pinball or air-hockey game; play it at the contact point, and in 2D set dir (degrees) to the way the ball bounces away (default up), in 3D pass direction. For a ball kicked or struck hard in a sports game use hit.kick; for a character launched by a spring use move.bounce.',
  duration: 0.35, loop: false, tint: '#4fe3ff',
  tags: ['paddle', 'bounce', 'breakout', 'pong', 'pinball', 'bumper', 'ball', 'arcade'],
  build(c) {
    const col = c.color('#4fe3ff');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    const fx = Math.cos(dir), fy = Math.sin(dir);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 90, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // a squashed ripple lying along the paddle, across the bounce direction
      c.sys({ tex: 'ellipse', blend: 'add', bursts: [{ count: 1 }, { time: 0.06, count: 1 }], life: 0.3, size: 150, rotation: dir - Math.PI / 2, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // a few dots that bounce off with the ball and drop
      c.sys(c.spray({ tex: 'disc', blend: 'add', bursts: [{ count: [5, 6] }], dir, shape: { type: 'cone', radius: 12, angle: 0.9 },
        speed: [140, 240], life: [0.25, 0.33], size: [6, 9], color: col,
        behaviors: [c.speedOverLife(c.decel(0.3)), c.gravity(500), c.sizeOverLife(c.shrink())], order: 2 })),
      // sparks fanning out the way the ball goes, started a little in front so their tails stay out of the paddle
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [9, 11] }], dir, shape: { type: 'cone', radius: 8, angle: 0.75 }, offset: [fx * 16, fy * 16],
        speed: [260, 460], life: [0.18, 0.28], size: [6, 8], color: light, stretch: { speed: 0.012, length: 1 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 3 })),
      // the white glint at the contact point
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 70, rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.3))], order: 4 }),
    ];
  },
};
