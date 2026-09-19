/** The whole screen flashes white and fades. */
export default {
  name: 'ui.flash',
  category: 'ui',
  whenToUse: 'A screen flash: a huge explosion, a lightning strike, a camera flash, a big hit on the player (tint red), a teleport. Covers the whole screen for a moment.',
  duration: 0.6, loop: false, anchor: 'center', tint: '#ffffff',
  tags: ['ui', 'flash', 'white-out', 'screen', 'lightning', 'damage', 'impact'],
  build(c) {
    const col = c.color('#ffffff');
    const big = Math.max(c.view.w, c.view.h);
    return [
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: 1 }], life: 0.6, size: big * 2.4, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.95, 0], [0.9, 0.1], [0, 1]]))] }),
    ];
  },
};
