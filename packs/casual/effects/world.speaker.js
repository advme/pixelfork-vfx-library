/** A speaker playing: on every beat a glow thumps and two sound-wave rings roll out with a puff of light dots, while music notes float up. Loops until stopped (120 beats a minute). */
export default {
  name: 'world.speaker',
  category: 'world',
  whenToUse: 'A loudspeaker, boombox, jukebox, stage or DJ booth plays music in the world: a party, a concert, a dance club, a radio in a room. Play it on the speaker and leave it running; stop it when the music stops. For notes around a singing or listening character use state.music.',
  duration: 1, loop: true, tint: '#b45cff',
  tags: ['speaker', 'music', 'stage', 'concert', 'dj', 'boombox', 'beat', 'party'],
  build(c) {
    const col = c.color('#b45cff');
    const light = c.lighten(col, 0.55);
    const beat = (t) => [{ time: t, count: 1 }, { time: t + 0.5, count: 1 }];
    const alpha = (a) => c.colorOverLife(c.grad([['#ffffff', 0], ['#ffffff', 1]], a));
    const notes = (rate, colour) => c.sys({ tex: 'note', blend: 'normal', loop: true, rate, shape: { type: 'cone', radius: 22, angle: 0.8 }, dir: Math.PI / 2, offset: [0, 24],
      speed: [40, 70], life: [1.4, 1.7], size: [18, 26], rotation: [-0.3, 0.3], color: colour,
      behaviors: [c.speedOverLife(c.decel(0.4)), c.noise(1.5, 40), c.spin(-0.6, 0.6), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.75, 1], [1, 0]]))], order: 4 });
    return [
      // the thump of light on every beat
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1, bursts: beat(0), life: 0.45, size: 140, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1.1], [0.2, 0.9], [1, 0.75]])), alpha([[0.7, 0], [0.25, 0.4], [0, 1]])], order: 0 }),
      // sound waves rolling out: a coloured ring and a pale one right behind it
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1, bursts: beat(0), life: 0.7, size: 230, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), alpha([[0.9, 0], [0.5, 0.5], [0, 1]])], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1, bursts: beat(0.08), life: 0.6, size: 175, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), alpha([[0.8, 0], [0.4, 0.5], [0, 1]])], order: 2 }),
      // light dots pushed out by the bass
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, duration: 1, bursts: [{ count: 5 }, { time: 0.5, count: 5 }], shape: { type: 'circle', radius: 30, thickness: 0 },
        speed: [120, 200], life: [0.3, 0.45], size: [5, 8], color: light,
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.4))], order: 3 })),
      // music notes floating up and swaying
      notes(2.2, [col, light]),
      notes(1.2, ['#ffffff', light]),
    ];
  },
};
