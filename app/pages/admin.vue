<!-- Admin dashboard page -->
<template>
  <div class="admin-page">
    <!-- Animated Gradient Background -->
    <div class="animated-bg">
      <div class="blob blob-1" />
      <div class="blob blob-2" />
      <div class="blob blob-3" />
      <div class="blob blob-4" />
    </div>

    <!-- ── LOGGED OUT: Login Card ── -->
    <MagicCard
      v-if="!isLoggedIn"
      class="relative z-10 w-full max-w-[400px] px-8 py-10 !bg-white/90 dark:!bg-[#0f0f19]/75 backdrop-blur-2xl shadow-2xl"
      v-motion
      :initial="{ opacity: 0, scale: 0.95, y: 40 }"
      :enter="{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 25 },
      }"
    >
      <div
        class="text-center mb-10"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
      >
        <h1 class="text-3xl font-extrabold text-white tracking-tight mb-2">Admin Login</h1>
        <p class="text-gray-400 text-sm">Sign in to access the admin dashboard</p>
      </div>

      <form class="space-y-5" @submit.prevent="handleLogin">
        <div
          class="field-group"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }"
        >
          <label for="admin-email" class="login-label">Email</label>
          <input
            id="admin-email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            placeholder="you@example.com"
            class="glass-input"
          />
        </div>

        <div
          class="field-group"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: 300 } }"
        >
          <label for="admin-password" class="login-label">Password</label>
          <div class="relative">
            <input
              id="admin-password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              class="glass-input pr-10"
            />
            <button
              type="button"
              class="eye-btn"
              @click="showPassword = !showPassword"
            >
              <Icon
                :name="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
                class="w-4 h-4"
              />
            </button>
          </div>
        </div>

        <Transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
        >
          <p v-if="error" class="error-msg">{{ error }}</p>
        </Transition>

        <button
          type="submit"
          class="login-submit-btn"
          :disabled="isLoading"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
        >
          <Icon
            v-if="isLoading"
            name="mdi:loading"
            class="w-4 h-4 animate-spin"
          />
          {{ isLoading ? "Signing in..." : "Sign In" }}
        </button>
      </form>

      <div
        class="text-center mt-6"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 500 } }"
      >
        <NuxtLink to="/" class="back-link">← Back to portfolio</NuxtLink>
      </div>
    </MagicCard>

    <!-- ── LOGGED IN: Dashboard ── -->
    <div v-else class="dashboard-layout">
      <!-- Sidebar -->
      <aside class="sidebar" :class="{ 'sidebar--collapsed': isSidebarCollapsed }">
        <div class="sidebar-brand">
          <button class="sidebar-toggle-btn" @click="toggleSidebar">
            <Icon name="mdi:menu" class="w-5 h-5" />
          </button>
          <span v-if="!isSidebarCollapsed" class="logo-text text-lg tracking-tighter ml-3">ADMIN</span>
        </div>

        <nav class="sidebar-nav">
          <button
            v-for="item in navItems"
            :key="item.tab"
            class="nav-item"
            :class="{ 'nav-item--active': activeTab === item.tab }"
            @click="activeTab = item.tab"
            :data-tooltip="item.label"
          >
            <div class="active-indicator"></div>
            <Icon :name="item.icon" class="nav-icon" />
            <span class="nav-label">{{ item.label }}</span>
          </button>
        </nav>

        <div class="sidebar-divider"></div>

        <div class="sidebar-footer">
          <NuxtLink to="/" target="_blank" class="sidebar-action sidebar-btn--view" data-tooltip="View Site">
            <Icon name="mdi:open-in-new" class="nav-icon--small" /> 
            <span class="nav-label">View Site</span>
          </NuxtLink>
          <button class="sidebar-action sidebar-btn--logout" @click="doLogout" data-tooltip="Logout">
            <Icon name="mdi:logout" class="nav-icon--small" /> 
            <span class="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="dashboard-main" data-lenis-prevent>
        <!-- ── DASHBOARD ── -->
        <section v-if="activeTab === 'dashboard'" class="tab-section">
          <div class="tab-header">
            <h1 class="tab-title">Dashboard</h1>
            <p class="tab-subtitle">Overview of your portfolio content</p>
          </div>

          <div class="stats-grid w-full">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="stat-card"
              @click="activeTab = stat.tab"
            >
              <div class="stat-icon-wrap" :style="{ background: stat.bg }">
                <Icon
                  :name="stat.icon"
                  class="w-5 h-5"
                  :style="{ color: stat.color }"
                />
              </div>
              <div>
                <p class="stat-count">{{ stat.count }}</p>
                <p class="stat-label">{{ stat.label }}</p>
              </div>
              <Icon
                name="mdi:arrow-right"
                class="w-4 h-4 text-gray-600 ml-auto"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-6">
            <!-- Left side: Welcome and Stats summary -->
            <div class="lg:col-span-1 space-y-6">
              <div class="dash-welcome w-full !mt-0 h-full flex flex-col justify-center p-6">
                <div class="flex items-center gap-2 mb-4">
                  <Icon name="mdi:hand-wave" class="w-6 h-6 text-yellow-400" />
                  <h2 class="text-white font-bold text-lg">Hello Admin!</h2>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed">
                  Manage your portfolio content and track visitor growth from this central hub.
                </p>
                <div class="mt-8 pt-6 border-t border-white/5">
                  <p class="text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1">Status</p>
                  <p class="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    System Online
                  </p>
                </div>
              </div>
            </div>

            <!-- Right side: Chart -->
            <div class="lg:col-span-2">
              <div class="mb-4">
                <VisitorCounter class="!mx-0 !bg-white/5 !border-white/10" />
              </div>
              <VisitorChart class="!bg-transparent !p-0 !border-0 shadow-none h-full" />
            </div>
          </div>
        </section>

        <!-- ── PROJECTS ── -->
        <section v-if="activeTab === 'projects'" class="tab-section">
          <div class="tab-header">
            <div>
              <h1 class="tab-title">Projects</h1>
              <p class="tab-subtitle">
                {{ projects.length }} project(s) in database
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button class="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:bg-emerald-600 transition-colors shadow-sm" :disabled="savingOrderFor === 'project'" @click="onReorder('project')">
                <Icon v-if="savingOrderFor === 'project'" name="mdi:loading" class="w-4 h-4 animate-spin" />
                <Icon v-else name="mdi:content-save-outline" class="w-4 h-4" /> Save Changes
              </button>
              <button class="add-btn" @click="openModal('project')">
                <Icon name="mdi:plus" class="w-4 h-4" /> Add Project
              </button>
            </div>
          </div>

          <div class="list-table w-full">
            <div class="list-head">
              <span>Title</span>
              <span>Tech Stack</span>
              <span>Links</span>
              <span>Actions</span>
            </div>
            <p v-if="projects.length === 0" class="empty-state">
              No projects yet. Click "Add Project" to get started.
            </p>
            <draggable
              v-model="projects"
              item-key="id"
              handle=".drag-handle"
              :animation="200"
              v-else
            >
              <template #item="{ element: p }">
                <div class="list-row group">
                  <div class="flex items-center gap-2">
                    <button
                      class="drag-handle opacity-0 group-hover:opacity-100 cursor-move text-gray-500 hover:text-gray-900 dark:hover:text-white transition-opacity"
                    >
                      <Icon name="mdi:drag" class="w-4 h-4" />
                    </button>
                    <div class="flex items-center gap-3">
                      <!-- Project Thumbnail Preview -->
                      <div class="w-10 h-6 rounded bg-gray-800 overflow-hidden flex items-center justify-center border border-white/5 shrink-0">
                        <img 
                          v-if="p.imageUrl" 
                          :src="`${API_BASE}${p.imageUrl}`" 
                          class="w-full h-full object-cover"
                        />
                        <Icon v-else name="mdi:image-outline" class="w-3 h-3 text-gray-600" />
                      </div>
                      <span
                        class="font-medium text-gray-900 dark:text-white text-sm truncate"
                        >{{ p.title }}</span
                      >
                    </div>
                  </div>
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="t in splitItems(p.techStack)"
                      :key="t"
                      class="tag"
                      >{{ t }}</span
                    >
                  </div>
                  <div class="flex gap-2">
                    <a
                      v-if="p.githubUrl && p.githubUrl !== '#'"
                      :href="p.githubUrl"
                      target="_blank"
                      class="link-chip"
                      ><Icon name="mdi:github" class="w-3.5 h-3.5"
                    /></a>
                    <a
                      v-if="p.demoUrl && p.demoUrl !== '#'"
                      :href="p.demoUrl"
                      target="_blank"
                      class="link-chip"
                      ><Icon name="mdi:open-in-new" class="w-3.5 h-3.5"
                    /></a>
                  </div>
                  <div class="flex gap-2">
                    <button
                      class="icon-btn icon-btn--edit"
                      @click="editItem('project', p)"
                    >
                      <Icon name="mdi:pencil-outline" class="w-3.5 h-3.5" />
                    </button>
                    <button
                      class="icon-btn icon-btn--del"
                      @click="deleteItem('project', p.id)"
                    >
                      <Icon name="mdi:trash-can-outline" class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </section>

        <!-- ── EXPERIENCE ── -->
        <section v-if="activeTab === 'experience'" class="tab-section">
          <div class="tab-header">
            <div>
              <h1 class="tab-title">Experience</h1>
              <p class="tab-subtitle">
                {{ experiences.length }} entry(s) in database
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button class="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:bg-emerald-600 transition-colors shadow-sm" :disabled="savingOrderFor === 'experience'" @click="onReorder('experience')">
                <Icon v-if="savingOrderFor === 'experience'" name="mdi:loading" class="w-4 h-4 animate-spin" />
                <Icon v-else name="mdi:content-save-outline" class="w-4 h-4" /> Save Changes
              </button>
              <button class="add-btn" @click="openModal('experience')">
                <Icon name="mdi:plus" class="w-4 h-4" /> Add Experience
              </button>
            </div>
          </div>

          <div class="list-table w-full">
            <div class="list-head list-head--exp">
              <span>Role</span>
              <span>Company</span>
              <span>Period</span>
              <span>Actions</span>
            </div>
            <p v-if="experiences.length === 0" class="empty-state">
              No experience entries yet.
            </p>
            <draggable
              v-model="experiences"
              item-key="id"
              handle=".drag-handle"
              :animation="200"
              v-else
            >
              <template #item="{ element: e }">
                <div class="list-row list-row--exp group">
                  <div class="flex items-center gap-2">
                    <button
                      class="drag-handle opacity-0 group-hover:opacity-100 cursor-move text-gray-500 hover:text-gray-900 dark:hover:text-white transition-opacity"
                    >
                      <Icon name="mdi:drag" class="w-4 h-4" />
                    </button>
                    <span
                      class="font-medium text-gray-900 dark:text-white text-sm truncate"
                      >{{ e.role }}</span
                    >
                  </div>
                  <span
                    class="text-gray-600 dark:text-gray-400 text-sm truncate"
                    >{{ e.company }}</span
                  >
                  <span class="text-gray-500 text-xs font-mono">{{
                    e.period
                  }}</span>
                  <div class="flex gap-2">
                    <button
                      class="icon-btn icon-btn--edit"
                      @click="editItem('experience', e)"
                    >
                      <Icon name="mdi:pencil-outline" class="w-3.5 h-3.5" />
                    </button>
                    <button
                      class="icon-btn icon-btn--del"
                      @click="deleteItem('experience', e.id)"
                    >
                      <Icon name="mdi:trash-can-outline" class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </section>

        <!-- ── SKILLS ── -->
        <section v-if="activeTab === 'skills'" class="tab-section">
          <div class="tab-header">
            <div>
              <h1 class="tab-title">Skills</h1>
              <p class="tab-subtitle">
                {{ skills.length }} category(s) in database
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button class="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:bg-emerald-600 transition-colors shadow-sm" :disabled="savingOrderFor === 'skill'" @click="onReorder('skill')">
                <Icon v-if="savingOrderFor === 'skill'" name="mdi:loading" class="w-4 h-4 animate-spin" />
                <Icon v-else name="mdi:content-save-outline" class="w-4 h-4" /> Save Changes
              </button>
              <button class="add-btn" @click="openModal('skill')">
                <Icon name="mdi:plus" class="w-4 h-4" /> Add Skill Category
              </button>
            </div>
          </div>

          <div class="list-table w-full">
            <div class="list-head list-head--skill">
              <span>Category</span>
              <span>Items</span>
              <span>Actions</span>
            </div>
            <p v-if="skills.length === 0" class="empty-state">
              No skill categories yet.
            </p>
            <draggable
              v-model="skills"
              item-key="id"
              handle=".drag-handle"
              :animation="200"
              v-else
            >
              <template #item="{ element: s }">
                <div class="list-row list-row--skill group">
                  <div class="flex items-center gap-2">
                    <button
                      class="drag-handle opacity-0 group-hover:opacity-100 cursor-move text-gray-500 hover:text-gray-900 dark:hover:text-white transition-opacity"
                    >
                      <Icon name="mdi:drag" class="w-4 h-4" />
                    </button>
                    <span
                      class="font-medium text-gray-900 dark:text-white text-sm"
                      >{{ s.category }}</span
                    >
                  </div>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="item in splitItems(s.items)"
                      :key="item"
                      class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 text-[11px]"
                    >
                      {{ item }}
                    </span>
                  </div>
                  <div class="flex gap-2">
                    <button
                      class="icon-btn icon-btn--edit"
                      @click="editItem('skill', s)"
                    >
                      <Icon name="mdi:pencil-outline" class="w-3.5 h-3.5" />
                    </button>
                    <button
                      class="icon-btn icon-btn--del"
                      @click="deleteItem('skill', s.id)"
                    >
                      <Icon name="mdi:trash-can-outline" class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </section>

        <!-- ── CERTIFICATES ── -->
        <section v-if="activeTab === 'certificates'" class="tab-section">
          <div class="tab-header">
            <div>
              <h1 class="tab-title">Certificates</h1>
              <p class="tab-subtitle">
                {{ certificates.length }} certificate(s) in database
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button class="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:bg-emerald-600 transition-colors shadow-sm" :disabled="savingOrderFor === 'certificate'" @click="onReorder('certificate')">
                <Icon v-if="savingOrderFor === 'certificate'" name="mdi:loading" class="w-4 h-4 animate-spin" />
                <Icon v-else name="mdi:content-save-outline" class="w-4 h-4" /> Save Changes
              </button>
              <button class="add-btn" @click="openModal('certificate')">
                <Icon name="mdi:plus" class="w-4 h-4" /> Add Certificate
              </button>
            </div>
          </div>

          <!-- Upload Info Alert -->
          <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3 mt-4 mb-2">
            <Icon name="mdi:information-outline" class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 class="text-sm font-semibold text-amber-500">Important Upload Workflow</h3>
              <p class="text-xs text-amber-500/80 mt-1 leading-relaxed">
                Karena server Vercel bersifat <i>Read-Only</i>, setiap penambahan/perubahan sertifikat foto harus dilakukan melalui admin panel <b>localhost</b>. Setelah selesai, lakukan <code class="bg-amber-500/20 px-1 py-0.5 rounded">git add .</code>, lalu <code class="bg-amber-500/20 px-1 py-0.5 rounded">git commit</code>, dan <code class="bg-amber-500/20 px-1 py-0.5 rounded">git push</code> melalui terminal agar gambar terbawa ke production.
              </p>
            </div>
          </div>

          <!-- Global Feature Toggle for PDF View -->
          <div class="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 flex items-center justify-between mt-2 mb-2">
            <div>
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Enable PDF View (Global)</h3>
              <p class="text-xs text-gray-500 mt-1">Allow public visitors to view the full PDF certificates.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="siteSetting.enablePdfView" @change="saveSettings" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div class="cert-grid w-full">
            <p v-if="certificates.length === 0" class="empty-state">
              No certificates yet.
            </p>
            <draggable
              v-model="certificates"
              item-key="id"
              handle=".drag-handle"
              :animation="200"
              v-else
            >
              <template #item="{ element: c }">
                <div class="cert-card group">
                  <div class="flex items-center mr-2">
                    <button
                      class="drag-handle opacity-0 group-hover:opacity-100 cursor-move text-gray-500 hover:text-gray-900 dark:hover:text-white transition-opacity"
                    >
                      <Icon name="mdi:drag" class="w-5 h-5" />
                    </button>
                  </div>
                  <div class="cert-thumb">
                    <img
                      v-if="c.fileUrl"
                      :src="`${API_BASE}${c.fileUrl}`"
                      alt=""
                      class="cert-img"
                    />
                    <Icon
                      v-else
                      name="mdi:certificate-outline"
                      class="w-6 h-6 text-accent/20"
                    />
                  </div>
                  <div class="cert-info">
                    <p
                      class="font-medium text-gray-900 dark:text-white text-sm leading-tight"
                    >
                      {{ c.title }}
                    </p>
                    <p
                      class="text-xs text-gray-600 dark:text-gray-500 mt-0.5 truncate"
                    >
                      {{ c.description || "No description" }}
                    </p>
                  </div>
                  <div class="flex gap-2 mt-1">
                    <button
                      class="icon-btn icon-btn--edit"
                      @click="editItem('certificate', c)"
                    >
                      <Icon name="mdi:pencil-outline" class="w-3.5 h-3.5" />
                    </button>
                    <button
                      class="icon-btn icon-btn--del"
                      @click="deleteItem('certificate', c.id)"
                    >
                      <Icon name="mdi:trash-can-outline" class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </section>

        <!-- ── ABOUT ME ── -->
        <section v-if="activeTab === 'about'" class="tab-section">
          <div class="tab-header">
            <div>
              <h1 class="tab-title">About Me Cards</h1>
              <p class="tab-subtitle">
                {{ aboutCards.length }} card(s) in database
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button class="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:bg-emerald-600 transition-colors shadow-sm" :disabled="savingOrderFor === 'about-card'" @click="onReorder('about-card')">
                <Icon v-if="savingOrderFor === 'about-card'" name="mdi:loading" class="w-4 h-4 animate-spin" />
                <Icon v-else name="mdi:content-save-outline" class="w-4 h-4" /> Save Changes
              </button>
              <button class="add-btn" @click="openModal('about-card')">
                <Icon name="mdi:plus" class="w-4 h-4" /> Add About Card
              </button>
            </div>
          </div>

          <div class="list-table w-full">
            <div class="list-head">
              <span>Title</span>
              <span>Content</span>
              <span>Icon/Color</span>
              <span>Actions</span>
            </div>
            <p v-if="aboutCards.length === 0" class="empty-state">
              No About Cards yet. Click "Add About Card" to get started.
            </p>
            <draggable
              v-model="aboutCards"
              item-key="id"
              handle=".drag-handle"
              :animation="200"
              v-else
            >
              <template #item="{ element: a }">
                <div class="list-row group">
                  <div class="flex items-center gap-2">
                    <button
                      class="drag-handle opacity-0 group-hover:opacity-100 cursor-move text-gray-500 hover:text-gray-900 dark:hover:text-white transition-opacity"
                    >
                      <Icon name="mdi:drag" class="w-4 h-4" />
                    </button>
                    <Icon
                      v-if="a.icon"
                      :name="a.icon"
                      class="w-4 h-4 text-accent-light shrink-0"
                    />
                    <span
                      class="font-medium text-gray-900 dark:text-white text-sm truncate"
                      >{{ a.title }}</span
                    >
                  </div>
                  <div class="text-sm text-gray-500 truncate">{{ (a.content || '').substring(0, 50) }}...</div>
                  <div class="flex items-center gap-1">
                    <span class="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-600 dark:text-gray-300">{{ a.textColor }}</span>
                  </div>
                  <div class="flex gap-2">
                    <button
                      class="icon-btn icon-btn--edit"
                      @click="editItem('about-card', a)"
                    >
                      <Icon name="mdi:pencil-outline" class="w-3.5 h-3.5" />
                    </button>
                    <button
                      class="icon-btn icon-btn--del"
                      @click="deleteItem('about-card', a.id)"
                    >
                      <Icon name="mdi:trash-can-outline" class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </section>

        <!-- ── MESSAGES ── -->
        <section v-if="activeTab === 'messages'" class="tab-section">
          <div class="tab-header">
            <div>
              <h1 class="tab-title">Messages</h1>
              <p class="tab-subtitle">
                {{ messages.length }} message(s) received from contact form
              </p>
            </div>
          </div>

          <div class="list-table w-full">
            <div class="list-head list-head--msg">
              <span>From</span>
              <span>Subject</span>
              <span>Date</span>
              <span>Actions</span>
            </div>
            <p v-if="messages.length === 0" class="empty-state">
              No messages received yet.
            </p>
            <div v-else class="space-y-4">
              <div 
                v-for="msg in messages" 
                :key="msg.id" 
                class="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/30"
                :class="{ 'opacity-70': msg.isRead }"
              >
                <div class="p-4 flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-bold text-gray-900 dark:text-white">{{ msg.name }}</span>
                      <span class="text-xs text-gray-500 font-mono">{{ msg.email }}</span>
                      <span v-if="!msg.isRead" class="px-1.5 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] uppercase font-bold tracking-wider">New</span>
                    </div>
                    <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">{{ msg.subject }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{{ msg.message }}</p>
                    <div class="mt-3 text-[11px] text-gray-500 font-mono">
                      Received on {{ new Date(msg.createdAt).toLocaleString() }}
                    </div>
                  </div>
                  <div class="flex gap-2 ml-4">
                    <button 
                      v-if="!msg.isRead"
                      class="icon-btn icon-btn--edit" 
                      title="Mark as Read"
                      @click="markMessageAsRead(msg.id)"
                    >
                      <Icon name="mdi:check-circle-outline" class="w-4 h-4" />
                    </button>
                    <button 
                      class="icon-btn icon-btn--del" 
                      title="Delete Message"
                      @click="deleteItem('message', msg.id)"
                    >
                      <Icon name="mdi:trash-can-outline" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── SETTINGS ── -->
        <section v-if="activeTab === 'settings'" class="tab-section">
          <div class="tab-header">
            <div>
              <h1 class="tab-title">Global Settings</h1>
              <p class="tab-subtitle">
                Manage website-wide configurations
              </p>
            </div>
          </div>

          <div class="settings-card w-full p-6 sm:p-8 mt-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Announcement Banner</h3>
            <form @submit.prevent="saveSettings" class="space-y-6">
              
              <div class="flex items-center justify-between">
                <div>
                  <label class="block text-sm font-medium text-gray-900 dark:text-white">Enable Banner</label>
                  <p class="text-xs text-gray-500 mt-1">Show the scrolling announcement on the public site.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="siteSetting.announcementActive" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
                  Announcement Text (HTML allowed)
                </label>
                <textarea
                  v-model="siteSetting.announcementText"
                  rows="3"
                  class="input-field font-mono text-sm leading-relaxed whitespace-pre-line bg-gray-50 dark:bg-dark-lighter border border-gray-300 dark:border-gray-700 p-3 rounded-lg w-full"
                  placeholder="Hello World!"
                ></textarea>
                <p class="text-xs text-gray-400 mt-2">Example: <code>&lt;strong&gt;⚠️ This website is strictly under development ⚠️&lt;/strong&gt;</code></p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Banner Background Color -->
                <div>
                  <label class="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
                    Banner Background Color
                  </label>
                  <div class="flex items-center gap-3">
                    <input type="color" v-model="siteSetting.bannerColor" class="h-10 w-14 p-1 rounded cursor-pointer border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-card shadow-sm">
                    <input type="text" v-model="siteSetting.bannerColor" class="input-field font-mono text-sm max-w-[120px] bg-gray-50 dark:bg-dark-lighter border border-gray-300 dark:border-gray-700" placeholder="#4f46e5">
                  </div>
                </div>

                <!-- Text Color -->
                <div>
                  <label class="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
                    Text Color
                  </label>
                  <div class="flex items-center gap-3">
                    <input type="color" v-model="siteSetting.textColor" class="h-10 w-14 p-1 rounded cursor-pointer border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-card shadow-sm">
                    <input type="text" v-model="siteSetting.textColor" class="input-field font-mono text-sm max-w-[120px] bg-gray-50 dark:bg-dark-lighter border border-gray-300 dark:border-gray-700" placeholder="#ffffff">
                  </div>
                </div>
              </div>

              <!-- Animation Speed -->
              <div>
                <label class="text-sm font-medium text-gray-900 dark:text-gray-300 mb-2 flex justify-between">
                  <span>Marquee Speed (Seconds per cycle)</span>
                  <span class="text-accent font-semibold">{{ siteSetting.animationSpeed }}s</span>
                </label>
                <input type="range" v-model.number="siteSetting.animationSpeed" min="5" max="60" class="w-full accent-emerald-500">
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Fast (5s)</span>
                  <span>Slow (60s)</span>
                </div>
                <p class="text-xs text-gray-400 mt-2">Adjust how many seconds it takes for the text to scroll entirely across the screen.</p>
              </div>

              <div class="pt-6 border-t border-gray-200 dark:border-gray-800">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Icon name="mdi:file-document-outline" class="w-5 h-5 text-accent" />
                  Curriculum Vitae (CV)
                </h3>

                <!-- Upload Info Alert -->
                <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3 mb-6">
                  <Icon name="mdi:information-outline" class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 class="text-sm font-semibold text-amber-500">Important Upload Workflow</h3>
                    <p class="text-xs text-amber-500/80 mt-1 leading-relaxed">
                      Sama seperti sertifikat, karena server Vercel bersifat <i>Read-Only</i>, mengganti CV harus dilakukan melalui admin panel <b>localhost</b>. Setelah selesai, lakukan <code class="bg-amber-500/20 px-1 py-0.5 rounded">git add .</code>, lalu <code class="bg-amber-500/20 px-1 py-0.5 rounded">git commit</code>, dan <code class="bg-amber-500/20 px-1 py-0.5 rounded">git push</code> melalui terminal agar file terbawa ke production.
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                  <div>
                    <label class="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
                      Upload New CV (PDF, DOC, DOCX)
                    </label>
                    <div class="flex items-center gap-3">
                      <input 
                        type="file" 
                        ref="cvFileInput" 
                        accept=".pdf,.doc,.docx" 
                        class="hidden" 
                        @change="onCvFileChange"
                      >
                      <button 
                        type="button"
                        class="glass-input text-left text-gray-500 flex items-center justify-between group"
                        @click="cvFileInput?.click()"
                      >
                        <span class="truncate">{{ selectedCvFile ? selectedCvFile.name : 'Select file...' }}</span>
                        <Icon name="mdi:paperclip" class="w-4 h-4 group-hover:text-accent transition-colors" />
                      </button>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button
                      type="button"
                      class="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow flex items-center gap-2 disabled:opacity-50"
                      :disabled="!selectedCvFile || isUploadingCv"
                      @click="handleCvUpload"
                    >
                      <Icon v-if="isUploadingCv" name="mdi:loading" class="w-4 h-4 animate-spin" />
                      <Icon v-else name="mdi:cloud-upload" class="w-4 h-4" />
                      Upload CV
                    </button>
                  </div>
                </div>
                <div v-if="siteSetting.cvUrl" class="mt-4 p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Icon name="mdi:file-pdf-box" class="w-8 h-8 text-red-400" />
                    <div>
                      <p class="text-xs text-gray-400">Current CV</p>
                      <p class="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px]">{{ siteSetting.cvUrl.split('/').pop() }}</p>
                    </div>
                  </div>
                  <a :href="`${API_BASE}${siteSetting.cvUrl}`" target="_blank" class="text-accent hover:text-accent-light text-xs font-medium flex items-center gap-1">
                    <Icon name="mdi:open-in-new" class="w-3.5 h-3.5" /> View
                  </a>
                </div>
              </div>

              <div class="flex justify-start pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="submit"
                  class="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors shadow flex items-center gap-2"
                  :disabled="isSavingSettings"
                >
                  <Icon v-if="isSavingSettings" name="mdi:loading" class="w-4 h-4 animate-spin" />
                  <Icon v-else name="mdi:content-save-outline" class="w-4 h-4" />
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>

    <!-- ── Modal ── -->
    <Transition name="modal">
      <div v-if="modal.open" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-box" data-lenis-prevent>
          <div class="modal-header">
            <h3 class="modal-title">
              {{ modal.editing ? "Edit" : "Add" }} {{ modalTitle }}
            </h3>
            <button class="modal-close" @click="closeModal">
              <Icon name="mdi:close" class="w-4 h-4" />
            </button>
          </div>

          <div class="modal-body">
            <!-- Project Form -->
            <template v-if="modal.type === 'project'">
              <!-- Image Upload for Project -->
              <div class="field-group mb-5">
                <label class="field-label mb-2">Project Thumbnail (Optional)</label>
                <div
                  class="upload-zone"
                  :class="{ 'upload-zone--active': isDragging }"
                  @dragover.prevent="isDragging = true"
                  @dragleave.prevent="isDragging = false"
                  @drop.prevent="handleProjectImageDrop"
                  @click="projectImageInput?.click()"
                >
                  <input
                    ref="projectImageInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleProjectImageFileChange"
                  />
                  <!-- Preview Area -->
                  <div
                    v-if="projectUploadForm.imagePreview"
                    class="upload-preview p-4"
                  >
                    <img
                      :src="projectUploadForm.imagePreview"
                      alt="Thumbnail Preview"
                      class="upload-preview-img rounded-lg shadow-lg"
                    />
                    <button
                      type="button"
                      class="upload-remove"
                      @click.stop="clearProjectImageFile"
                    >
                      <Icon name="mdi:close" class="w-4 h-4" />
                    </button>
                  </div>
                  <!-- Empty state -->
                  <div v-else class="upload-empty">
                    <Icon name="mdi:image-plus" class="w-10 h-10 text-gray-500 mb-2" />
                    <p class="text-sm text-gray-400 font-medium">
                      Click or drag image here
                    </p>
                    <p class="text-[11px] text-gray-600 mt-1 uppercase tracking-wider">JPG, PNG, WEBP (Max 5MB)</p>
                  </div>
                </div>
              </div>

              <div class="field-group">
                <label class="field-label">Project Title *</label>
                <input
                  v-model="form2.title"
                  class="glass-input"
                  placeholder="e.g. E-Commerce Dashboard"
                />
              </div>
              <div class="field-group">
                <label class="field-label">Description *</label>
                <textarea
                  v-model="form2.description"
                  class="glass-input resize-none"
                  rows="3"
                  placeholder="Short description of the project..."
                />
              </div>
              <div class="field-group">
                <label class="field-label">Tech Stack (comma separated) *</label>
                <input
                  v-model="form2.techStack"
                  class="glass-input"
                  placeholder="Vue, TypeScript, Tailwind"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="field-group">
                  <label class="field-label">GitHub URL</label>
                  <input
                    v-model="form2.githubUrl"
                    class="glass-input"
                    placeholder="https://..."
                  />
                </div>
                <div class="field-group">
                  <label class="field-label">Demo URL</label>
                  <input
                    v-model="form2.demoUrl"
                    class="glass-input"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </template>

            <!-- Experience Form -->
            <template v-if="modal.type === 'experience'">
              <div class="field-group">
                <label class="field-label">Role *</label
                ><input
                  v-model="form2.role"
                  class="glass-input"
                  placeholder="e.g. Intern Software Engineer"
                />
              </div>
              <div class="field-group">
                <label class="field-label">Company *</label
                ><input
                  v-model="form2.company"
                  class="glass-input"
                  placeholder="e.g. Universitas Syiah Kuala"
                />
              </div>
              <div class="field-group">
                <label class="field-label">Position (Job Type)</label
                ><input
                  v-model="form2.position"
                  class="glass-input"
                  placeholder="e.g. Part-time, Internship, Full-time"
                />
              </div>
              <div class="field-group">
                <label class="field-label">Period *</label>
                <div class="flex items-center gap-3">
                  <input
                    type="month"
                    v-model="form2.startDate"
                    class="glass-input flex-1"
                  />
                  <span class="text-gray-400">to</span>
                  <input
                    type="month"
                    v-model="form2.endDate"
                    class="glass-input flex-1"
                    :disabled="form2.currentJob"
                  />
                </div>
                <div class="mt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="currentJob"
                    v-model="form2.currentJob"
                    class="rounded border-gray-600 bg-gray-800 text-accent focus:ring-accent accent-purple-500"
                    @change="form2.currentJob ? form2.endDate = '' : null"
                  />
                  <label for="currentJob" class="text-sm text-gray-300 cursor-pointer">I currently work here</label>
                </div>
              </div>
              <div class="field-group">
                <label class="field-label">Location</label
                ><input
                  v-model="form2.location"
                  class="glass-input"
                  placeholder="e.g. Banda Aceh, Indonesia · On-site"
                />
              </div>
              <div class="field-group">
                <label class="field-label">Logo URL</label
                ><input
                  v-model="form2.logo"
                  class="glass-input"
                  placeholder="/images/logo.png"
                />
              </div>
              <div class="field-group">
                <label class="field-label">Description</label
                ><textarea
                  v-model="form2.description"
                  class="glass-input resize-none"
                  rows="3"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            </template>

            <!-- Skill Form -->
            <template v-if="modal.type === 'skill'">
              <div class="field-group">
                <label class="field-label">Category *</label
                ><input
                  v-model="form2.category"
                  class="glass-input"
                  placeholder="e.g. Frontend"
                />
              </div>
              <div class="field-group">
                <label class="field-label">Icon (MDI name)</label
                ><input
                  v-model="form2.icon"
                  class="glass-input"
                  placeholder="e.g. mdi:palette-outline"
                />
              </div>
              <div class="field-group">
                <label class="field-label">Items (comma-separated)</label
                ><input
                  v-model="form2.items"
                  class="glass-input"
                  placeholder="e.g. React, Vue, Tailwind"
                />
              </div>
            </template>

            <!-- Certificate Form -->
            <template v-if="modal.type === 'certificate'">
              <!-- Certificate Image Preview (Auto-generated) -->
              <div class="field-group">
                <label class="field-label">Auto-generated Image Preview</label>
                <div
                  class="upload-zone cursor-default opacity-80"
                >
                  <div v-if="certForm.imagePreview" class="upload-preview">
                    <img
                      :src="certForm.imagePreview"
                      alt="Preview"
                      class="upload-preview-img"
                    />
                  </div>
                  <div v-else class="upload-empty">
                    <Icon
                      name="mdi:image-search-outline"
                      class="w-10 h-10 text-gray-600"
                    />
                    <p class="text-sm text-gray-500 mt-2">
                      Waiting for PDF upload...
                    </p>
                    <p class="text-xs text-emerald-500/40 font-medium italic mt-1">
                      ✨ Will be generated from page 1 of PDF
                    </p>
                  </div>
                </div>
              </div>

              <!-- Certificate PDF Upload (Optional) -->
              <div class="field-group">
                <label class="field-label">Full Certificate PDF <span class="text-[10px] opacity-70">(Optional)</span></label>
                <div class="upload-zone" @click="pdfFileInput?.click()">
                  <input
                    ref="pdfFileInput"
                    type="file"
                    accept=".pdf"
                    class="hidden"
                    @change="handlePdfFileChange"
                  />
                  <div v-if="certForm.pdfFile" class="upload-preview">
                    <Icon
                      name="mdi:file-pdf-box"
                      class="w-10 h-10 text-red-400"
                    />
                    <span class="text-sm text-gray-300 mt-1">{{ certForm.pdfFileName }}</span>
                    <button
                      type="button"
                      class="upload-remove"
                      @click.stop="clearPdfFile"
                    >
                      <Icon name="mdi:close" class="w-4 h-4" />
                    </button>
                  </div>
                  <div v-else class="upload-empty">
                    <Icon
                      name="mdi:file-certificate-outline"
                      class="w-10 h-10 text-gray-500"
                    />
                    <p class="text-sm text-gray-400 mt-2">
                      Upload Official PDF Document
                    </p>
                    <p class="text-xs text-gray-600">Downloadable document for proof</p>
                  </div>
                </div>
              </div>
              <div class="field-group">
                <label class="field-label">Title *</label
                ><input
                  v-model="form2.title"
                  class="glass-input"
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                />
              </div>
              <div class="field-group">
                <label class="field-label">Description</label
                ><textarea
                  v-model="form2.description"
                  class="glass-input resize-none"
                  rows="2"
                  placeholder="Short description..."
                />
              </div>
              <div class="field-group">
                <label class="field-label">Credential URL</label
                ><input
                  v-model="form2.credentialUrl"
                  class="glass-input"
                  placeholder="https://..."
                />
              </div>
            </template>

            <!-- About Card Form -->
            <template v-if="modal.type === 'about-card'">
              <div class="field-group">
                <label class="field-label">Title *</label
                ><input
                  v-model="form2.title"
                  class="glass-input"
                  placeholder="e.g. Who I Am"
                />
              </div>
              <div class="field-group">
                <label class="field-label">Content *</label
                ><textarea
                  v-model="form2.content"
                  class="glass-input"
                  rows="4"
                  placeholder="Supports HTML. e.g. <p>Hello I am...</p>"
                />
              </div>
              <div class="field-group">
                <label class="field-label">Icon (MDI name)</label
                ><input
                  v-model="form2.icon"
                  class="glass-input"
                  placeholder="e.g. mdi:account"
                />
              </div>
              <div class="field-group">
                <label class="field-label">Text Color Classes</label
                ><input
                  v-model="form2.textColor"
                  class="glass-input font-mono text-sm"
                  placeholder="e.g. text-gray-600 dark:text-gray-400"
                />
                <p class="text-xs text-gray-500 mt-1">Tailwind text color classes to apply to content.</p>
              </div>
            </template>
          </div>

          <div class="modal-footer">
            <button class="cancel-btn" @click="closeModal">Cancel</button>
            <button class="submit-btn" :disabled="isSaving" @click="saveItem">
              <Icon
                v-if="isSaving"
                name="mdi:loading"
                class="w-4 h-4 animate-spin"
              />
              {{ isSaving ? "Saving..." : modal.editing ? "Update" : "Add" }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";

definePageMeta({ 
  layout: "admin",
  middleware: [
    function (to, from) {
      // ── TEMPORARY DISABLE ADMIN ──
      // Redirect to home page because admin is temporarily disabled
      return navigateTo('/');
    }
  ]
});
useHead({
  title: "Admin — Adith",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
  script: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js', defer: true }
  ]
});

