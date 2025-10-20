<script setup lang="ts">
defineProps<{
    title: string;
    description?: string;
}>();
</script>

<template>
    <div>
        <h3 class="text-lg font-medium text-gray-900">
            {{ title }}
        </h3>
        <p v-if="description" class="mt-1 text-sm text-gray-600">
            {{ description }}
        </p>
    </div>
</template>