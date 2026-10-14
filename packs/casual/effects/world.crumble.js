/** A platform crumbles: a puff of dust cracks out of it, rock pieces break off one after another and fall tumbling, a curtain of dust and grit trails down after them. */
export default {
  name: 'world.crumble',
  category: 'world',
  whenToUse: 'A crumbling platform, cracked ledge, rotten bridge plank or stone floor breaks and falls away under the player in a platformer or dungeon; play it at the middle of the platform, size it to the platform width and tint it the colour of the stone or wood, and use hit.block for a crate or wall smashed by a hit or explosion.dust for a whole building collapsing.',
  duration: 1.1, loop: false, tint: '#a88a6a',
  tags: ['crumble', 'platform', 'collapse', 'break', 'falling', 'rocks', 'platformer', 'ledge'],
  build(c) {
    const col = c.color('#a88a6a');
    const dust = c.lighten(col, 0.45);
    // the platform's footprint: a thin slab on screen in 2D, a slab lying on the ground plane in 3D
    const slab = c.is3d ? { type: 'rect', w: 100, h: 60, thickness: 1 } : { type: 'rect', w: 100, h: 16, thickness: 1 };
    return [
      // the crack: dust puffing out of the platform
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 30 },
        speed: [40, 110], life: [0.4, 0.6], size: [28, 44], rotation: [0, 6.28], color: dust,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.55, 0.5], [0, 1]]))], order: 2 })),
      // rock pieces breaking off one after another and tumbling down
      c.sys(c.chunks(c.ground({ tex: 'square', blend: 'normal', bursts: [{ count: [3, 4] }, { time: 0.1, count: [2, 3] }, { time: 0.2, count: [2, 3] }], shape: slab,
        speed: 0, life: [0.65, 0.85], size: [12, 20], rotation: [0, 6.28], color: [col, c.darken(col, 0.3)],
        behaviors: [c.gravity(1400), c.spin(-6, 6), c.colorOverLife(c.fade(0.8))], order: 3 }), 'box')),
      // gravel
      c.sys(c.ground({ tex: 'disc', blend: 'normal', bursts: [{ count: [6, 8] }, { time: 0.15, count: [5, 6] }], shape: slab,
        speed: 0, life: [0.5, 0.7], size: [4, 7], color: [c.darken(col, 0.2), c.darken(col, 0.45)],
        behaviors: [c.gravity(1200), c.colorOverLife(c.fade(0.7))], order: 3 })),
      // a curtain of dust trailing down after the rocks
      c.sys(c.ground({ tex: 'puff', blend: 'normal', rate: 32, duration: 0.35, shape: slab,
        speed: 0, life: [0.55, 0.75], size: [18, 32], rotation: [0, 6.28], color: dust,
        behaviors: [c.gravity(320), c.limitSpeed(160, 1), c.spin(-1.5, 1.5), c.sizeOverLife(c.grow(0.5)), c.colorOverLife(c.fadeInOut(0.15, 0.5))], order: 1 })),
    ];
  },
};
