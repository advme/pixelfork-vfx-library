/** A ground slide: dust sprays out low behind the feet, pebbles skip away and a scuff of dust is left along the ground. Loops until stopped. */
export default {
  name: 'move.slide',
  category: 'move',
  whenToUse: 'A character slides along the ground on purpose: a slide under an obstacle in a runner, a baseball slide into base, a slide-tackle, a crouch slide or a belly slide; follow the feet while it lasts and stop it when they stand up (in 2D dir is the way the dust flies, default 160 degrees for a slide to the right; in 3D pass direction pointing backward), and use move.skid for a car or a character braking to a stop, hit.tackle for the moment two players collide.',
  duration: 1, loop: true, anchor: 'feet', tint: '#e9dcc7',
  tags: ['slide', 'slide tackle', 'baseball slide', 'crouch slide', 'runner', 'dust', 'pebbles', 'platformer', 'move'],
  build(c) {
    const col = c.color('#e9dcc7');
    const dir = c.dir === undefined ? Math.PI - 0.35 : c.dir;
    // turn an angle a little further up, on whichever side the spray points
    const lift = (a) => (Math.cos(dir) < 0 ? dir - a : dir + a);
    // A streak trails BACK from its particle, so streaks born at the feet would poke out in front of the slider:
    // in 2D they start 30 px behind the feet and fade in
    const low = lift(-0.2);
    const behind = c.is3d ? undefined : [Math.cos(low) * 30, Math.sin(low) * 30];
    return [
      // the scuff left behind on the ground
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 14,
        shape: c.is3d ? { type: 'circle', radius: 8, thickness: 0.4 } : { type: 'circle', radius: 8, arc: Math.PI, thickness: 0.5 },
        speed: [20, 60], life: [0.45, 0.65], size: [14, 24], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 40), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.25]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.5, 0.5], [0, 1]]))], order: 0 })),
      // the main spray of dust thrown out low behind
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 28, dir, shape: { type: 'cone', radius: 6, angle: 0.3 },
        speed: [140, 280], life: [0.3, 0.5], size: [16, 30], rotation: [0, 6.28], color: [col, c.lighten(col, 0.3)],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 50), c.spin(-3, 3), c.sizeOverLife(c.curve([[0, 0.35], [0.4, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))], order: 1 })),
      // pebbles skipping away in little arcs
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', loop: true, world: true, rate: 16, dir: lift(0.35), shape: { type: 'cone', radius: 4, angle: 0.35 },
        speed: [220, 380], life: [0.3, 0.42], size: [3, 6], rotation: [0, 6.28], color: [c.darken(col, 0.35), c.darken(col, 0.5)],
        behaviors: [c.gravity(1300), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 2 }), 'box')),
      // quick speed streaks along the ground
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 9, dir: low, offset: behind, shape: { type: 'cone', radius: 6, angle: 0.08 },
        speed: [320, 460], life: [0.14, 0.22], size: [3, 5], color: c.lighten(col, 0.6),
        stretch: { speed: c.is3d ? 0.012 : 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fadeInOut(0.2, 0.45))], order: 3 })),
    ];
  },
};
