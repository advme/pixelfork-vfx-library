/** A rapid combo: four quick hits land around the target, the last one hardest. */
export default {
  name: 'hit.flurry',
  category: 'hit',
  whenToUse: 'A rapid multi-hit attack: a punch flurry, a fast sword combo, a machine-gun burst on one target, a special move that hits several times. Play it once on the target; it lands four hits in under half a second.',
  duration: 0.6, loop: false, tint: '#ffd23a',
  tags: ['combo', 'flurry', 'multi hit', 'rapid', 'fighting', 'punch', 'attack', 'special'],
  build(c) {
    const col = c.color('#ffd23a');
    const hits = [{ t: 0, x: -20, y: 12, k: 1 }, { t: 0.09, x: 18, y: -6, k: 1 }, { t: 0.18, x: -6, y: -18, k: 1 }, { t: 0.3, x: 2, y: 2, k: 1.6 }];
    const out = [];
    hits.forEach((h) => {
      out.push(
        c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: h.t, count: 1 }], life: 0.12, size: 80 * h.k, offset: [h.x, h.y], color: '#fff6dc',
          behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
        c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: h.t, count: 1 }], life: 0.14, size: 76 * h.k, rotation: [0, 1.6], offset: [h.x, h.y], color: col,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
        c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: h.t, count: Math.round(5 * h.k) }], shape: { type: 'circle', radius: 4, thickness: 0 }, offset: [h.x, h.y],
          speed: [280 * h.k, 560 * h.k], life: [0.12, 0.2], size: [4, 7], color: col, stretch: { speed: 0.02, length: 1.5 },
          behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 4 }),
      );
    });
    out.push(c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ time: 0.3, count: 1 }], life: 0.3, size: 150, color: col,
      behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 })));
    return out;
  },
};
