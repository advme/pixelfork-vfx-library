/** A spinning roulette or prize wheel: a ring of glowing bulbs round the rim, three bright lights with comet tails chasing round them, inner lights turning the other way and white twinkles. Loops until stopped. */
export default {
  name: 'world.roulette',
  category: 'world',
  whenToUse: 'A roulette wheel, prize wheel, lucky wheel or daily-spin wheel is spinning in a casino, party or reward screen: play it at the centre of the wheel (size it to the wheel, or in 2D pass { el } on the wheel) and stop it when the wheel stops, then play reward.wheel for the prize; for a slot machine line win use reward.slotwin, for a disco ball use world.discoball.',
  duration: 1, loop: true, tint: '#ffd23a',
  tags: ['roulette', 'wheel', 'prize wheel', 'lucky spin', 'casino', 'lights', 'chase', 'marquee'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    // the rim radius: fitted to the wheel's element, else (no element, or in 3D) a wheel 200 px across. Without an
    // element the target is the default 120 x 48 box divided by the effect size, so it is told apart by its 2.5 : 1 shape
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const r = plain ? 100 : Math.max(30, Math.min(240, Math.min(c.target.w, c.target.h) * 0.46));
    const bulbs = r > 150 ? 24 : 16;
    // Every light lives two cycles and fades 0 -> peak -> 0, so the one born now sits exactly on the one born a cycle
    // ago and the two cross-fade to a steady glow (additive light adds up to the same brightness): a seamless loop.
    // Moving lights must therefore travel a whole number of their spacings per cycle.
    const T = 1;
    const steady = (peak) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [peak, 0.5], [0, 1]]));
    const rim = (radius) => ({ type: 'circle', radius, thickness: 0, even: true });
    const lights = (p) => c.sys(Object.assign({ blend: 'add', loop: true, prewarm: true, cut: true, duration: T, life: 2 * T, speed: 0 }, p));
    // three chasers a third of a turn apart, two thirds of a turn per cycle (a lap every 1.5 s)
    const chase = (2 * (Math.PI * 2)) / 3;
    // eight inner lights, three eighths of a turn per cycle, the other way: the wheel itself turning
    const turn = -3 * ((Math.PI * 2) / 8);
    // a tail is the chaser born a moment later: it starts at the same point, so it runs that far behind
    const tail = (times, size, peak, colour) => lights({ tex: 'glow', bursts: times.map((time) => ({ time, count: 3 })), shape: rim(r),
      size, color: colour, behaviors: [c.orbit(chase), steady(peak)], order: 4 });
    return [
      lights({ tex: 'glow', bursts: [{ count: 1 }], size: r * 2.8, color: col, behaviors: [steady(0.16)], order: 0 }),
      // the rim track (the ring texture's band sits at about 0.4 of the sprite size)
      lights({ tex: 'ring', bursts: [{ count: 1 }], size: r * 2.53, color: col, behaviors: [steady(0.35)], order: 1 }),
      // the bulbs: a soft glow and a bright core each
      lights({ tex: 'glow', bursts: [{ count: bulbs }], shape: rim(r), size: 16, color: col, behaviors: [steady(0.6)], order: 2 }),
      lights({ tex: 'disc', bursts: [{ count: bulbs }], shape: rim(r), size: 6, color: light, behaviors: [steady(0.9)], order: 3 }),
      lights({ tex: 'glow', bursts: [{ count: 8 }], shape: rim(r * 0.62), size: 14, color: c.lighten(col, 0.3), behaviors: [c.orbit(turn), steady(0.7)], order: 2 }),
      // the chasers and their comet tails
      tail([0.12, 0.16], 14, 0.3, col),
      tail([0.04, 0.08], 22, 0.55, col),
      lights({ tex: 'glow', bursts: [{ count: 3 }], shape: rim(r), size: 34, color: light, behaviors: [c.orbit(chase), steady(1)], order: 5 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: T, rate: 5, shape: { type: 'circle', radius: r, thickness: 0.15 },
        speed: 0, life: [0.3, 0.5], size: [12, 20], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 6 }),
    ];
  },
};
