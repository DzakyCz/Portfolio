<template>
  <form class="space-y-3" @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="space-y-1.5">
        <label for="name" class="block text-xs tracking-widest font-semibold text-gray-400">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          placeholder="Your name"
          class="w-full px-3 py-1.5 bg-[#0B0F19] border border-[#1F2937] rounded-[10px] text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-[#6366F1] transition-all duration-200"
        />
      </div>

      <div class="space-y-1.5">
        <label for="email" class="block text-xs tracking-widest font-semibold text-gray-400">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="your@email.com"
          class="w-full px-3 py-1.5 bg-[#0B0F19] border border-[#1F2937] rounded-[10px] text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-[#6366F1] transition-all duration-200"
        />
      </div>
    </div>

    <div class="space-y-1.5">
      <label for="subject" class="block text-xs tracking-widest font-semibold text-gray-400">Subject</label>
      <input
        id="subject"
        v-model="form.subject"
        type="text"
        required
        placeholder="What is this about?"
        class="w-full px-3.5 py-2 bg-[#0B0F19] border border-[#1F2937] rounded-[10px] text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-[#6366F1] transition-all duration-200"
      />
    </div>

    <div class="space-y-1.5">
      <label for="message" class="block text-xs tracking-widest font-semibold text-gray-400">Message</label>
      <textarea
        id="message"
        v-model="form.message"
        rows="3"
        required
        placeholder="Your message..."
        class="w-full px-3.5 py-2 bg-[#0B0F19] border border-[#1F2937] rounded-[10px] text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-[#6366F1] transition-all duration-200 resize-none"
      />
    </div>

    <button 
      type="submit" 
      :disabled="isSubmitting"
      class="group w-full h-[40px] rounded-[10px] bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#111827] font-semibold text-[13px] flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <Icon v-if="!isSubmitting" name="mdi:send" class="w-4 h-4 -translate-x-1 transition-all duration-500 ease-out group-hover:translate-x-1" />
      <Icon v-else name="mdi:loading" class="w-4 h-4 animate-spin" />
      <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
    </button>
  </form>
</template>

<script setup lang="ts">
// Form component for handling user contact submissions via the backend API
const config = useRuntimeConfig();
const API_BASE = config.public.apiBase;
const toast = useToast();

// Reactive form state to track user input
const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);

/**
 * Handles the contact form submission by sending data to the NestJS backend.
 */
const handleSubmit = async () => {
  isSubmitting.value = true;
  // Determine endpoint: prioritize local dev port 3001 to resolve env reload issues
  const endpoint = `${API_BASE}/messages`;
  
  try {
    await $fetch(endpoint, {
      method: "POST",
      body: { ...form },
    });
    toast.success("Message Sent 🚀", "Thanks for reaching out! I'll get back to you soon.");
    // Reset form fields after successful submission
    form.name = "";
    form.email = "";
    form.subject = "";
    form.message = "";
  } catch (error: any) {
    console.error("Failed to send message:", error);
    toast.error("Send Failed ❌", error.data?.message || "Please try again later.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Fix autofill background turning white */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus {
  -webkit-text-fill-color: white !important;
  -webkit-box-shadow: 0 0 0px 1000px #0B0F19 inset !important;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
