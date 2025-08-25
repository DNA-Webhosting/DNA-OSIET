<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import PlaceholderPattern from '../components/PlaceholderPattern.vue';
import ListedesSociété from '../components/ListedesSociété.vue';
import SuiviCotisation from '../components/SuiviCotisation.vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const open = ref(false);
const showModal = () => {
  open.value = true;
};
const value = ref('');
const value1 = ref('');
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="">
            <div class="">
            </div>
            <div class="">
                <PlaceholderPattern />
                <!-- <ListedesSociété /> -->
                 <!-- <a-button @click="showModal" class="!bg-green-500 !text-white">Primary</a-button> -->
                 <!-- <SuiviCotisation /> -->
            </div>
        </div>
    </AppLayout>
    
</template>
