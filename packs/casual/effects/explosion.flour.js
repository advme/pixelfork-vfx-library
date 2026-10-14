/** A flour poof: a soft white powder cloud billows up and rolls out low along the counter, fine dust hangs and drifts down to settle, with a soft flash and a ring of powder spreading on the surface. */
export default {
  name: 'explosion.flour',
  category: 'explosion',
  whenToUse: 'Flour or powder poofs out in a cooking or bakery game: a flour bag bursts or is dropped, dough is slapped down on the counter, sugar, cocoa or spice powder is dumped into a bowl, a baker claps floury hands. Play it on the counter or bowl where it lands; tint it brown for cocoa or red for chilli powder. For a cartoon poof when something vanishes use explosion.puff; for a building collapse dust cloud use explosion.dust; for a ninja smoke bomb use explosion.smokebomb.',
  duration: 1.2, loop: false, tint: '#fff8ec',
  tags: ['flour', 'powder', 'dough', 'baking', 'bakery', 'dust', 'kitchen', 'cooking'],
  build(c) {
    const col = c.color('#fff8ec');
    const shade = c.darken(col, 0.08);
    // the ring lies on the counter: flat in 3D, the same ring seen from the side (an ellipse) in 2D. A counter stands above
    // the game's floor, so in 3D it stays at the height it was played at (like the rolling powder) instead of snapping down
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const powder = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.95, 0.08], [0.75, 0.55], [0, 1]]));
    // the powder rolling out low along the counter: a ring of puffs on the floor in 3D, two low side sprays in 2D
    const roll = (p) => c.sys(Object.assign({ tex: 'puff', blend: 'normal', speed: [140, 260], life: [0.8, 1.05], size: [26, 42], rotation: [0, 6.28], color: [col, shade],
      behaviors: [c.speedOverLife(c.decel(0.05)), c.force(0, 14), c.spin(-1.2, 1.2), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.4]])), powder()], order: 2 }, p));
    const rolling = c.is3d
      ? [roll(c.ground({ bursts: [{ count: [12, 14] }], shape: { type: 'circle', radius: 16, thickness: 0, even: true }, offset: [0, 10] }))]
      : [roll({ bursts: [{ count: [5, 6] }], shape: { type: 'cone', radius: 8, angle: 0.15 }, dir: 0.08, offset: [0, 6] }),
        roll({ bursts: [{ count: [5, 6] }], shape: { type: 'cone', radius: 8, angle: 0.15 }, dir: Math.PI - 0.08, offset: [0, 6] })];
    return [
      // a soft, short flash (white light on a bright kitchen would burn out, so it stays faint)
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.4, 0], [0, 1]]))], order: 0 }),
      // powder spreading on the counter
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.5, size: 200, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.5, 0.5], [0, 1]]))], order: 1 }),
      ...rolling,
      // the main cloud: billows up and out, slows, then sinks a little as it settles
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: [8, 10] }, { time: 0.06, count: [3, 4] }], shape: { type: 'cone', radius: 16, angle: 1.35 }, dir: Math.PI / 2,
        speed: [80, 220], life: [0.95, 1.2], size: [40, 66], rotation: [0, 6.28], color: [col, shade],
        behaviors: [c.speedOverLife(c.decel(0.04)), c.gravity(60), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.35], [0.25, 1], [1, 1.45]])), powder()], order: 3 }, 'up')),
      // fine dust hanging in the air and drifting down
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [16, 20] }], shape: { type: 'cone', radius: 14, angle: 1.4 }, dir: Math.PI / 2,
        speed: [140, 330], life: [0.8, 1.15], size: [2, 4], color: [c.lighten(col, 0.4), col],
        behaviors: [c.speedOverLife(c.decel(0.08)), c.gravity(120), c.limitSpeed(260, 1), c.noise(1.5, 12), c.colorOverLife(c.fade(0.6))], order: 4 }, 'up')),
    ];
  },
};
