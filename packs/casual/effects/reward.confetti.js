/** A confetti cannon: coloured paper shot up, tumbling and fluttering down. */
export default {
  name: 'reward.confetti',
  category: 'reward',
  whenToUse: 'A win: level complete, new record, chest opened, prize claimed. Fire it from the bottom or the middle of the screen; in 3D from the ground or a cannon, with direction: [x, y, z] to aim it (default straight up).',
  duration: 3.5,
  loop: false,
  tint: null,
  tags: ['confetti', 'win', 'celebrate', 'success', 'party', 'victory'],
  build(c) {
    const palette = c.tint
      ? [c.tint, c.lighten(c.tint, 0.5), c.darken(c.tint, 0.25), c.lighten(c.tint, 0.8)]
      : ['#ff4d6d', '#ffd23f', '#3dd6ff', '#7cff6b', '#c77dff', '#ff9f43'];
    // fast launch, then a slow flutter down at a terminal speed
    const flutter = () => [c.gravity(900), c.limitSpeed([[0, 1400], [0.2, 1400], [0.35, 190], [1, 190]], 1.5), c.noise(2.5, 22), c.spin(-9, 9), c.colorOverLife(c.fade(0.8))];
    return palette.map((colour, i) =>
      c.sys(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: Math.round(70 / palette.length) }],
        shape: { type: 'cone', radius: 6, angle: 0.55 }, dir: c.dir === undefined ? Math.PI / 2 : c.dir,
        // 3D: a lower fountain, or pieces fly straight into a top-down camera
        speed: c.is3d ? [480, 820] : [650, 1050], life: [2.2, 3.2], size: [9, 15], rotation: [0, 6.28], color: colour,
        behaviors: flutter(), order: i }))
    );
  },
};
