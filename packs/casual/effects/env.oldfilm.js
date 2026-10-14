/** An old-film look: a flickering warm sepia wash with darker edges, dust specks and little hairs popping in for a frame, and thin light and dark scratches running down the picture. Loops until stopped. */
export default {
  name: 'env.oldfilm',
  category: 'env',
  whenToUse: 'An old-movie or vintage look over the whole picture: a retro or silent-film level, a 1920s-30s cartoon style, a sepia flashback or memory, a noir, western or old-Hollywood scene, an old-cinema menu: play it once without a position and it lies over the screen like a filter, in 3D games too (tint it for another wash colour); for a broken digital look use env.glitch, for floating sunlit dust env.dust.',
  duration: 3, loop: true, anchor: 'center', tint: '#d9b27c',
  // a film look belongs to the screen, so a 3D game gets the 2D overlay version too (space: 'world' in play() gives the sheet below)
  space: 'screen',
  tags: ['old film', 'vintage', 'retro', 'sepia', 'film grain', 'scratches', 'silent movie', 'noir'],
  build(c) {
    const col = c.color('#d9b27c');
    const ink = c.darken(col, 0.85);
    const pale = c.lighten(col, 0.75);
    // the picture: the screen in 2D; in 3D a sheet facing the camera, raised so little of it is under the floor
    const W = c.is3d ? 1000 : c.view.w, H = c.is3d ? 620 : c.view.h;
    const lift = c.is3d ? 200 : 0;
    const K = c.is3d ? 1.8 : 1;
    const frame = { type: 'rect', w: W, h: H, thickness: 1 };
    // dirt on film is there for a frame or two and gone: no fade, just a pop
    const speck = (p) => c.sys(Object.assign({ loop: true, prewarm: true, duration: 3, shape: frame, offset: [0, lift], speed: 0 }, p));
    // a scratch: a thin line stretched along its motion, running down the frame and gone in a few frames.
    // The line trails BACK (up) from its particle, so the scratches are born in the lower part of the frame
    const scratch = (p) => c.sys(Object.assign({ tex: 'disc', loop: true, prewarm: true, duration: 3, shape: { type: 'rect', w: W, h: H * 0.5, thickness: 1 }, offset: [0, lift - H * 0.2],
      speed: 0, stretch: { speed: 0, length: c.is3d ? 130 : 170 }, behaviors: [c.force(0, -3000), c.limitSpeed(c.is3d ? 300 : 140, 1)] }, p));
    const out = [];
    if (!c.is3d) {
      // 2D only, as these belong to the screen: a sepia wash that flickers as its layers come and go,
      // and darker edges (big dark glows born all along the border of the screen)
      out.push(
        c.sys({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 3, rate: 6, life: [0.3, 0.6], size: Math.max(W, H) * 2.4, color: col,
          behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.11, 0.3], [0.11, 0.7], [0, 1]]))], order: 0 }),
        c.sys({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 3, rate: 3.5, shape: { type: 'rect', w: W, h: H }, life: [2.5, 3.5], size: [260, 380], color: ink,
          behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.14, 0.3], [0.14, 0.7], [0, 1]]))], order: 1 }),
      );
    }
    out.push(
      // the projector flickering brighter now and then
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 3, bursts: [0.2, 0.55, 1.3, 1.75, 2.4].map((time) => ({ time, count: 1, probability: 0.45 })), offset: [0, lift],
        life: [0.05, 0.09], size: Math.max(W, H) * 1.6, color: c.lighten(col, 0.5),
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.12, 0], [0.12, 0.6], [0, 1]]))], order: 2 }),
      // dark dust specks, a few blotches and hairs
      speck({ tex: 'disc', blend: 'normal', rate: 90, life: [0.04, 0.08], size: [2.5 * K, 6 * K], color: ink, order: 3 }),
      speck({ tex: 'puff', blend: 'normal', rate: 6, life: [0.04, 0.08], size: [7 * K, 14 * K], rotation: [0, 6.28], color: ink, order: 3 }),
      // hairs: tiny lines pointing every way (a circle emitter gives each a direction to stretch along; it reaches the top and bottom of the frame too)
      speck({ tex: 'disc', blend: 'normal', rate: 10, shape: { type: 'circle', radius: Math.max(W, H) * 0.5 }, speed: 80 * K, life: [0.05, 0.1], size: [1.4 * K, 2 * K], color: ink,
        stretch: { speed: 0, length: 10 }, order: 3 }),
      // light specks
      speck({ tex: 'disc', blend: 'add', rate: 50, life: [0.04, 0.08], size: [2 * K, 4.5 * K], color: pale, order: 4 }),
      // thin light scratches, and a few dark ones
      scratch({ blend: 'add', rate: 4.5, life: [0.1, 0.35], size: [1.5 * K, 2.5 * K], color: pale, order: 5 }),
      scratch({ blend: 'normal', rate: 2.5, life: [0.08, 0.25], size: [1.2 * K, 2 * K], color: ink, order: 5 }),
    );
    return out;
  },
};
