/** An arcane missile in flight: a bright violet core with a spinning glint, three motes circling it and a sparkly trail left hanging in the air. Loops until stopped. */
export default {
  name: 'magic.missile',
  category: 'magic',
  whenToUse: 'A magic bolt or arcane missile is flying: a wizard\'s magic missile, a wand or staff shot, a homing mana orb, a fairy\'s spark, an enchanted arrow in flight; play it with follow on the projectile, stop it on impact and play explosion.magic with the same tint (for a fireball use magic.fire, for a gun or blaster bolt use weapon.laser).',
  duration: 1, loop: true, tint: '#b45cff',
  tags: ['magic missile', 'arcane', 'bolt', 'projectile', 'wand', 'spell', 'wizard', 'trail'],
  build(c) {
    const col = c.color('#b45cff');
    const light = c.lighten(col, 0.6);
    return [
      // 3D: a glowing ribbon behind the bolt
      c.ribbon({ width: 22, length: 20, color: col, order: -1 }),
      // the bolt itself (halo, core, glint, motes) is `cut`: it vanishes on impact while the trail it left lives out
      // a soft halo around the bolt, breathing fast
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 0.3, bursts: [{ count: 1 }], life: 0.3, size: 96, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.1], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0.65, 0.5], [0.45, 1]]))], order: 0 }),
      // sparkles and motes left hanging along the flight path
      c.sys({ tex: 'spark', blend: 'add', loop: true, world: true, rate: 26, shape: { type: 'circle', radius: 8 },
        speed: [10, 40], life: [0.35, 0.6], size: [8, 14], rotation: [0, 6.28], color: [light, '#ffffff'],
        behaviors: [c.noise(3, 10), c.spin(-4, 4), c.sizeOverLife(c.pop(0.15, 0.4))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 60, shape: { type: 'circle', radius: 6 },
        speed: [5, 30], life: [0.3, 0.45], size: [10, 18], color: [col, light],
        behaviors: [c.noise(3, 12), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.4))], order: 2 }),
      // the core: a bright orb
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 0.2, bursts: [{ count: 1 }], life: 0.2, size: 46, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.5, 1.08], [1, 0.92]]))], order: 3 }),
      // a white four-point glint spinning in the core: a quarter turn per cycle, so each cycle picks up where the last ended
      c.sys({ tex: 'spark', blend: 'add', loop: true, cut: true, duration: 0.5, bursts: [{ count: 1 }], life: 0.5, size: 54, color: '#ffffff',
        behaviors: [c.spin(Math.PI, Math.PI)], order: 4 }),
      // three motes circling the core, one full turn per cycle
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 0.5, bursts: [{ count: 3 }], shape: { type: 'circle', radius: 20, thickness: 0, even: true },
        speed: 0, life: 0.5, size: 13, color: light,
        behaviors: [c.orbit(4 * Math.PI)], order: 5 }),
    ];
  },
};
