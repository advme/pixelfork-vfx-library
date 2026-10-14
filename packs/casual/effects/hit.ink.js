/** An ink squirt: a quick dark ring, a thick purple-black cloud puffing out and trailing along the squirt, purple swirls rolling in it and blobs and droplets of ink flung out. All solid colour, no glow. */
export default {
  name: 'hit.ink',
  category: 'hit',
  whenToUse: 'An octopus, squid or cuttlefish squirts a cloud of ink: a sea creature escaping in a puff of ink, an ink attack that splats or blinds the player, an ink bomb in an ocean or pirate game; play it where the ink comes out and aim the squirt with dir (degrees, default up) or direction: [x, y, z] in 3D. For a sticky splat of goo or paint on a target use hit.splat; for a grey smoke escape use explosion.smokebomb.',
  duration: 0.7, loop: false, tint: '#5a2d8a',
  tags: ['ink', 'octopus', 'squid', 'cloud', 'squirt', 'sea', 'blind', 'escape'],
  build(c) {
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    const col = c.color('#5a2d8a');
    const dark = c.darken(col, 0.6);
    const sheen = c.lighten(col, 0.3);
    // thick from the first frames, holds, then thins away
    const thick = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [1, 0.12], [0.9, 0.55], [0, 1]]));
    return [
      // a quick dark ring as the ink bursts out
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.3, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))], order: 0 }),
      // the cloud trailing out along the squirt
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'cone', radius: 8, angle: 0.3 }, dir,
        speed: [160, 300], life: [0.45, 0.62], size: [30, 50], rotation: [0, 6.28], color: [dark, col],
        behaviors: [c.speedOverLife(c.decel(0.08)), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 1.3]])), thick()], order: 1 })),
      // the cloud: dark puffs billowing out from the centre
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 14 },
        speed: [60, 150], life: [0.5, 0.68], size: [44, 70], rotation: [0, 6.28], color: [dark, col],
        behaviors: [c.speedOverLife(c.decel(0.08)), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.35], [0.25, 1], [1, 1.35]])), thick()], order: 2 })),
      // purple swirls rolling in the cloud, so it reads as ink and not smoke
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.03, count: [4, 5] }], shape: { type: 'circle', radius: 18 },
        speed: [40, 110], life: [0.4, 0.55], size: [24, 38], rotation: [0, 6.28], color: sheen,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-3, 3), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.2]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.2], [0.5, 0.6], [0, 1]]))], order: 3 })),
      // ink blobs flung out along the squirt
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'cone', radius: 6, angle: 0.4 }, dir,
        speed: [260, 460], life: [0.3, 0.45], size: [7, 13], color: [dark, col],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 1], [0.6, 0.8], [1, 0]]))], order: 4 })),
      // tiny droplets all round
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 10 },
        speed: [180, 340], life: [0.25, 0.4], size: [4, 6], color: dark,
        behaviors: [c.speedOverLife(c.decel(0.25)), c.sizeOverLife(c.shrink())], order: 4 })),
    ];
  },
};
