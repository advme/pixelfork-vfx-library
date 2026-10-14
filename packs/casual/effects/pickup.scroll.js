/** Reading a spell scroll: a band of light unrolls to both sides, rune marks spill out along it, a soft golden glow and glints rising off the words. */
export default {
  name: 'pickup.scroll',
  category: 'pickup',
  whenToUse: 'A spell scroll, a magic tome page, an ancient map or a recipe is read or used up: a scroll of fireball unrolled, a new spell or skill learned from a book, a rune page or quest letter opened in an RPG. Play it on the scroll or on the character reading it; tint it for the spell\'s element. For the spell itself use magic.cast or the matching magic effect; for a magic circle on the floor use magic.rune; for a key or pass picked up use pickup.key.',
  duration: 0.65, loop: false, tint: '#ffc94d',
  tags: ['scroll', 'spell', 'rune', 'tome', 'read', 'learn', 'rpg', 'magic'],
  build(c) {
    const col = c.color('#ffc94d');
    const light = c.lighten(col, 0.6);
    // everything along the band eases out the same way: fast from the middle, settling where it stops
    const ease = () => c.speedOverLife(c.curve([[0, 1], [0.6, 0.1], [1, 0]]));
    // the band's two rolled ends: bright glows racing out about 100 px to each side
    const end = (dir) => c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 }, dir,
      speed: 560, life: 0.5, size: 26, color: light,
      behaviors: [ease(), c.sizeOverLife(c.curve([[0, 0.6], [0.2, 1], [0.7, 0.9], [1, 0]])), c.colorOverLife(c.fade(0.6))], order: 3 });
    // the band of light: soft glows thrown out behind each end and stopping at every distance, so it unrolls with them
    const band = (dir) => c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 8 }], shape: { type: 'cone', radius: 0.1, angle: 0.02 }, dir,
      speed: [0, 560], life: [0.5, 0.6], size: [26, 34], color: col,
      behaviors: [ease(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.15], [0.35, 0.6], [0, 1]]))], order: 2 });
    // rune marks spilling out along the band, each settling at its own spot
    const runes = (dir) => c.sys({ tex: 'plus', blend: 'add', bursts: [{ count: [3, 4] }, { time: 0.06, count: [2, 3] }], shape: { type: 'cone', radius: 2, angle: 0.08 }, dir,
      speed: [60, 520], life: [0.45, 0.58], size: [11, 16], rotation: Math.PI / 4, color: [light, col],
      behaviors: [ease(), c.sizeOverLife(c.curve([[0, 0], [0.15, 1.25], [0.3, 1], [0.75, 1], [1, 0]])), c.colorOverLife(c.fade(0.65))], order: 4 });
    return [
      // a soft golden glow over the scroll
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.65, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.85]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.55, 0.2], [0.45, 0.6], [0, 1]]))], order: 0 }),
      band(0), band(Math.PI),
      end(0), end(Math.PI),
      runes(0), runes(Math.PI),
      // a quick white flash as the seal breaks
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 80, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      // glints rising off the words
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.12, count: [5, 7] }], shape: { type: 'rect', w: 170, h: 10, thickness: 1 },
        speed: 0, life: [0.35, 0.5], size: [9, 15], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.force(0, 400), c.limitSpeed(90, 1), c.sizeOverLife(c.pop(0.25, 0.5))], order: 5 }),
    ];
  },
};
