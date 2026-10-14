/** A disco ball: a silver shimmer twinkling on the ball, slow rays turning, and pink, cyan, yellow and purple light spots sweeping round it (over the floor below in 3D). Loops until stopped. */
export default {
  name: 'world.discoball',
  category: 'world',
  whenToUse: 'A disco ball over a dance floor: a party room, nightclub, roller disco, prom, a dance or rhythm game stage. Play it on the ball (it hangs above the floor) and leave it running; in 3D the light spots sweep over the floor below. For soft coloured party glows over the whole screen use env.partylights.',
  duration: 4, loop: true, tint: null,
  tags: ['disco', 'disco ball', 'mirror ball', 'dance', 'party', 'club', 'lights', 'music'],
  build(c) {
    const spots = c.tint
      ? [c.tint, c.lighten(c.tint, 0.5), c.darken(c.tint, 0.2), c.lighten(c.tint, 0.8)]
      : ['#ff4fd8', '#3de0ff', '#ffe03d', '#a46bff'];
    const twinkle = () => c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.35, 0.55], [0.55, 1], [0.8, 0.6], [1, 0]]));
    // 2D: spots sweep round the ball on the screen. 3D: they lie on the floor under the ball and sweep round it
    const spot = (colour, i) => {
      const p = { tex: 'glow', blend: 'add', loop: true, duration: 4, rate: 5, shape: { type: 'circle', radius: c.is3d ? 230 : 170, thickness: 0.7 },
        speed: 0, life: [1.2, 2], size: c.is3d ? [22, 34] : [16, 26], color: [c.lighten(colour, 0.35), colour],
        behaviors: [c.orbit(0.9), twinkle()], order: 3 + i };
      return c.sys(c.is3d ? c.flat(c.ground(p)) : p);
    };
    // the rays fade in and out across two overlapping copies, so the turning never jumps
    const rayFade = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.22, 0.3], [0.22, 0.7], [0, 1]]));
    // the glow and the rays live a whole cycle, so they are cut when the game stops the ball (no 4 s afterglow)
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 4, bursts: [{ count: 1 }], life: 4, size: 120, color: '#e6e0ff',
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0.65, 0.25], [0.45, 0.5], [0.65, 0.75], [0.45, 1]]))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, cut: true, duration: 4, bursts: [{ count: 1 }, { time: 2, count: 1 }], life: 4, size: 280, rotation: [0, 1.6], color: '#ffffff',
        behaviors: [c.spin(0.35, 0.5), rayFade()], order: 1 }),
      // the mirror tiles catching the light
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 12, shape: { type: 'circle', radius: 28 },
        speed: 0, life: [0.25, 0.45], size: [12, 22], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 2 }),
      ...spots.map(spot),
      // a few coloured glints in the air around the ball
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 4, shape: { type: 'circle', radius: 110 },
        speed: 0, life: [0.5, 0.9], size: [8, 14], rotation: [0, 0.8], color: [c.lighten(spots[0], 0.6), c.lighten(spots[1], 0.6)],
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 7 })),
    ];
  },
};
