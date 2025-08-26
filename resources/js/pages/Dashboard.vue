<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import PlaceholderPattern from '@/components/PlaceholderPattern.vue';
import ListedesSociété from '@/pages/Societe/ListedesSociété.vue';
import SuiviCotisation from '@/pages/Societe/SuiviCotisation.vue';
import Historique from '@/pages/Societe/Historique.vue';
import Alertes from '@/pages/Societe/Alertes.vue';

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
    <div>
      <div></div>
      <div>
        <PlaceholderPattern />
        <!-- <ListedesSociété /> -->
        <!-- <SuiviCotisation /> -->
        <!-- <Historique/> -->
        <!-- <Alertes/> -->
      </div>
    </div>
  </AppLayout>
</template>
