<template>
  <div class="w-full flex flex-row items-center justify-between">
    <!-- Bouton filtre principal -->
    <a-button type="default" class="flex flex-row items-center justify-between">
      Filter
    </a-button>

    <!-- Boutons dynamiques -->
    <a-space row size="small" class="flex flex-row items-center justify-between">
      <a-button v-for="(filter, i) in filters" :key="i" :type="activeFilter === filter.value ? 'primary' : 'default'"
        @click="activeFilter = filter.value">
        {{ filter.label }}
      </a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import { FilterOutlined } from "@ant-design/icons-vue";

const filters = ref([
  { label: "Tous", value: "all" },
  { label: "Actifs", value: "active" },
  { label: "Inactifs", value: "inactive" },
]);

const activeFilter = ref("all");
</script>
