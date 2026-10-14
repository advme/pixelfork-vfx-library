/** A beast's claw swipe: three parallel slash marks rake across the target one after another, with a flash and sparks. */
export default {
  name: 'hit.claw',
  category: 'hit',
  whenToUse: 'A beast, werewolf, cat, bear, dragon or monster rakes a target with its claws and leaves three parallel slash marks; play it on the target and set dir (degrees on screen, default down-right) to the way the paw swipes, and for a single sword or blade swing use hit.slash instead.',
  duration: 0.35, loop: false, tint: '#ff3d5a',
  tags: ['claw', 'scratch', 'beast', 'werewolf', 'monster', 'swipe', 'rake', 'animal'],
  build(c) {
    const col = c.color('#ff3d5a');
    const light = c.lighten(col, 0.85);
    const dir = c.dir === undefined ? -Math.PI / 3 : c.dir;
    // along the swipe, and across it (the three claws sit side by side across it)
    const ax = Math.cos(dir), ay = Math.sin(dir);
    const px = -ay, py = ax;
    const out = [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 130, color: c.mix(col, '#ffffff', 0.4),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))], order: 0 }),
    ];
    // three claw marks, raked one after another; the middle one sits a little further along, like a paw
    [-1, 0, 1].forEach((k, i) => {
      const t = i * 0.035;
      // streaks trail back from their particle, so each emitter starts ahead to centre the mark on the target
      const along = k === 0 ? 44 : 32;
      const offset = [px * k * 26 + ax * along, py * k * 26 + ay * along];
      const life = () => [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.35)), c.sizeOverLife(c.curve([[0, 0.7], [0.2, 1], [1, 0.25]]))];
      out.push(
        c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: t, count: 3 }], shape: { type: 'cone', radius: 2, angle: 0.01 }, dir, offset,
          speed: [540, 640], life: [0.18, 0.22], size: [17, 20], color: col,
          stretch: { speed: 0.005, length: 5 }, behaviors: life(), order: 2 }),
        c.sys({ tex: 'disc', blend: 'add', bursts: [{ time: t, count: 1 }], shape: { type: 'cone', radius: 1, angle: 0.01 }, dir, offset,
          speed: 600, life: 0.2, size: 7, color: light,
          stretch: { speed: 0.005, length: 15 }, behaviors: life(), order: 3 }),
      );
    });
    out.push(
      // sparks thrown off along the swipe
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ time: 0.03, count: [10, 13] }], shape: { type: 'cone', radius: 6, angle: 0.55 }, dir,
        speed: [280, 620], life: [0.2, 0.3], size: [4, 7], color: [light, col],
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(600), c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 4 })),
    );
    return out;
  },
};
