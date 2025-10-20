<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

defineProps<{
    href: string;
}>();
</script>

<template>
    <Link :href="href" class="text-primary hover:underline">
        <slot />
    </Link>
</template>