<template>
  <div class="card flex justify-content-center">
    <form
      data-static-form-name="Poll1"
      @submit="onSubmit"
      class="flex flex-column align-items-center gap-2"
    >
      <label for="q1" :class="['flex justify-content-center', { 'p-error': errorMessage }]">
        Question 1
      </label>
      <SelectButton
        id="q1"
        v-model="value"
        :class="{ 'p-invalid': errorMessage }"
        aria-describedby="text-error"
        :options="options"
        name="q1"
      />
      <small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small>
      <Button type="submit" label="Submit" />
    </form>
    <Toast />
  </div>

  <div class="card flex justify-content-center">
    <Chart
      ref="primeChart"
      type="doughnut"
      :data="chartData"
      :options="chartOptions"
      class="w-full md:w-30rem"
    />
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { IPoll } from '@/models/poll';
import { useForm, useField } from 'vee-validate';

const { handleSubmit, resetForm } = useForm();
const { value, errorMessage } = useField<string>('value', validateField);
const toast = useToast();

const options = ['Cats', 'Dogs', 'Birds'];

function validateField(value: string) {
  if (!value) {
    return 'Q1 is required.';
  }

  return true;
}

const onSubmit = handleSubmit(async (values) => {
  if (values.value && values.value.length > 0) {
    const poll: IPoll = {
      pollName: 'Poll1',
      pollItems: [['q1', values.value]]
    };
    await fetch('/api/poll/Poll1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(poll)
    });
    resetForm();
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Your vote has been submitted.',
      life: 3000
    });
  }
});

// Chart

import { onMounted, ref } from 'vue';
import { ChartData, ChartOptions } from 'chart.js';

const primeChart = ref();

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
const chartOptions: ChartOptions<'doughnut'> = {
  cutout: '60%',
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
  const response = await fetch('/api/poll/Poll1/q1?type=count');
  const res: { Value: string; Count: number }[] = await response.json();
  data.labels = res.map((x) => x.Value);
};

const setChartData = async (data: ChartData) => {
  const response = await fetch('/api/poll/Poll1/q1?type=count');
  const res: { Value: string; Count: number }[] = await response.json();
  data.datasets[0].data = res.map((x) => x.Count);
};

onMounted(async () => {
  await setChartLabels(chartData);
  await setChartData(chartData);
  setInterval(async () => {
    const chart = primeChart.value?.chart;
    if (!chart) return;

    await setChartLabels(chart.data);
    await setChartData(chart.data);
    chart.update();
  }, 5000);
});
</script>

<style scoped></style>
