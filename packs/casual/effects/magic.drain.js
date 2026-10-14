/** Life drain: crimson motes and dark wisps are pulled up out of the target, spiralling upward into a glowing orb that fades. */
export default {
  name: 'magic.drain',
  category: 'magic',
  whenToUse: 'Life or energy is drained out of a character: a vampire bite, a life-steal or soul-drain spell, a leech attack, a necromancer sapping health, a draining curse ticking; play it on the victim\'s body (for a curse or debuff landing use magic.curse, for health coming back use magic.heal).',
  duration: 1.2, loop: false, tint: '#ff2f6d',
  tags: ['drain', 'life steal', 'vampire', 'leech', 'soul', 'necromancer', 'sap', 'spell'],
  build(c) {
    const col = c.color('#ff2f6d');
    const light = c.lighten(col, 0.5);
    const violet = c.mix(col, '#7a2cff', 0.55);
    const shadow = c.darken(violet, 0.7);
    // 3D: motes rise from a ring around the body and spiral in and up around it.
    // 2D: a spiral seen from the side: they close in on the middle as they rise, wobbling (an orbit here would swing them back down)
    const swirl = (p, spin) => c.sys(c.ground(Object.assign({ duration: 0.55, shape: { type: 'circle', radius: 48, thickness: 0.5 } }, p,
      { speed: c.is3d ? [-50, -25] : [-75, -45], behaviors: [c.is3d ? c.orbit(spin) : c.noise(3, 45)].concat(p.behaviors) })));
    return [
      // a dark-red pulse on the victim as the drain takes hold
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))], order: 0 }),
      // a ring snapping inward
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 170, color: violet,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.15]])), c.colorOverLife(c.fade(0.4))], order: 1 }),
      // dark wisps
      swirl({ tex: 'puff', blend: 'normal', rate: 22, life: [0.5, 0.65], size: [22, 36], rotation: [0, 6.28], color: [shadow, c.darken(col, 0.75)],
        behaviors: [c.force(0, 480), c.limitSpeed(240, 1), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 0.6]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.25], [0, 1]]))], order: 2 }, 5),
      // crimson motes
      swirl({ tex: 'glow', blend: 'add', rate: 55, life: [0.5, 0.65], size: [10, 16], color: [light, col],
        behaviors: [c.force(0, 640), c.limitSpeed(300, 1), c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.6))], order: 3 }, 6),
      // fast streaks shooting up through the middle
      c.sys(c.spray({ tex: 'glow', blend: 'add', dir: Math.PI / 2, bursts: [{ time: 0.05, count: 1, cycle: 10, interval: 0.045 }], shape: { type: 'cone', radius: 16, angle: 0.08 },
        speed: [300, 420], life: [0.25, 0.35], size: [5, 8], color: light, stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.colorOverLife(c.fade(0.5))], order: 4 }, 'up')),
      // the stolen life gathers into an orb above the victim, then fades
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: 0.15, count: 1 }], life: 0.95, size: 50, offset: [0, 110], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.6, 1], [0.75, 1.3], [1, 0]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.5], [1, 0.75], [0, 1]]))], order: 5 })),
    ];
  },
};
