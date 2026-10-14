/** Police lights: red and blue flashing in turn, with a big wash of colour around them. Loops until stopped. */
export default {
  name: 'vehicle.siren',
  category: 'vehicle',
  whenToUse: 'A police car, ambulance, fire truck or alarm is flashing: a chase, a crime or heist game, an emergency, a wanted level. Follow the light bar on the roof; stop it when the chase ends.',
  duration: 0.6, loop: true,
  tags: ['police', 'siren', 'chase', 'crime', 'cop', 'emergency', 'alarm', 'wanted', 'vehicle'],
  build(c) {
    const flash = (color, x, at) => [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.6, bursts: [{ time: at, count: 1 }, { time: at + 0.1, count: 1 }], life: 0.09, size: 54, offset: [x, 0], color,
        behaviors: [c.colorOverLife(c.fade(0.5))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: 0.6, bursts: [{ time: at, count: 1 }, { time: at + 0.1, count: 1 }], life: 0.09, size: 70, offset: [x, 0], color: '#ffffff',
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.6, bursts: [{ time: at, count: 1 }], life: 0.26, size: 240, offset: [x, 0], color,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0.3, 0.4], [0, 1]]))], order: 0 }),
    ];
    return [...flash('#ff2a3a', -16, 0), ...flash('#2a6bff', 16, 0.3)];
  },
};
