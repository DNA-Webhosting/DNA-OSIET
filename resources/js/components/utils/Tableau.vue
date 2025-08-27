
<template>
  <div class="hidden lg:block rounded-b-lg overflow-visible animate-fade-in-up">
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="false"
      row-key="id"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <!-- Statut -->
        <template v-if="column.key === 'statut'">
          <a-tag :color="getStatusColor(record.statut)">
            {{ record.statut }}
          </a-tag>
        </template>

        <!-- Actions -->
        <template v-else-if="column.key === 'actions'">
          <a-dropdown trigger="manual" :visible="dropdownVisibleMap[record.id]">
            <a-button type="text" @click="toggleDropdown(record.id)">
              <EllipsisOutlined style="color: black; font-size: 20px;" />
            </a-button>

            <template #overlay>
              <a-menu
                @mouseenter="isHovering[record.id] = true"
                @mouseleave="closeDropdown(record.id)"
              >
                <a-menu-item
                  v-for="(action, i) in actions"
                  :key="i"
                  @click="action.handler(record)"
                >
                  <component :is="action.icon" class="w-4 h-4 mr-2 text-black" />
                  {{ action.label }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>

        <!-- Autres colonnes -->
        <template v-else>
          {{ record[column.dataIndex] }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EllipsisOutlined } from '@ant-design/icons-vue'

// Props
defineProps<{
  data: any[]
  columns: any[]
  actions: { label: string; icon: any; handler: (record: any) => void }[]
}>()

// States
const dropdownVisibleMap = ref<Record<number, boolean>>({})
const isHovering = ref<Record<number, boolean>>({})

// Méthodes
function toggleDropdown(id: number) {
  dropdownVisibleMap.value[id] = !dropdownVisibleMap.value[id]
}

function closeDropdown(id: number) {
  isHovering.value[id] = false
  dropdownVisibleMap.value[id] = false
}

// Couleur statut
function getStatusColor(statut: string) {
  switch (statut) {
    case 'Actif':
      return 'green'
    case 'Inactif':
      return 'red'
    case 'En attente':
      return 'orange'
    default:
      return 'blue'
  }
}
</script>
