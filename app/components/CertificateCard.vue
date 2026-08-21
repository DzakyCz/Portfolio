<template>
  <div
    class="cert-card-container flex flex-col h-full group cursor-pointer bg-white dark:bg-[#0D1220] p-0"
    @click="$emit('select')"
  >
    <!-- Image Area -->
    <div class="cert-thumb">
      <img
        v-if="image"
        :src="image"
        :alt="title"
        class="cert-img"
      />
      <div v-else class="cert-placeholder">
        <Icon name="mdi:certificate-outline" class="w-12 h-12 text-accent/20" />
      </div>

      <!-- Hover shine overlay for a premium glassy look -->
      <div class="cert-shine" />
    </div>

    <!-- Info Area -->
    <div class="cert-body">
      <h3 class="cert-title">{{ title }}</h3>
      <p v-if="description" class="cert-desc">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Card component to display certificate information with hover effects and shine overlay
defineProps<{
  title: string;
  description?: string;
  image?: string;
}>();

// Emits 'select' event when the card is clicked to open the modal
defineEmits<{ select: [] }>();
</script>

<style scoped>
/* ── Card shell ── */
.cert-card-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.cert-card-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.15);
}

/* ── Thumbnail area ── */
.cert-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #0A0F1C;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dark .cert-thumb {
  background: #0A0F1C;
}

.cert-img {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
  transition: transform 0.4s ease;
}
.cert-card-container:hover .cert-img {
  transform: scale(1.04);
}

.pdf-overlay,
.cert-pdf-main,
.cert-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* Glassy shine on hover */
.cert-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.cert-card-container:hover .cert-shine {
  opacity: 1;
}

/* ── Body ── */
.cert-body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.75rem 0.9rem 0.9rem;
}

.cert-tag {
  display: inline-block;
  font-size: 0.75rem; /* text-xs */
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a78bfa;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 9999px;
  padding: 0.1rem 0.6rem;
  width: fit-content;
}

.cert-title {
  font-size: 0.875rem; /* text-sm */
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s;
}
.dark .cert-title {
  color: #fff;
}
.cert-card-container:hover .cert-title {
  color: #c4b5fd;
}

.cert-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.dark .cert-desc {
  color: rgba(200, 200, 230, 0.55);
}

.cert-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem; /* text-xs */
  font-weight: 500;
  color: rgba(139, 92, 246, 0.8);
  transition: color 0.2s;
  margin-top: 0.25rem;
}
.cert-link:hover {
  color: #a78bfa;
}
</style>
