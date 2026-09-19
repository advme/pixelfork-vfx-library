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
  function make(draw) {
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const g = c.getContext('2d');
    draw(g, S, S / 2);
    const src = g.getImageData(0, 0, S, S).data;
    const data = new Uint8Array(S * S * 4);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i + 1] = data[i + 2] = 255;
      data[i + 3] = src[i + 3];
    }
    const t = new THREE.DataTexture(data, S, S, THREE.RGBAFormat, THREE.UnsignedByteType);
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

  return {
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
  };
}
