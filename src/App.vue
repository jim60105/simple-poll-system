<template>
  <div class="card flex justify-content-center">
    <form @submit="onSubmit" class="flex flex-column align-items-center gap-2">
      <label for="item" :class="['flex justify-content-center', { 'p-error': errorMessage }]">
        Engine State
      </label>
      <SelectButton
        id="item"
        v-model="value"
        :class="{ 'p-invalid': errorMessage }"
        aria-describedby="text-error"
        :options="options"
      />
      <small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small>
      <Button type="submit" label="Submit" />
    </form>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';

const { handleSubmit, resetForm } = useForm();
const { value, errorMessage } = useField<string>('value', validateField);
const toast = useToast();

const options = ['Off', 'On'];

function validateField(value: string) {
  if (!value) {
    return 'Engine State is required.';
  }

  return true;
}

const onSubmit = handleSubmit((values) => {
  if (values.value && values.value.length > 0) {
    toast.add({ severity: 'info', summary: 'Form Submitted', detail: values.value, life: 3000 });
    resetForm();
  }
});
</script>

<style scoped></style>
