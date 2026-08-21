<!-- 
  index.vue
  The main landing page for the portfolio website.
  Aggregates major sections: Hero, About, Tech Stack, Projects, Experience, Certifications, and Contact.
-->
<template>
  <div>
    <!-- Portfolio Main Sections: Hero, About, Tech Stack, Projects, Experience, Certifications, Contact -->
    <!-- ==================== HERO ==================== -->
    <section id="hero" class="relative min-h-[100vh] flex items-center justify-center pt-0 overflow-hidden bg-[#f8fafc] dark:bg-[#080B14]">
      
      <!-- Subtle Grid -->
      <div class="hero-grid opacity-[0.2] dark:opacity-[0.3]" />
      
      <!-- Ambient orbs (Subtle background) -->
      <div class="hero-orb hero-orb-1 opacity-60" />
      <div class="hero-orb hero-orb-2 opacity-40" />
      
      <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mt-[1rem] md:mt-[-1rem]">
        <div class="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
          
          <!-- Left side: Content (Split layout restored) -->
          <div class="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start">
            
            <!-- Headline: Stacked & Strong -->
            <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] flex flex-col">
              <span class="text-slate-900 dark:text-white">Dzaky Dhiya</span>
              <span class="bg-gradient-to-r from-accent to-violet-light bg-clip-text text-transparent">Ul-Haq</span>
            </h1>

            <!-- Separator -->
            <div class="max-w-md w-full h-px bg-slate-200 dark:bg-slate-800/80 mb-6" />

            <!-- Subtitle: Minimalist, Elegant & Animated -->
            <div class="text-xs md:text-sm text-slate-500/80 dark:text-slate-400/70 mb-10 max-w-md leading-relaxed font-mono tracking-wide h-[4.5rem] lg:h-auto">
              <UiTypingEffect 
                text="Welcome to my portfolio. Turning ideas into intelligent solutions through AI research, Machine Learning, and user-centered design."
                :speed="30"
                :delay="800"
              />
            </div>

            <!-- Buttons: Redesigned CTAs -->
            <div class="flex flex-row flex-wrap justify-center lg:justify-start gap-4 items-center">
              <NuxtLink :to="cvUrl || '/resume'" target="_blank">
                <UiInteractiveHoverButton variant="outline" hoverText="Click to Download">
                  <Icon name="mdi:download-outline" class="w-4 h-4" />
                  <span>Download CV</span>
                </UiInteractiveHoverButton>
              </NuxtLink>
              <a href="#contact" class="h-[42px] px-6 flex items-center justify-center gap-2 bg-slate-900 text-white rounded-full font-semibold text-sm shadow-lg shadow-black/20 hover:shadow-black/40 hover:-translate-y-0.5 transition-all" @click.prevent="scrollTo('contact')">
                <Icon name="mdi:email-outline" class="w-4 h-4" />
                Contact Me
              </a>
            </div>
          </div>

          <!-- Right side: Profile Card -->
          <div class="relative w-full max-w-xs group">
            <!-- Floating animation wrapper -->
            <div class="animate-float-slow will-change-transform">
              <!-- Glow background effect - violet/purple on hover -->
              <div class="absolute -inset-4 bg-gradient-to-br from-violet/20 to-violet-light/10 blur-3xl rounded-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
              
              <div class="relative z-10">
                <!-- Profile Card Container -->
                <div class="overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group">
                  <!-- Image wrapper with 2:3 aspect ratio -->
                  <div class="relative overflow-hidden aspect-[2/3]">
                    <!-- Profile image -->
                    <img
                      src="/Dzakynobg2.png"
                      alt="Dzaky Dhiya Ul-Haq"
                      class="w-full h-full object-cover brightness-90 group-hover:brightness-125 group-hover:scale-[1.2] transition-all duration-700"
                    />
                    
                    <!-- Transparent top half with gradient separator -->
                    <div class="absolute inset-0">
                      <!-- Top half - transparent -->
                      <div class="absolute top-0 left-0 right-0 h-1/2 bg-transparent" />
                      
                      <!-- Bottom half dark gradient + violet glow on hover -->
                      <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-violet/0 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Scroll Down Indicator -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400/60 dark:text-slate-500/50 animate-bounce-slow pointer-events-none">
        <span class="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll down to get to know me better</span>
        <Icon name="mdi:chevron-down" class="w-5 h-5" />
      </div>
    </section>


    <!-- ==================== ABOUT ==================== -->
    <section id="about">
      <SectionWrapper
        title="About"
        highlight=" Me"
        subtitle="Get to know the person behind the code and the mindset I bring to my work"
        :centered="true"
        :hideLine="true"
      >
        <div class="grid lg:grid-cols-3 gap-6 relative z-10">

          <!-- ── Row 1: Profile (Left) & Bio (Right) ── -->
          <ScrollReveal animation="fade-up" :delay="0" class="lg:col-span-1 lg:self-stretch">
            <div class="group h-full relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D1220]/80 backdrop-blur-sm transition-all duration-300 hover:border-accent/20 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
              <!-- Portrait Photo Only with Home Page Effects & Darkened Tone -->
              <div class="relative h-full min-h-[400px] w-full overflow-hidden">
                <img
                  src="/Dzaky2.png"
                  alt="Dzaky Dhiya Ul-Haq"
                  class="absolute inset-0 w-full h-full object-cover brightness-90 contrast-[1.05] group-hover:scale-[1.2] transition-transform duration-700 ease-out z-0"
                />
                
                <!-- Overlay effects matching home page -->
                <div class="absolute inset-0 pointer-events-none z-10">
                  <!-- Bottom half dark gradient -->
                  <div class="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <!-- Violet glow on hover -->
                  <div class="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div class="lg:col-span-2 flex flex-col justify-start">
            <!-- Main Bio & Tags -->
            <ScrollReveal animation="fade-up" :delay="150" class="h-full">
              <div class="glass-card !bg-[#0D1220] h-full p-5 sm:p-7 transition-all duration-300 hover:border-white/10 relative overflow-hidden group flex flex-col justify-center">
                <!-- Optional background glow -->
                <div class="absolute -top-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-[60px] group-hover:bg-accent/20 transition-colors duration-700 pointer-events-none"></div>

                <template v-if="aboutCards.length > 0">
                  <div v-for="card in aboutCards" :key="card.id" class="relative z-10">
                    <div 
                      class="about-text text-[15px] sm:text-[17px] leading-[1.7] text-slate-300/90 font-light tracking-wide space-y-6" 
                      v-html="card.content"
                    ></div>
                  </div>
                </template>
                <template v-else>
                  <p class="text-gray-500 italic relative z-10">About Me information is empty.</p>
                </template>

                <!-- Personal Touch Line -->
                <div class="mt-6 border-l-2 border-accent/50 pl-4 py-1 relative z-10">
                  <p class="text-[13px] sm:text-sm font-medium italic text-gray-400 leading-snug">
                    "Honor is not the only thing worth protecting... but sometimes it's all you have left - Azami"
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <!-- ── Row 2: GitHub Calendar (Left) & Socials (Right) ── -->
          <ScrollReveal animation="fade-up" :delay="200" class="lg:col-span-2 flex items-center justify-start w-full relative z-20">
            <GitHubCalendar 
              username="DzakyCz" 
              avatar-url="https://github.com/DzakyCz.png"
              class="w-full justify-start max-w-full mt-2"
            />
          </ScrollReveal>

          <ScrollReveal animation="fade-up" :delay="300" class="lg:col-span-1 flex items-center justify-center lg:justify-end w-full">
            <SocialAnimatedList />
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </section>

    <!-- ==================== TECH STACK ==================== -->
    <section id="techstack" class="py-8 sm:py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="mb-4 sm:mb-6 flex flex-col w-full items-center text-center">
          <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Tech Stack</span>
          <h2 class="text-3xl sm:text-4xl font-bold text-white w-full text-center">
            Tools I work with
          </h2>
          <p class="mt-1.5 text-gray-400 text-sm max-w-2xl font-sans mx-auto">
            A carefully selected list of tools, languages, and frameworks I use to bring ideas to life.
          </p>
        </div>

        <!-- Category Groups -->
        <div class="space-y-4 sm:space-y-6">
          
          <ScrollReveal
            v-for="(group, i) in hardcodedTechStack"
            :key="group.category"
            animation="fade-up"
            :delay="i * 100"
          >
            <div class="flex flex-col">
              <!-- Category Title -->
              <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2 ml-1">
                {{ group.category }}
              </h3>
              
              <!-- Badges Container -->
              <div class="flex flex-wrap gap-1.5 sm:gap-2">
                <div
                  v-for="tech in group.items"
                  :key="tech.name"
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.15] hover:scale-[1.03] transition-all duration-200 cursor-default shadow-sm group/badge"
                  :title="tech.tooltip"
                >
                  <Icon v-if="tech.icon" :name="tech.icon" class="w-3.5 h-3.5 opacity-90 group-hover/badge:opacity-100 transition-opacity" />
                  <span class="text-[12px] text-gray-300 font-medium tracking-wide group-hover/badge:text-white transition-colors">
                    {{ tech.name }}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
        </div>

        <!-- Scroll velocity logo strip -->
        <div class="mt-8 border-t border-white/5 pt-6">
          <ScrollVelocity />
        </div>
      </div>
    </section>

    <!-- ==================== PROJECTS ==================== -->
    <section id="projects">
      <SectionWrapper
        title="My"
        highlight=" Projects"
        subtitle="A selection of things I've built and researched."
        :centered="true"
        :hideLine="true"
      >
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ScrollReveal
            v-for="(project, i) in projects"
            :key="project.title"
            animation="scale"
            :delay="i * 100"
          >
            <ProjectCard
              :title="project.title"
              :description="project.description"
              :tags="project.tags"
              :image="project.image"
              :icon="project.icon"
              :github="project.github"
              :demo="project.demo"
            />
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </section>

    <!-- ==================== EXPERIENCE ==================== -->
    <section id="experience">
      <SectionWrapper
        title="My"
        highlight=" Experience"
        subtitle="Professional journey and technical contributions."
        :centered="true"
        :hideLine="true"
      >
        <div class="relative" ref="experienceSectionRef">
          <!-- Background vertical line -->
          <div class="absolute left-28 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/5" />
          <!-- Animated progress line -->
          <div
            ref="progressLineRef"
            class="absolute left-28 top-0 w-px bg-accent/60 origin-top transition-[height] duration-100 ease-linear"
            :style="{ height: `${experienceProgress * 100}%` }"
          />

          <div class="space-y-1">
            <ScrollReveal
              v-for="(exp, index) in experiences"
              :key="index"
              animation="fade-up"
              :delay="index * 60"
            >
              <div class="relative flex items-center gap-3 group">
                <!-- Date label (left side) -->
                <div class="w-28 shrink-0 text-right pr-3">
                  <span class="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-tight block">{{ (exp.period.split(' · ')[0] ?? '').split(' - ')[0] ?? '' }}</span>
                  <span class="text-[11px] text-gray-400 dark:text-gray-600 font-mono mt-0.5 inline-block">{{ (exp.period.split(' · ')[0] ?? '').split(' - ')[1] ?? '' }}</span>
                </div>

                <!-- Animated dot on timeline -->
                <div class="absolute left-[7rem] -translate-x-1/2 z-10 flex">
                  <div
                    class="w-4 h-4 rounded-full bg-white/90 dark:bg-dark/90 border border-accent/40 flex items-center justify-center experience-dot transition-all duration-400"
                    :class="{ 'border-accent shadow-[0_0_8px_rgba(124,58,237,0.5)]': activeDots.includes(index) }"
                  >
                    <div
                      class="w-[55%] h-[55%] rounded-full bg-gradient-to-tr from-accent to-accent-light"
                      :class="activeDots.includes(index) ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-0'"
                      style="transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);"
                    />
                  </div>
                </div>

                <!-- Content row via MagicCard -->
                <div class="flex-1">
                  <MagicCard :showBorder="false" class="!bg-[#0D1220] border border-transparent hover:border-accent/15 hover:bg-[#111A2D] transition-all duration-300">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pl-6 py-2 rounded-xl">
                      <!-- Logo -->
                      <div class="shrink-0 w-8 h-8 flex items-center justify-center">
                        <img
                          v-if="exp.logo"
                          :src="exp.logo"
                          :alt="exp.company"
                          class="w-full h-full object-contain"
                        />
                        <Icon v-else name="mdi:office-building-outline" class="w-5 h-5 text-gray-500" />
                      </div>

                      <!-- Text -->
                      <div class="flex-1 min-w-0">
                        <div class="flex flex-col gap-0.5">
                          <span class="font-bold text-gray-900 dark:text-white text-base leading-tight">{{ exp.role }}</span>
                          <span class="text-accent-dark/80 dark:text-accent-light/70 text-sm font-medium mt-0.5">
                            {{ exp.company }}<template v-if="exp.position"> &middot; {{ exp.position }}</template>
                          </span>
                        </div>
                        <div v-if="exp.description" class="mt-1.5 text-xs text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                          {{ exp.description }}
                        </div>
                      </div>
                    </div>
                  </MagicCard>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>
    </section>

    <!-- ==================== CERTIFICATIONS ==================== -->
    <section id="certifications">
      <SectionWrapper
        title="My"
        highlight=" Certifications"
        subtitle="Continuous learning and professional development."
        centered
        hideLine
      >
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ScrollReveal
            v-for="(cert, i) in displayedCertificates"
            :key="cert.title + i"
            animation="fade-up"
          >
            <CertificateCard
              :title="cert.title"
              :description="cert.description"
              :image="cert.image"
              :pdf-url="cert.pdfUrl"
              :credential-url="cert.credentialUrl"
              @select="selectedCert = cert"
            />
          </ScrollReveal>
        </div>

        <div v-if="certificates.length > 8" class="mt-8 text-center" v-motion :initial="{ opacity: 0 }" :visible-once="{ opacity: 1 }">
          <button 
            @click="showAllCertificates = !showAllCertificates"
            class="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/15 hover:border-white/20 transition-all text-gray-400 hover:text-white shadow-xl"
          >
            {{ showAllCertificates ? 'Show Less' : `Show All (${certificates.length})` }}
            <Icon :name="showAllCertificates ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="w-4 h-4" />
          </button>
        </div>
      </SectionWrapper>
    </section>

    <!-- ==================== CONTACT ==================== -->
    <section id="contact">
      <SectionWrapper
        title="Get"
        highlight=" In Touch"
        subtitle="Interested in AI, research, or collaboration? Feel free to reach out."
        class="!pt-12 !pb-12"
        centered
        hideLine
      >
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          <!-- Left Side: Contact Info -->
          <ScrollReveal animation="fade-right">
            <div class="space-y-6">
              <div>
                <h3 class="text-sm font-semibold text-white mb-1">Contact Info</h3>
                <p class="text-gray-500 text-xs">Find me across the digital landscape.</p>
              </div>
              
              <div class="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                <div
                  v-for="info in contactInfo"
                  :key="info.label"
                  class="space-y-1 group"
                >
                  <div class="flex items-center gap-1.5 text-gray-500 group-hover:text-[#6366F1] transition-colors">
                    <Icon :name="info.icon" class="w-3.5 h-3.5" />
                    <span class="text-xs uppercase tracking-widest font-bold">{{ info.label }}</span>
                  </div>
                  <a
                    :href="info.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block text-gray-400 hover:text-white transition-colors text-xs truncate"
                  >
                    {{ info.value }}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <!-- Right Side: Form -->
          <ScrollReveal animation="fade-left" :delay="100">
            <div class="space-y-4 text-center">
              <div>
                <h3 class="text-base font-semibold text-white mb-1">Send a Message</h3>
                <p class="text-gray-500 text-xs">Reach out directly via the form below.</p>
              </div>
              <div class="border border-white/[0.08] rounded-xl p-[1px] text-left bg-[#0D1220]">
                <div class="bg-transparent p-4 sm:p-5">
                  <ContactForm />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </section>
    <!-- Certificate Modal -->
    <CertificateModal :cert="selectedCert" :is-pdf-enabled="isPdfEnabledGlobal" @close="selectedCert = null" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Dzaky | Personal Portfolio Website",
});

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

