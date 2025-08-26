<template>
  <a-button
    class="!bg-green-700 hover:bg-blue-600 !text-white !flex !items-center !gap-2"
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
