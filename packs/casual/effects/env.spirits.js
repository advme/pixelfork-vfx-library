/** Ghost lights: pale wisps with soft halos drifting slowly through the air, flickering in and out. Loops until stopped. */
export default {
  name: 'env.spirits',
  category: 'env',
  whenToUse: 'A haunted house, a graveyard, a cursed forest, a horror level, a spirit world or a dream. Play it once without a position for the whole screen (2D) or the area around the camera (3D); stop it to clear the air. For friendly night lights use env.fireflies.',
  duration: 8, loop: true, anchor: 'center', tint: '#a8f0ff',
  tags: ['ghost', 'spirit', 'wisp', 'haunted', 'horror', 'graveyard', 'spooky', 'ambient'],
  build(c) {
    const col = c.color('#a8f0ff');
    const flicker = c.curve([[0, 0], [0.15, 1], [0.3, 0.55], [0.45, 1], [0.6, 0.7], [0.8, 1], [1, 0]]);
    const area = (p) => (c.is3d ? c.sys(c.env3d(p, { w: 1100, y: 70 })) : c.sys(Object.assign({ shape: { type: 'rect', w: c.view.w, h: c.view.h, thickness: 1 } }, p)));
    // a fresh set per layer: behaviours must not be shared between systems
    const drift = () => [c.noise(0.35, 70), c.force(0, 10), c.limitSpeed(40, 1)];
    return [
      // halos
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: c.is3d ? 2.4 : 1.6, speed: [3, 12], life: [5, 7], size: [70, 110], color: col,
        behaviors: drift().concat([c.sizeOverLife(flicker), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.22, 0.2], [0.18, 0.8], [0, 1]]))]), order: 0 }),
      // the wisps
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: c.is3d ? 3 : 2, speed: [3, 12], life: [5, 7], size: [14, 24], color: [c.lighten(col, 0.6), col],
        behaviors: drift().concat([c.sizeOverLife(flicker), c.colorOverLife(c.fadeInOut(0.2, 0.8))]), order: 1 }),
      // cold motes
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: c.is3d ? 6 : 4, speed: [2, 8], life: [3, 5], size: [3, 6], color: col,
        behaviors: [c.noise(0.6, 40), c.force(0, 18), c.limitSpeed(30, 1), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [0.7, 1], [1, 0]]))], order: 2 }),
    ];
  },
};
