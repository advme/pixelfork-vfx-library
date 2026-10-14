/** A red notification dot pops onto an icon with a white rim and a shine, two rings pulse out and a few dots flick away. */
export default {
  name: 'ui.notify',
  category: 'ui',
  whenToUse: 'A notification lands on an icon, tab or menu button: a new message, a mission ready to claim, a gift waiting, a friend request. Play with { el } on the icon (the dot pops at its top-right corner) or on a small badge (it pops in the middle); without an element pass width and height (the icon size in px). For drawing the eye to a button use ui.glow; for marking an unseen item use ui.new.',
  duration: 0.6, loop: false, tint: '#ff3b4e',
  tags: ['ui', 'notification', 'badge', 'alert', 'ping', 'message', 'unread', 'dot'],
  build(c) {
    const col = c.color('#ff3b4e');
    const light = c.lighten(col, 0.5);
    const w = c.target.w, h = c.target.h;
    // on an icon or button the dot sits at its top-right corner; played on a small badge it sits in the middle and matches its size
    const corner = Math.max(w, h) > 40;
    const d = corner ? 22 : Math.max(14, Math.min(40, Math.max(w, h)));
    const at = corner ? [w / 2 - 3, h / 2 - 3] : [0, 0];
    // the dot springs in, overshoots, settles, then shrinks away (the game's own badge stays)
    const springIn = () => c.sizeOverLife(c.curve([[0, 0], [0.12, 1.3], [0.24, 0.9], [0.34, 1], [0.8, 1], [1, 0]]));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: d * 3.2, color: col, offset: at,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.5, 0.4], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.04, count: 1 }, { time: 0.2, count: 1 }], life: 0.4, size: d * 3.6, color: col, offset: at,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 1 }),
      // white rim, then the red dot on it, then a glossy highlight at its top-left
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: 1 }], life: 0.6, size: d * 1.3, color: '#ffffff', offset: at,
        behaviors: [springIn()], order: 2 }),
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: 1 }], life: 0.6, size: d, color: col, offset: at,
        behaviors: [springIn()], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.6, size: d * 0.5, color: '#ffffff', offset: [at[0] - d * 0.17, at[1] + d * 0.17],
        behaviors: [springIn(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.75, 1]]))], order: 4 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.05, count: 6 }], shape: { type: 'circle', radius: d * 0.5, thickness: 0, even: true }, offset: at,
        speed: [120, 160], life: [0.25, 0.32], size: [5, 7], color: light,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.shrink())], order: 5 }),
    ];
  },
};
