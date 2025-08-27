<template>
  <a-button
    class="!bg-blue-600 hover:!bg-green-600 !text-white !flex !items-center !gap-2"
  >
    <font-awesome-icon :icon="icon" />
    <span>{{ label }}</span>
  </a-button>
</template>

<script setup lang="ts">
defineProps<{
  icon: string | [string, string]  
  label: string ,

}>()
</script>
