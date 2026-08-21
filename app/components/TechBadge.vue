<template>
  <span
    class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border transition-all duration-200 hover:scale-105"
    :class="variantClasses"
  >
    <Icon v-if="icon" :name="icon" class="w-3.5 h-3.5" />
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: string;
  variant?: "default" | "accent" | "violet" | "emerald" | "amber" | "sky";
}>();

const variantMap: Record<string, string> = {
  default: "bg-dark-lighter border-dark-border text-gray-300",
  accent: "bg-accent/10 border-accent/30 text-accent-light",
  violet: "bg-violet/10 border-violet/30 text-violet-light",
  emerald: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  amber: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  sky: "bg-sky-500/10 border-sky-500/30 text-sky-400",
};

const variantClasses = computed(() => variantMap[props.variant || "default"]);
</script>