const config = useRuntimeConfig();
const API_BASE = config.public.apiBase;
const toast = useToast();

// ── Auth ──
const token = useCookie("admin_token");
const form = reactive({ email: "", password: "" });
const showPassword = ref(false);
const isLoading = ref(false);
const error = ref("");
const isLoggedIn = ref(!!token.value);

// ── Navigation ──
type TabName =
  | "dashboard"
  | "projects"
  | "experience"
  | "skills"
  | "certificates"
  | "about"
  | "messages"
  | "settings";
const activeTab = ref<TabName>("dashboard");
const isSidebarCollapsed = ref(false);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
  if (process.client) {
    localStorage.setItem('admin_sidebar_collapsed', String(isSidebarCollapsed.value));
  }
};

onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem('admin_sidebar_collapsed');
    if (saved !== null) {
      isSidebarCollapsed.value = saved === 'true';
    }
    
    // Auto-collapse on mobile screens
    const handleResize = () => {
      if (window.innerWidth < 1024 && !isSidebarCollapsed.value) {
        isSidebarCollapsed.value = true;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
  }
});

const navItems = [
  { tab: "dashboard", icon: "mdi:view-dashboard-outline", label: "Dashboard" },
  { tab: "projects", icon: "mdi:folder-multiple-outline", label: "Projects" },
  { tab: "experience", icon: "mdi:briefcase-outline", label: "Experience" },
  { tab: "skills", icon: "mdi:code-tags", label: "Skills" },
  {
    tab: "certificates",
    icon: "mdi:certificate-outline",
    label: "Certificates",
  },
  {
    tab: "about",
    icon: "mdi:card-account-details-outline",
    label: "About Me",
  },
  {
    tab: "messages",
    icon: "mdi:email-outline",
    label: "Messages",
  },
  {
    tab: "settings",
    icon: "mdi:cog-outline",
    label: "Global Settings",
  },
] as const;

