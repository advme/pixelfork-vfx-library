/** Angry: chunky white steam blasts out of both sides of the head in angry huffs, a red glow throbs and a bold cartoon anger mark pulses at the temple. Loops until stopped. */
export default {
  name: 'state.angry',
  category: 'state',
  whenToUse: 'A character is cross, annoyed or fuming in a cartoon way: a grumpy pet, an impatient customer, a villager who was bumped, a boss losing its temper, a player who failed again. Follow the head; stop it when they calm down. For a combat rage or berserk damage buff use state.rage.',
  duration: 1, loop: true, anchor: 'head', tint: '#ff3b30',
  tags: ['angry', 'mad', 'fuming', 'steam', 'grumpy', 'annoyed', 'emotion', 'mood'],
  build(c) {
    const col = c.color('#ff3b30');
    const steam = c.lighten(col, 0.9);
    const hot = c.lighten(col, 0.45);
    const vein = c.darken(col, 0.45);
    // one huff = a quick jet of five chunky puffs; two huffs a second, both ears together
    const huff = (t) => ({ time: t, count: 1, cycle: 5, interval: 0.03 });
    const ear = (side) => c.sys({ tex: 'puff', blend: 'normal', loop: true, bursts: [huff(0), huff(0.5)],
      shape: { type: 'cone', radius: 3, angle: 0.22 }, dir: side > 0 ? Math.PI * 0.18 : Math.PI * 0.82, offset: [side * 22, -22],
      speed: [200, 280], life: [0.42, 0.55], size: [20, 28], rotation: [0, 6.28], color: ['#ffffff', steam],
      behaviors: [c.speedOverLife(c.decel(0.06)), c.force(0, 70), c.spin(-3, 3), c.sizeOverLife(c.curve([[0, 0.45], [0.25, 1.2], [1, 1.8]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.95, 0.45], [0, 1]]))], order: 3 });
    // the anger mark pulse: swells hard on every huff, then settles
    const throb = () => c.sizeOverLife(c.curve([[0, 0.7], [0.15, 1.3], [0.4, 0.95], [1, 0.85]]));
    // the mark sits at the temple, both of its layers at the same spot so they pulse together
    const mark = [25, -2];
    return [
      // the red glow over the head, throbbing with each huff
      c.sys({ tex: 'glow', blend: 'add', loop: true, bursts: [{ time: 0, count: 1 }, { time: 0.5, count: 1 }], offset: [0, -28],
        life: 0.5, size: 125, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.8], [0.25, 1.1], [1, 0.85]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.28, 0], [0.65, 0.22], [0.25, 1]]))], order: 0 }),
      // a hot red halo behind the anger mark so it pops off any background
      c.sys({ tex: 'glow', blend: 'add', loop: true, bursts: [{ time: 0, count: 1 }, { time: 0.5, count: 1 }], offset: mark,
        life: 0.5, size: 54, color: col,
        behaviors: [throb(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0.9, 0.15], [0.45, 1]]))], order: 1 }),
      // a few hot specks shaken off with the steam
      c.sys({ tex: 'disc', blend: 'add', loop: true, rate: 10, shape: { type: 'circle', radius: 22, arc: Math.PI }, offset: [0, -24],
        speed: [60, 120], life: [0.3, 0.45], size: [3, 5], color: hot,
        behaviors: [c.force(0, 120), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.5))], order: 2 }),
      ear(1),
      ear(-1),
      // the anger mark itself: a bold red cross, swelling on every throb
      c.sys({ tex: 'plus', blend: 'normal', loop: true, bursts: [{ time: 0, count: 1 }, { time: 0.5, count: 1 }], offset: mark,
        life: 0.52, size: 32, rotation: 0.4, color: col,
        behaviors: [throb()], order: 4 }),
      // a deep red core that splits the cross into four bulging arms, like a cartoon anger vein
      c.sys({ tex: 'plus', blend: 'normal', loop: true, bursts: [{ time: 0, count: 1 }, { time: 0.5, count: 1 }], offset: mark,
        life: 0.52, size: 12, rotation: 0.4, color: vein,
        behaviors: [throb()], order: 5 }),
    ];
  },
};
