/** A stat boost: bold arrows rise up around the character from a ring of light at their feet. */
export default {
  name: 'magic.buff',
  category: 'magic',
  whenToUse: 'A character gets stronger: attack up, defence up, speed up, a blessing, a potion that raises a stat, a party buff in an RPG. Play it on the character; tint by stat (red attack, blue defence, green speed, gold all). For healing use magic.heal.',
  duration: 1.0, loop: false, anchor: 'feet', tint: '#ffd23a',
  tags: ['buff', 'stat up', 'power up', 'blessing', 'rpg', 'strength', 'boost', 'arrow'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.6, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.05]])), c.colorOverLife(c.fade(0.4))], order: 0 }),
      c.sys(c.ground({ tex: 'arrow', blend: 'add', bursts: [{ count: 3 }, { time: 0.15, count: 3 }, { time: 0.3, count: 2 }], shape: c.is3d ? { type: 'circle', radius: 40 } : { type: 'rect', w: 90, h: 0 },
        speed: 0, life: [0.55, 0.7], size: [26, 38], color: [col, light],
        behaviors: [c.force(0, 600), c.limitSpeed(260, 1), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.7, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.55))], order: 2 })),
      c.sys(c.ground({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 14] }], shape: c.is3d ? { type: 'circle', radius: 40 } : { type: 'rect', w: 100, h: 0 },
        speed: 0, life: [0.5, 0.8], size: [4, 7], color: light,
        behaviors: [c.force(0, 500), c.limitSpeed(220, 1), c.colorOverLife(c.fade(0.5))], order: 3 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 150, offset: [0, 50], color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.25], [0, 1]]))], order: 1 }),
    ];
  },
};
