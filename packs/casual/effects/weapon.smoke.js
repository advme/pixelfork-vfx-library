/** A smoke grenade: a hissing jet and a thick cloud billowing out along the ground. Loops until stopped. */
export default {
  name: 'weapon.smoke',
  category: 'weapon',
  whenToUse: 'A smoke grenade, a smoke bomb, a flare canister, a fog machine or a coloured signal smoke. Play it on the ground where it landed; stop it after a few seconds and the cloud drifts away. Tint it for coloured smoke.',
  duration: 4, loop: true, tint: '#d3d9de',
  tags: ['smoke', 'grenade', 'cloud', 'cover', 'flare', 'signal', 'military', 'weapon'],
  build(c) {
    const col = c.color('#d3d9de');
    return [
      // the cloud spreading out along the ground
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 15, shape: c.is3d ? { type: 'circle', radius: 18 } : { type: 'circle', radius: 18, arc: Math.PI },
        speed: [30, 90], life: [2.6, 3.6], size: [44, 70], rotation: [0, 6.28], color: [col, c.darken(col, 0.18)],
        behaviors: [c.speedOverLife(c.decel(0.25)), c.force(0, 22), c.noise(0.6, 16), c.spin(-0.4, 0.4), c.sizeOverLife(c.curve([[0, 0.4], [0.5, 1.6], [1, 2.6]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.12], [0.75, 0.6], [0, 1]]))], order: 1 })),
      // the hissing jet out of the canister
      c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 12, shape: { type: 'cone', radius: 3, angle: 0.25 },
        speed: [150, 240], life: [0.5, 0.8], size: [12, 20], rotation: [0, 6.28], color: c.lighten(col, 0.3),
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0.5], [1, 2.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.4, 0.6], [0, 1]]))], order: 2 }),
    ];
  },
};
