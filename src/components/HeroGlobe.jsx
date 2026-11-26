import React, { useEffect, useRef } from 'react';

const HeroGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const POINT_COUNT = 340;
    const rawPoints = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / POINT_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      rawPoints.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      });
    }

    function latLngToVec(lat, lng) {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lng + 180) * Math.PI) / 180;
      return {
        x: -Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    }

    const hubs = [
      latLngToVec(20.59, 78.96),
      latLngToVec(51.51, -0.13),
      latLngToVec(40.71, -74.01),
      latLngToVec(43.65, -79.38),
      latLngToVec(-33.87, 151.21),
      latLngToVec(52.52, 13.40),
      latLngToVec(1.35, 103.82),
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rotY = 0.55;
    let rotX = -0.3;
    let velocityY = 0;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let rafId = null;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderFrame();
    }

    function projectPoint(p, ry, rx) {
      const cy = Math.cos(ry);
      const sy = Math.sin(ry);
      const x1 = p.x * cy - p.z * sy;
      const z1 = p.x * sy + p.z * cy;
      const cx = Math.cos(rx);
      const sx = Math.sin(rx);
      const y1 = p.y * cx - z1 * sx;
      const z2 = p.y * sx + z1 * cx;
      return { x: x1, y: y1, z: z2 };
    }

    function renderFrame() {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      const radius = Math.min(width, height) * 0.37;
      const cx = width * 0.5;
      const cy = height * 0.5;

      // Monochrome sphere boundary & orbital meridian
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.translate(cx, cy);
      ctx.rotate(-0.32);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.32, radius * 0.28, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.20)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      const projected = new Array(rawPoints.length);
      for (let i = 0; i < rawPoints.length; i++) {
        const r = projectPoint(rawPoints[i], rotY, rotX);
        projected[i] = { x: cx + r.x * radius, y: cy + r.y * radius, z: r.z };
      }
      projected.sort((a, b) => a.z - b.z);

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depth = (p.z + 1.15) / 2.15;
        const alpha = Math.max(0.1, 0.14 + depth * 0.45);
        const size = Math.max(0.9, 0.7 + depth * 1.25);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < hubs.length; i++) {
        const r = projectPoint(hubs[i], rotY, rotX);
        const px = cx + r.x * radius;
        const py = cy + r.y * radius;
        const depth = (r.z + 1.15) / 2.15;
        const alpha = 0.35 + depth * 0.65;
        const size = 2.4 + depth * 2;

        if (depth > 0.45) {
          ctx.globalAlpha = 0.28 * depth;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.arc(px, py, size * 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    }

    function stepMomentum() {
      if (isDragging || Math.abs(velocityY) < 0.0001) {
        velocityY = 0;
        rafId = null;
        return;
      }
      rotY += velocityY;
      velocityY *= 0.92;
      renderFrame();
      rafId = requestAnimationFrame(stepMomentum);
    }

    function onPointerDown(e) {
      isDragging = true;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      velocityY = 0;
      if (rafId) cancelAnimationFrame(rafId);
      canvas.style.cursor = 'grabbing';
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // Ignore capture failure on unsupported pointers
      }
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      rotY += dx * 0.008;
      rotX += dy * 0.005;
      rotX = Math.max(-1.15, Math.min(1.15, rotX));
      velocityY = dx * 0.0025;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      renderFrame();
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      canvas.style.cursor = 'grab';
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore release failure
      }
      if (Math.abs(velocityY) > 0.0002) {
        rafId = requestAnimationFrame(stepMomentum);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.parentElement);
    resize();

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <div
      className="relative w-full h-full min-h-[300px] rounded-[var(--r-lg)] border border-[var(--line)] bg-[#000000] overflow-hidden select-none"
      role="img"
      aria-label="Interactive globe showing studio collaboration across India, UK, US, Canada, Germany, Singapore and Australia"
    >
      <canvas ref={canvasRef} className="block w-full h-full cursor-grab touch-pan-y" />
      <div className="absolute top-4 left-5 right-5 flex items-center justify-between gap-2 text-[13px] font-medium text-[#a3a3a3] pointer-events-none">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ffffff]" aria-hidden="true" />
          <span>IN · UK · US · CA · EU · APAC</span>
        </span>
        <span>Drag to rotate</span>
      </div>
    </div>
  );
};

export default HeroGlobe;
