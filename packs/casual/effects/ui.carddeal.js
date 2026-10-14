/** A card lands from a deal: a bright swoosh streak and speed lines racing in behind it, a soft pop where it lands, then glints and sparkles where it stops. */
export default {
  name: 'ui.carddeal',
  category: 'ui',
  whenToUse: 'A card is dealt, drawn, played or slid onto the table in a card, solitaire, poker or deck-building game: play it where the card lands and set dir (degrees, on screen, also in 3D) to the way the card travelled (default right). For turning a card face up use ui.cardflip.',
  duration: 0.45, loop: false, tint: '#ffffff',
  tags: ['ui', 'card', 'deal', 'draw', 'whoosh', 'solitaire', 'poker', 'slide'],
  build(c) {
    const col = c.color('#ffffff');
    const gold = c.mix(col, '#ffe58a', 0.5);
    const dir = c.dir === undefined ? 0 : c.dir;
    const fx = Math.cos(dir), fy = Math.sin(dir);
    // the swoosh and lines start far behind the landing point, so every part stays in the screen plane (also in 3D,
    // where it faces the camera): a world-aimed spray would leave those offsets pointing the wrong way
    const swoosh = (p) => c.sys(Object.assign({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], dir, shape: { type: 'cone', radius: 0, angle: 0 },
      offset: [-fx * 90, -fy * 90], speed: 600, stretch: { speed: 0, length: p.length } }, p.sys));
    return [
      // the swoosh: a wide soft smear of air racing in behind the card and stopping short of it
      swoosh({ length: 3.2, sys: { life: 0.2, size: 40, color: col, order: 0,
        behaviors: [c.speedOverLife(c.decel(0.15)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.55, 0.45], [0, 1]]))] } }),
      // its bright core streak
      swoosh({ length: 9, sys: { life: 0.17, size: 12, color: col, order: 1,
        behaviors: [c.speedOverLife(c.decel(0.15)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.8, 0.45], [0, 1]]))] } }),
      // speed lines
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: [6, 8] }], dir, shape: { type: 'cone', radius: 32, angle: 0.03 }, offset: [-fx * 70, -fy * 70],
        speed: [400, 550], life: [0.12, 0.18], size: [5, 7], color: col, stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.25)), c.colorOverLife(c.fade(0.4))], order: 1 }),
      // a soft pop of light where the card lands
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.08, count: 1 }], life: 0.16, size: 80, color: gold,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.4, 0.4], [0, 1]]))], order: 0 }),
      // bright glints thrown forward as it stops
      c.sys({ tex: 'disc', blend: 'add', bursts: [{ time: 0.06, count: [5, 6] }], dir, shape: { type: 'cone', radius: 16, angle: 0.55 }, offset: [fx * 30, fy * 30],
        speed: [90, 180], life: [0.2, 0.3], size: [5, 8], color: [gold, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.shrink())], order: 2 }),
      // sparkles on the card
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.1, count: [3, 4] }], shape: { type: 'circle', radius: 26 },
        speed: [10, 40], life: [0.25, 0.35], size: [20, 28], rotation: [0, 0.8], color: [gold, '#ffffff'],
        behaviors: [c.spin(-3, 3), c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 }),
    ];
  },
};
