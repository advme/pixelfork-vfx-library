/** A tidal wave spell: a wall of water surges forward, foam rides its crest, droplets and spray are flung ahead and rain down. */
export default {
  name: 'magic.wave',
  category: 'magic',
  whenToUse: 'A wave of water surges forward once: a tidal wave or water spell, a water cannon or fire-hose blast, a wave crashing across a deck, a splash attack; play it at the caster, in 2D set dir (degrees, 0 = right) and in 3D pass direction (for waves that keep crashing on a shore or rocks use world.wave, for a water bomb bursting in place use explosion.water, for something falling into water use move.splash).',
  duration: 1.0, loop: false, tint: '#3aa8ff',
  tags: ['wave', 'water', 'tidal', 'surge', 'splash', 'spell', 'hose', 'ocean'],
  build(c) {
    const col = c.color('#3aa8ff');
    const light = c.lighten(col, 0.6);
    const deep = c.darken(col, 0.25);
    const dir = c.dir === undefined ? 0 : c.dir;
    // aimed a touch upward, so the water rises before gravity brings it down
    const lift = Math.cos(dir) >= 0 ? 0.08 : -0.08;
    // 2D: a point a little ahead of the caster along dir
    const ahead = c.is3d ? undefined : [Math.cos(dir) * 24, Math.sin(dir) * 24];
    // the surge keeps coming for 0.3 s: emitters stay put, so later bursts trail behind like the body of the wave
    const surge = (count) => [{ count }, { time: 0.06, count, cycle: 5, interval: 0.06 }];
    const water = (p) => c.sys(c.spray(Object.assign({ dir }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 130, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the wall of water: a tall column (the cone's wide base) that keeps rolling forward and swells as it goes
      water({ tex: 'disc', blend: 'normal', bursts: surge([4, 5]), dir: dir + lift, shape: { type: 'cone', radius: 44, angle: 0.08 },
        speed: [400, 500], life: [0.5, 0.62], size: [26, 38], color: [col, deep],
        behaviors: [c.speedOverLife(c.decel(0.55)), c.gravity(220), c.sizeOverLife(c.curve([[0, 0.45], [0.3, 1], [0.8, 1.05], [1, 0]]))], order: 2 }),
      // foam on the crest, a little faster than the wall so it curls over the front
      water({ tex: 'puff', blend: 'normal', bursts: surge([3, 4]), dir: dir + lift, shape: { type: 'cone', radius: 18, angle: 0.1 }, offset: [0, 36],
        speed: [430, 530], life: [0.45, 0.6], size: [26, 40], rotation: [0, 6.28], color: '#f4fbff',
        behaviors: [c.speedOverLife(c.decel(0.5)), c.gravity(420), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.9, 0.6], [0, 1]]))], order: 3 }),
      // droplets flung up and ahead off the crest, falling
      water({ tex: 'drop', blend: 'normal', bursts: surge([4, 5]), dir: dir + lift * 3, shape: { type: 'cone', radius: 24, angle: 0.4 }, offset: [0, 30],
        speed: [380, 650], life: [0.5, 0.75], size: [8, 14], color: [col, light],
        behaviors: [c.gravity(1300), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.8], [1, 0]]))], order: 4 }),
      // fine white spray
      water({ tex: 'disc', blend: 'normal', bursts: [{ count: [12, 16] }], shape: { type: 'cone', radius: 30, angle: 0.35 }, offset: [0, 20],
        speed: [420, 720], life: [0.3, 0.5], size: [3, 6], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.3)), c.gravity(800), c.colorOverLife(c.fade(0.5))], order: 5 }),
      // bright rushing highlights in the water; they start a little ahead (2D) and small, so their tails do not reach back through the caster
      water({ tex: 'glow', blend: 'add', bursts: surge(2), shape: { type: 'cone', radius: 40, angle: 0.06 }, offset: ahead,
        speed: [560, 720], life: [0.22, 0.32], size: [6, 9], color: light, stretch: { speed: 0.012, length: 2 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [0.4, 1], [1, 0.8]])), c.colorOverLife(c.fade(0.4))], order: 6 }),
    ];
  },
};
