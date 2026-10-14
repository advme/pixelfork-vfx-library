/**
 * Procedural sprite textures. Every particle picture the library uses is drawn
 * once on a small canvas when the runtime starts, so there is nothing to load
 * and nothing that can 404. All shapes are white; colour comes from the effect.
 *
 * Names (use them as `tex:` in an effect):
 *   glow    soft radial blob, the workhorse for sparks, dots, flashes
 *   disc    flat circle with a slightly soft edge (fire balls, bubbles)
 *   ring    thin circle outline (shockwaves, pulses)
 *   star    five point star
 *   spark   four point thin sparkle
 *   square  rounded square (confetti, debris)
 *   puff    fluffy cloud (dust, smoke)
 *   plus    rounded cross (healing)
 *   heart   heart (love, health)
 *   drop    teardrop, point up (blood, rain, water; rotate with velocity)
 *   shard   long crystal / diamond (ice, gems, glass)
 *   leaf    pointed leaf
 *   coin    coin: disc with an inner rim
 *   flame   soft teardrop flame, point up
 *   line    thin soft vertical line (rain, speed lines)
 *   z       a bold letter Z (sleep)
 *   key     a simple key, bow at the top (pickups)
 *   ellipse a ring seen at a low angle (a base ring on the ground, 2D)
 *   hexshard one glowing hexagon tile (dome tiles, shield fragments); penttile: its pentagon
 *   arrow   a bold chevron (^) pointing up (stat buffs; rotate by PI for down)
 *   pixel   a hard-edged square, no rounding or blur (retro pixel-art effects)
 *   note    a music note (singing, music, dancing)
 *   bolt    a lightning bolt icon (electric hits, energy pickups)
 *   snowflake  a six-armed snowflake (ice, frost, blizzards)
 *   petal   a rounded blossom petal (cherry blossoms, flowers)
 */
