/** A wind blast: pale streaks fan out and curl as they rush forward, with leaves, dust and specks blown along. */
export default {
  name: 'magic.gust',
  category: 'magic',
  whenToUse: 'A gust or blast of wind is pushed forward: a wind spell, a push-back or knockback attack, a giant fan or leaf blower, a dragon\'s wing beat, a wind cannon; play it at the hands or mouth, in 2D set dir (degrees, 0 = right) and in 3D pass direction (for a standing whirlwind use magic.tornado, for wind across the whole level use env.wind).',
  duration: 0.75, loop: false, tint: '#d8f1ff',
  tags: ['wind', 'gust', 'blast', 'air', 'push', 'knockback', 'spell', 'fan'],
  build(c) {
    const col = c.color('#d8f1ff');
    const dust = c.mix(col, '#d9cbb0', 0.65);
    const dir = c.dir === undefined ? 0 : c.dir;
    // the side of the gust: streaks on each side bend away from the middle, so the blast opens like a fan
    const px = -Math.sin(dir), py = Math.cos(dir);
    // 2D: start a little ahead of the hands so the tails do not poke back into the caster
    const ahead = c.is3d ? undefined : [Math.cos(dir) * 18, Math.sin(dir) * 18];
    const streaks = (side, order) => c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [3, 4] }, { time: 0.06, count: [2, 3] }], dir: dir + side * 0.16,
      shape: { type: 'cone', radius: 14, angle: 0.14 }, offset: ahead,
      speed: [560, 800], life: [0.3, 0.45], size: [7, 11], color: col, stretch: { speed: 0.01, length: 2 },
      behaviors: [c.force(px * side * 1100, py * side * 1100), c.speedOverLife(c.decel(0.35)), c.sizeOverLife(c.curve([[0, 0.25], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.4))], order }));
    return [
      // the whoomp at the hands
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 100, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 90, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // dust kicked along
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: [6, 8] }], dir, shape: { type: 'cone', radius: 18, angle: 0.45 },
        speed: [220, 400], life: [0.45, 0.7], size: [28, 44], rotation: [0, 6.28], color: dust,
        behaviors: [c.speedOverLife(c.decel(0.12)), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.35, 0.5], [0, 1]]))], order: 1 })),
      // soft, wide air masses behind the sharp streaks; they start small so their tails do not reach back through the caster
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 4 }], dir, shape: { type: 'cone', radius: 16, angle: 0.22 }, offset: ahead,
        speed: [420, 600], life: [0.25, 0.35], size: [20, 28], color: col, stretch: { speed: 0.004, length: 1.4 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 0.3], [0.4, 1], [1, 1.1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0, 1]]))], order: 2 })),
      streaks(1, 3),
      streaks(-1, 3),
      // leaves tumbling in the blast
      c.sys(c.spray({ tex: 'leaf', blend: 'normal', bursts: [{ count: [5, 7] }], dir, shape: { type: 'cone', radius: 16, angle: 0.4 },
        speed: [340, 580], life: [0.55, 0.75], size: [10, 15], rotation: [0, 6.28], color: ['#7cc94a', '#d6b84a'],
        behaviors: [c.speedOverLife(c.decel(0.25)), c.gravity(180), c.noise(2, 30), c.spin(-9, 9), c.colorOverLife(c.fade(0.7))], order: 4 })),
      // specks of grit
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 12] }], dir, shape: { type: 'cone', radius: 10, angle: 0.35 },
        speed: [400, 720], life: [0.3, 0.45], size: [2, 4], color: c.darken(dust, 0.25),
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.5))], order: 5 })),
    ];
  },
};
