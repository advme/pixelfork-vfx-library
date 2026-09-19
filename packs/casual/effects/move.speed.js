/** Speed lines streaming past. Loops until stopped. */
export default {
  name: 'move.speed',
  category: 'move',
  whenToUse: 'Something is moving very fast: a sprint, a boost, a falling player, a racing car. Lines stream backward: in 2D set dir (degrees, default left); in 3D pass direction: [x, y, z] (opposite to the movement) and keep it current with handle.aim(v) while the character turns.',
  duration: 1,
  loop: true,
  tint: '#ffffff',
  tags: ['speed', 'lines', 'boost', 'fast', 'sprint', 'wind'],
  build(c) {
    const col = c.color('#ffffff');
    const dir = c.dir === undefined ? Math.PI : c.dir;
    return [
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 30, shape: { type: 'cone', radius: 60, angle: 0.03, thickness: 1 }, dir,
        speed: [900, 1300], life: [0.18, 0.28], size: [6, 10], color: col,
        // 3D: shorter streaks; in perspective long ones span half the screen
        stretch: { speed: c.is3d ? 0.011 : 0.03, length: 2 },
        behaviors: [c.colorOverLife(c.fadeInOut(0.2, 0.6)), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]]))] })),
    ];
  },
};
