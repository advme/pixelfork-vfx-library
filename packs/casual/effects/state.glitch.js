/** A digital glitch: hard cyan and magenta pixel blocks jump and flicker around the body, with white tear lines and stuttering flashes. Loops until stopped. */
export default {
  name: 'state.glitch',
  category: 'state',
  whenToUse: 'A character, robot, enemy or object is glitching or corrupted: a hacked robot, a virus, a hologram breaking up, a cyber or computer world, a corrupted boss, a bugged NPC as a joke: follow the body and stop it when it ends (tint null keeps cyan and magenta, a tint gives one colour); for electric shocks use state.electrified, for retro pixel blasts use explosion.pixel.',
  duration: 1.3, loop: true, tint: null,
  tags: ['glitch', 'digital', 'corrupted', 'hacked', 'cyber', 'virus', 'pixel', 'robot'],
  build(c) {
    const a = c.tint || c.rgb('#2ef2ff');
    const b = c.tint ? c.lighten(c.tint, 0.5) : c.rgb('#ff3ddf');
    // the box around the body where blocks appear
    const box = { type: 'rect', w: 78, h: 96, thickness: 1 };
    // blocks snap from full to half size halfway through their short life: a jump, not a smooth shrink
    const snap = () => c.sizeOverLife(c.curve([[0, 1], [0.48, 1], [0.52, 0.5], [1, 0.5]]));
    // a constant fizz plus stutters: bunches of blocks at uneven moments of the cycle; each one only
    // sometimes fires, so the pattern never repeats the same way twice (a loop that runs for minutes)
    const stutter = (shift) => [{ time: 0.05 + shift, count: [6, 9], probability: 0.8 }, { time: 0.55 + shift, count: [3, 5], probability: 0.6 },
      { time: 0.9 + shift, count: [7, 10], probability: 0.8 }, { time: 1.12 + shift, count: [4, 7], probability: 0.35 }];
    return [
      // a harsh flicker of light behind, on the stutters (also only sometimes)
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.3, bursts: [{ time: 0.05, count: 1, probability: 0.75 }, { time: 0.55, count: 1, probability: 0.55 }, { time: 0.9, count: 1, probability: 0.75 }, { time: 1.12, count: 1, probability: 0.3 }], life: 0.1, size: 130, color: a,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0.5, 0.5], [0, 1]]))], order: 0 }),
      // cyan blocks a little to the left, magenta a little to the right: a colour split
      c.sys({ tex: 'pixel', blend: 'normal', loop: true, duration: 1.3, rate: 50, bursts: stutter(0), shape: box, offset: [-3, 0],
        speed: 0, life: [0.05, 0.16], size: [6, 16], color: a, behaviors: [snap()], order: 1 }),
      c.sys({ tex: 'pixel', blend: 'normal', loop: true, duration: 1.3, rate: 44, bursts: stutter(0.03), shape: box, offset: [3, 0],
        speed: 0, life: [0.05, 0.16], size: [6, 16], color: b, behaviors: [snap()], order: 2 }),
      // tiny white pixels: digital noise
      c.sys({ tex: 'pixel', blend: 'normal', loop: true, duration: 1.3, rate: 22, shape: box,
        speed: 0, life: [0.04, 0.1], size: [2, 4], color: '#ffffff', order: 3 }),
      // white tear lines: hard bars, stretched sideways (they trail back from the particle, so the emitter sits right of centre)
      c.sys({ tex: 'disc', blend: 'add', loop: true, duration: 1.3, rate: 6, bursts: [{ time: 0.05, count: [2, 3], probability: 0.75 }, { time: 0.9, count: [2, 4], probability: 0.75 }],
        shape: { type: 'cone', radius: 48, angle: 0.001 }, dir: 0, offset: [30, 0],
        speed: 20, life: [0.05, 0.12], size: [3, 6], color: ['#ffffff', a], stretch: { speed: 0.02, length: 11 }, order: 4 }),
    ];
  },
};
