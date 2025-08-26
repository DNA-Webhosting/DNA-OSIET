<template>
  <font-awesome-icon :icon="icon" :class="classes" />
</template>

<script setup lang="ts">
defineProps<{
  icon: string | [string, string],  // exemple : "plus" ou ['fas','plus']
  classes?: string                  // classes tailwind optionnelles
}>()
</script>