// ── Data ──
const projects = ref<any[]>([]);
const experiences = ref<any[]>([]);
const skills = ref<any[]>([]);
const certificates = ref<any[]>([]);
const aboutCards = ref<any[]>([]);
const messages = ref<any[]>([]);
const siteSetting = ref({ 
  announcementText: "", 
  announcementActive: false,
  enablePdfView: false,
  bannerColor: "#4f46e5",
  textColor: "#ffffff",
  animationSpeed: 25,
  cvUrl: "",
  visitorCount: 0
});
const isSavingSettings = ref(false);

const saveSettings = async () => {
  isSavingSettings.value = true;
  try {
    const payload = { ...siteSetting.value };
    // Only send the fields needed for the PATCH /settings endpoint
    // We don't want to accidentally overwrite cvUrl if it's not being updated here
    // But since DTO handles optional fields, it's fine.
    await $fetch(`${API_BASE}/settings`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: payload,
    });
    toast.success('Settings Saved', 'Global settings have been updated successfully.');
  } catch (err: any) {
    console.error('Failed to save settings:', err);
    toast.error('Save Error', 'Failed to save settings on server.');
  } finally {
    isSavingSettings.value = false;
  }
};

// ── CV Upload logic ──
const cvFileInput = ref<HTMLInputElement | null>(null);
const selectedCvFile = ref<File | null>(null);
const isUploadingCv = ref(false);

const onCvFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files?.[0]) {
    selectedCvFile.value = input.files[0];
  }
};

const handleCvUpload = async () => {
  if (!selectedCvFile.value) return;
  isUploadingCv.value = true;
  try {
    const fd = new FormData();
    fd.append('file', selectedCvFile.value);
    
    const res = await $fetch<any>(`${API_BASE}/settings/cv`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: fd,
    });
    
    if (res.cvUrl) {
      siteSetting.value.cvUrl = res.cvUrl;
      selectedCvFile.value = null;
      if (cvFileInput.value) cvFileInput.value.value = '';
      toast.success('CV Uploaded', 'Your curriculum vitae has been updated.');
    }
  } catch (err: any) {
    console.error('Failed to upload CV:', err);
    toast.error('Upload Failed', err.data?.message || 'Failed to upload CV.');
  } finally {
    isUploadingCv.value = false;
  }
};

const stats = computed(() => [
  {
    label: "Projects",
    count: projects.value.length,
    icon: "mdi:folder-multiple-outline",
    tab: "projects" as TabName,
    bg: "rgba(99,102,241,0.12)",
    color: "#818cf8",
  },
  {
    label: "Experiences",
    count: experiences.value.length,
    icon: "mdi:briefcase-outline",
    tab: "experience" as TabName,
    bg: "rgba(16,185,129,0.12)",
    color: "#34d399",
  },
  {
    label: "Skill Categories",
    count: skills.value.length,
    icon: "mdi:code-tags",
    tab: "skills" as TabName,
    bg: "rgba(245,158,11,0.12)",
    color: "#fbbf24",
  },
  {
    label: "Certificates",
    count: certificates.value.length,
    icon: "mdi:certificate-outline",
    tab: "certificates" as TabName,
    bg: "rgba(236,72,153,0.12)",
    color: "#f472b6",
  },
  {
    label: "Messages",
    count: messages.value.length,
    icon: "mdi:email-outline",
    tab: "messages" as TabName,
    bg: "rgba(239,68,68,0.12)",
    color: "#f87171",
  },
]);

