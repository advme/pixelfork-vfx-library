/** A stat drop: dark arrows sink down around the character, with a gloomy haze. */
export default {
  name: 'magic.debuff',
  category: 'magic',
  whenToUse: 'A character gets weaker: attack down, defence down, slowed, weakened, cursed for a stat, a bad status in an RPG. Play it on the character; tint by stat. For an ongoing curse use magic.curse or state.poison.',
  duration: 1.0, loop: false, tint: '#a14dff',
  tags: ['debuff', 'stat down', 'weaken', 'slow', 'rpg', 'curse', 'nerf', 'arrow'],
  build(c) {
    const col = c.color('#a14dff');
    const dark = c.darken(col, 0.4);
    return [
      c.sys(c.ground({ tex: 'arrow', blend: 'normal', bursts: [{ count: 3 }, { time: 0.15, count: 3 }, { time: 0.3, count: 2 }], shape: c.is3d ? { type: 'circle', radius: 40 } : { type: 'rect', w: 90, h: 0 }, offset: [0, 120],
        speed: 0, life: [0.55, 0.7], size: [26, 38], rotation: Math.PI, color: [col, dark],
        behaviors: [c.gravity(700), c.limitSpeed(220, 1), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.7, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.55))], order: 2 })),
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 30 },
        speed: [10, 40], life: [0.7, 0.95], size: [30, 46], rotation: [0, 6.28], color: dark,
        behaviors: [c.gravity(60), c.spin(-0.8, 0.8), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.2]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.5, 0.2], [0, 1]]))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 40 }, offset: [0, 60],
        speed: 0, life: [0.5, 0.8], size: [4, 7], color: col,
        behaviors: [c.gravity(300), c.colorOverLife(c.fade(0.5))], order: 3 }),
    ];
  },
};
