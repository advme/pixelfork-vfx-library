/** A cream pie in the face: a fat lumpy splat of cream squashes out, gobs fly, pink cake crumbs scatter, cream drips and a few cartoon hearts pop up. */
export default {
  name: 'hit.pie',
  category: 'hit',
  whenToUse: 'A cream pie, cake or custard tart is thrown and lands, usually in someone\'s face: comedy and party games, a clown act, a food fight, a birthday prank, a cake-smash mini-game. Play it where it lands; tint it for chocolate or fruit cream. For slime, paint, a tomato or an egg use hit.splat.',
  duration: 0.65, loop: false, tint: '#fff6e6',
  tags: ['pie', 'cream', 'cake', 'splat', 'comedy', 'prank', 'party', 'food fight'],
  build(c) {
    const col = c.color('#fff6e6');
    const shade = c.darken(col, 0.16);
    const blob = () => [c.sizeOverLife(c.curve([[0, 0.3], [0.12, 1.15], [0.25, 0.95], [0.75, 1], [1, 0.8]])), c.colorOverLife(c.fade(0.65))];
    return [
      // the splat: a shaded lump under a cream lump, both facing the camera (it sits on a face, not the floor)
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 24 }, offset: [2, -5],
        speed: [10, 40], life: 0.6, size: [30, 46], color: shade, behaviors: blob(), order: 1 }),
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 22 },
        speed: [10, 40], life: 0.6, size: [26, 42], color: [col, c.lighten(col, 0.5)], behaviors: blob(), order: 2 }),
      // gobs of cream flung out
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 14] }], shape: { type: 'circle', radius: 12 },
        speed: [150, 300], life: [0.3, 0.42], size: [7, 13], color: [col, shade],
        behaviors: [c.gravity(1300), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 4 })),
      // pink and sponge-coloured cake crumbs
      c.sys(c.vol({ tex: 'square', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 14 },
        speed: [130, 260], life: [0.35, 0.48], size: [4, 7], rotation: [0, 6.28], color: ['#ff8fbf', '#f4c27a'],
        behaviors: [c.gravity(1300), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 3 })),
      // cream dripping off the bottom of the splat. Not a c.spray: in 3D the drips stay with the camera-facing
      // splat, which is pulled out in front of the head; a world-space spray would start inside the head and hide
      c.sys({ tex: 'drop', blend: 'normal', bursts: [{ time: 0.12, count: [3, 4] }], shape: { type: 'cone', radius: 24, angle: 0.1 }, dir: -Math.PI / 2, offset: [0, -16],
        speed: [20, 50], life: [0.4, 0.5], size: [8, 12], rotation: Math.PI, color: col,
        behaviors: [c.gravity(500), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.7))], order: 2 }),
      // a few comedy hearts popping up
      c.sys({ tex: 'heart', blend: 'normal', bursts: [{ time: 0.06, count: [2, 3] }], shape: { type: 'cone', radius: 18, angle: 0.7 }, dir: Math.PI / 2, offset: [0, 22],
        speed: [90, 150], life: [0.45, 0.58], size: [13, 19], rotation: [-0.3, 0.3], color: ['#ff5c8a', '#ff8fb1'],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 0], [0.18, 1.2], [0.32, 1], [0.8, 1], [1, 0]]))], order: 5 }),
    ];
  },
};
