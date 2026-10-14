/** A minigun or turret firing non-stop: a muzzle flash strobing 20 times a second, a stream of tracers, spent shells raining out and gun smoke. Loops until stopped. */
export default {
  name: 'weapon.minigun',
  category: 'weapon',
  whenToUse: 'A minigun, gatling gun, machine-gun turret, mounted cannon or bullet-hell ship fires a continuous stream: play it at the barrel tip, in 2D with dir (degrees, 0 = right) and in 3D with direction along the barrel (keep it aimed with handle.aim(v) while the turret turns), and stop it when firing stops (for single shots use weapon.muzzle on each one, for a fire stream weapon.flamethrower).',
  duration: 0.2, loop: true, tint: '#ffcf5a',
  tags: ['minigun', 'gatling', 'turret', 'machine gun', 'tracer', 'rapid fire', 'shooter', 'weapon'],
  build(c) {
    const col = c.color('#ffcf5a');
    const dir = c.dir === undefined ? 0 : c.dir;
    // 2D: offsets along the barrel (forward is positive); in 3D everything starts at the tip
    const at = (d) => (c.is3d ? undefined : [Math.cos(dir) * d, Math.sin(dir) * d]);
    // 20 shots a second: every flash system fires on the same beat
    const beat = [0, 0.05, 0.1, 0.15].map((time) => ({ time, count: 1 }));
    // shells eject upward and back, away from the barrel (3D: straight up)
    const shellDir = Math.PI / 2 + (Math.cos(dir) >= 0 ? 0.6 : -0.6);
    return [
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: 0.2, bursts: beat, life: 0.04, size: [40, 58], rotation: [0, 0.8], color: '#fff8e0', offset: at(6),
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 5 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.2, bursts: beat, life: 0.06, size: [56, 72], color: col, offset: at(6),
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      // a flame tongue on every shot
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, duration: 0.2, bursts: beat.map((b) => ({ time: b.time, count: [2, 3] })), dir,
        shape: { type: 'cone', radius: 2, angle: 0.15 }, offset: at(8),
        speed: [420, 700], life: [0.04, 0.06], size: [14, 20], color: [col, '#ff8a2a'], stretch: { speed: 0.004, length: 0.6 },
        behaviors: [c.sizeOverLife(c.shrink())], order: 3 })),
      // tracers: one per shot, flying on where they were fired when the gun swings
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, world: true, duration: 0.2, bursts: beat, dir, shape: { type: 'cone', radius: 2, angle: 0.035 }, offset: at(40),
        speed: [1400, 1700], life: [0.2, 0.26], size: [4, 5], color: ['#fff2c4', c.lighten(col, 0.5)], stretch: { speed: 0.008, length: 2 },
        behaviors: [c.colorOverLife(c.fade(0.7))], order: 4 })),
      // spent shells pouring out of the side
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', loop: true, world: true, rate: 16, dir: shellDir, shape: { type: 'cone', radius: 2, angle: 0.35 }, offset: at(-28),
        speed: [180, 300], life: [0.55, 0.75], size: [4, 6], rotation: [0, 6.28], color: ['#d8b04a', '#f0d27a'],
        behaviors: [c.gravity(1500), c.spin(-18, 18), c.colorOverLife(c.fade(0.85))], order: 3 }, 'up'), 'plank')),
      // sparks
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 24, dir, shape: { type: 'cone', radius: 2, angle: 0.5 }, offset: at(10),
        speed: [300, 600], life: [0.1, 0.18], size: [3, 4], color: '#ffe9a8', stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.5))], order: 5 })),
      // gun smoke drifting off
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 12, dir, shape: { type: 'cone', radius: 3, angle: 0.35 }, offset: at(10),
        speed: [60, 140], life: [0.5, 0.8], size: [14, 22], rotation: [0, 6.28], color: '#c4c4c4',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 50), c.noise(1.5, 8), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.5], [1, 2.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0, 1]]))], order: 1 })),
    ];
  },
};