export function makeTextures(THREE) {
  const S = 128;
  const W = (a) => 'rgba(255,255,255,' + a + ')';

  // The picture is drawn on a canvas, but only its ALPHA is kept. The colour
  // channels are forced to pure white. Chrome dithers canvas gradients and
  // stores premultiplied pixels; at faint alpha that turns into large random
  // per-channel colour noise when the texture is uploaded, and additive
  // blending stacks it into visible red/green grain. White + clean alpha has
  // no colour to be noisy.
  function make(draw, w, h) {
    w = w || S; h = h || w;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d');
    draw(g, w, w / 2, h);
    const src = g.getImageData(0, 0, w, h).data;
    const data = new Uint8Array(w * h * 4);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i + 1] = data[i + 2] = 255;
      data[i + 3] = src[i + 3];
    }
    const t = new THREE.DataTexture(data, w, h, THREE.RGBAFormat, THREE.UnsignedByteType);
    t.flipY = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = true;
    t.needsUpdate = true;
    return t;
  }

  function radial(g, s, c, stops) {
    const r = g.createRadialGradient(c, c, 0, c, c, c);
    stops.forEach(([p, a]) => r.addColorStop(p, W(a)));
    g.fillStyle = r;
    g.fillRect(0, 0, s, s);
  }

  function polygon(g, c, points, inner, outer, rot) {
    g.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = rot + (i * Math.PI) / points;
      const x = c + Math.cos(a) * r, y = c + Math.sin(a) * r;
      if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
    }
    g.closePath();
  }

  function soft(g, s) {
    // one blurred pass under a crisp pass gives an anti-aliased, slightly glowing edge
    g.shadowColor = W(1);
    g.shadowBlur = s * 0.04;
  }

  /** A flat-top hexagon path. */
  function hexPath(g, x, y, r) {
    g.beginPath();
    for (let i = 0; i < 6; i++) { const a = (i * Math.PI) / 3; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; if (i === 0) g.moveTo(px, py); else g.lineTo(px, py); }
    g.closePath();
  }

  const textures = {
    glow: make((g, s, c) => radial(g, s, c, [[0, 1], [0.25, 0.85], [0.6, 0.25], [1, 0]])),

    disc: make((g, s, c) => radial(g, s, c, [[0, 1], [0.82, 1], [0.95, 0.6], [1, 0]])),

    ring: make((g, s, c) => {
      const r = g.createRadialGradient(c, c, c * 0.62, c, c, c * 0.96);
      r.addColorStop(0, W(0)); r.addColorStop(0.35, W(1)); r.addColorStop(0.65, W(1)); r.addColorStop(1, W(0));
      g.fillStyle = r; g.fillRect(0, 0, s, s);
    }),

    star: make((g, s, c) => {
      soft(g, s);
      g.fillStyle = W(1);
      polygon(g, c, 5, c * 0.42, c * 0.92, -Math.PI / 2);
      g.fill(); g.fill();
    }),

    spark: make((g, s, c) => {
      soft(g, s);
      g.fillStyle = W(1);
      polygon(g, c, 4, c * 0.14, c * 0.96, 0);
      g.fill(); g.fill();
      radial(g, s, c, [[0, 0.9], [0.18, 0.5], [0.4, 0]]);
    }),

    square: make((g, s, c) => {
      const m = s * 0.12, r = s * 0.1;
      g.fillStyle = W(1);
      g.beginPath();
      g.roundRect(m, m, s - 2 * m, s - 2 * m, r);
      g.fill();
    }),

    puff: make((g, s, c) => {
      // kept well inside the square: when the sprite is drawn small, mipmaps
      // smear anything near the border into a visible box edge
      const blobs = [[0.5, 0.54, 0.34], [0.35, 0.58, 0.25], [0.65, 0.58, 0.25], [0.46, 0.42, 0.25], [0.58, 0.43, 0.22]];
      blobs.forEach(([x, y, r]) => {
        const gr = g.createRadialGradient(x * s, y * s, 0, x * s, y * s, r * s);
        gr.addColorStop(0, W(0.95)); gr.addColorStop(0.7, W(0.6)); gr.addColorStop(1, W(0));
        g.fillStyle = gr; g.fillRect(0, 0, s, s);
      });
    }),

    heart: make((g, s, c) => {
      soft(g, s);
      g.fillStyle = W(1);
      g.beginPath();
      g.moveTo(c, s * 0.9);
      g.bezierCurveTo(s * 0.05, s * 0.55, s * 0.12, s * 0.12, c, s * 0.3);
      g.bezierCurveTo(s * 0.88, s * 0.12, s * 0.95, s * 0.55, c, s * 0.9);
      g.closePath();
      g.fill(); g.fill();
    }),

    drop: make((g, s, c) => {
      soft(g, s);
      g.fillStyle = W(1);
      g.beginPath();
      g.moveTo(c, s * 0.06);
      g.bezierCurveTo(s * 0.62, s * 0.4, s * 0.86, s * 0.55, s * 0.86, s * 0.68);
      g.arc(c, s * 0.68, s * 0.36, 0, Math.PI, false);
      g.bezierCurveTo(s * 0.14, s * 0.55, s * 0.38, s * 0.4, c, s * 0.06);
      g.closePath();
      g.fill(); g.fill();
    }),

    shard: make((g, s, c) => {
      soft(g, s);
      g.fillStyle = W(1);
      g.beginPath();
      g.moveTo(c, s * 0.04); g.lineTo(s * 0.72, s * 0.4); g.lineTo(c, s * 0.96); g.lineTo(s * 0.28, s * 0.4);
      g.closePath();
      g.fill(); g.fill();
      g.fillStyle = W(0.5);
      g.beginPath(); g.moveTo(c, s * 0.04); g.lineTo(s * 0.72, s * 0.4); g.lineTo(c, s * 0.96); g.closePath(); g.fill();
    }),

    leaf: make((g, s, c) => {
      soft(g, s);
      g.fillStyle = W(1);
      g.beginPath();
      g.moveTo(c, s * 0.05);
      g.quadraticCurveTo(s * 0.98, s * 0.35, c, s * 0.95);
      g.quadraticCurveTo(s * 0.02, s * 0.35, c, s * 0.05);
      g.closePath();
      g.fill(); g.fill();
      g.strokeStyle = W(0.45); g.lineWidth = s * 0.04;
      g.beginPath(); g.moveTo(c, s * 0.12); g.lineTo(c, s * 0.9); g.stroke();
    }),

    coin: make((g, s, c) => {
      radial(g, s, c, [[0, 1], [0.86, 1], [0.95, 0.7], [1, 0]]);
      g.globalCompositeOperation = 'destination-out';
      g.strokeStyle = W(0.45); g.lineWidth = s * 0.07;
      g.beginPath(); g.arc(c, c, s * 0.3, 0, Math.PI * 2); g.stroke();
      g.globalCompositeOperation = 'source-over';
    }),

    flame: make((g, s, c) => {
      const r = g.createRadialGradient(c, s * 0.66, 0, c, s * 0.66, s * 0.34);
      r.addColorStop(0, W(1)); r.addColorStop(0.7, W(0.9)); r.addColorStop(1, W(0));
      g.fillStyle = r; g.fillRect(0, 0, s, s);
      g.shadowColor = W(1); g.shadowBlur = s * 0.1;
      g.fillStyle = W(0.95);
      g.beginPath();
      g.moveTo(c, s * 0.04);
      g.bezierCurveTo(s * 0.7, s * 0.4, s * 0.82, s * 0.55, s * 0.8, s * 0.66);
      g.arc(c, s * 0.66, s * 0.3, 0, Math.PI, false);
      g.bezierCurveTo(s * 0.18, s * 0.55, s * 0.3, s * 0.4, c, s * 0.04);
      g.closePath();
      g.fill();
    }),

    line: make((g, s, c) => {
      const r = g.createLinearGradient(0, 0, 0, s);
      r.addColorStop(0, W(0)); r.addColorStop(0.3, W(1)); r.addColorStop(0.7, W(1)); r.addColorStop(1, W(0));
      g.fillStyle = r;
      g.beginPath(); g.roundRect(c - s * 0.06, 0, s * 0.12, s, s * 0.06); g.fill();
    }),

    z: make((g, s, c) => {
      soft(g, s);
      g.fillStyle = W(1);
      g.font = 'bold ' + Math.round(s * 0.95) + 'px "Arial Rounded MT Bold", "Helvetica Neue", Arial, sans-serif';
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('Z', c, c + s * 0.04);
      g.fillText('Z', c, c + s * 0.04);
    }),

    key: make((g, s, c) => {
      soft(g, s);
      g.fillStyle = W(1); g.strokeStyle = W(1);
      g.lineWidth = s * 0.14; g.lineCap = 'round';
      g.beginPath(); g.arc(c, s * 0.3, s * 0.2, 0, Math.PI * 2); g.stroke();      // bow
      g.beginPath(); g.moveTo(c, s * 0.5); g.lineTo(c, s * 0.92); g.stroke();       // shaft
      g.beginPath(); g.moveTo(c, s * 0.9); g.lineTo(s * 0.7, s * 0.9); g.stroke();  // teeth
      g.beginPath(); g.moveTo(c, s * 0.74); g.lineTo(s * 0.64, s * 0.74); g.stroke();
    }),

    // For ribbon trails. The trail shader maps u ALONG the ribbon (u = 0 at the oldest point,
    // the tail end; u = 1 at the mover) and v ACROSS it. So: soft across the width, and
    // fading to nothing toward the tail, or the ribbon would stop with a hard cut.
    ribbon: make((g, s) => {
      const across = g.createLinearGradient(0, 0, 0, s);
      across.addColorStop(0, W(0)); across.addColorStop(0.3, W(0.85)); across.addColorStop(0.5, W(1)); across.addColorStop(0.7, W(0.85)); across.addColorStop(1, W(0));
      g.fillStyle = across; g.fillRect(0, 0, s, s);
      const along = g.createLinearGradient(0, 0, s, 0);
      along.addColorStop(0, W(0)); along.addColorStop(0.08, W(0)); along.addColorStop(0.55, W(0.7)); along.addColorStop(0.9, W(1)); along.addColorStop(1, W(1));
      g.globalCompositeOperation = 'destination-in';
      g.fillStyle = along; g.fillRect(0, 0, s, s);
      g.globalCompositeOperation = 'source-over';
    }),

    plus: make((g, s, c) => {
      soft(g, s);
      const w = s * 0.26, l = s * 0.78, r = s * 0.08;
      g.fillStyle = W(1);
      g.beginPath();
      g.roundRect(c - w / 2, c - l / 2, w, l, r);
      g.roundRect(c - l / 2, c - w / 2, l, w, r);
      g.fill(); g.fill();
    }),

    ellipse: make((g, s, c) => {
      // a ring lying on the ground, seen from a low camera: squashed to a fifth of its width
      g.save(); g.translate(c, c); g.scale(1, 0.2);
      const r = g.createRadialGradient(0, 0, c * 0.7, 0, 0, c * 0.98);
      r.addColorStop(0, W(0)); r.addColorStop(0.45, W(1)); r.addColorStop(0.7, W(1)); r.addColorStop(1, W(0));
      g.fillStyle = r; g.beginPath(); g.arc(0, 0, c, 0, Math.PI * 2); g.fill();
      g.restore();
    }),

    // dome tiles: a bright rim and a faint fill; drawn to the sprite's edge so that, on a mesh tile
    // (helpers.geometry 'hex' / 'pent'), the texture's polygon is the tile's own outline
    hexshard: make((g, s, c) => {
      hexPath(g, c, c, c * 0.98);
      g.fillStyle = W(0.22); g.fill();
      g.shadowBlur = s * 0.1; g.shadowColor = W(1);
      g.lineWidth = s * 0.09; g.lineJoin = 'round'; g.strokeStyle = W(1); g.stroke(); g.stroke();
    }),
    arrow: make((g, s) => {
      // a bold chevron (^): reads as "up" even when small, where an arrow with a shaft looks like a house
      soft(g, s);
      g.strokeStyle = W(1); g.lineWidth = s * 0.2; g.lineCap = 'round'; g.lineJoin = 'round';
      g.beginPath(); g.moveTo(s * 0.16, s * 0.7); g.lineTo(s * 0.5, s * 0.32); g.lineTo(s * 0.84, s * 0.7); g.stroke(); g.stroke();
    }),
    pixel: (() => {
      // drawn without smoothing and sampled NEAREST so it stays a crisp block at any size
      const t = make((g, s) => { g.fillStyle = W(1); g.fillRect(s * 0.1, s * 0.1, s * 0.8, s * 0.8); }, 16);
      t.minFilter = THREE.NearestFilter; t.magFilter = THREE.NearestFilter; t.generateMipmaps = false; t.needsUpdate = true;
      return t;
    })(),
    note: make((g, s) => {
      soft(g, s);
      g.fillStyle = W(1); g.strokeStyle = W(1);
      g.beginPath(); g.ellipse(s * 0.36, s * 0.74, s * 0.17, s * 0.13, -0.4, 0, Math.PI * 2); g.fill();
      g.lineWidth = s * 0.08; g.lineCap = 'round';
      g.beginPath(); g.moveTo(s * 0.5, s * 0.72); g.lineTo(s * 0.5, s * 0.14); g.stroke();
      g.lineWidth = s * 0.1;
      g.beginPath(); g.moveTo(s * 0.5, s * 0.16); g.quadraticCurveTo(s * 0.78, s * 0.24, s * 0.74, s * 0.48); g.stroke();
    }),
    bolt: make((g, s) => {
      soft(g, s);
      g.fillStyle = W(1);
      g.beginPath();
      g.moveTo(s * 0.6, s * 0.04); g.lineTo(s * 0.2, s * 0.56); g.lineTo(s * 0.46, s * 0.56); g.lineTo(s * 0.36, s * 0.96);
      g.lineTo(s * 0.82, s * 0.4); g.lineTo(s * 0.55, s * 0.4); g.lineTo(s * 0.68, s * 0.04);
      g.closePath(); g.fill(); g.fill();
    }),
    snowflake: make((g, s, c) => {
      soft(g, s);
      g.strokeStyle = W(1); g.lineCap = 'round';
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3, ca = Math.cos(a), sa = Math.sin(a), R = c * 0.86;
        g.lineWidth = s * 0.07;
        g.beginPath(); g.moveTo(c, c); g.lineTo(c + ca * R, c + sa * R); g.stroke();
        g.lineWidth = s * 0.05;
        [0.55, 0.78].forEach((t) => {
          const bx = c + ca * R * t, by = c + sa * R * t, k = R * 0.22;
          [a + 0.8, a - 0.8].forEach((b) => { g.beginPath(); g.moveTo(bx, by); g.lineTo(bx + Math.cos(b) * k, by + Math.sin(b) * k); g.stroke(); });
        });
      }
    }),
    petal: make((g, s, c) => {
      soft(g, s);
      g.fillStyle = W(1);
      g.beginPath();
      g.moveTo(c, s * 0.92);
      g.bezierCurveTo(s * 0.08, s * 0.6, s * 0.18, s * 0.1, s * 0.42, s * 0.12);
      g.lineTo(c, s * 0.24); g.lineTo(s * 0.58, s * 0.12);
      g.bezierCurveTo(s * 0.82, s * 0.1, s * 0.92, s * 0.6, c, s * 0.92);
      g.closePath(); g.fill(); g.fill();
    }),
    penttile: make((g, s, c) => {
      g.beginPath();
      for (let i = 0; i < 5; i++) { const a = (i * 2 * Math.PI) / 5; const x = c + Math.cos(a) * c * 0.98, y = c + Math.sin(a) * c * 0.98; if (i === 0) g.moveTo(x, y); else g.lineTo(x, y); }
      g.closePath();
      g.fillStyle = W(0.22); g.fill();
      g.shadowBlur = s * 0.1; g.shadowColor = W(1);
      g.lineWidth = s * 0.09; g.lineJoin = 'round'; g.strokeStyle = W(1); g.stroke(); g.stroke();
    }),
  };
  return textures;
}