onMounted(() => {
  if (typeof window !== 'undefined' && window.history) {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }
});

// ΓöÇΓöÇ Experience timeline scroll progress ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
const experienceSectionRef = ref<HTMLElement | null>(null);
const progressLineRef = ref<HTMLElement | null>(null);
const experienceProgress = ref(0);
const activeDots = ref<number[]>([]);

const calculateExperienceProgress = () => {
  if (!experienceSectionRef.value || !progressLineRef.value) return;
  const rect = experienceSectionRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const progress = (windowHeight * 0.6 - rect.top) / rect.height;
  experienceProgress.value = Math.max(0, Math.min(1, progress));

  const lineBottomY = progressLineRef.value.getBoundingClientRect().bottom;
  const dots = experienceSectionRef.value.querySelectorAll('.experience-dot');
  const newActive: number[] = [];
  Array.from(dots).forEach((dot, i) => {
    const dr = dot.getBoundingClientRect();
    if (dr.top + dr.height / 2 <= lineBottomY) newActive.push(i);
  });
  activeDots.value = newActive;
};

onMounted(() => {
  window.addEventListener('scroll', calculateExperienceProgress, { passive: true });
  calculateExperienceProgress();
});

onUnmounted(() => {
  window.removeEventListener('scroll', calculateExperienceProgress);
});

