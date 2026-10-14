/** A victory banner: a warm golden glow on the cloth, gold sparkles and glitter streaming off it downwind, flakes of gold leaf fluttering away and bright twinkles on the cloth. Loops until stopped. */
export default {
  name: 'world.banner',
  category: 'world',
  whenToUse: 'A proud victory banner or war standard shedding gold in the wind: a regiment\'s standard carried into battle, a kingdom or guild banner on a castle wall, a champion\'s banner on a victory or rank screen. Play it on the cloth and leave it running (follow it when it is carried); the gold streams off downwind, to the right by default (dir 180 sends it left). For a flag a team has captured or holds use world.flag; for the troops inspired around it use state.rally.',
  duration: 1.2, loop: true, tint: '#ffcc33',
  tags: ['banner', 'standard', 'flag', 'victory', 'kingdom', 'medieval', 'gold', 'sparkle'],
  build(c) {
    const col = c.color('#ffcc33');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? 0 : c.dir;
    const side = Math.cos(dir) >= 0 ? 1 : -1;
    // the cloth is a hanging banner about 64 x 90: particles are born all over it
    const cloth = { type: 'rect', w: 64, h: 90, thickness: 1 };
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.95], [0.5, 1.05], [1, 0.95]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.26, 0], [0.4, 0.5], [0.26, 1]]))], order: 0 }),
      // fine glitter streaming downwind, staying where it was shed
      c.sys({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 16, shape: cloth,
        speed: 0, life: [1.2, 1.7], size: [3, 6], color: [light, '#ffffff'],
        behaviors: [c.force(side * 110, 14), c.limitSpeed(85, 1), c.noise(1.5, 12), c.colorOverLife(c.fadeInOut(0.15, 0.6))], order: 2 }),
      // golden sparkles riding the wind
      c.sys({ tex: 'spark', blend: 'add', loop: true, world: true, rate: 9, shape: cloth,
        speed: 0, life: [1.0, 1.4], size: [8, 14], color: [light, '#ffffff'],
        behaviors: [c.force(side * 120, 24), c.limitSpeed(95, 1), c.noise(1.2, 14), c.sizeOverLife(c.pop(0.2, 0.6))], order: 3 }),
      // flakes of gold leaf fluttering off and sinking
      c.sys({ tex: 'square', blend: 'normal', loop: true, world: true, rate: 3, shape: cloth,
        speed: 0, life: [1.3, 1.8], size: [5, 8], rotation: [0, 6.28], color: [col, c.darken(col, 0.2)],
        behaviors: [c.force(side * 90, -30), c.limitSpeed(70, 1), c.noise(1.5, 18), c.spin(-5, 5), c.colorOverLife(c.fadeInOut(0.1, 0.65))], order: 1 }),
      // bright twinkles on the cloth
      c.sys({ tex: 'star', blend: 'add', loop: true, rate: 3, shape: cloth,
        speed: 0, life: [0.4, 0.6], size: [16, 24], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.spin(-2, 2), c.sizeOverLife(c.pop(0.35, 0.5))], order: 4 }),
    ];
  },
};
