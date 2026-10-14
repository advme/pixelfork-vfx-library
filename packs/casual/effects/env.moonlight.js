/** Moonlight: a cool blue glow hangs in the air while soft blue motes drift slowly down and sideways, fine silver dust floats and gentle sparkles twinkle in and out. Loops until stopped. */
export default {
  name: 'env.moonlight',
  category: 'env',
  whenToUse: 'A calm, cool night-time mood: a moonlit forest, lake or garden, a quiet village or castle at night, a bedtime, sleep or lullaby screen, a night level in a day/night cycle, an ice or moon palace: play it once without a position (whole screen in 2D, the area around the camera in 3D) and stop it at dawn; for a starry sky use env.stars, for yellow-green wandering fireflies env.fireflies, for spooky ghost lights env.spirits, for purple fairy magic env.magic.',
  duration: 8, loop: true, anchor: 'center', tint: '#9cc6ff',
  tags: ['moonlight', 'night', 'moon', 'calm', 'blue', 'sparkle', 'sleep', 'ambient'],
  build(c) {
    const col = c.color('#9cc6ff');
    const light = c.lighten(col, 0.55);
    const silver = c.mix(col, '#ffffff', 0.7);
    const deep = c.mix(col, '#6f7dff', 0.35);
    // 2D: the whole screen (big glows only in its upper part, where the moon would be). 3D: layers over the area around the camera
    const area = (p, y, upper) => (c.is3d
      ? c.sys(c.env3d(p, { w: 1100, y }))
      : c.sys(Object.assign({ shape: { type: 'rect', w: c.view.w + 40, h: upper ? c.view.h * 0.55 : c.view.h + 40, thickness: 1 }, offset: [0, upper ? c.view.h * 0.22 : 0] }, p)));
    const k = c.is3d ? 2.2 : 1;
    // everything drifts gently down and to the right (rect emitters: speed 0, moved by force and noise)
    const drift = (fall, wobble) => [c.force(fall * 0.6, -fall), c.limitSpeed(fall * 1.2, 1), c.noise(0.4, wobble)];
    return [
      // the cool glow of moonlight hanging in the air
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 0.55 * k, speed: 0, life: [7, 9], size: c.is3d ? [320, 480] : [260, 400], color: [col, deep],
        behaviors: [c.noise(0.15, 14), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.14, 0.3], [0.14, 0.7], [0, 1]]))], order: 0 }, 160, true),
      // soft blue motes, breathing slowly
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 5 * k, speed: 0, life: [4, 6], size: [8, 14], color: [col, light],
        behaviors: drift(10, 22).concat([c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.5, 0.7], [0.75, 1], [1, 0]]))]), order: 1 }, 80),
      // fine silver dust
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 9 * k, speed: 0, life: [3, 5], size: [2, 4], color: silver,
        behaviors: drift(14, 20).concat([c.colorOverLife(c.fadeInOut(0.2, 0.7))]), order: 2 }, 60),
      // gentle sparkles twinkling twice
      area({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 2.5 * k, speed: 0, life: [1.2, 2], size: [9, 16], rotation: [0, 0.8], color: silver,
        behaviors: drift(6, 10).concat([c.spin(-0.5, 0.5), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.4, 0.35], [0.6, 1], [1, 0]]))]), order: 3 }, 100),
      // a few tiny soft stars that fade in and out where they hang
      area({ tex: 'star', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 0.8 * k, speed: 0, life: [2, 3], size: [9, 14], rotation: [-0.3, 0.3], color: light,
        behaviors: [c.spin(-0.3, 0.3), c.sizeOverLife(c.pop(0.3, 0.6)), c.colorOverLife(c.fadeInOut(0.25, 0.7))], order: 3 }, 140),
    ];
  },
};
