<template>
  <DataTable :value="products" dataKey="Id" tableStyle="min-width: 50rem">
    <Column field="Key" header="Key"></Column>
    <Column field="Value" header="Value"></Column>
    <Column field="Time" header="Time"></Column>
  </DataTable>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from 'vue';
import { APIService } from '@/services/APIService';
import { IListItem } from '@/models/list-item';

const products = ref<IListItem[]>([]);

const apiService = inject<APIService>('APIService')!;

onMounted(async () => {
  var list = await apiService.getPollList('Poll1');
  products.value = list;

  var intervalId = setInterval(async () => {
    var list = await apiService.getPollList('Poll1');
    products.value = list;

    // Clear after first run, for example
    clearInterval(intervalId);
  }, 5000);
});
</script>

<style scoped></style>
