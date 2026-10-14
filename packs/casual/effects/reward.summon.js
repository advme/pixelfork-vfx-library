/** A gacha summon: a beam of light crashes down onto a glowing circle, rings burst out and sparkles shower down. */
export default {
  name: 'reward.summon',
  category: 'reward',
  whenToUse: 'A gacha pull or banner summon: a hero, card, pet or unit is summoned, a wish is made, a recruit arrives. Play it where the new character will stand and tint it by rarity (blue rare, purple epic, gold legendary); add reward.legendary for a top pull. For a spell that summons a creature in battle use magic.summon.',
  duration: 1.5, loop: false, anchor: 'feet', tint: '#a46bff',
  tags: ['gacha', 'summon', 'pull', 'banner', 'wish', 'recruit', 'beam', 'rarity'],
  build(c) {
    const col = c.color('#a46bff');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // the beam falls from H straight down and lands on the circle at `hit`
    const H = 420, hit = 0.28, fall = H / hit;
    const falling = (p) => c.sys(Object.assign({ blend: 'add', shape: { type: 'cone', radius: 1, angle: 0.001 }, dir: -Math.PI / 2, offset: [0, H], speed: fall, life: hit }, p));
    // a standing column: a stretched sprite trails back from a particle creeping down, so it reaches up from the circle
    const column = (p) => c.sys(Object.assign({ tex: 'glow', blend: 'add', bursts: [{ time: hit, count: 1 }], shape: { type: 'cone', radius: 1, angle: 0.001 }, dir: -Math.PI / 2, speed: 2 }, p));
    const sparkArea = c.is3d ? { type: 'circle', radius: 70 } : { type: 'rect', w: 150, h: 0 };
    return [
      // the summoning circle glows before the beam lands
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 1.3, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.15], [1, 0.6], [0, 1]]))], order: 1 }),
      // the beam crashing down: a wide tinted streak, a white core and sparkles strung out behind it
      falling({ tex: 'glow', bursts: [{ count: 1 }], size: 46, color: col, stretch: { speed: 0.004, length: 3 }, order: 4 }),
      falling({ tex: 'glow', bursts: [{ count: 1 }], size: 18, color: '#ffffff', stretch: { speed: 0.012, length: 3 }, order: 5 }),
      // (the slower sparkles are still in the air when the beam lands, so they shrink away instead of blinking out)
      falling({ tex: 'spark', bursts: [{ count: 10 }], shape: { type: 'cone', radius: 22, angle: 0.001 }, speed: [fall * 0.55, fall * 0.95], size: [10, 18], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [0.6, 1], [1, 0]]))], order: 5 }),
      // impact: a white flash and a big tinted glow
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: hit, count: 1 }], life: 0.2, size: 220, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 6 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: hit, count: 1 }], life: 1.0, size: 260, offset: [0, 40], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.8, 0.1], [0.5, 0.5], [0, 1]]))], order: 0 }),
      // the pillar of light left standing on the circle
      column({ life: 1.0, size: 70, color: col, stretch: { speed: 0, length: 5 },
        behaviors: [c.sizeOverLife(c.curve([[0, 1.3], [0.15, 1], [0.6, 0.8], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 2 }),
      column({ life: 0.9, size: 26, color: '#ffffff', stretch: { speed: 0, length: 12 },
        behaviors: [c.sizeOverLife(c.curve([[0, 1.3], [0.15, 1], [0.6, 0.8], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 3 }),
      // rings bursting out along the ground
      ring({ blend: 'add', bursts: [{ time: hit, count: 1 }, { time: hit + 0.12, count: 1 }], life: 0.5, size: 340, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // sparkles thrown up that shower back down
      c.sys(c.spray({ tex: 'star', blend: 'add', bursts: [{ time: hit, count: [14, 18] }], shape: { type: 'cone', radius: 20, angle: 0.7 }, dir: Math.PI / 2,
        speed: [320, 620], life: [0.8, 1.1], size: [12, 20], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.gravity(1100), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1], [0.8, 1], [1, 0]]))], order: 5 }, 'up')),
      // glints rising off the circle the whole time
      c.sys(c.ground({ tex: 'spark', blend: 'add', rate: 36, duration: 0.8, shape: sparkArea,
        speed: 0, life: [0.5, 0.8], size: [8, 15], color: light,
        behaviors: [c.force(0, 320), c.limitSpeed(200, 1), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