const splitItems = (str: string) =>
  (str || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);



const fetchAll = async () => {
  const headers = { Authorization: `Bearer ${token.value}` };
  const [p, e, s, c, a, setting, m] = await Promise.allSettled([
    $fetch<any[]>(`${API_BASE}/projects`),
    $fetch<any[]>(`${API_BASE}/experiences`),
    $fetch<any[]>(`${API_BASE}/skills`),
    $fetch<any[]>(`${API_BASE}/certificates`),
    $fetch<any[]>(`${API_BASE}/about-cards`),
    $fetch<any>(`${API_BASE}/settings`),
    $fetch<any[]>(`${API_BASE}/messages`, { headers }),
  ]);
  if (p.status === "fulfilled") projects.value = p.value || [];
  if (e.status === "fulfilled") experiences.value = e.value || [];
  if (s.status === "fulfilled") skills.value = s.value || [];
  if (c.status === "fulfilled") certificates.value = c.value || [];
  if (a.status === "fulfilled") aboutCards.value = a.value || [];
  if (setting.status === "fulfilled" && setting.value) {
    siteSetting.value.announcementText = setting.value.announcementText || "";
    siteSetting.value.announcementActive = setting.value.announcementActive || false;
    siteSetting.value.enablePdfView = setting.value.enablePdfView || false;
    if (setting.value.bannerColor) siteSetting.value.bannerColor = setting.value.bannerColor;
    if (setting.value.textColor) siteSetting.value.textColor = setting.value.textColor;
    if (setting.value.animationSpeed) siteSetting.value.animationSpeed = setting.value.animationSpeed;
    if (setting.value.cvUrl) siteSetting.value.cvUrl = setting.value.cvUrl;
  }
  if (m.status === "fulfilled") messages.value = m.value || [];
};

