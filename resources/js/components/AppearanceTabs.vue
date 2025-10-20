<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { computed } from 'vue';

import { Button } from '@/components/ui/button';
import { useAppearance } from '@/composables/useAppearance';

const { appearance } = useAppearance();

const isDark = computed(() => appearance.value === 'dark' || (appearance.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));

const form = useForm({
    theme: isDark.value ? 'dark' : 'light',
});

const setTheme = (theme: 'light' | 'dark' | 'system') => {
    form.theme = theme;

    form.patch(route('appearance.update'), {
        preserveState: true,
        preserveScroll: true,
    });
};
</script>

<template>
    <div class="grid max-w-md grid-cols-3 gap-6">
        <div class="flex flex-col items-center space-y-4">
            <Button
                variant="outline"
                class="h-20 w-full"
                :class="{ 'ring-2 ring-ring': form.theme === 'light' }"
                @click="setTheme('light')"
            >
                <div class="flex items-center space-x-2">
                    <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div class="h-2 w-10 rounded-lg bg-[#ecedef]" />
                </div>
            </Button>
            <p class="text-sm">Light</p>
        </div>

        <div class="flex flex-col items-center space-y-4">
            <Button
                variant="outline"
                class="h-20 w-full bg-neutral-950"
                :class="{ 'ring-2 ring-ring': form.theme === 'dark' }"
                @click="setTheme('dark')"
            >
                <div class="flex items-center space-x-2">
                    <div class="h-4 w-4 rounded-full bg-neutral-600" />
                    <div class="h-2 w-10 rounded-lg bg-neutral-600" />
                </div>
            </Button>
            <p class="text-sm">Dark</p>
        </div>

        <div class="flex flex-col items-center space-y-4">
            <Button
                variant="outline"
                class="h-20 w-full"
                :class="{ 'ring-2 ring-ring': form.theme === 'system' }"
                @click="setTheme('system')"
            >
                <div class="flex items-center space-x-2">
                    <div class="h-4 w-4 rounded-full bg-neutral-500" />
                    <div class="h-2 w-10 rounded-lg bg-neutral-500" />
                </div>
            </Button>
            <p class="text-sm">System</p>
        </div>
    </div>
</template>
