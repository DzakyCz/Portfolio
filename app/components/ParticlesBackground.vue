<template>
  <canvas ref="canvasRef" class="particles-canvas" aria-hidden="true" />
</template>

<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null);

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  color: string;
  life: number;
  maxLife: number;
}

const COLORS = [
  'rgba(167,139,250,', // violet
  'rgba(96,165,250,',  // blue
  'rgba(240,171,252,', // pink-purple
  'rgba(129,140,248,', // indigo
  'rgba(196,181,253,', // light violet
];

// Interactive selectors — no particles when hovering these
const BLOCK_SELECTORS = [
  'a', 'button', 'input', 'textarea', 'select',
  '[class*="card"]', '[class*="glass"]', '[class*="btn"]',
  '[class*="nav"]', 'nav', 'header', 'footer',
  '[class*="modal"]', '[class*="form"]', '[class*="badge"]',
].join(',');

let particles: Particle[] = [];
let animationId = 0;

// Real mouse position (updated immediately)
let mouse = { x: -9999, y: -9999 };

// Lagged mouse position (lerps toward real mouse — gives the trailing feel)
let lagMouse = { x: -9999, y: -9999 };

// Lerp factor: lower = more lag / slower follow (0.04 = ~4% per frame ≈ nice trail)
const LERP = 0.06;

let lastSpawn = 0;
let isOverInteractive = false;

const spawnParticle = (x: number, y: number) => {
  const angle = Math.random() * Math.PI * 2;
  // Very slow drift speed
  const speed = Math.random() * 0.25 + 0.05;
  const color = (COLORS[Math.floor(Math.random() * COLORS.length)] ?? COLORS[0]) as string;
  // Longer life so they linger more gracefully
  const maxLife = Math.random() * 140 + 80;

  particles.push({
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: Math.random() * 1.6 + 0.4,
    alpha: 0,
    targetAlpha: Math.random() * 0.5 + 0.15,
    color,
    life: 0,
    maxLife,
  });
};

const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, now: number) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Lerp lagMouse toward real mouse (creates the soft trailing delay)
  if (mouse.x > 0) {
    lagMouse.x += (mouse.x - lagMouse.x) * LERP;
    lagMouse.y += (mouse.y - lagMouse.y) * LERP;
  }

  // Spawn from lagged position so particles themselves also trail behind
  if (!isOverInteractive && now - lastSpawn > 35 && lagMouse.x > 0) {
    for (let i = 0; i < 2; i++) {
      const dx = (Math.random() - 0.5) * 24;
      const dy = (Math.random() - 0.5) * 24;
      spawnParticle(lagMouse.x + dx, lagMouse.y + dy);
    }
    lastSpawn = now;
  }

  particles = particles.filter((p) => p.life < p.maxLife);

  for (const p of particles) {
    p.life++;
    const t = p.life / p.maxLife;

    // Smooth fade in / fade out
    if (t < 0.15) {
      p.alpha = p.targetAlpha * (t / 0.15);
    } else {
      p.alpha = p.targetAlpha * (1 - (t - 0.15) / 0.85);
    }

    // Very gentle repulsion from lagged cursor (slow drift outward)
    const dx = p.x - lagMouse.x;
    const dy = p.y - lagMouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    p.vx += (dx / dist) * 0.004;
    p.vy += (dy / dist) * 0.004;

    // Heavy damping = slow movement
    p.vx *= 0.96;
    p.vy *= 0.96;
    p.x += p.vx;
    p.y += p.vy;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `${p.color}${p.alpha.toFixed(3)})`;
    ctx.fill();
  }

  animationId = requestAnimationFrame((ts) => draw(ctx, canvas, ts));
};

const resize = (canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  resize(canvas);
  const onResize = () => resize(canvas);
  window.addEventListener('resize', onResize);

  const onMouseMove = (e: MouseEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Initialise lagMouse on first movement to avoid a big jump
    if (lagMouse.x < 0) {
      lagMouse.x = mouse.x;
      lagMouse.y = mouse.y;
    }

    // Check if over an interactive element
    const target = e.target as Element;
    isOverInteractive = !!target.closest(BLOCK_SELECTORS);
  };

  const onMouseLeave = () => {
    mouse.x = -9999;
    mouse.y = -9999;
    lagMouse.x = -9999;
    lagMouse.y = -9999;
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseleave', onMouseLeave);

  animationId = requestAnimationFrame((ts) => draw(ctx, canvas, ts));

  onUnmounted(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseleave', onMouseLeave);
    window.removeEventListener('resize', onResize);
  });
});
</script>

<style scoped>
.particles-canvas {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  width: 100%;
  height: 100%;
}
</style>