onMounted(() => {
  if (isLoggedIn.value) fetchAll();
});

// ── Auth logic ──
const handleLogin = async () => {
  error.value = "";
  isLoading.value = true;
  console.log("Attempting login with:", {
    email: form.email,
    password: form.password,
  });
  try {
    const res = await $fetch<any>(`${API_BASE}/auth/login`, {
      method: "POST",
      body: { email: form.email, password: form.password },
    });
    console.log("Login success:", res);
    if (res.access_token) {
      token.value = res.access_token;
      isLoggedIn.value = true;
      form.password = "";
      await fetchAll();
    }
  } catch (err: any) {
    console.error("Login error details:", err);
    error.value = err.data?.message || "Invalid credentials. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const doLogout = () => {
  token.value = null;
  isLoggedIn.value = false;
  projects.value = [];
  experiences.value = [];
  skills.value = [];
  certificates.value = [];
  aboutCards.value = [];
};

// ── Modal ──
const modal = reactive({
  open: false,
  type: "" as string,
  editing: false,
  editId: null as number | null,
});
const form2 = reactive<Record<string, any>>({});
const isSaving = ref(false);

const modalTitle = computed(() => {
  const titles: Record<string, string> = {
    project: "Project",
    experience: "Experience",
    skill: "Skill Category",
    certificate: "Certificate",
    "about-card": "About Card",
  };
  return titles[modal.type] || "";
});

// Helper functions for Date Parsing
const parsePeriodStrToForm = (periodStr: string, formObj: any) => {
  if (!periodStr) return;
  // Expected format: "Jan 2024 - Jun 2024 · 6 mos" or "Oct 2025 - Present · 6 mos"
  try {
    const parts = periodStr.split(' · ')[0];
    if (!parts) return;
    const [startStr, endStr] = parts.split(' - ');
    
    // Parse "Jan 2024" to "2024-01"
    const toMonthYear = (str: string | undefined) => {
      if (!str || str === 'Present') return '';
      const d = new Date(str + ' 1'); 
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    };

    formObj.startDate = toMonthYear(startStr?.trim());
    if (endStr?.trim() === 'Present') {
      formObj.endDate = '';
      formObj.currentJob = true;
    } else {
      formObj.endDate = toMonthYear(endStr?.trim());
      formObj.currentJob = false;
    }
  } catch (err) {
    console.error('Error parsing period string', err);
  }
};

const compileFormToPeriodStr = (formObj: any) => {
  if (!formObj.startDate) return "";
  
  const start = new Date(formObj.startDate + "-01");
  const startStr = start.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  
  let endStr = "Present";
  let end = new Date(); // Use today for "Present" math
  
  if (!formObj.currentJob && formObj.endDate) {
    end = new Date(formObj.endDate + "-01");
    endStr = end.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }

  // Calculate duration in months
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1; // inclusive
  if (months < 1) months = 1;
  const durationStr = months >= 12 
    ? (months % 12 === 0 ? `${months / 12} yr${months/12 > 1 ? 's' : ''}` : `${Math.floor(months / 12)} yr ${months % 12} mos`)
    : `${months} mos`;

  return `${startStr} - ${endStr} · ${durationStr}`;
};

const openModal = (type: string) => {
  modal.type = type;
  modal.editing = false;
  modal.editId = null;
  Object.keys(form2).forEach((k) => delete form2[k]);
  
  if (type === "experience") {
    Object.assign(form2, { startDate: "", endDate: "", currentJob: false });
  } else if (type === "certificate") {
    Object.assign(certForm, {
      title: "",
      description: "",
      credentialUrl: "",
      imageFile: null,
      imagePreview: "",
      pdfFile: null,
      pdfFileName: "",
    });
  } else if (type === "project") {
    Object.assign(projectUploadForm, {
      imageFile: null,
      imagePreview: "",
    });
  } else if (type === "about-card") {
    Object.assign(form2, { textColor: "text-gray-600 dark:text-gray-400" });
  }
  modal.open = true;
};

const editItem = (type: string, item: any) => {
  modal.type = type;
  modal.editing = true;
  modal.editId = item.id;
  Object.keys(form2).forEach((k) => delete form2[k]);
  Object.assign(form2, { ...item });
  
  if (type === "experience") {
    parsePeriodStrToForm(item.period, form2);
  } else if (type === "project") {
    Object.assign(projectUploadForm, {
      imageFile: null,
      imagePreview: item.imageUrl ? `${API_BASE}${item.imageUrl}` : "",
    });
  } else if (type === "certificate") {
    // Reset file fields but keep preview if image exists
    Object.assign(certForm, {
      imageFile: null,
      imagePreview: item.fileUrl ? `${API_BASE}${item.fileUrl}` : "",
      pdfFile: null,
      pdfFileName: item.pdfUrl ? "Existing PDF" : "",
    });
  }
  
  modal.open = true;
};

const closeModal = () => {
  modal.open = false;
};

const saveItem = async () => {
  isSaving.value = true;
  const headers = { Authorization: `Bearer ${token.value}` };
  const isEdit = modal.editing;
  const id = modal.editId;

  try {
    if (modal.type === "certificate" || modal.type === "project") {
      const fd = new FormData();
      fd.append("title", form2.title || "");
      if (form2.description) fd.append("description", form2.description);
      
      if (modal.type === "certificate") {
        if (form2.credentialUrl) fd.append("credentialUrl", form2.credentialUrl);
        if (certForm.imageFile) fd.append("imageFile", certForm.imageFile);
        if (certForm.pdfFile) fd.append("pdfFile", certForm.pdfFile);
        
        if (!isEdit && !certForm.imageFile) {
          toast.error("Image Required", "A certificate image is required for new entries.");
          isSaving.value = false;
          return;
        }
      } else if (modal.type === "project") {
        if (form2.techStack) fd.append("techStack", form2.techStack);
        if (form2.githubUrl) fd.append("githubUrl", form2.githubUrl);
        if (form2.demoUrl) fd.append("demoUrl", form2.demoUrl);
        if (projectUploadForm.imageFile) fd.append("imageFile", projectUploadForm.imageFile);
      }

      const url = isEdit
        ? `${API_BASE}/${modal.type}s/${id}`
        : `${API_BASE}/${modal.type}s`;
      const method = isEdit ? "PATCH" : "POST";

      await $fetch(url, {
        method,
        headers,
        body: fd,
      });
    } else {
      let payload = { ...form2 };
      
      if (modal.type === "experience") {
        if (!form2.startDate) {
          toast.error("Field Required", "Start Date is required for experience entries.");
          isSaving.value = false;
          return;
        }
        payload.period = compileFormToPeriodStr(form2);
        delete payload.startDate;
        delete payload.endDate;
        delete payload.currentJob;
      }
      
      const url = isEdit
        ? `${API_BASE}/${modal.type}s/${id}`
        : `${API_BASE}/${modal.type}s`;
      const method = isEdit ? "PATCH" : "POST";
      await $fetch(url, {
        method,
        headers: { ...headers, "Content-Type": "application/json" },
        body: payload,
      });
    }
    closeModal();
    toast.success("Changes Saved", `The ${modal.type} has been successfully ${isEdit ? 'updated' : 'added'}.`);
    await fetchAll();
  } catch (err: any) {
    toast.error("Save Failed", err.data?.message || "An error occurred while saving.");
    console.error(err);
  } finally {
    isSaving.value = false;
  }
};

const deleteItem = async (type: string, id: number) => {
  if (!confirm(`Delete this ${type}?`)) return;
  try {
    await $fetch(`${API_BASE}/${type}s/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token.value}` },
    });
    await fetchAll();
  } catch (err) {
    console.error(err);
  }
};

