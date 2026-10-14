/** A tower upgrade: a ring sweeps out at the base, a stack of chevrons climbs up the middle inside a column of light and sparkles. */
export default {
  name: 'world.towerup',
  category: 'world',
  whenToUse: 'A tower, turret, building or unit is upgraded to its next level in tower defense, city builder, idle or merge games. Play it at the base of the thing as the upgrade lands; size it to the building. For a new building being placed use world.build; for the player levelling up use reward.levelup; for a character\'s stat boost use magic.buff.',
  duration: 1.3, loop: false, anchor: 'feet', tint: '#ffcf3a',
  tags: ['upgrade', 'tower', 'level up', 'tower defense', 'building', 'turret', 'rank', 'improve'],
  build(c) {
    const col = c.color('#ffcf3a');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 170, offset: [0, 30], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.55, size: 180, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1.2]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      // the column of light: born high, because a streak trails back from its particle and reaches down to the base
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 3 }, { time: 0.06, count: 2 }], dir: Math.PI / 2, shape: { type: 'cone', radius: 8, angle: 0.03 }, offset: [0, 210],
        speed: [480, 620], life: [0.3, 0.4], size: [26, 34], color: col, stretch: { speed: 0.008, length: 2 },
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 2 }, 'up')),
      // chevrons climbing one after another
      c.sys(c.spray({ tex: 'arrow', blend: 'add', bursts: [{ count: 1 }, { time: 0.12, count: 1 }, { time: 0.24, count: 1 }, { time: 0.36, count: 1 }],
        dir: Math.PI / 2, shape: { type: 'cone', radius: 0.1, angle: 0.001 }, offset: [0, 30],
        speed: 250, life: 0.7, size: 48, color: c.lighten(col, 0.35),
        behaviors: [c.speedOverLife(c.decel(0.35)), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1.1], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.fade(0.6))], order: 4 }, 'up')),
      // sparkles streaming up around the column
      c.sys(c.ground({ tex: 'star', blend: 'add', rate: 45, duration: 0.5, shape: c.is3d ? { type: 'circle', radius: 34 } : { type: 'rect', w: 80, h: 0 },
        speed: 0, life: [0.5, 0.8], size: [8, 14], rotation: [0, 6.28], color: [light, '#ffffff'],
        behaviors: [c.force(0, 340), c.limitSpeed(270, 1), c.spin(-4, 4), c.sizeOverLife(c.pop(0.2, 0.55))], order: 3 })),
    ];
  },
};
