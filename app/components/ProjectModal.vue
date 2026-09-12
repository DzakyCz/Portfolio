<template>
  <Teleport to="body">
    <Transition
      enter-active-class="project-modal-enter-active"
      enter-from-class="project-modal-enter-from"
      enter-to-class="project-modal-enter-to"
      leave-active-class="project-modal-leave-active"
      leave-from-class="project-modal-leave-from"
      leave-to-class="project-modal-leave-to"
    >
      <div v-if="project" class="project-modal-backdrop" @click.self="$emit('close')">
        <div class="project-modal-panel" data-lenis-prevent>
          <button class="project-modal-close" type="button" aria-label="Close project details" @click="$emit('close')">
            <Icon name="mdi:close" class="w-6 h-6" />
          </button>

          <div class="project-modal-thumb">
            <img v-if="project.image" :src="project.image" :alt="project.title" class="project-modal-img" />
            <Icon v-else name="mdi:code-braces" class="w-16 h-16 text-accent/40" />
          </div>

          <div class="project-modal-body">
            <h2 class="project-modal-title">{{ project.title }}</h2>

            <div v-if="project.tags?.length" class="project-modal-tags">
              <span v-for="tag in project.tags" :key="tag" class="project-modal-tag">{{ tag }}</span>
            </div>

            <template v-if="project.description">
              <h4 class="project-modal-section-label">About this project</h4>
              <p class="project-modal-desc">{{ project.description }}</p>
            </template>

            <div v-if="hasLinks" class="project-modal-links">
              <a
                v-if="project.github && project.github !== '#'"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="project-modal-link"
              >
                <Icon name="lucide:github" class="w-4 h-4" />
                View on GitHub
              </a>
              <a
                v-if="project.demo && project.demo !== '#'"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="project-modal-link project-modal-link-primary"
              >
                <Icon name="lucide:external-link" class="w-4 h-4" />
                Open Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  project: {
    title: string;
    description?: string;
    image?: string;
    tags?: string[];
    github?: string | null;
    demo?: string | null;
  } | null;
}>();

const emit = defineEmits<{ close: [] }>();
const nuxtApp = useNuxtApp();
const lenis = nuxtApp.$lenis;

const hasLinks = computed(() => Boolean(
  (props.project?.github && props.project.github !== '#') ||
  (props.project?.demo && props.project.demo !== '#'),
));

watch(() => props.project, (project) => {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = project ? 'hidden' : '';
  if (lenis) project ? (lenis as any).stop() : (lenis as any).start();
});

onMounted(() => {
  const handleKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.project) emit('close');
  };
  window.addEventListener('keydown', handleKey);
  onUnmounted(() => window.removeEventListener('keydown', handleKey));
});

onUnmounted(() => {
  if (typeof document !== 'undefined') document.body.style.overflow = '';
  if (lenis) (lenis as any).start();
});
</script>

<style scoped>
.project-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
}
.project-modal-panel {
  position: relative;
  width: 100%;
  max-width: 800px;
  max-height: 95vh;
  overflow-y: auto;
  background: #020617;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
}
.project-modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.2s;
}
.project-modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}
.project-modal-thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 220px;
  background: #080717;
}
.project-modal-img {
  width: 100%;
  max-height: 55vh;
  object-fit: contain;
}
.project-modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem 1.75rem;
}
.project-modal-title {
  max-width: 90%;
  color: white;
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.3;
}
.project-modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.project-modal-tag {
  padding: 0.25rem 0.6rem;
  color: #c4b5fd;
  font-size: 0.7rem;
  font-weight: 600;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 9999px;
}
.project-modal-section-label {
  margin-top: 0.5rem;
  color: rgba(200, 200, 230, 0.5);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.project-modal-desc {
  color: rgba(200, 200, 230, 0.75);
  font-size: 0.9rem;
  line-height: 1.65;
}
.project-modal-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
}
.project-modal-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.9rem;
  color: #c4b5fd;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(139, 92, 246, 0.35);
  border-radius: 0.5rem;
  transition: all 0.2s;
}
.project-modal-link:hover {
  background: rgba(139, 92, 246, 0.12);
  border-color: rgba(139, 92, 246, 0.6);
}
.project-modal-link-primary {
  color: white;
  background: rgba(139, 92, 246, 0.75);
  border-color: transparent;
}
.project-modal-link-primary:hover {
  background: rgba(124, 58, 237, 0.95);
}
.project-modal-enter-active,
.project-modal-leave-active { transition: opacity 0.25s ease; }
.project-modal-enter-from,
.project-modal-leave-to { opacity: 0; }

@media (max-width: 639px) {
  .project-modal-body { padding: 1rem 1rem 1.25rem; }
  .project-modal-title { font-size: 1.1rem; }
}
</style>
