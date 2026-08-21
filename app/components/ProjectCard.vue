<!-- 
  ProjectCard.vue
  Component for displaying individual project items in the portfolio.
  Includes interactive hover states, tech stack labels, and external links.
-->
<template>
  <div
    class="project-card-container flex flex-col h-full group cursor-pointer bg-white dark:bg-[#0D1220]/45 p-0"
  >
    <!-- Image Area (Thumbnail) -->
    <div class="project-thumb">
      <img
        v-if="image"
        :src="image"
        :alt="title"
        class="project-img"
      />
      <div v-else class="project-placeholder">
        <Icon name="mdi:code-braces" class="w-12 h-12 text-accent/20" />
      </div>

      <!-- Action Overlay (Demo & GitHub) — Visible on hover -->
      <div
        class="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto bg-black/40 backdrop-blur-[2px]"
      >
        <a
          v-if="demo && demo !== '#'"
          :href="demo"
          target="_blank"
          class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0f172a] shadow-xl transform transition-transform hover:scale-110"
          @click.stop
        >
          <Icon name="lucide:external-link" class="w-4 h-4" />
        </a>
        <a
          v-if="github && github !== '#'"
          :href="github"
          target="_blank"
          class="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1a1a] text-white border border-white/10 shadow-xl transform transition-transform hover:scale-110"
          @click.stop
        >
          <Icon name="lucide:github" class="w-4 h-4" />
        </a>
      </div>

      <!-- Hover shine overlay (From Certificate Style) -->
      <div class="project-shine" />
    </div>

    <!-- Info Area -->
    <div class="project-body">
      <h3 class="project-title">{{ title }}</h3>
      <p v-if="description" class="project-desc">{{ description }}</p>
      
      <!-- Tech Tags (Pills from Certificate Style) -->
      <div class="flex flex-wrap gap-1.5 mt-auto pt-3">
        <span
          v-for="tag in tags"
          :key="tag"
          class="project-tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<!-- Component properties for defining project details -->
<script setup lang="ts">
/**
 * ProjectCard Component
 * Displays a project item with an image, title, description, and action links.
 * Features a hover effect with a glassy shine and tech stack tags.
 */
defineProps<{
  title: string;
  description?: string;
  tags?: string[];
  image?: string;
  github?: string;
  demo?: string;
}>();
</script>

<style scoped>
/* ── Card shell ── */
.project-card-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.project-card-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.15);
}

/* ── Thumbnail area ── */
.project-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9; /* Keep project aspect ratio */
  background: #0A0F1C;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dark .project-thumb {
  background: #0A0F1C;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.project-card-container:hover .project-img {
  transform: scale(1.04);
}

/* Glassy shine on hover (EXACTLY from CertificateCard) */
.project-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.project-card-container:hover .project-shine {
  opacity: 1;
}

.project-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* ── Body ── */
.project-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.35rem;
  padding: 0.75rem 0.9rem 0.9rem;
}

.project-tag {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8; /* Muted slate grey */
  background: rgba(255, 255, 255, 0.03); /* Very subtle transparency */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
  padding: 0.1rem 0.6rem;
  width: fit-content;
}

.project-title {
  font-size: 0.875rem; /* text-sm to match cert-title */
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  transition: color 0.2s;
}
.dark .project-title {
  color: #fff;
}
.project-card-container:hover .project-title {
  color: #c4b5fd;
}

.project-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.dark .project-desc {
  color: rgba(200, 200, 230, 0.55);
}
</style>