const selectedCert = ref<{
  title: string;
  description?: string;
  image?: string;
  credentialUrl?: string;
} | null>(null);

// ─── Shared data — pre-fetched during loading by SplashScreen ───
/**
 * Data is managed via the usePortfolioData composable.
 * This data is typically fetched during the splash screen phase to ensure
 * a smooth transition and that all components have necessary data immediately.
 */
const {
  projects,
  experiences,
  aboutCards,
  certificates,
  cvUrl,
  isPdfEnabled: isPdfEnabledGlobal,
} = usePortfolioData();

const strengths = [
  {
    label: "Analytical Thinking",
    desc: "Data-driven problem solving",
    icon: "mdi:chart-line",
  },
  {
    label: "Adaptable",
    desc: "Quick to learn new tech stacks",
    icon: "mdi:refresh",
  },
  {
    label: "Fast Learner",
    desc: "Self-motivated growth mindset",
    icon: "mdi:lightning-bolt",
  },
  {
    label: "Team Player",
    desc: "Collaborative & communicative",
    icon: "mdi:account-group-outline",
  },
];

const interests = [
  "Deep Learning",
  "Computer Vision",
  "Mobile Apps",
  "IoT",
  "Sustainability",
  "Open Source",
];

const techStack = ref<any[]>([]);

