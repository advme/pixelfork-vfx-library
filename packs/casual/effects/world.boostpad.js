/** A boost pad: glowing chevrons sweep along it again and again, pointing the way. Loops until stopped. */
export default {
  name: 'world.boostpad',
  category: 'world',
  whenToUse: 'A speed boost pad, a jump ramp marker, a conveyor or launch strip in a racing, runner or platform game: anything that says "go this way, fast". Play it on the pad; in 2D set dir (degrees, 0 = right), in 3D it lies on the ground pointing along +X (turn the pad, not the effect). When something drives over it play vehicle.nitro.',
  duration: 0.6, loop: true, anchor: 'feet', tint: '#38ffb0',
  tags: ['boost', 'speed pad', 'racing', 'arrows', 'ramp', 'runner', 'conveyor', 'go', 'track'],
  build(c) {
    const col = c.color('#38ffb0');
    const dir = c.dir === undefined ? 0 : c.dir;
    // the chevron points up in its picture: turn it to point along the pad
    const turn = dir - Math.PI / 2;
    const chevrons = (p) => (c.is3d ? c.sys(c.flat(p)) : c.sys(p));
    return [
      chevrons({ tex: 'arrow', blend: 'add', loop: true, duration: 0.6, bursts: [{ count: 1 }, { time: 0.2, count: 1 }, { time: 0.4, count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 }, dir, offset: c.is3d ? undefined : [-Math.cos(dir) * 70, -Math.sin(dir) * 70],
        speed: 230, life: 0.6, size: 44, rotation: c.is3d ? -Math.PI / 2 : turn, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.25], [1, 0.6], [0, 1]]))], order: 1 }),
      chevrons({ tex: 'glow', blend: 'add', loop: true, duration: 0.6, bursts: [{ count: 1 }], life: 0.6, size: 170, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.25, 0], [0.4, 0.5], [0.25, 1]]))], order: 0 }),
    ];
  },
};
