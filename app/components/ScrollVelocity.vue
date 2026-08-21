<template>
  <div class="sv-wrapper">
    <!-- Row 1: moves left -->
    <div class="sv-row">
      <div ref="track1Ref" class="sv-track">
        <!-- 3 identical copies — wrap resets at 1 copy width -->
        <div ref="set1Ref" class="sv-set">
          <span v-for="item in ROW1" :key="'1a-' + item.label" class="sv-item">
            <Icon :name="item.icon" :title="item.label" class="sv-icon" />
          </span>
        </div>
        <div class="sv-set" aria-hidden="true">
          <span v-for="item in ROW1" :key="'1b-' + item.label" class="sv-item">
            <Icon :name="item.icon" :title="item.label" class="sv-icon" />
          </span>
        </div>
        <div class="sv-set" aria-hidden="true">
          <span v-for="item in ROW1" :key="'1c-' + item.label" class="sv-item">
            <Icon :name="item.icon" :title="item.label" class="sv-icon" />
          </span>
        </div>
      </div>
    </div>

    <!-- Row 2: moves right -->
    <div class="sv-row">
      <div ref="track2Ref" class="sv-track">
        <div ref="set2Ref" class="sv-set">
          <span v-for="item in ROW2" :key="'2a-' + item.label" class="sv-item">
            <Icon :name="item.icon" :title="item.label" class="sv-icon" />
          </span>
        </div>
        <div class="sv-set" aria-hidden="true">
          <span v-for="item in ROW2" :key="'2b-' + item.label" class="sv-item">
            <Icon :name="item.icon" :title="item.label" class="sv-icon" />
          </span>
        </div>
        <div class="sv-set" aria-hidden="true">
          <span v-for="item in ROW2" :key="'2c-' + item.label" class="sv-item">
            <Icon :name="item.icon" :title="item.label" class="sv-icon" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const ROW1 = [
  { label: 'JavaScript',   icon: 'logos:javascript' },
  { label: 'TypeScript',   icon: 'logos:typescript-icon' },
  { label: 'React',        icon: 'logos:react' },
  { label: 'Nuxt.js',      icon: 'logos:nuxt-icon' },
  { label: 'Flutter',      icon: 'logos:flutter' },
  { label: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
  { label: 'Bootstrap',    icon: 'logos:bootstrap' },
  { label: 'NestJS',       icon: 'logos:nestjs' },
  { label: 'Node.js',      icon: 'logos:nodejs-icon' },
  { label: 'MySQL',        icon: 'logos:mysql' },
  { label: 'Python',       icon: 'logos:python' },
]

const ROW2 = [
  { label: 'Git',          icon: 'logos:git-icon' },
  { label: 'GitHub',       icon: 'mdi:github' },
  { label: 'Firebase',     icon: 'logos:firebase' },
  { label: 'ChatGPT',      icon: 'simple-icons:openai' },
  { label: 'Gemini AI',    icon: 'logos:google-gemini' },
  { label: 'Notion',       icon: 'logos:notion' },
  { label: 'Figma',        icon: 'logos:figma' },  
]

const track1Ref = ref<HTMLElement | null>(null)
const track2Ref = ref<HTMLElement | null>(null)
const set1Ref   = ref<HTMLElement | null>(null)
const set2Ref   = ref<HTMLElement | null>(null)

const BASE = 0.55
let scrollVel = 0
const SCROLL_SENSITIVITY = 0.08
const DECAY = 0.94
const MAX_VEL = 12

let x1 = 0
let x2 = 0
let w1 = 0  // width of one ROW1 set (measured after mount)
let w2 = 0  // width of one ROW2 set
let lastScrollY = 0
let rafId = 0

const tick = () => {
  if (track1Ref.value && w1 > 0) {
    const net1 = -BASE - scrollVel
    x1 += net1
    // wrap: always stay in [-w1, 0)
    if (x1 <= -w1) x1 += w1
    if (x1 > 0)    x1 -= w1
    track1Ref.value.style.transform = `translateX(${x1}px)`
  }

  if (track2Ref.value && w2 > 0) {
    const net2 = BASE + scrollVel
    x2 += net2
    // wrap: always stay in (-w2, 0]
    if (x2 >= 0)   x2 -= w2
    if (x2 < -w2)  x2 += w2
    track2Ref.value.style.transform = `translateX(${x2}px)`
  }

  scrollVel *= DECAY
  if (Math.abs(scrollVel) < 0.01) scrollVel = 0

  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  nextTick(() => {
    // Measure EXACTLY one set — no divide-by-N guessing
    w1 = set1Ref.value?.offsetWidth ?? 0
    w2 = set2Ref.value?.offsetWidth ?? 0

    // Row 2 starts one set-width to the left so it enters from left edge
    x2 = -w2

    rafId = requestAnimationFrame(tick)
  })

  const onScroll = () => {
    const delta = window.scrollY - lastScrollY
    lastScrollY = window.scrollY
    scrollVel = Math.max(-MAX_VEL, Math.min(MAX_VEL, scrollVel + delta * SCROLL_SENSITIVITY))
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('scroll', onScroll)
  })
})
</script>

<style scoped>
.sv-wrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 0;
  mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
}

.sv-row { overflow: hidden; width: 100%; }

.sv-track {
  display: flex;
  width: max-content;
  will-change: transform;
}

/* Each set is a flex row of items */
.sv-set {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.sv-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  opacity: 0.8;
  transition: opacity 0.2s;
  flex-shrink: 0;
}
.sv-item:hover { opacity: 1; }

.sv-icon {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  color: #f8fafc;
}
</style>
