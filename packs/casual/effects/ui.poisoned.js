/** The player is poisoned: sickly green glows breathe in and out at the screen edges, dark green wisps curl in and small bubbles rise along the border. Loops until stopped. */
export default {
  name: 'ui.poisoned',
  category: 'ui',
  whenToUse: 'The player is poisoned or sick, shown on the whole screen: a poison or gas attack, a toxic swamp or radiation zone, a bad potion, a damage-over-time status on the player. Start it once with no position (the edges of the whole screen pulse green with rising bubbles) and stop it when it wears off. For a poisoned character or enemy use state.poison; for a poison hit use magic.poison.',
  duration: 1.6, loop: true, anchor: 'center', tint: '#8be03a',
  tags: ['ui', 'poison', 'poisoned', 'toxic', 'sick', 'gas', 'vignette', 'bubbles'],
  build(c) {
    const col = c.color('#8be03a');
    const lime = c.mix(col, '#e6ff3a', 0.45), dark = c.darken(col, 0.55);
    const W = c.view.w, H = c.view.h, m = Math.min(W, H);
    const around = (size, gap) => Math.max(12, Math.min(40, Math.round((2 * (W + H)) / (size * gap))));
    const edge = { type: 'rect', w: W, h: H, even: true };
    // kept to the outer fifth of the screen on a phone, so the middle stays clear to play in
    const cycle = 1.6, wash = m * 0.5, rim = m * 0.32;
    const solid = (stops) => c.grad([['#fff', 0], ['#fff', 1]], stops);
    return [
      // the green vignette breathing: one set of edge glows per cycle, living a touch longer so there is never a gap.
      // Each set fades in from 0 over the 0.1 s the last one fades out, so the overlap does not blink brighter
      c.sys({ tex: 'glow', blend: 'normal', loop: true, duration: cycle, bursts: [{ count: around(wash, 0.4) }], shape: edge,
        life: cycle + 0.1, size: wash, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.3, 1], [0.6, 0.85], [1, 0.85]])), c.colorOverLife(solid([[0, 0], [0.12, 0.06], [0.34, 0.3], [0.12, 0.6], [0.12, 0.94], [0, 1]]))], order: 0 }),
      // a lime pulse half a cycle later, so the rhythm feels queasy and uneven (it glows on dark games)
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: cycle, bursts: [{ time: 0.8, count: around(rim, 0.45) }], shape: edge,
        life: 0.75, size: rim, color: lime,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.7], [0.4, 1], [1, 0.9]])), c.colorOverLife(solid([[0, 0], [0.28, 0.35], [0, 1]]))], order: 1 }),
      // dark green wisps curling in: a whole-screen rect with a NEGATIVE speed sends each one toward the middle
      c.sys({ tex: 'puff', blend: 'normal', loop: true, duration: cycle, rate: 6, shape: { type: 'rect', w: W, h: H },
        speed: [-16, -5], life: [1.6, 2.2], size: [m * 0.11, m * 0.16], rotation: [0, 6.28], color: dark,
        behaviors: [c.spin(-0.4, 0.4), c.sizeOverLife(c.grow(0.6)), c.colorOverLife(solid([[0, 0], [0.3, 0.3], [0.3, 0.7], [0, 1]]))], order: 2 }),
      // small bubbles rising in a band along the border, popping as they go
      c.sys({ tex: 'ring', blend: 'normal', loop: true, duration: cycle, rate: 20, shape: { type: 'rect', w: W, h: H, thickness: 0.12 },
        life: [0.9, 1.4], size: [7, 15], color: c.lighten(col, 0.35),
        behaviors: [c.force(0, 220), c.limitSpeed(70, 2), c.noise(3, 15), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [0.85, 1], [1, 1.3]])), c.colorOverLife(solid([[0, 0], [1, 0.15], [1, 0.85], [0, 1]]))], order: 3 }),
    ];
  },
};
