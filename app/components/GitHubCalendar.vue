<template>
  <div class="github-calendar-container font-sans flex flex-col items-center relative w-full px-0">
    <!-- Centered Card Wrapper -->
    <div class="w-fit mx-auto flex flex-col bg-transparent relative">
      <!-- Header: Avatar, Username, and View Profile Link -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="relative w-9 h-9 border border-white/10 rounded-full overflow-hidden shrink-0">
            <img 
              :src="avatarUrl" 
              :alt="username"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex flex-col">
            <span class="text-[12px] text-[#8B949E] font-medium leading-none">@{{ username }}</span>
          </div>
        </div>
        
        <a 
          :href="`https://github.com/${username}`" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 text-[11px] text-[#8B949E] hover:text-white transition-colors duration-200"
        >
          <span>View Profile</span>
          <Icon name="mdi:github" class="w-4 h-4" />
        </a>
      </div>

      <!-- Calendar Grid Area -->
      <div class="flex gap-2 justify-center">
        <!-- Day Labels (Left) -->
        <div class="flex flex-col gap-[2px] pt-[25px] w-6 shrink-0">
          <span class="text-[9px] text-[#8B949E] h-[11px] leading-[11px]"></span>
          <span class="text-[9px] text-[#8B949E] h-[11px] leading-[11px]">Mon</span>
          <span class="text-[9px] text-[#8B949E] h-[11px] leading-[11px]"></span>
          <span class="text-[9px] text-[#8B949E] h-[11px] leading-[11px]">Wed</span>
          <span class="text-[9px] text-[#8B949E] h-[11px] leading-[11px]"></span>
          <span class="text-[9px] text-[#8B949E] h-[11px] leading-[11px]">Fri</span>
          <span class="text-[9px] text-[#8B949E] h-[11px] leading-[11px]"></span>
        </div>

        <!-- Grid + Month Labels -->
        <div class="overflow-x-auto scrollbar-hide pb-2">
          <div class="flex flex-col gap-1 w-max">
            <!-- Month Labels Row -->
            <div class="h-[15px] relative">
              <div 
                v-for="(month, index) in monthLabels" 
                :key="index"
                class="absolute text-[9px] text-[#8B949E] whitespace-nowrap"
                :style="{ left: `${month.offset * 13}px` }"
              >
                {{ month.name }}
              </div>
            </div>

            <!-- Contribution Grid -->
            <div class="flex gap-[2px]">
              <div 
                v-for="(week, weekIndex) in weeks" 
                :key="weekIndex"
                class="flex flex-col gap-[2px]"
              >
                <div 
                  v-for="(day, dayIndex) in week" 
                  :key="dayIndex"
                  class="w-[11px] h-[11px] rounded-[2px] transition-colors duration-200 cursor-pointer relative"
                  :style="{ backgroundColor: getColor(day.count) }"
                  @mouseenter="showTooltip($event, day)"
                  @mouseleave="hideTooltip"
                >
                </div>
              </div>
            </div>

            <!-- Footer: Stats and Legend (Inside w-max grid container to match width) -->
            <div class="flex items-center justify-between mt-3 text-[11px] text-[#8B949E] w-full">
              <div class="text-left">
                {{ totalContributions }} contributions in the last 10 months
              </div>
              <div class="flex items-center shrink-0">
                <span class="mr-[6px]">Less</span>
                <div class="flex gap-[4px]">
                  <div 
                    v-for="(color, i) in contributionColors" 
                    :key="i"
                    class="w-[10px] h-[10px] rounded-[2px]"
                    :style="{ backgroundColor: color }"
                  ></div>
                </div>
                <span class="ml-[6px]">More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tooltip (Positioned relative to the card wrapper) -->
    <div 
      v-show="tooltip.show"
      class="absolute z-50 pointer-events-none bg-[#6E7681] text-white text-[12px] px-3 py-1.5 rounded-md shadow-lg transform -translate-x-1/2 -translate-y-full mb-2 transition-opacity duration-150"
      :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px`, opacity: tooltip.show ? 1 : 0 }"
    >
      <div class="relative whitespace-nowrap">
        <span class="font-semibold">{{ tooltip.count }} contributions</span> on {{ tooltip.date }}
        <!-- Arrow -->
        <div class="absolute top-[26px] left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#6E7681]"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component to fetch and display a GitHub contribution calendar for a specific user
import { ref, computed, onMounted } from 'vue'

interface Day {
  date: string
  count: number
  dayOfWeek: number
}

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    default: 'https://github.com/github.png'
  }
})

const rawData = ref<any[]>([])
const loading = ref(true)

const contributionColors = [
  '#161B22', // Level 0
  '#0E4429', // Level 1
  '#006D32', // Level 2
  '#26A641', // Level 3
  '#39D353'  // Level 4
]

/**
 * Returns the appropriate GitHub color based on the contribution count.
 * Maps count ranges to the five standard GitHub contribution levels (0 to 4).
 */
const getColor = (count: number) => {
  if (count === 0) return contributionColors[0]
  if (count <= 3) return contributionColors[1]
  if (count <= 6) return contributionColors[2]
  if (count <= 9) return contributionColors[3]
  return contributionColors[4]
}

/**
 * Groups the flat list of days into weeks (arrays of 7 days).
 * This makes it easier to render the grid column by column.
 */
const weeks = computed(() => {
  if (rawData.value.length === 0) return []
  
  const result: Day[][] = []
  let currentWeek: Day[] = []
  
  // Iterate through all fetched days and chunk them into weeks
  rawData.value.forEach((day, index) => {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      result.push(currentWeek)
      currentWeek = []
    }
  })
  
  // Handle any remaining days in the last week
  if (currentWeek.length > 0) {
    result.push(currentWeek)
  }
  
  return result
})

const totalContributions = computed(() => {
  return rawData.value.reduce((acc, curr) => acc + curr.count, 0)
})

/**
 * Generates month labels (Jan, Feb, etc.) and calculates their position.
 * It identifies when a new month starts in the sequence of weeks.
 */
const monthLabels = computed(() => {
  if (weeks.value.length === 0) return []
  
  const labels: { name: string; offset: number }[] = []
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  let lastMonth = -1
  
  weeks.value.forEach((week, index) => {
    const firstDay = week[0]
    if (!firstDay) return
    const firstDayDate = new Date(firstDay.date)
    const month = firstDayDate.getMonth()
    
    // If the month of this week is different from the last labeled month...
    if (month !== lastMonth) {
      const lastLabel = labels[labels.length - 1]
      // Ensure there's enough space (3 weeks) between labels to avoid overlap
      if (!lastLabel || index - lastLabel.offset > 3) {
        labels.push({
          name: monthNames[month] || '',
          offset: index // The week index used for positioning
        })
        lastMonth = month
      }
    }
  })
  
  return labels
})

const tooltip = ref({
  show: false,
  x: 0,
  y: 0,
  count: 0,
  date: ''
})

/**
 * Positions and displays the tooltip when hovering over a contribution square.
 * Calculates coordinates relative to the calendar container.
 */
const showTooltip = (event: MouseEvent, day: Day) => {
  const container = (event.currentTarget as HTMLElement).closest('.github-calendar-container')
  if (!container) return
  
  const containerRect = container.getBoundingClientRect()
  const cellRect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  
  tooltip.value = {
    show: true,
    // Center the tooltip horizontally above the square
    x: cellRect.left - containerRect.left + cellRect.width / 2,
    // Position it slightly above the square
    y: cellRect.top - containerRect.top - 8,
    count: day.count,
    date: formatDate(day.date)
  }
}

const hideTooltip = () => {
  tooltip.value.show = false
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

onMounted(async () => {
  try {
    loading.value = true

    // Fetch GitHub contribution data
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${props.username}?y=last`
    )

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.contributions || !Array.isArray(data.contributions)) {
      throw new Error('Invalid contribution data')
    }

    const contributions = data.contributions

    // Ambil sekitar 10 bulan terakhir (±304 hari)
    let startIndex = Math.max(
      0,
      contributions.length - 304
    )

    // Cari hari Minggu sebagai awal minggu
    while (startIndex < contributions.length) {
      const day = new Date(contributions[startIndex].date)

      if (day.getDay() === 0) {
        break
      }

      startIndex++
    }

    const recentContributions = contributions.slice(startIndex)

    // Mapping data dari API ke format yang digunakan component
    rawData.value = recentContributions.map((day: any) => ({
      date: day.date,
      count: Number(day.count) || 0,
      dayOfWeek: new Date(day.date).getDay()
    }))

    console.log(
      `GitHub contributions loaded: ${rawData.value.length} days`
    )

  } catch (error) {
    console.error(
      'Error fetching GitHub contributions:',
      error
    )

    rawData.value = []

  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Scoped styles removed in favor of global .scrollbar-hide in main.css */
</style>
