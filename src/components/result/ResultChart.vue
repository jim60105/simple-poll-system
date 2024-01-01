<template>
  <Chart
    ref="primeChart"
    :type="chartType"
    :data="chartData"
    :options="chartOptions"
    class="w-full md:w-30rem"
  />
</template>

<script setup lang="ts">
import { inject, onBeforeMount, onMounted, ref } from 'vue';
import { ChartData } from 'chart.js';
import { IItem } from '@/models/item';
import { APIService } from '@/services/APIService';

const primeChart = ref();

const props = defineProps(['modelValue']);
const item = ref<IItem>(props.modelValue);
const chartType = ref(props.modelValue.result.chartType);
const apiService = inject<APIService>('APIService')!;

// const documentStyle = getComputedStyle(document.body);
const chartData: ChartData = {
  labels: [],
  datasets: [
    {
      data: []
      // backgroundColor: [
      //   documentStyle.getPropertyValue('--blue-500'),
      //   documentStyle.getPropertyValue('--yellow-500'),
      //   documentStyle.getPropertyValue('--green-500')
      // ],
      // hoverBackgroundColor: [
      //   documentStyle.getPropertyValue('--blue-400'),
      //   documentStyle.getPropertyValue('--yellow-400'),
      //   documentStyle.getPropertyValue('--green-400')
      // ]
    }
  ]
};
const chartOptions: any = {
  plugins: {
    colors: {
      enabled: true,
      forceOverride: true
    },
    legend: {
      labels: {
        color: getComputedStyle(document.documentElement).getPropertyValue('--text-color')
      }
    }
  }
};

const setChartLabels = async (data: ChartData) => {
  // const response = await fetch(`/api/poll/Poll1/${item.value.id}?type=count`);
  // const res: { Value: string; Count: number }[] = await response.json();
  // data.labels = res.map((x) => x.Value);
  data.labels = item.value.options;
};

const setChartData = async (data: ChartData) => {
  var result = await apiService.getPollCount(item.value, 'Poll1');
  const result_ordered = item.value.options.map(
    (x) => result.find((y) => y.Value === x) || { Value: x, Count: 0 }
  );
  data.datasets[0].data = result_ordered.map((x) => x.Count);
};

onBeforeMount(async () => {
  if (item.value.result.chartType === 'doughnut') {
    chartOptions.cutout = '60%';
  } else {
    chartOptions.cutout = '0%';
  }
  await setChartLabels(chartData);
  await setChartData(chartData);
});

onMounted(() => {
  var intervalId = setInterval(async () => {
    const chart = primeChart.value?.chart;
    if (!chart) return;

    await setChartData(chart.data);
    chart.update();

    // Clear after first run, for example
    clearInterval(intervalId);
  }, 5000);
});
</script>

<style scoped></style>
