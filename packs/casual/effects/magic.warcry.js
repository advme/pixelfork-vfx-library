/** A war cry: a red flash at the chest, three shout rings bursting out one after another, shout lines flying off, a shockwave across the ground and bold chevrons rising around the warrior. */
export default {
  name: 'magic.warcry',
  category: 'magic',
  whenToUse: 'A warrior lets out a war cry or battle shout that pumps up the team: a rallying roar, a berserker or orc shout, a viking horn before a charge, a commander yelling "charge!" in an RPG, strategy or brawler game. Play it on the shouting character (at the feet); red-orange by default, tint it for other teams. For a quiet stat boost use magic.buff; for a lasting angry state use state.rage; for troops staying inspired afterwards use state.rally.',
  duration: 1.0, loop: false, anchor: 'feet', tint: '#ff5a2a',
  tags: ['war cry', 'shout', 'roar', 'battle cry', 'rally', 'buff', 'berserker', 'medieval'],
  build(c) {
    const col = c.color('#ff5a2a');
    const light = c.lighten(col, 0.55);
    const hot = c.mix(col, '#ffd23a', 0.6);
    // the shout comes from the chest / mouth, about 60 px above the feet
    const chest = [0, 60];
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const base = c.is3d ? { type: 'circle', radius: 44 } : { type: 'rect', w: 100, h: 0 };
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 210, offset: chest, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.5, 0.35], [0, 1]]))], order: 0 }),
      // three shout rings, one after another
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.11, count: 1 }, { time: 0.22, count: 1 }], life: 0.36, size: 240, offset: chest, color: [light, hot],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.25))], order: 3 }),
      // shout lines flying off in every direction; born 60 px out so their ~60 px tails do not cross the chest
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: 12 }], shape: { type: 'circle', radius: 60, thickness: 0, even: true }, offset: chest,
        speed: [520, 680], life: [0.16, 0.22], size: [5, 6], color: light, stretch: { speed: 0.012, length: 2 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 4 })),
      // the shockwave across the ground
      ring({ blend: 'add', bursts: [{ time: 0.04, count: 1 }], life: 0.5, size: 300, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.25))], order: 1 }),
      // bold chevrons rising around the warrior
      c.sys(c.ground({ tex: 'arrow', blend: 'add', bursts: [{ time: 0.05, count: 4 }, { time: 0.17, count: 4 }, { time: 0.29, count: 3 }], shape: base,
        speed: 0, life: [0.6, 0.7], size: [30, 42], color: [col, light],
        behaviors: [c.force(0, 700), c.limitSpeed(300, 1), c.sizeOverLife(c.curve([[0, 0], [0.15, 1.15], [0.3, 1], [0.75, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.55))], order: 2 })),
      // embers rising with them
      c.sys(c.ground({ tex: 'glow', blend: 'add', bursts: [{ time: 0.05, count: [12, 16] }], shape: base,
        speed: 0, life: [0.5, 0.75], size: [4, 7], color: [hot, '#ffffff'], stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.force(0, 640), c.limitSpeed(340, 1), c.noise(2, 12), c.colorOverLife(c.fade(0.5))], order: 5 })),
    ];
  },
};
