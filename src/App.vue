<template>
  <Form :modelValue="items"></Form>
  <hr />
  <Result :modelValue="items"></Result>
</template>

<script setup lang="ts">
import Form from '@/components/form/Form.vue';
import Result from '@/components/result/Result.vue';
import { ref } from 'vue';
import { IItem } from '@/models/item';

const templateItems: IItem[] = [
  {
    id: 'q1',
    type: 'selection',
    title: 'What is your favorite pet?',
    options: ['Cats', 'Dogs', 'Birds'],
    result: {
      type: 'chart',
      chartType: 'doughnut'
    }
  },
  {
    id: 'q2',
    type: 'selection',
    title: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green'],
    result: {
      type: 'chart',
      chartType: 'doughnut'
    }
  },
  {
    id: 'q3',
    type: 'selection',
    title: 'What is your favorite food?',
    options: ['Pizza', 'Pasta', 'Salad'],
    result: {
      type: 'chart',
      chartType: 'doughnut'
    }
  }
];
const items = ref(templateItems);
</script>

<style scoped></style>