const fetchSkills = async () => {
  const config = useRuntimeConfig();
  const API_BASE = config.public.apiBase;
  try {
    const data = await $fetch<any[]>(`${API_BASE}/skills`);
    techStack.value = data.map(s => {
        let bgClass = "bg-accent/10";
        let iconClass = "text-accent-light";
        
        switch(s.category.toLowerCase()) {
            case 'frontend': bgClass = "bg-sky-500/10"; iconClass = "text-sky-400"; break;
            case 'backend': bgClass = "bg-emerald-500/10"; iconClass = "text-emerald-400"; break;
            case 'design': bgClass = "bg-pink-500/10"; iconClass = "text-pink-400"; break;
            case 'tools': bgClass = "bg-accent/10"; iconClass = "text-accent-light"; break;
            case 'ml': bgClass = "bg-violet-500/10"; iconClass = "text-violet-400"; break;
            case 'embedded': bgClass = "bg-amber-500/10"; iconClass = "text-amber-400"; break;
        }

        return {
            name: s.category,
            icon: s.icon || 'mdi:code-tags',
            bgClass,
            iconClass,
            labelClass: iconClass,
            items: s.items ? s.items.split(',').map((t: string) => t.trim()).filter(Boolean) : []
        };
    });
  } catch (error) {
    console.error('Failed to fetch skills:', error);
  }
};

