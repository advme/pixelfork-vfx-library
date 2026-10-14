/** A starfall: one after another, shooting stars streak down onto an area and each lands with a bright pop, over a glowing ring on the ground. */
export default {
  name: 'magic.starfall',
  category: 'magic',
  whenToUse: 'Stars rain down from the sky onto an area: a starfall or star-shower spell, a celestial area attack, a wish or blessing falling on a field, a magical bombardment of a zone; play it at the centre of the area on the ground (for one big rock from the sky use magic.meteor, for a calm night sky with shooting stars use env.meteors).',
  duration: 1.5, loop: false, tint: '#ffd23a',
  tags: ['starfall', 'stars', 'shooting star', 'celestial', 'area', 'rain', 'spell', 'sky'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.35);
    // each star falls H px in T s, then its flare lasts FLARE s
    const H = 300, T = 0.42, FLARE = 0.3;
    // 2D: the stars come in from the upper right, like meteors; 3D: straight down out of the sky
    const slant = c.is3d ? 0 : 0.35;
    const fall = Math.atan2(-1, -slant);
    const speed = (H * Math.hypot(1, slant)) / T;
    // a new particle already moves one frame in the frame it is born, so it is stopped one frame early to land on the spot
    const stop = T - 1 / 60;
    const life = T + FLARE, land = stop / life;
    const tailLife = T + 0.12, tailLand = stop / tailLife;
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // one shooting star: where it lands in the area (u across, v into the distance, both -1..1) and when it starts falling
    const star = (u, v, t) => {
      const offset = c.is3d ? [u * 105 + slant * H, H, v * 105] : [u * 105 + slant * H, H - v * 20];
      const fallen = (p) => c.sys(c.spray(Object.assign({ shape: { type: 'cone', radius: 0.5, angle: 0.001 }, dir: fall, offset, speed, bursts: [{ time: t, count: 1 }] }, p), 'down'));
      return [
        // the comet tail: it stops on the ground and shrinks into the landing point
        fallen({ tex: 'glow', blend: 'add', life: tailLife, size: 12, color: col, stretch: { speed: 0.011, length: 1.5 },
          behaviors: [c.speedOverLife(c.curve([[0, 1], [tailLand, 1], [tailLand + 0.01, 0], [1, 0]])), c.sizeOverLife(c.curve([[0, 1], [tailLand, 1], [1, 0]]))], order: 2 }),
        // the star: it stops on the ground and flares into a flash
        fallen({ tex: 'star', blend: 'add', life, size: 24, rotation: [0, 6.28], color: light,
          behaviors: [c.speedOverLife(c.curve([[0, 1], [land, 1], [land + 0.01, 0], [1, 0]])), c.spin(-6, 6),
            c.sizeOverLife(c.curve([[0, 1], [land, 1], [land + 0.1, 2.4], [1, 0]])),
            c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [1, land + 0.08], [0, 1]]))], order: 3 }),
      ];
    };
    return [
      // the target area, glowing on the ground while the stars come down
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 1.45, size: 260, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.7], [0.2, 1], [1, 1.05]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.2], [0.6, 0.75], [0, 1]]))], order: 0 }),
      ...star(-0.6, 0.25, 0),
      ...star(0.45, -0.4, 0.15),
      ...star(-0.1, 0.55, 0.3),
      ...star(0.75, 0.2, 0.45),
      ...star(-0.8, -0.3, 0.6),
      ...star(0.15, -0.1, 0.75),
      // glitter twinkling over the area as the stars land
      c.sys(c.ground({ tex: 'spark', blend: 'add', bursts: [{ time: 0.45, count: 2, cycle: 8, interval: 0.09 }],
        shape: c.is3d ? { type: 'circle', radius: 105 } : { type: 'rect', w: 220, h: 36, thickness: 1 },
        speed: 0, life: [0.3, 0.4], size: [10, 18], rotation: [0, 0.8], color: [light, '#ffffff'],
        behaviors: [c.force(0, 60), c.limitSpeed(40, 1), c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 })),
    ];
  },
};
