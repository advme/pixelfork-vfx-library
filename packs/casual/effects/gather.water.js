/** Watering plants: a stream of droplets pours in an arc from a watering can onto the soil, splashing up and spreading wet rings. Loops until stopped. */
export default {
  name: 'gather.water',
  category: 'gather',
  whenToUse: 'A plant, crop, flower bed or garden plot is being watered with a watering can in a farming or garden game. Play it on the soil at the plant\'s base and stop it when watering ends; the water pours in from a can held up to the left (dir: 180 pours from the right instead). For a fountain or a broken pipe use world.fountain; for rain use env.rain.',
  duration: 1, loop: true, anchor: 'feet', tint: '#5cc8ff',
  tags: ['water', 'watering can', 'farm', 'garden', 'plant', 'crop', 'irrigate', 'farming'],
  build(c) {
    const col = c.color('#5cc8ff');
    const light = c.lighten(col, 0.55);
    // the can is up to the left and pours right and a little down; a dir pointing left (180) mirrors it.
    // Only the side is taken from dir: any other angle would make the arc miss the soil.
    const side = c.dir !== undefined && Math.cos(c.dir) < 0 ? -1 : 1;
    const dir = side > 0 ? -0.35 : Math.PI + 0.35;
    const spout = [-side * Math.cos(0.35) * 44, 70];
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      // the stream: drops leave the spout and arc down onto the soil (kept facing the camera so the arc always lands on the plant)
      c.sys({ tex: 'drop', blend: 'normal', loop: true, rate: 40, shape: { type: 'cone', radius: 5, angle: 0.12 }, dir, offset: spout,
        speed: [105, 135], life: [0.32, 0.35], size: [7, 11], color: [col, light],
        behaviors: [c.gravity(1000), c.sizeOverLife(c.curve([[0, 0.6], [0.25, 1], [1, 0.85]])), c.colorOverLife(c.fade(0.85))], order: 2 }),
      // bright glints running down the stream
      c.sys({ tex: 'glow', blend: 'add', loop: true, rate: 16, shape: { type: 'cone', radius: 3, angle: 0.08 }, dir, offset: spout,
        speed: [115, 130], life: [0.3, 0.33], size: [3, 5], color: '#ffffff', stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1000), c.colorOverLife(c.fade(0.7))], order: 3 }),
      // splashes: little droplets hop up where the stream lands
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, rate: 24, shape: { type: 'cone', radius: 10, angle: 0.75 }, dir: Math.PI / 2,
        speed: [100, 170], life: [0.24, 0.34], size: [3, 5], color: [light, '#ffffff'],
        behaviors: [c.gravity(700), c.colorOverLife(c.fade(0.6))], order: 4 }, 'up')),
      // wet rings spreading on the soil
      ring({ blend: 'normal', loop: true, rate: 3, life: [0.45, 0.6], size: [36, 50], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0, 1]]))], order: 1 }),
    ];
  },
};
