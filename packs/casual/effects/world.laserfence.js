/** A laser fence: three bright laser beams with white-hot cores stretched between two posts, glowing emitter nodes at each end and sparks dripping off. Loops until stopped. */
export default {
  name: 'world.laserfence',
  category: 'world',
  whenToUse: 'A laser fence, laser tripwire or security laser grid blocks a gap between two posts (a heist or stealth level, a prison cell, a sci-fi checkpoint, a hazard the player must not touch): play it at the middle of the gap (size 1 spans about 160 px) and stop it when the lasers switch off; for a single laser shot use weapon.laser, for a solid energy wall use world.forcefield.',
  duration: 1, loop: true, tint: '#ff2d55',
  tags: ['laser', 'fence', 'tripwire', 'security', 'barrier', 'heist', 'stealth', 'sci-fi'],
  build(c) {
    const col = c.color('#ff2d55');
    const light = c.lighten(col, 0.45);
    // W: post to post; the beams sit at these heights
    const W = 160, gap = 30;
    // a beam is a stretched sprite that trails BACK from its particle: the particle sits at the right post,
    // drifting right very slowly, and its stretch (size x length) reaches back to the left post
    const beam = (x, y, p) => c.sys(Object.assign({ blend: 'add', loop: true, dir: 0, shape: { type: 'cone', radius: 0.1, angle: 0.001 }, speed: 4, offset: [x, y] }, p));
    // everything steady is re-laid only at the start of a cycle (so nothing new appears after stop()), lives a
    // little longer than the cycle and cross-fades with the next copy; it all switches off at once on stop()
    // the glow: steady, with a quick drop-out at d and d + 0.5 s, so every beam stutters twice a second at its own moments
    const hum = (d) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.05], [1, d], [0.15, d + 0.02], [1, d + 0.05],
      [1, d + 0.47], [0.15, d + 0.49], [1, d + 0.52], [1, 0.95], [0, 1]]));
    const one = (y, k) => [
      // the coloured glow around the beam, a little longer than the gap so it is even along it
      beam(W * 0.65, y, { tex: 'glow', cut: true, duration: 1, bursts: [{ count: 1 }], life: 1.05, size: 30, color: col,
        stretch: { speed: 0.001, length: (W * 1.3) / 30 }, behaviors: [hum(0.12 + k * 0.11)], order: 1 }),
      // the hot core, exactly post to post
      beam(W / 2, y, { tex: 'disc', cut: true, rate: 20, life: [0.1, 0.15], size: 5, color: light, stretch: { speed: 0.001, length: W / 5 },
        behaviors: [c.colorOverLife(c.fadeInOut(0.2, 0.8))], order: 2 }),
      // the emitter nodes at both ends: an even burst of 2 on a flat line lands exactly on its two ends
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 0.25, bursts: [{ count: 2 }], shape: { type: 'rect', w: W, h: 0, even: true }, offset: [0, y],
        speed: 0, life: 0.27, size: 28, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1.1], [1, 0.85]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.08], [1, 0.92], [0, 1]]))], order: 3 }),
    ];
    // sparks spitting out of a post where the beams leave it (a cone's base spans the post's height)
    const sparks = (side) => c.sys({ tex: 'glow', blend: 'add', loop: true, rate: 7, dir: side > 0 ? 0.3 : Math.PI - 0.3,
      shape: { type: 'cone', radius: gap + 2, angle: 0.6 }, offset: [side * (W / 2 + 4), 0],
      speed: [120, 260], life: [0.22, 0.4], size: [3, 5], color: ['#ffffff', light], stretch: { speed: 0.02, length: 1.5 },
      behaviors: [c.gravity(1000), c.speedOverLife(c.decel(0.5)), c.colorOverLife(c.fade(0.5))], order: 4 });
    return [
      ...one(gap, 0), ...one(0, 1), ...one(-gap, 2),
      sparks(1), sparks(-1),
    ];
  },
};
