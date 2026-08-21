<template>
  <div class="visitor-chart-card bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h3 class="text-xl font-bold text-white flex items-center gap-2">
          <Icon name="mdi:chart-line" class="w-6 h-6 text-accent" />
          Visitor Analytics
        </h3>
        <p class="text-xs text-gray-500 mt-1">Website traffic overview and trends</p>
      </div>
      
      <!-- Range Selector -->
      <div class="flex items-center bg-gray-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/10">
        <button 
          v-for="r in ranges" 
          :key="r.value"
          class="px-4 py-1.5 text-xs font-semibold rounded-lg transition-all"
          :class="range === r.value ? 'bg-accent text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'"
          @click="range = r.value"
        >
          {{ r.label }}
        </button>
      </div>
    </div>

    <!-- Chart Container -->
    <div class="relative min-h-[300px] w-full">
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-transparent z-10">
        <Icon name="mdi:loading" class="w-10 h-10 text-accent animate-spin" />
      </div>
      
      <ClientOnly>
        <apexchart
          v-if="!isLoading && series && series[0] && series[0].data && series[0].data.length > 0"
          type="area"
          height="300"
          :options="chartOptions"
          :series="series"
        />
        
        <div v-else-if="!isLoading" class="flex flex-col items-center justify-center h-[300px] text-gray-500">
          <Icon name="mdi:chart-areaspline-variant" class="w-12 h-12 opacity-20 mb-3" />
          <p class="text-sm">No data available for this range</p>
          <p class="text-[10px] mt-1 italic">Analytics started recording recently</p>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const { fetchVisitorStats } = usePortfolioData();

const range = ref('1m');
const isLoading = ref(true);
const ranges = [
  { label: '1M', value: '1m' },
  { label: '6M', value: '6m' },
  { label: '12M', value: '12m' },
  { label: 'All', value: 'all' },
];

const series = ref([{
  name: 'Visitors',
  data: [] as number[]
}]);

const chartOptions = ref({
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: 'Inter, sans-serif',
    dropShadow: {
      enabled: true,
      top: 10,
      left: 0,
      blur: 4,
      color: '#6366F1',
      opacity: 0.1
    }
  },
  colors: ['#6366F1'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [20, 100]
    }
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  grid: {
    borderColor: 'rgba(255, 255, 255, 0.05)',
    padding: { left: 10, right: 10 }
  },
  xaxis: {
    categories: [] as string[],
    labels: {
      style: { colors: '#94a3b8', fontSize: '10px' },
      rotate: -45,
      offsetY: 5
    },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    labels: {
      style: { colors: '#94a3b8', fontSize: '10px' }
    }
  },
  tooltip: {
    theme: 'dark',
    x: { show: true },
    y: {
      formatter: (val: number) => Math.round(val) + ' visitors'
    }
  }
});

const loadData = async () => {
  isLoading.value = true;
  try {
    const data = await fetchVisitorStats(range.value);
    if (data && data.length > 0 && series.value && series.value[0]) {
      series.value[0].data = data.map((d: any) => d.count);
      if (chartOptions.value.xaxis) {
        chartOptions.value = {
          ...chartOptions.value,
          xaxis: {
            ...chartOptions.value.xaxis,
              categories: data.map((d: any) => {
                // For 1m, show day. For others, show month.
                // Use a safer parsing method for YYYY-MM strings
                const dateStr = d.label.includes('-') && d.label.split('-').length === 2 
                  ? `${d.label}-01` 
                  : d.label;
                const date = new Date(dateStr);
                
                if (range.value === '1m') {
                   return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                }
                return date.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
              })
          }
        };
      }
    } else if (series.value && series.value[0]) {
      series.value[0].data = [];
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadData);
watch(range, loadData);
</script>

<style scoped>
.visitor-chart-card {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
}
</style>
