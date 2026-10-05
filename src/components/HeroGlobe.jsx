import React, { useEffect, useRef } from 'react';

const HeroGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const POINT_COUNT = 360;
    const rawPoints = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / POINT_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      rawPoints.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta)
      });
    }

    function latLngToVec(lat, lng) {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lng + 180) * Math.PI / 180;
      return {
        x: -Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta)
      };
    }
    
    const hubs = [
      latLngToVec(20.59, 78.96),
      latLngToVec(51.51, -0.13),
      latLngToVec(40.71, -74.01),
      latLngToVec(43.65, -79.38),
      latLngToVec(-33.87, 151.21),
      latLngToVec(52.52, 13.40),
      latLngToVec(1.35, 103.82)
    ];

    let width = 0, height = 0, dpr = 1;
    let rotY = 0;
    let rotX = -0.32;
    let velocityY = 0;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let lastTime = 0;
    let rafId = null;

    function resize() {
      // Ensure canvas takes up its container size properly
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function projectPoint(p, ry, rx) {
      const cy = Math.cos(ry), sy = Math.sin(ry);
      const x1 = p.x * cy - p.z * sy;
      const z1 = p.x * sy + p.z * cy;
      const cx = Math.cos(rx), sx = Math.sin(rx);
      const y1 = p.y * cx - z1 * sx;
      const z2 = p.y * sx + z1 * cx;
      return { x: x1, y: y1, z: z2 };
    }

    function draw(now) {
      rafId = requestAnimationFrame(draw);
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
      lastTime = now;

      if (!isDragging) {
        rotY += 0.16 * dt;
        rotY += velocityY;
        velocityY *= 0.94;
        if (Math.abs(velocityY) < 0.00005) velocityY = 0;
      }

      ctx.clearRect(0, 0, width, height);
      
      // Calculate radius relative to screen size so it always fits nicely
      const radius = Math.min(width, height) * 0.45; 
      
      // Push globe slightly to the right on desktop, center on mobile
      const cx = width > 768 ? width * 0.75 : width * 0.5; 
      const cy = height * 0.5;

      const projected = new Array(rawPoints.length);
      for (let i = 0; i < rawPoints.length; i++) {
        const r = projectPoint(rawPoints[i], rotY, rotX);
        projected[i] = { x: cx + r.x * radius, y: cy + r.y * radius, z: r.z };
      }
      projected.sort((a, b) => a.z - b.z);

      // Draw normal points
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depth = (p.z + 1.15) / 2.15;
        // Boosted alpha slightly so it's more visible on black bg
        const alpha = Math.max(0.1, 0.2 + depth * 0.5); 
        const size = Math.max(0.8, 0.6 + depth * 1.5);
        
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw hubs
      for (let i = 0; i < hubs.length; i++) {
        const r = projectPoint(hubs[i], rotY, rotX);
        const px = cx + r.x * radius;
        const py = cy + r.y * radius;
        const depth = (r.z + 1.15) / 2.15;
        const alpha = 0.3 + depth * 0.7;
        const size = 1.5 + depth * 1.5;

        // Subtle glow for hubs
        if (depth > 0.35) {
          const halo = ctx.createRadialGradient(px, py, 0, px, py, size * 5);
          halo.addColorStop(0, `rgba(255, 255, 255, ${0.4 * depth})`);
          halo.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.globalAlpha = 1;
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(px, py, size * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.35 + Math.sin(now * 0.0002) * 0.05);

      // Inner subtle ring
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.42, radius * 0.32, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; 
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    }

    function onPointerDown(e) {
      isDragging = true;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      velocityY = 0;
      canvas.style.cursor = 'grabbing';
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      rotY += dx * 0.008;
      rotX += dy * 0.005;
      rotX = Math.max(-1.15, Math.min(1.15, rotX));
      velocityY = dx * 0.0009;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
    }

    function onPointerUp(e) {
      isDragging = false;
      canvas.style.cursor = 'grab';
      try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
    }

    // Use resize observer to accurately catch container size changes
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas.parentElement);

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  // Changed z-index from -z-10 to z-0 so it doesn't fall behind the document body background
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <canvas ref={canvasRef} className="block w-full h-full opacity-60 mix-blend-screen" />
    </div>
  );
};

export default HeroGlobe;