const markMessageAsRead = async (id: number) => {
  try {
    await $fetch(`${API_BASE}/messages/${id}/read`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token.value}` },
    });
    await fetchAll();
  } catch (err) {
    console.error(err);
  }
};

const savingOrderFor = ref<string | null>(null);

const onReorder = async (type: string) => {
  savingOrderFor.value = type;
  let list: any[] = [];
  if (type === "project") list = projects.value;
  else if (type === "experience") list = experiences.value;
  else if (type === "skill") list = skills.value;
  else if (type === "certificate") list = certificates.value;
  else if (type === "about-card") list = aboutCards.value;

  const payload = list.map((item, index) => ({ id: item.id, order: index }));

  try {
    await $fetch(`${API_BASE}/${type}s/reorder`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: payload,
    });
    toast.success("Order Updated", "The display order has been updated successfully.");
  } catch (err: any) {
    console.error("Reorder failed:", err);
    toast.error("Process Failed", "Failed to save the new order on the server.");
    await fetchAll(); // revert locally if failed
  } finally {
    savingOrderFor.value = null;
  }
};

// ── Certificate file upload ──
const fileInput = ref<HTMLInputElement | null>(null);
const pdfFileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);
const certForm = reactive({
  title: "",
  description: "",
  credentialUrl: "",
  imageFile: null as File | null,
  imagePreview: "",
  pdfFile: null as File | null,
  pdfFileName: "",
});

const clearImageFile = () => {
  certForm.imageFile = null;
  certForm.imagePreview = "";
  if (fileInput.value) fileInput.value.value = "";
};

const clearPdfFile = () => {
  certForm.pdfFile = null;
  certForm.pdfFileName = "";
  if (pdfFileInput.value) pdfFileInput.value.value = "";
};

const processImageFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    toast.error('Invalid File', 'Please select a valid image file (JPG, PNG).');
    return;
  }
  certForm.imageFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    certForm.imagePreview = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const processPdfFile = async (file: File) => {
  if (file.type !== 'application/pdf') {
    toast.error('Invalid File', 'Please select a valid PDF file.');
    return;
  }
  certForm.pdfFile = file;
  certForm.pdfFileName = file.name;

  // Auto-generate thumbnail using pdf.js
  try {
    // @ts-ignore
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    if (!pdfjsLib) {
      console.warn('pdf.js not loaded yet. Waiting...');
      return;
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    if (context) {
      await page.render({ canvasContext: context, viewport }).promise;
      
      canvas.toBlob((blob) => {
        if (blob) {
          const thumbnailFile = new File([blob], file.name.replace('.pdf', '.jpg'), { type: 'image/jpeg' });
          certForm.imageFile = thumbnailFile;
          certForm.imagePreview = URL.createObjectURL(blob);
        }
      }, 'image/jpeg', 0.9);
    }
  } catch (err) {
    console.error('Failed to auto-generate thumbnail from PDF:', err);
  }
};

const handleImageFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files?.[0]) processImageFile(input.files[0]);
};

const handlePdfFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files?.[0]) processPdfFile(input.files[0]);
};

const handleImageDrop = (e: DragEvent) => {
  isDragging.value = false;
  const file = e.dataTransfer?.files[0];
  if (file) processImageFile(file);
};

// ── Project image upload ──
const projectImageInput = ref<HTMLInputElement | null>(null);
const projectUploadForm = reactive({
  imageFile: null as File | null,
  imagePreview: "",
});

const clearProjectImageFile = () => {
  projectUploadForm.imageFile = null;
  projectUploadForm.imagePreview = "";
  if (projectImageInput.value) projectImageInput.value.value = "";
};

const processProjectImageFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    toast.error('Invalid File', 'Please select a valid image file (JPG, PNG, WEBP).');
    return;
  }
  projectUploadForm.imageFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    projectUploadForm.imagePreview = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const handleProjectImageFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files?.[0]) processProjectImageFile(input.files[0]);
};

const handleProjectImageDrop = (e: DragEvent) => {
  isDragging.value = false;
  const file = e.dataTransfer?.files[0];
  if (file) processProjectImageFile(file);
};
</script>

<style scoped>
/* Force Vite HMR rebuild */
/* ── Page shell ── */
.admin-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}

/* ── Animated blobs ── */
.animated-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: #000000;
  animation: bgRotate 60s linear infinite;
  transform-origin: center center;
}
@keyframes bgRotate {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(30deg);
  }
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(150px);
  opacity: 0.12;
  top: 50%;
  left: 50%;
}
.blob-1 {
  width: 560px;
  height: 560px;
  margin: -280px 0 0 -280px;
  background: radial-gradient(circle, #7c3aed, #4f46e5);
  animation: orbit1 18s linear infinite;
}
.blob-2 {
  width: 440px;
  height: 440px;
  margin: -220px 0 0 -220px;
  background: radial-gradient(circle, #06b6d4, #3b82f6);
  animation: orbit2 14s linear infinite;
}
.blob-3 {
  width: 320px;
  height: 320px;
  margin: -160px 0 0 -160px;
  background: radial-gradient(circle, #ec4899, #a855f7);
  animation: orbit3 10s linear infinite;
}
.blob-4 {
  width: 260px;
  height: 260px;
  margin: -130px 0 0 -130px;
  background: radial-gradient(circle, #10b981, #14b8a6);
  animation: orbit4 22s linear infinite;
}

@keyframes orbit1 {
  0% {
    transform: translate(-38vw, -28vh) scale(1);
  }
  25% {
    transform: translate(35vw, -22vh) scale(1.1);
  }
  50% {
    transform: translate(32vw, 30vh) scale(0.95);
  }
  75% {
    transform: translate(-32vw, 25vh) scale(1.05);
  }
  100% {
    transform: translate(-38vw, -28vh) scale(1);
  }
}
@keyframes orbit2 {
  0% {
    transform: translate(32vw, 26vh) scale(1);
  }
  25% {
    transform: translate(-28vw, 22vh) scale(1.08);
  }
  50% {
    transform: translate(-30vw, -24vh) scale(0.92);
  }
  75% {
    transform: translate(28vw, -20vh) scale(1.04);
  }
  100% {
    transform: translate(32vw, 26vh) scale(1);
  }
}
@keyframes orbit3 {
  0% {
    transform: translate(18vw, -32vh) scale(1);
  }
  25% {
    transform: translate(30vw, 18vh) scale(1.12);
  }
  50% {
    transform: translate(-20vw, 28vh) scale(0.9);
  }
  75% {
    transform: translate(-28vw, -18vh) scale(1.06);
  }
  100% {
    transform: translate(18vw, -32vh) scale(1);
  }
}
@keyframes orbit4 {
  0% {
    transform: translate(-20vw, 18vh) scale(1);
  }
  25% {
    transform: translate(14vw, 22vh) scale(1.1);
  }
  50% {
    transform: translate(22vw, -16vh) scale(0.95);
  }
  75% {
    transform: translate(-16vw, -22vh) scale(1.05);
  }
  100% {
    transform: translate(-20vw, 18vh) scale(1);
  }
}

/* ── Login ── */
.glass-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(64px) saturate(1.4) brightness(1);
  -webkit-backdrop-filter: blur(64px) saturate(1.4) brightness(1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
.dark .glass-wrapper {
  background: rgba(10, 8, 30, 0.45);
  backdrop-filter: blur(64px) saturate(1.4) brightness(0.9);
  -webkit-backdrop-filter: blur(64px) saturate(1.4) brightness(0.9);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset;
}

.login-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.4rem;
  display: block;
}

.login-submit-btn {
  width: 100%;
  max-width: 200px;
  margin: 1.5rem auto 0;
  height: 2.75rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.login-submit-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
}
.login-submit-btn:active:not(:disabled) {
  transform: translateY(0);
}
.login-submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Dashboard layout ── */
.dashboard-layout {
  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  min-height: 100vh;
}

/* ── Sidebar ── */
.sidebar {
  width: 240px;
  min-height: 100vh;
  flex-shrink: 0;
  background: #0b0b18; /* Solid dark background for SaaS feel */
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0.75rem;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  scrollbar-width: none;
}
.sidebar::-webkit-scrollbar { display: none; }

.sidebar--collapsed {
  width: 72px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  padding: 0 0.5rem 1.5rem;
  margin-bottom: 1rem;
  min-height: 48px;
}
.sidebar--collapsed .sidebar-brand {
  justify-content: center;
  padding: 0 0 1.5rem;
}

.sidebar-toggle-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.25s;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.sidebar-toggle-btn:hover {
  background: rgba(139, 92, 246, 0.1);
  color: #a78bfa;
  border-color: rgba(139, 92, 246, 0.2);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 1rem;
  border-radius: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.25s ease-in-out;
  cursor: pointer;
  border: 1px solid transparent;
  overflow: hidden;
  white-space: nowrap;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  transition: all 0.25s;
}

.nav-label {
  margin-left: 0.85rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: opacity 0.2s, transform 0.2s;
}

.sidebar--collapsed .nav-label {
  opacity: 0;
  transform: translateX(-10px);
  pointer-events: none;
}

.sidebar--collapsed .nav-item {
  padding: 0;
  justify-content: center;
}

.active-indicator {
  position: absolute;
  left: 0;
  top: 25%;
  bottom: 25%;
  width: 3px;
  background: #a78bfa;
  border-radius: 0 4px 4px 0;
  opacity: 0;
  transform: scaleY(0);
  transition: all 0.2s;
}

.nav-item--active {
  background: rgba(139, 92, 246, 0.1);
  color: #fff;
  border-color: rgba(139, 92, 246, 0.15);
  box-shadow: inset 0 0 15px rgba(139, 92, 246, 0.05);
}
.nav-item--active .active-indicator {
  opacity: 1;
  transform: scaleY(1);
}
.nav-item--active .nav-icon {
  color: #a78bfa;
  transform: scale(1.1);
}

.nav-item:hover:not(.nav-item--active) {
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.95);
}
.nav-item:hover .nav-icon {
  transform: scale(1.1);
}

/* ── Custom Tooltips ── */
.sidebar--collapsed .nav-item::after,
.sidebar--collapsed .sidebar-action::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 100%;
  margin-left: 0.75rem;
  padding: 0.4rem 0.75rem;
  background: #1a1a2e;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.4rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-10px);
  transition: all 0.2s;
  pointer-events: none;
  z-index: 200;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.sidebar--collapsed .nav-item:hover::after,
.sidebar--collapsed .sidebar-action:hover::after {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.sidebar-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 1rem 0.5rem;
}

.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-action {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.25s;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.7);
}

.sidebar--collapsed .sidebar-action {
  padding: 0;
  justify-content: center;
}

.nav-icon--small {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.sidebar-btn--view {
  background: rgba(59, 130, 246, 0.08);
  color: #93c5fd;
  border-color: rgba(59, 130, 246, 0.1);
}
.sidebar-btn--view:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
  color: #fff;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
}

.sidebar-btn--logout {
  background: rgba(239, 68, 68, 0.08);
  color: #fca5a5;
  border-color: rgba(239, 68, 68, 0.1);
}
.sidebar-btn--logout:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.3);
  color: #fff;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
}

/* ── Main content ── */
.dashboard-main {
  flex: 1;
  padding: 2rem;
  overflow-y: auto !important;
  max-height: 100vh;
  /* Ensure scrollbar visibility in admin panel */
  scrollbar-width: auto !important;
  -ms-overflow-style: auto !important;
}

.dashboard-main::-webkit-scrollbar {
  display: block !important;
  width: 8px !important;
}

.dashboard-main::-webkit-scrollbar-thumb {
  background: rgba(147, 197, 253, 0.2) !important;
  border-radius: 4px !important;
}

.dashboard-main::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 197, 253, 0.4) !important;
}

.tab-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tab-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.tab-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
}
.dark .tab-title {
  color: #fff;
}
.tab-subtitle {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 0.2rem;
  font-family: monospace;
}

/* ── Stats ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(32px);
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0.5rem;
  padding: 0.35rem 0.65rem;
  cursor: pointer;
  transition: all 0.25s;
}
.dark .stat-card {
  background: rgba(10, 8, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.stat-card:hover {
  border-color: rgba(139, 92, 246, 0.6);
  transform: translateY(-2px);
  background: rgba(15, 12, 45, 0.98);
  box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.3);
}

.stat-icon-wrap {
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 0.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-count {
  font-size: 1.25rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
}
.stat-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.15rem;
}

.dash-welcome {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: rgba(10, 8, 30, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  backdrop-filter: blur(32px);
}

.settings-card {
  background: rgba(10, 8, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 0.5rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

/* ── List table ── */
.list-table {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(32px);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  overflow: hidden;
}
.dark .list-table {
  background: rgba(10, 8, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.list-head {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  padding: 0.65rem 1.25rem;
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  font-size: 0.68rem;
  font-weight: 700;
  color: rgba(15, 23, 42, 0.6);
  letter-spacing: 0.05em;
}
.dark .list-head {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.9);
}
.list-head--exp {
  grid-template-columns: 2fr 2fr 1.5fr 0.7fr;
}
.list-head--skill {
  grid-template-columns: 1.5fr 3fr 0.7fr;
}

.list-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  padding: 0.75rem 1.25rem;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s;
}
.list-row:last-child {
  border-bottom: none;
}
.list-row:hover {
  background: rgba(255, 255, 255, 0.025);
}
.list-row--exp {
  grid-template-columns: 2fr 2fr 1.5fr 0.7fr;
}
.list-row--skill {
  grid-template-columns: 1.5fr 3fr 0.7fr;
}

.empty-state {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85rem;
  text-align: center;
  padding: 2.5rem 1rem;
}

/* ── Tags / chips ── */
.tag {
  font-size: 0.65rem;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  color: #a78bfa;
  font-family: monospace;
}
.link-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(200, 200, 240, 0.6);
  transition: all 0.2s;
}
.link-chip:hover {
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
  border-color: rgba(139, 92, 246, 0.3);
}

/* ── Icon buttons ── */
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}
.icon-btn--edit {
  color: rgba(191, 191, 220, 0.75);
}
.icon-btn--edit:hover {
  color: #93c5fd;
  background: rgba(59, 130, 246, 0.1);
}
.icon-btn--del {
  color: rgba(180, 180, 220, 0.4);
}
.icon-btn--del:hover {
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.1);
}

/* ── Add button ── */
.add-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  border-radius: 0.5rem;
  color: #fff;
  white-space: nowrap;
  transition: all 0.25s;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.25);
  flex-shrink: 0;
}
.add-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
}

/* ── Certificate grid ── */
.cert-grid {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.cert-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(10, 8, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  transition: all 0.2s;
}
.cert-card:hover {
  border-color: rgba(139, 92, 246, 0.25);
  background: rgba(15, 12, 45, 0.98);
}
.cert-thumb {
  width: 3.5rem;
  height: 2.6rem;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.cert-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.cert-info {
  flex: 1;
  min-width: 0;
}

/* ── Modal ── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.modal-box {
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto !important;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(64px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  scrollbar-width: auto !important;
  -ms-overflow-style: auto !important;
}
.modal-box::-webkit-scrollbar {
  display: block !important;
  width: 6px !important;
}
.modal-box::-webkit-scrollbar-thumb {
  background: rgba(147, 197, 253, 0.3) !important;
  border-radius: 4px !important;
}
.dark .modal-box {
  background: rgba(10, 8, 30, 0.95);
  border-color: rgba(255, 255, 255, 0.12);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
}
.dark .modal-header {
  border-color: rgba(255, 255, 255, 0.07);
}
.modal-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}
.modal-close {
  padding: 0.35rem;
  border-radius: 0.4rem;
  color: rgba(180, 180, 220, 0.4);
  transition: all 0.2s;
}
.modal-close:hover {
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.1);
}
.modal-body {
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.modal-footer {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.cancel-btn {
  padding: 0.55rem 1.1rem;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(180, 180, 220, 0.6);
  transition: all 0.2s;
}
.cancel-btn:hover {
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(220, 220, 250, 0.9);
}

/* ── Upload zone ── */
.upload-zone {
  position: relative;
  border: 2px dashed rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  min-height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition:
    border-color 0.2s,
    background 0.2s;
}
.upload-zone:hover,
.upload-zone--active {
  border-color: rgba(139, 92, 246, 0.5);
  background: rgba(139, 92, 246, 0.05);
}
.upload-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
}
.upload-preview {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-preview-img {
  width: 100%;
  max-height: 160px;
  object-fit: contain;
}
.upload-pdf-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
}
.upload-remove {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.35);
  border-radius: 0.4rem;
  color: #fca5a5;
  padding: 0.25rem;
  transition: all 0.2s;
}
.upload-remove:hover {
  background: rgba(239, 68, 68, 0.35);
}

/* ── Shared form styles ── */
.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}
.field-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.02em;
}
.glass-input {
  width: 100%;
  padding: 0.65rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.25s ease;
  color-scheme: dark;
}
.glass-input::placeholder {
  color: rgba(255, 255, 255, 0.45);
}
.glass-input:focus {
  border-color: rgba(139, 92, 246, 0.7);
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
  background: rgba(255, 255, 255, 0.08);
}

/* Fix autofill background turning white */
.glass-input:-webkit-autofill,
.glass-input:-webkit-autofill:hover,
.glass-input:-webkit-autofill:focus {
  -webkit-text-fill-color: white !important;
  -webkit-box-shadow: 0 0 0px 1000px #0e0e1a inset !important;
  transition: background-color 5000s ease-in-out 0s;
}

/* Fix Calendar/Date picker visibility */
.glass-input::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.glass-input::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #a78bfa, #60a5fa, #f0abfc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}
.subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.7rem;
  font-family: monospace;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 0.5rem;
}

.error-msg {
  font-size: 0.75rem;
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
}

.submit-btn {
  padding: 0.6rem 1.25rem;
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s;
  cursor: pointer;
}
.submit-btn:hover:not(:disabled) {
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
}
.submit-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.eye-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding-right: 0.75rem;
  display: flex;
  align-items: center;
  color: rgba(180, 180, 220, 0.5);
  transition: color 0.2s;
}
.eye-btn:hover {
  color: rgba(200, 200, 240, 0.9);
}
.back-link {
  font-size: 0.75rem;
  color: rgba(180, 180, 220, 0.45);
  transition: color 0.2s;
}
.back-link:hover {
  color: rgba(200, 200, 240, 0.8);
}

/* ── Modal transition ── */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
