/** Sun rays: soft beams of light slanting down through the air, slowly fading in and out. Loops until stopped. */
export default {
  name: 'env.sunrays',
  category: 'env',
  whenToUse: 'Warm daylight mood: a forest clearing, morning or evening light, a church window, a dusty barn, a peaceful level, a heavenly moment. Play it once without a position for the whole screen (2D) or the area around the camera (3D); stop it at night.',
  duration: 8, loop: true, anchor: 'top', tint: '#fff1c2',
  tags: ['sun', 'rays', 'light', 'god rays', 'forest', 'morning', 'day', 'calm', 'ambient'],
  build(c) {
    const col = c.color('#fff1c2');
    // a beam is one huge, slow, stretched glow; its slant comes from the push that moves it. A stretched
    // sprite trails BACK (up the beam) from its particle, so the particles live low and the beams reach up
    const beam = (p) => Object.assign({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, speed: 0, color: col,
      behaviors: [c.force(-14, -40), c.limitSpeed(16, 1), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.4, 0.3], [0.4, 0.7], [0, 1]]))] }, p);
    const motes = (p) => Object.assign({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, speed: [2, 8], color: col,
      behaviors: [c.noise(0.4, 20), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [0.7, 1], [1, 0]]))] }, p);
    if (c.is3d) {
      return [
        // 3D: the shafts are a sheet facing the camera above the spot it looks at (slow stretched sprites
        // placed out in the world smear into faint blobs); the dust motes live in the world
        c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 0.9, shape: { type: 'rect', w: 1500, h: 0 }, offset: [250, 420],
          speed: 0, life: [6, 8], size: [130, 190], color: col, stretch: { speed: 0.06, length: 3 },
          behaviors: [c.force(-20, -60), c.limitSpeed(60, 1), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.3, 0.3], [0.3, 0.7], [0, 1]]))], order: 0 }),
        c.sys(c.env3d(motes({ rate: 6, life: [4, 6], size: [3, 5] }), { w: 900, y: 110 })),
      ];
    }
    const w = c.view.w;
    return [
      c.sys(beam({ rate: 0.8, life: [6, 8], size: [130, 210], shape: { type: 'rect', w: w * 1.2, h: 0 }, offset: [w * 0.05, -c.view.h * 0.7], stretch: { speed: 0.5, length: 6 }, order: 0 })),
      c.sys(motes({ rate: 4, life: [4, 6], size: [3, 5], shape: { type: 'rect', w, h: c.view.h * 0.7, thickness: 1 }, offset: [0, -c.view.h * 0.4], order: 1 })),
    ];
  },
};
