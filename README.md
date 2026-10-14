# Pixelfork VFX Library

Ready-made game visual effects (particles) for AI-generated web games. An AI picks a name; it never designs an effect.
475 effects · all drawn in code, nothing to load · overlay over any engine, or inside a three.js scene · pairs with the Super Casual UI Kit.

## Use it in a game (no install)

```html
<script src="https://cdn.jsdelivr.net/gh/advme/pixelfork-vfx-library@v0.13.0-A/dist/vfx.js"></script>
<script>VFX.attach();</script>

<script>VFX.play('hit.impact', { x: 120, y: 340 });</script>
```

**3D (three.js) games** load the module build instead, sharing one three.js through an import map (about 220 KB gzipped, three.js not included): `dist/vfx.module.js`. See section 3 of the AI guide.

- **AI guide (give this to your AI):** [AI-GUIDE.md](AI-GUIDE.md)
- **See every effect (2D player):** `node tools/serve.mjs 8767` → http://localhost:8767/tools/preview.html (3D: `preview3d.html`, make new effects with AI: `maker.html`)
- **3D player (three.js scene):** http://localhost:8767/tools/preview3d.html
- **Demo with the UI kit:** http://localhost:8767/demo/game.html

Built on [three.js](https://threejs.org) and [three.quarks](https://github.com/Alchemist0823/three.quarks) (both MIT), bundled into one file.

## For contributors / AI agents working on the library
Start with `AGENTS.md`, then `STATUS.md`.

## Licence

**Source-available, non-commercial.** Copyright (c) 2026 Pixelfork. All rights reserved.

You may view, fork, modify and use this for personal projects, learning and evaluation.
**You may not use it in anything commercial** — including free games that make money from
ads or in-app purchases — without a written commercial licence from Pixelfork.

See [LICENSE](LICENSE) for the full terms.
