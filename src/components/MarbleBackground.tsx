import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;      // current rendering x
  y: number;      // current rendering y
  bx: number;     // base anchor x
  by: number;     // base anchor y
  phase: number;  // phase offset for unique wave physics
  speed: number;  // individual morphing rate
  amplitude: number; // local drift amplitude
}

interface MarbleVein {
  points: Point[];
  width: number;
  opacity: number;
  isFineCapillary: boolean;
}

interface MineralCloud {
  x: number;
  y: number;
  bx: number;
  by: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
  opacity: number;
  phase: number;
  speed: number;
}

interface MarbleBackgroundProps {
  language?: string;
}

export default function MarbleBackground({ language = 'en' }: MarbleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const languageRef = useRef(language);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const veins: MarbleVein[] = [];
    const clouds: MineralCloud[] = [];

    // Halton sequence or noise values to distribute seeds nicely
    const getJaggedPath = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      amplitude: number,
      subdivisions: number
    ): Point[] => {
      const pts: Point[] = [];
      const steps = Math.pow(2, subdivisions);

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        // Linear interpolation
        const px = startX + (endX - startX) * t;
        const py = startY + (endY - startY) * t;

        // Add multi-octave jagged noise perpendicular to the direction
        let displacement = 0;
        if (i > 0 && i < steps) {
          // Add random mid-point displacement for true crystalline look
          displacement = (Math.random() - 0.5) * amplitude;
        }

        const dx = endX - startX;
        const dy = endY - startY;
        const len = Math.sqrt(dx * dx + dy * dy);
        const nx = -dy / len;
        const ny = dx / len;

        const bx = px + nx * displacement;
        const by = py + ny * displacement;

        pts.push({
          x: bx,
          y: by,
          bx: bx,
          by: by,
          phase: Math.random() * Math.PI * 2,
          speed: 0.15 + Math.random() * 0.25,
          amplitude: 8 + Math.random() * 12
        });
      }

      return pts;
    };

    const initializeMarble = (w: number, h: number) => {
      veins.length = 0;
      clouds.length = 0;

      // 1. Generate soft mineral clouding to mimic deep stone sediments under the surface
      const cloudCount = 20;
      for (let i = 0; i < cloudCount; i++) {
        const rx = 150 + Math.random() * 300;
        const ry = 80 + Math.random() * 160;
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        clouds.push({
          x: cx,
          y: cy,
          bx: cx,
          by: cy,
          radiusX: rx,
          radiusY: ry,
          rotation: Math.random() * Math.PI * 2,
          opacity: 0.015 + Math.random() * 0.02,
          phase: Math.random() * Math.PI * 2,
          speed: 0.05 + Math.random() * 0.08
        });
      }

      // 2. Generate detailed jagged main failure trenches
      const mainVeinLines = 7;
      for (let v = 0; v < mainVeinLines; v++) {
        // Start around the top/left edge and slide down to bottom/right
        const startX = (v / (mainVeinLines - 1)) * w * 1.3 - (w * 0.15);
        const startY = -80;
        const endX = startX + w * 0.45 + (Math.random() * 150 - 75);
        const endY = h + 100;

        // Subdivide paths 5 times to make highly jagged, grain-like micro fissures
        const pts = getJaggedPath(startX, startY, endX, endY, 65, 5);

        veins.push({
          points: pts,
          width: 0.85 + Math.random() * 0.9,
          opacity: 0.045 + Math.random() * 0.04,
          isFineCapillary: false
        });

        // 3. For each main fissure path, branch custom networks/webbing to match the reference
        pts.forEach((p, idx) => {
          // Every 4th jagged point, create a fine web vein branching off
          if (idx % 4 === 0 && idx > 0 && idx < pts.length - 1 && Math.random() > 0.18) {
            const angle = (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 4 + Math.random() * Math.PI / 3);
            const branchLen = 80 + Math.random() * 220;

            // Calculate branch destination vector
            const nextIdx = Math.min(idx + 1, pts.length - 1);
            const dx = pts[nextIdx].bx - p.bx;
            const dy = pts[nextIdx].by - p.by;
            const baseAngle = Math.atan2(dy, dx);
            const targetX = p.bx + Math.cos(baseAngle + angle) * branchLen;
            const targetY = p.by + Math.sin(baseAngle + angle) * branchLen;

            // Highly jagged secondary path
            const branchPts = getJaggedPath(p.bx, p.by, targetX, targetY, 20, 4);

            veins.push({
              points: branchPts,
              width: 0.35 + Math.random() * 0.4,
              opacity: 0.02 + Math.random() * 0.035,
              isFineCapillary: true
            });

            // Sub-branches from branches (tertiary micro capillaries)
            if (branchPts.length > 6 && Math.random() > 0.45) {
              const midPt = branchPts[Math.floor(branchPts.length / 2)];
              const subAngle = baseAngle - angle + (Math.random() * 0.6 - 0.3);
              const subLen = 40 + Math.random() * 90;
              const subTargetX = midPt.bx + Math.cos(subAngle) * subLen;
              const subTargetY = midPt.by + Math.sin(subAngle) * subLen;

              const subBranchPts = getJaggedPath(midPt.bx, midPt.by, subTargetX, subTargetY, 10, 3);
              veins.push({
                points: subBranchPts,
                width: 0.2 + Math.random() * 0.25,
                opacity: 0.01 + Math.random() * 0.02,
                isFineCapillary: true
              });
            }
          }
        });
      }
    };

    initializeMarble(width, height);

    // Create pre-rendered noise pattern for luxurious stucco/plaster stone grain texture
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = 128;
    noiseCanvas.height = 128;
    const nCtx = noiseCanvas.getContext('2d');
    let noisePattern: CanvasPattern | null = null;
    if (nCtx) {
      const imgData = nCtx.createImageData(128, 128);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        // Subtle plaster stone noise density
        const val = Math.floor(Math.random() * 12);
        data[i] = val;     // R
        data[i+1] = val;   // G
        data[i+2] = val;   // B
        data[i+3] = 16;    // Low opacity alpha (approx 0.06)
      }
      nCtx.putImageData(imgData, 0, 0);
      noisePattern = ctx.createPattern(noiseCanvas, 'repeat');
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initializeMarble(width, height);
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.002; // Very slow, luxurious time scale for fluid metamorphic shift
      ctx.clearRect(0, 0, width, height);

      // Create rich underlying ivory/limestone base color with micro gradient matching Ritz-Carlton "One Bay Park" billboard
      const backGrad = ctx.createLinearGradient(0, 0, width, height);
      backGrad.addColorStop(0, '#f5f1e8');
      backGrad.addColorStop(0.35, '#eae4d9');
      backGrad.addColorStop(0.7, '#e0d8cb');
      backGrad.addColorStop(1, '#d5cebe');
      ctx.fillStyle = backGrad;
      ctx.fillRect(0, 0, width, height);

      // Render 0. Giant luxury background watermark typography (sublime embedded stone look)
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(28, 25, 23, 0.016)'; // extremely low opacity bronze/charcoal
      
      const currentLang = languageRef.current;
      if (currentLang === 'zh') {
        // Top watermark: "天  御" with imperial Chinese serif typography
        ctx.font = 'normal 900 13vw "Noto Serif SC", "Source Han Serif SC", "Songti SC", "STSong", serif';
        ctx.fillText('天   御', width * 0.5, height * 0.3);
        // Bottom watermark: "物 理 网 桥"
        ctx.font = 'normal 600 6.5vw "Noto Serif SC", "Source Han Serif SC", "Songti SC", "STSong", serif';
        ctx.fillText('物  理  网  桥', width * 0.5, height * 0.7);
      } else {
        // Top watermark: "A N T H E"
        ctx.font = 'normal 100 12vw "Cinzel", "Playfair Display", "Didot", "Garamond", "Georgia", serif';
        ctx.fillText('A N T H E', width * 0.5, height * 0.3);
        
        // Bottom watermark: "B R I D G E"
        ctx.fillText('B R I D G E', width * 0.5, height * 0.7);
      }
      ctx.restore();

      // Apply the pre-rendered fine plaster texture pattern on top of the gradient and watermark
      if (noisePattern) {
        ctx.save();
        ctx.fillStyle = noisePattern;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // Render 1. Flowing Mineral Clouds for realistic granular depth
      clouds.forEach((cloud) => {
        cloud.phase += cloud.speed * 0.02;
        // Breathes and shifts smoothly
        const driftX = Math.sin(cloud.phase + time) * 35;
        const driftY = Math.cos(cloud.phase * 0.8 - time) * 20;

        cloud.x = cloud.bx + driftX;
        cloud.y = cloud.by + driftY;

        ctx.save();
        ctx.beginPath();
        ctx.translate(cloud.x, cloud.y);
        ctx.rotate(cloud.rotation + Math.sin(time * 0.04) * 0.12);

        const radialGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(cloud.radiusX, cloud.radiusY));
        // Soft charcoal mineral dusting
        radialGrad.addColorStop(0, `rgba(50, 46, 42, ${cloud.opacity})`);
        radialGrad.addColorStop(0.4, `rgba(60, 56, 52, ${cloud.opacity * 0.45})`);
        radialGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = radialGrad;
        ctx.scale(cloud.radiusX / cloud.radiusY, 1);
        ctx.arc(0, 0, cloud.radiusY, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Render 2. Jagged Marble Veins
      veins.forEach((vein) => {
        if (vein.points.length < 2) return;

        // Displace points dynamically using wave interference to morph the marble coordinates
        vein.points.forEach((p) => {
          p.phase += p.speed * 0.025;
          // Harmonic wave interference translates standard positions to organic metamorphic state
          const flowX = Math.sin(p.phase + time) * p.amplitude;
          const flowY = Math.cos(p.phase * 0.7 - time) * (p.amplitude * 0.75);

          // Deep high-frequency wobbler so lines follow the mineral grains
          const geologicalGripX = Math.sin((p.by + time * 15) * 0.015) * 6;
          const geologicalGripY = Math.cos((p.bx - time * 10) * 0.015) * 4;

          p.x = p.bx + flowX + geologicalGripX;
          p.y = p.by + flowY + geologicalGripY;
        });

        // Layer 1: Translucent deep feathering (gives the crystal glow inside stone)
        ctx.beginPath();
        ctx.strokeStyle = `rgba(32, 29, 27, ${vein.opacity * 0.18})`;
        ctx.lineWidth = vein.width * 7.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.moveTo(vein.points[0].x, vein.points[0].y);
        for (let i = 1; i < vein.points.length - 1; i++) {
          const xc = (vein.points[i].x + vein.points[i + 1].x) / 2;
          const yc = (vein.points[i].y + vein.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(vein.points[i].x, vein.points[i].y, xc, yc);
        }
        ctx.quadraticCurveTo(
          vein.points[vein.points.length - 2].x,
          vein.points[vein.points.length - 2].y,
          vein.points[vein.points.length - 1].x,
          vein.points[vein.points.length - 1].y
        );
        ctx.stroke();

        // Layer 2: Main crisp high-definition crack (true granite/limestone fissure)
        ctx.beginPath();
        const baseColorOpacity = vein.isFineCapillary ? vein.opacity * 0.72 : vein.opacity;
        ctx.strokeStyle = `rgba(22, 19, 17, ${baseColorOpacity})`;
        ctx.lineWidth = vein.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.moveTo(vein.points[0].x, vein.points[0].y);
        for (let i = 1; i < vein.points.length - 1; i++) {
          const xc = (vein.points[i].x + vein.points[i + 1].x) / 2;
          const yc = (vein.points[i].y + vein.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(vein.points[i].x, vein.points[i].y, xc, yc);
        }
        ctx.quadraticCurveTo(
          vein.points[vein.points.length - 2].x,
          vein.points[vein.points.length - 2].y,
          vein.points[vein.points.length - 1].x,
          vein.points[vein.points.length - 1].y
        );
        ctx.stroke();

        // Layer 3: Ultra-sharp micro granite accents inside some primary vectors
        if (!vein.isFineCapillary && vein.width > 1.25) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(10, 8, 7, ${vein.opacity * 1.5})`;
          ctx.lineWidth = vein.width * 0.35;
          ctx.moveTo(vein.points[0].x, vein.points[0].y);
          for (let i = 1; i < vein.points.length - 1; i++) {
            const xc = (vein.points[i].x + vein.points[i + 1].x) / 2;
            const yc = (vein.points[i].y + vein.points[i + 1].y) / 2;
            ctx.quadraticCurveTo(vein.points[i].x, vein.points[i].y, xc, yc);
          }
          ctx.quadraticCurveTo(
            vein.points[vein.points.length - 2].x,
            vein.points[vein.points.length - 2].y,
            vein.points[vein.points.length - 1].x,
            vein.points[vein.points.length - 1].y
          );
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 block"
    />
  );
}
