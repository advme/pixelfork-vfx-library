/** A trophy won: a golden flash and turning rays, a column of light with gold sparkles streaming up, and a burst of stars. */
export default {
  name: 'reward.trophy',
  category: 'reward',
  whenToUse: 'A trophy, cup, medal or prize is won: a tournament or championship victory, first place on the podium, a season title, an achievement trophy unlocked. Play it on the trophy or medal (or the centre of the result screen). Tint silver or bronze for 2nd and 3rd place. For a rank or league promotion use reward.rankup; for a level-up use reward.levelup; for crossing a finish line use reward.finish.',
  duration: 1.45, loop: false, tint: '#ffc83a',
  tags: ['trophy', 'medal', 'cup', 'champion', 'winner', 'podium', 'gold', 'reward'],
  build(c) {
    const col = c.color('#ffc83a');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 280, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // slowly turning rays behind the trophy
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 1.45, size: 360, rotation: [0, 0.8], color: col,
        behaviors: [c.spin(0.45, 0.6), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.15], [0.6, 0.65], [0, 1]]))], order: 1 }),
      // the column of light (raised so the streaks, which trail back down, start below the trophy)
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 3 }, { time: 0.08, count: 3 }, { time: 0.16, count: 2 }], shape: { type: 'cone', radius: 14, angle: 0.03 }, offset: [0, 150],
        speed: [460, 640], life: [0.35, 0.45], size: [22, 30], color: light, stretch: { speed: 0.008, length: 2 },
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 2 }, 'up')),
      // gold sparkles streaming up the column
      c.sys(c.ground({ tex: 'spark', blend: 'add', rate: 60, duration: 0.8, offset: [0, -70], shape: c.is3d ? { type: 'circle', radius: 40 } : { type: 'rect', w: 90, h: 0 },
        speed: 0, life: [0.5, 0.7], size: [9, 17], color: [light, '#ffffff'],
        behaviors: [c.force(0, 420), c.limitSpeed(260, 1), c.sizeOverLife(c.pop(0.2, 0.55))], order: 3 })),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.15, count: 1 }], life: 0.5, size: 280, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // the star burst
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.15, count: [14, 18] }], shape: { type: 'circle', radius: 20 },
        speed: [180, 340], life: [0.75, 1.05], size: [11, 19], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.gravity(450), c.speedOverLife(c.decel(0.3)), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.5], [0.12, 1], [0.8, 1], [1, 0]]))], order: 5 })),
    ];
  },
};
