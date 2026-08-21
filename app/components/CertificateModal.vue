<template>
  <Teleport to="body">
    <Transition
      enter-active-class="modal-enter-active"
      enter-from-class="modal-enter-from"
      enter-to-class="modal-enter-to"
      leave-active-class="modal-leave-active"
      leave-from-class="modal-leave-from"
      leave-to-class="modal-leave-to"
    >
      <div v-if="cert" class="modal-backdrop" @click.self="$emit('close')">
        <div
          class="modal-panel"
          data-lenis-prevent
          v-motion
          :initial="{ opacity: 0, scale: 0.92, y: 30 }"
          :enter="{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 28 } }"
        >
          <!-- Close -->
          <button class="modal-close" @click="$emit('close')" aria-label="Close">
            <Icon name="mdi:close" class="w-6 h-6" />
          </button>

          <!-- Certificate image -->
          <div class="modal-thumb">
            <img
              v-if="cert.image"
              :src="cert.image"
              :alt="cert.title"
              class="modal-img"
            />
            <div v-else class="modal-pdf">
              <Icon name="mdi:certificate-outline" class="w-16 h-16 text-accent/40" />
            </div>
          </div>

          <!-- Details -->
          <div class="modal-body">
            <!-- PDF Button -->
            <div v-if="cert.pdfUrl && isPdfEnabled" class="pb-2 border-b border-white/10 mb-2">
              <a
                :href="cert.pdfUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all font-semibold text-sm border bg-red-600/20 hover:bg-red-600/30 text-red-400 border-red-500/30"
              >
                <Icon name="mdi:file-pdf-box" class="w-5 h-5" />
                View Full PDF Certificate
              </a>
            </div>

            <h2 class="modal-title">{{ cert.title }}</h2>

            <template v-if="cert.description">
              <h4 class="modal-section-label">Description</h4>
              <p class="modal-desc">{{ cert.description }}</p>
            </template>

            <template v-if="cert.credentialUrl">
              <h4 class="modal-section-label">Credential</h4>
              <a
                :href="cert.credentialUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="modal-cred-link"
              >
                <Icon name="mdi:link-variant" class="w-4 h-4" />
                View Credential
              </a>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
// Modal component for viewing certificate details in a fullscreen overlay
const props = defineProps<{
  cert: {
    title: string;
    description?: string;
    image?: string;
    pdfUrl?: string;
    credentialUrl?: string;
  } | null;
  isPdfEnabled?: boolean;
}>();

const emit = defineEmits<{ close: [] }>();

const nuxtApp = useNuxtApp();
const lenis = nuxtApp.$lenis;

const isPdf = computed(() => {
  if (props.cert?.pdfUrl) return true;
  return !!props.cert?.image && props.cert.image.toLowerCase().endsWith('.pdf');
});

// Prevent background scroll when modal is open
watch(() => props.cert, (newVal) => {
  if (typeof document !== 'undefined') {
    if (newVal) {
      document.body.style.overflow = 'hidden';
      if (lenis) (lenis as any).stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) (lenis as any).start();
    }
  }
});

// Close on Escape key
onMounted(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') emit('close');
  };
  window.addEventListener('keydown', handleKey);
});

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
  if (lenis) (lenis as any).start();
});
</script>

<style scoped>
/* ── Backdrop ── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* ── Panel ── */
.modal-panel {
  position: relative;
  width: 100%;
  max-width: 800px;
  max-height: 95vh;
  margin: auto;
  overflow-y: auto;
  background: #020617;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}
.modal-panel::-webkit-scrollbar {
  display: block !important;
  width: 6px !important;
}
.modal-panel::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.3) !important;
  border-radius: 4px !important;
}

/* ── Close button ── */
.modal-close {
  position: sticky;
  top: 0.75rem;
  float: right;
  margin: 0.75rem 0.75rem 0 0;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  transition: all 0.2s;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

/* ── Thumbnail ── */
.modal-thumb {
  width: 100%;
  background: #080717;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.modal-img {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
}
.modal-pdf {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* ── Body ── */
.modal-body {
  padding: 1.25rem 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.cert-tag {
  display: inline-block;
  font-size: 0.65rem;
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

.modal-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.3;
  margin-top: 0.25rem;
}

.modal-section-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(200, 200, 230, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.5rem;
}

.modal-desc {
  font-size: 0.9rem;
  color: rgba(200, 200, 230, 0.75);
  line-height: 1.65;
}

.modal-cred-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: #a78bfa;
  border: 1px solid rgba(139, 92, 246, 0.35);
  border-radius: 0.5rem;
  padding: 0.45rem 0.9rem;
  width: fit-content;
  transition: all 0.2s;
}
.modal-cred-link:hover {
  background: rgba(139, 92, 246, 0.12);
  border-color: rgba(139, 92, 246, 0.6);
  color: #c4b5fd;
}

/* ── Transitions ── */
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-to, .modal-leave-from { opacity: 1; }
</style>
