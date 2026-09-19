/** A fireball in flight: a burning core with a flame trail. Loops until stopped. */
export default {
  name: 'magic.fire',
  category: 'magic',
  whenToUse: 'A fireball, a flaming arrow, a meteor or any burning projectile while it flies. Play with follow on the projectile; stop it on impact and play explosion.fireball.',
  duration: 1, loop: true, tint: '#ff7a1f',
  tags: ['fireball', 'projectile', 'flame', 'meteor', 'trail', 'burning'],
  build(c) {
    const col = c.color('#ff7a1f');
    const light = c.lighten(col, 0.6);
    return [
      // 3D: a fiery ribbon behind the projectile
      c.ribbon({ width: 30, length: 22, color: col, order: -1 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, bursts: [{ count: 1 }], life: 1, size: 60, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.1], [1, 0.9]]))], order: 3 }),
      c.sys({ tex: 'disc', blend: 'normal', loop: true, rate: 30, shape: { type: 'circle', radius: 6 },
        speed: [10, 30], life: [0.25, 0.4], size: [26, 40], color: [light, col],
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.3]])), c.colorOverLife(c.grad([[light, 0], [col, 0.5], [c.darken(col, 0.5), 1]], [[1, 0], [1, 0.5], [0, 1]]))], order: 2 }),
      c.sys({ tex: 'flame', blend: 'add', loop: true, world: true, rate: 40, shape: { type: 'circle', radius: 8 },
        speed: [10, 40], life: [0.3, 0.5], size: [18, 32], color: [light, col],
        behaviors: [c.force(0, 120), c.noise(3, 8), c.sizeOverLife(c.curve([[0, 0.8], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 20, shape: { type: 'circle', radius: 10 },
        speed: [20, 70], life: [0.4, 0.7], size: [3, 6], color: light,
        behaviors: [c.force(0, 200), c.noise(4, 10), c.colorOverLife(c.fade(0.5))], order: 4 }),
    ];
  },
};
