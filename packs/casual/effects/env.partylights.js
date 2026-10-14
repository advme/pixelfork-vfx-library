/** Party lights: big soft pink, cyan, yellow, purple and green glows pulsing slowly across the screen, with bokeh dots drifting and white twinkles. Loops until stopped. */
export default {
  name: 'env.partylights',
  category: 'env',
  whenToUse: 'A party mood that stays on: a dance or rhythm game, a club or concert, a party room, a festival stage, a celebration menu or results background. Play it once without a position (whole screen in 2D, the area around the camera in 3D); stop it when the party ends. For a disco ball in the world use world.discoball; for falling confetti use env.confetti.',
  duration: 6, loop: true, anchor: 'center', tint: null,
  tags: ['party', 'lights', 'club', 'dance', 'concert', 'bokeh', 'festival', 'disco'],
  build(c) {
    const palette = c.tint
      ? [c.tint, c.lighten(c.tint, 0.4), c.darken(c.tint, 0.25), c.mix(c.tint, '#ff4fd8', 0.4), c.mix(c.tint, '#3de0ff', 0.4)]
      : ['#ff3fa4', '#3fd8ff', '#ffd23a', '#9b5cff', '#4dff8a'];
    // 2D: anywhere on the screen. 3D: a layer of lights hanging over the area around the camera.
    // Both are rect emitters, so speed stays 0: the glows wander by noise, the bokeh rise by force
    const area = (p, y) => (c.is3d ? c.sys(c.env3d(p, { w: 1000, y })) : c.sys(Object.assign({ shape: { type: 'rect', w: c.view.w, h: c.view.h, thickness: 1 } }, p)));
    // fresh behaviours per system: a slow breathing size and a soft rise and fall of light
    const pulse = () => c.sizeOverLife(c.curve([[0, 0.6], [0.25, 1], [0.5, 0.8], [0.75, 1], [1, 0.7]]));
    // 3D lights hang between the camera and the floor, so they are fainter there or they would wash the scene out
    const peak = c.is3d ? 0.18 : 0.38;
    const breathe = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [peak, 0.25], [peak * 0.6, 0.5], [peak, 0.75], [0, 1]]));
    return [
      ...palette.map((colour, i) => area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: c.is3d ? 1.2 : 0.5,
        speed: 0, life: [3.5, 5], size: c.is3d ? [180, 280] : [170, 260], color: colour,
        behaviors: [c.noise(0.3, 40), pulse(), breathe()], order: i % 2 }, 120)),
      // bokeh: round dots of light drifting up
      area({ tex: 'disc', blend: 'add', loop: true, prewarm: true, duration: 6, rate: c.is3d ? 7 : 3,
        speed: 0, life: [2.5, 4], size: c.is3d ? [14, 30] : [10, 24], color: [palette[0], palette[1]],
        behaviors: [c.force(0, 14), c.limitSpeed(20, 1), c.noise(0.5, 14), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.55, 0.25], [0.55, 0.75], [0, 1]]))], order: 2 }, 70),
      area({ tex: 'disc', blend: 'add', loop: true, prewarm: true, duration: 6, rate: c.is3d ? 7 : 3,
        speed: 0, life: [2.5, 4], size: c.is3d ? [14, 30] : [10, 24], color: [palette[2], palette[3]],
        behaviors: [c.force(0, 14), c.limitSpeed(20, 1), c.noise(0.5, 14), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.55, 0.25], [0.55, 0.75], [0, 1]]))], order: 2 }, 50),
      area({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 6, rate: c.is3d ? 5 : 2.5,
        speed: 0, life: [0.8, 1.4], size: [10, 18], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 }, 90),
    ];
  },
};