const hardcodedTechStack = [
  {
    category: "LANGUAGES & FRAMEWORKS",
    items: [
      { name: "JavaScript", icon: "logos:javascript", tooltip: "Core language" },
      { name: "TypeScript", icon: "logos:typescript-icon", tooltip: "Robust Typed JavaScript" },
      { name: "React", icon: "logos:react", tooltip: "Frontend Library" },
      { name: "Nuxt.js", icon: "logos:nuxt-icon", tooltip: "Vue.js Meta-Framework" },
      { name: "Flutter", icon: "logos:flutter", tooltip: "Mobile UI framework" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon", tooltip: "Utility-first CSS" },
      { name: "Bootstrap", icon: "logos:bootstrap", tooltip: "UI framework" },
      { name: "NestJS", icon: "logos:nestjs", tooltip: "Node.js framework" },
      { name: "Python", icon: "logos:python", tooltip: "General purpose language" },
    ]
  },
  {
    category: "TOOLS & PLATFORMS",
    items: [
      { name: "Node.js", icon: "logos:nodejs-icon", tooltip: "JavaScript Runtime" },
      { name: "MySQL", icon: "logos:mysql", tooltip: "Relational Database" },
      { name: "Git", icon: "logos:git-icon", tooltip: "Version Control" },
      { name: "GitHub", icon: "mdi:github", tooltip: "Code Hosting" },
      { name: "Firebase", icon: "logos:firebase", tooltip: "App Development Platform" },
      { name: "Figma", icon: "logos:figma", tooltip: "UI/UX Design Platform" },
    ]
  },
  {
    category: "AI & PRODUCTIVITY",
    items: [
      { name: "ChatGPT", icon: "simple-icons:openai", tooltip: "Conversational AI" },
      { name: "Notion", icon: "simple-icons:notion", tooltip: "Note Assistant" },
      { name: "Gemini AI", icon: "logos:google-gemini", tooltip: "AI Assistant" },
    ]
  }
];

onMounted(() => {
  fetchSkills();
});

const showAllCertificates = ref(false);

const displayedCertificates = computed(() => {
  return showAllCertificates.value ? certificates.value : certificates.value.slice(0, 8);
});

const contactInfo = [
  {
    label: "Email",
    value: "dzakydhiyaulhaq88@gmail.com",
    icon: "mdi:email-outline",
    url: "mailto:dzakydhiyaulhaq88@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "Dzaky Dhiya Ul-Haq",
    icon: "mdi:linkedin",
    url: "https://www.linkedin.com/in/dzaky-ul-haq/",
  },
  {
    label: "GitHub",
    value: "DzakyCz",
    icon: "mdi:github",
    url: "https://github.com/DzakyCz",
  },
  {
    label: "Instagram",
    value: "@dzakycz",
    icon: "mdi:instagram",
    url: "https://instagram.com/dzakycz",
  },
];
</script>

<style scoped>
/* ΓöÇΓöÇ Profile Card ΓöÇΓöÇ */
.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform 0.5s ease;
}
.profile-card:hover .photo-img {
  transform: scale(1.08);
}
.photo-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(10,10,20,0.55) 0%, transparent 30%),
    linear-gradient(to top, rgba(5,5,15,0.88) 0%, rgba(5,5,15,0.4) 35%, transparent 60%);
  pointer-events: none;
}
.photo-header {
  position: absolute;
  top: 14px;
  left: 14px;
  right: 14px;
  display: flex;
  align-items: flex-start;
}
.photo-footer {
  position: absolute;
  bottom: 14px;
  left: 14px;
  right: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 99px;
  background: rgba(15, 15, 25, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(139, 92, 246, 0.4);
  color: #a78bfa;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.03em;
}

.meta-line {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Inter', sans-serif;
  text-shadow: 0 1px 4px rgba(0,0,0,0.8);
}
.meta-icon {
  width: 13px;
  height: 13px;
  color: #a78bfa;
  flex-shrink: 0;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 8px 2px rgba(52, 211, 153, 0.5);
  animation: pulse-green 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 8px 2px rgba(52, 211, 153, 0.5); }
  50%       { box-shadow: 0 0 14px 4px rgba(52, 211, 153, 0.8); }
}

/* ΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓöö
   HERO SECTION
ΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓööΓöö */

.hero-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
  pointer-events: none;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  animation: heroFloat 10s ease-in-out infinite alternate;
}
.hero-orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
  top: -8%; left: -6%;
  animation-delay: 0s;
}
.hero-orb-2 {
  width: 420px; height: 420px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
  bottom: 10%; right: -5%;
  animation-delay: -4s;
}
@keyframes heroFloat {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(24px, 18px) scale(1.06); }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 99px;
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.2);
  animation: fadeSlideDown 0.6s ease both;
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #7c3aed;
  box-shadow: 0 0 8px 2px rgba(124,58,237,0.6);
  animation: pulse-badge 2s ease-in-out infinite;
}
@keyframes pulse-badge {
  0%,100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.6; transform: scale(1.3); }
}

@keyframes fadeSlideDown {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Floating animation for profile card */
.animate-float-slow {
  animation: floatSlow 8s ease-in-out infinite;
}/* ── About Content Styling ── */
.about-text {
  text-rendering: optimizeLegibility;
}
.about-text :deep(p) {
  margin-bottom: 1.5rem;
  color: theme('colors.slate.300 / 0.85');
}
.about-text :deep(p:last-child) {
  margin-bottom: 0;
}
.about-text :deep(strong) {
  @apply text-white font-semibold;
  background: linear-gradient(120deg, theme('colors.accent.DEFAULT / 15%') 0%, theme('colors.accent.DEFAULT / 5%') 100%);
  padding: 0 4px;
  border-radius: 4px;
}
</style>
