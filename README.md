# Pixelfork VFX Library

Ready-made game visual effects (particles) for AI-generated web games. An AI picks a name; it never designs an effect.
90 effects · all drawn in code, nothing to load · overlay over any engine, or inside a three.js scene · pairs with the Super Casual UI Kit.

## Use it in a game (no install)

```html
<script src="https://cdn.jsdelivr.net/gh/advme/pixelfork-vfx-library@v0.8.1-A/dist/vfx.js"></script>
<script>VFX.attach();</script>

<script>VFX.play('hit.impact', { x: 120, y: 340 });</script>
```

**3D (three.js) games** load the module build instead, sharing one three.js through an import map (69 KB gzipped, three.js not included): `dist/vfx.module.js`. See section 4 of the AI guide.

- **AI guide (give this to your AI):** [AI-GUIDE.md](AI-GUIDE.md)
- **See every effect (2D player):** `python3 tools/serve.py 8767` → http://localhost:8767/tools/preview.html
- **3D player (three.js scene):** http://localhost:8767/tools/preview3d.html
- **Demo with the UI kit:** http://localhost:8767/demo/game.html

Built on [three.js](https://threejs.org) and [three.quarks](https://github.com/Alchemist0823/three.quarks) (both MIT), bundled into one file.

## For contributors / AI agents working on the library
Start with `AGENTS.md`, then `STATUS.md`.
