/** A UFO tractor beam: a cone of pale green light widening down from the saucer, rings and light streaks rising up through it, a glowing spot where it touches down. Loops until stopped. */
export default {
  name: 'weapon.tractorbeam',
  category: 'weapon',
  whenToUse: 'A UFO or spaceship beams something up: an alien abduction, a ship lifting cows, crates or the player, a pickup beam pulling loot aboard; play it under the saucer and follow it (the beam hangs about 220 px down; in 2D dir in degrees turns it, default -90 = down), and stop it when the beam switches off (for a beam marking dropped loot use world.lootbeam, for a beam attack use magic.beam).',
  duration: 1.2, loop: true, tint: '#86ffbe',
  tags: ['tractor beam', 'ufo', 'alien', 'abduction', 'beam', 'sci-fi', 'space', 'lift'],
  build(c) {
    const col = c.color('#86ffbe');
    const light = c.lighten(col, 0.55);
    const dir = c.dir === undefined ? -Math.PI / 2 : c.dir;
    // how far the beam reaches; in 2D it follows dir, in 3D it always hangs straight down
    const L = 220;
    const at = (d) => (c.is3d ? [0, -d] : [Math.cos(dir) * d, Math.sin(dir) * d]);
    // a steady light that cross-fades into its next copy each cycle, so it never blinks
    const steady = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, 0.05], [a * 0.75, 0.5], [a, 0.95], [0, 1]]));
    // c.vol puts a part in the world-aligned group in 3D, so its offset hangs straight down
    const slice = (d, size, a) => c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.26, size, offset: at(d), color: col,
      behaviors: [steady(a)], order: 0 }));
    // rings lie across the beam: flat in 3D, a side-on ellipse in 2D
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse', rotation: dir + Math.PI / 2 }, p)));
    // the way up the beam, toward the saucer
    const up = c.is3d ? Math.PI / 2 : dir + Math.PI;
    return [
      // the cone of light: glows stacked down the beam, wider and wider
      slice(14, 48, 0.32), slice(62, 74, 0.3), slice(112, 100, 0.28), slice(162, 126, 0.26), slice(206, 150, 0.24),
      // the bright lens under the saucer
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.26, size: 66, offset: at(4), color: light,
        behaviors: [steady(0.95)], order: 4 })),
      // where the beam touches down: a pulsing ring and a glow
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.26, size: 170, offset: at(L), color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.95], [0.5, 1.05], [1, 0.95]])), steady(0.8)], order: 1 }),
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.26, size: 150, offset: at(L), color: col,
        behaviors: [steady(0.35)], order: 1 })),
      // rings rising up the beam and narrowing with it
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }, { time: 0.4, count: 1 }, { time: 0.8, count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 }, dir: up,
        offset: at(L), speed: 150, life: 1.4, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.3]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.15], [0.5, 0.75], [0, 1]]))], order: 3 }),
      // light streaks rising and converging on the saucer: a cone at the bottom, aimed down, fired backwards
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, rate: 20, dir, shape: { type: 'cone', radius: 62, angle: 0.28 }, offset: at(L),
        speed: [-145, -115], life: 1.5, size: [5, 9], color: [light, '#ffffff'], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.15], [0.8, 0.7], [0, 1]]))], order: 2 }, 'down')),
      // sparkles drifting up through it
      c.sys(c.spray({ tex: 'spark', blend: 'add', loop: true, rate: 7, dir, shape: { type: 'cone', radius: 56, angle: 0.26 }, offset: at(L - 10),
        speed: [-110, -70], life: [1.3, 1.8], size: [8, 13], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.7))], order: 5 }, 'down')),
    ];
  },
};
