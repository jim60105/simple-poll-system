<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="card flex justify-content-center">
    <template v-for="item in items" :key="item.id">
      <ResultChart v-if="item.result.type === 'chart'" :modelValue="item"></ResultChart>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['modelValue']);
const items = ref(props.modelValue);
</script>

<style scoped></style>
