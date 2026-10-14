/** Music: colourful notes float up and sway around the character. Loops until stopped. */
export default {
  name: 'state.music',
  category: 'state',
  whenToUse: 'A character sings, dances, plays an instrument or listens to music: a radio or jukebox playing, a happy humming pet, a rhythm game, a bard\'s song. Follow the head or the music source; stop it when the music stops.',
  duration: 1, loop: true, tint: '#ff6fb0',
  tags: ['music', 'notes', 'sing', 'dance', 'song', 'radio', 'rhythm', 'happy', 'status'],
  build(c) {
    const col = c.color('#ff6fb0');
    return [
      c.sys({ tex: 'note', blend: 'normal', loop: true, world: true, rate: 2.6, shape: { type: 'cone', radius: 14, angle: 0.7 },
        speed: [40, 70], life: [1.3, 1.6], size: [18, 26], rotation: [-0.3, 0.3], color: [col, c.lighten(col, 0.3)],
        behaviors: [c.speedOverLife(c.decel(0.4)), c.noise(1.5, 40), c.spin(-0.6, 0.6), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.75, 1], [1, 0]]))], order: 2 }),
      c.sys({ tex: 'note', blend: 'normal', loop: true, world: true, rate: 1.4, shape: { type: 'cone', radius: 14, angle: 0.7 },
        speed: [40, 70], life: [1.3, 1.6], size: [16, 22], rotation: [-0.3, 0.3], color: ['#5cd6ff', '#ffd23a'],
        behaviors: [c.speedOverLife(c.decel(0.4)), c.noise(1.5, 40), c.spin(-0.6, 0.6), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.75, 1], [1, 0]]))], order: 2 }),
    ];
  },
};
