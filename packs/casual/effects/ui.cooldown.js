/** Ability ready again: a ring snaps onto the button's rim and pings outward, a bright glint and a ring of sparkles. */
export default {
  name: 'ui.cooldown',
  category: 'ui',
  whenToUse: 'An ability, skill or item button comes off cooldown and can be used again: a spell icon in a MOBA, a skill button in an action RPG, a dash or grenade button in a shooter. Play with { el } on the button. For a button that keeps glowing until tapped use ui.glow.',
  duration: 0.4, loop: false, tint: '#6fe0ff',
  tags: ['ui', 'cooldown', 'ready', 'ability', 'skill', 'button', 'moba', 'recharge'],
  build(c) {
    const col = c.color('#6fe0ff');
    const light = c.lighten(col, 0.6);
    // the button's size: an element's own, else a typical 72 px ability button
    const plain = c.target.w === 120 && c.target.h === 48;
    const s = plain ? 72 : Math.max(40, Math.min(Math.max(c.target.w, c.target.h), 180));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: s * 2, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.15))], order: 0 }),
      // a ring that snaps in onto the rim
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: s * 1.35, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 1.5], [0.3, 0.95], [0.45, 1], [1, 1]])), c.colorOverLife(c.grad([['#ffffff', 0], [col, 0.4], [col, 1]], [[1, 0], [1, 0.5], [0, 1]]))], order: 1 }),
      // then a ping outward
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.08, count: 1 }], life: 0.32, size: s * 2.2, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.55], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.06, count: 12 }], shape: { type: 'circle', radius: s * 0.55, thickness: 0, even: true },
        speed: [70, 140], life: [0.26, 0.34], size: [4, 7], color: light,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.4))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.06, count: [3, 4] }], shape: { type: 'circle', radius: s * 0.6, thickness: 0.3 },
        speed: [10, 40], life: [0.25, 0.35], size: [9, 14], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.25, 0.5))], order: 3 }),
      // the glint on the button's upper right
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.04, count: 1 }], life: 0.38, size: s * 0.85, rotation: 0.3, offset: [s * 0.3, s * 0.3], color: '#ffffff',
        behaviors: [c.spin(2.5), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [1, 0]]))], order: 4 }),
    ];
  },
};
