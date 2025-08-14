<template>
  <div class="bg-white px-6 py-4">
    <!-- Navigation Container -->
    <div class="flex items-center justify-between">
      <!-- Bouton Précédent -->
      <button 
        @click="previousGroup" 
        :disabled="currentGroupIndex === 0"
        class="flex items-center justify-center w-10 h-10 rounded-md border-1 border-[#CFCFCF] bg-white hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <i class="fas fa-arrow-left text-lg text-[#10B981]"></i>
      </button>
      
      <!-- Menus Container -->
      <div class="flex flex-row">
        <div class="flex flex-row items-center justify-between space-x-10">
          <div 
            v-for="menu in visibleMenus"
            :key="menu.id"
            class="relative flex-shrink-0"
            @click="toggleSubmenu(menu.id)"
          >
            <!-- Menu Item -->
            <div class="bg-white shadow-md border-r-2 cursor-pointer hover:shadow-xl transition-shadow duration-200 relative" style="border-color: rgba(0, 119, 255, 0.5);">
              <div class="flex items-center p-2">
                <!-- Icon -->
                <div 
                  class="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mr-3 flex-shrink-0"
                  :style="{ backgroundColor: menu.color }"
                >
                  <i :class="menu.icon" class="text-lg"></i>
                </div>
                
                <!-- Content -->
                <div class="flex-1 w-full items-center">
                  <h3 class="text-[#1F2937] font-semibold text-md text-center truncate">{{ menu.title }}</h3>
                  <p class="text-gray-500 text-xs text-center truncate">{{ menu.description }}</p>
                </div>
                
                <!-- Dropdown Arrow -->
                <i class="fas fa-chevron-down text-gray-400 ml-2 flex-shrink-0"></i>
              </div>
            </div>
            
            <!-- Submenu -->
            <div 
              v-if="activeSubmenu === menu.id" 
              class="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border-2 border-teal-400 z-50"
              style="width: 355px;"
            >
              <div class="p-0">
                <div 
                  v-for="(item, index) in menu.submenuItems" 
                  :key="index"
                  class="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                  :class="{
                    'bg-teal-500 text-white hover:bg-teal-600': item.active,
                    'text-gray-700': !item.active
                  }"
                >
                  <i :class="item.icon" class="w-5 h-5 mr-3 flex-shrink-0"></i>
                  <span class="text-sm font-medium">{{ item.label }}</span>
                  <i v-if="item.hasSubmenu" class="fas fa-chevron-right ml-auto text-xs"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bouton Suivant -->
      <button 
        @click="nextGroup" 
        :disabled="currentGroupIndex >= totalGroups - 1"
        class="flex items-center justify-center w-10 h-10 rounded-md border-1 border-[#CFCFCF] bg-white hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <i class="fas fa-arrow-right text-lg text-[#10B981]"></i>
      </button>
    </div>
  </div>
  
  <!-- Backdrop to close submenu -->
  <div 
    v-if="activeSubmenu" 
    class="fixed inset-0" 
    @click="closeSubmenu"
  ></div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface MenuItem {
  id: string
  title: string
  description: string
  color: string
  icon: string
  submenuItems: Array<{
    label: string
    icon: string
    active?: boolean
    hasSubmenu?: boolean
  }>
}

// All menus data with Font Awesome icons
const allMenus: MenuItem[] = [
  {
    id: 'societies',
    title: 'Gestion des Sociétés',
    description: 'Gérer les entreprises et leurs cotisations',
    color: '#10B981',
    icon: 'fas fa-building',
    submenuItems: [
      { label: 'Liste des Sociétés', icon: 'fas fa-list', active: false },
      { label: 'Suivi Cotisations', icon: 'fas fa-money-bill-wave', active: true },
      { label: 'Historique', icon: 'fas fa-history', active: false },
      { label: 'Paiements', icon: 'fas fa-credit-card', active: false },
      { label: 'Alertes', icon: 'fas fa-exclamation-triangle', active: false, hasSubmenu: true }
    ]
  },
  {
    id: 'ayants-droits',
    title: 'Gestion des Ayants Droits',
    description: 'Gérer les bénéficiaires et leurs badges',
    color: '#8B5CF6',
    icon: 'fas fa-users',
    submenuItems: [
      { label: 'Liste des Ayants Droits', icon: 'fas fa-list', active: false },
      { label: 'Gestion des Badges', icon: 'fas fa-id-badge', active: true },
      { label: 'Gestion QR Code', icon: 'fas fa-qrcode', active: false },
      { label: 'Suivi Adhésions', icon: 'fas fa-clipboard-check', active: false },
      { label: 'Infos Personnelles', icon: 'fas fa-info-circle', active: false },
      { label: 'Bénéficiaires', icon: 'fas fa-user-friends', active: false },
      { label: 'Historique', icon: 'fas fa-history', active: false }
    ]
  },
  {
    id: 'patients',
    title: 'Gestion des Patients',
    description: 'Gestion complète des dossiers patients',
    color: '#3B82F6',
    icon: 'fas fa-user-injured',
    submenuItems: [
      { label: 'Nouveaux Patients', icon: 'fas fa-user-plus', active: false },
      { label: 'Dossiers Médicaux', icon: 'fas fa-file-medical', active: false },
      { label: 'Rendez-vous', icon: 'fas fa-calendar-alt', active: false },
      { label: 'Historique', icon: 'fas fa-history', active: false }
    ]
  },
  {
    id: 'pharmacy',
    title: 'Gestion Pharmacie',
    description: 'Gestion complète du stock pharmaceutique',
    color: '#EC4899',
    icon: 'fas fa-pills',
    submenuItems: [
      { label: 'Stock Médicaments', icon: 'fas fa-pills', active: false },
      { label: 'Commandes', icon: 'fas fa-shopping-cart', active: false },
      { label: 'Fournisseurs', icon: 'fas fa-truck', active: false },
      { label: 'Rapports', icon: 'fas fa-chart-bar', active: false }
    ]
  },
  {
    id: 'medecins',
    title: 'Gestion des Médecins',
    description: 'Base complète des médecins',
    color: '#06B6D4',
    icon: 'fas fa-solid fa-stethoscope',
    submenuItems: [
      { label: 'Liste Médecins', icon: 'fas fa-user-md', active: false },
      { label: 'Spécialités', icon: 'fas fa-stethoscope', active: false },
      { label: 'Planning', icon: 'fas fa-calendar', active: false }
    ]
  },
  {
    id: 'urgences',
    title: 'Gestion des Urgences',
    description: 'Gestion urgente et prioritaire',
    color: '#F59E0B',
    icon: 'fas fa-ambulance',
    submenuItems: [
      { label: 'Urgences Actives', icon: 'fas fa-exclamation-circle', active: false },
      { label: 'Équipes Urgence', icon: 'fas fa-users', active: false },
      { label: 'Matériel Urgence', icon: 'fas fa-first-aid', active: false }
    ]
  },
  {
    id: 'statistiques',
    title: 'Statistiques et Rapports',
    description: 'Analyses et données complètes',
    color: '#8B5CF6',
    icon: 'fas fa-chart-line',
    submenuItems: [
      { label: 'Tableaux de Bord', icon: 'fas fa-tachometer-alt', active: false },
      { label: 'Rapports Mensuels', icon: 'fas fa-file-alt', active: false },
      { label: 'Analyses', icon: 'fas fa-analytics', active: false }
    ]
  },
  {
    id: 'parametres',
    title: 'Paramètres et Sécurité',
    description: 'Configuration et sécurité système',
    color: '#000000',
    icon: 'fas fa-cog',
    submenuItems: [
      { label: 'Utilisateurs', icon: 'fas fa-users-cog', active: false },
      { label: 'Permissions', icon: 'fas fa-shield-alt', active: false },
      { label: 'Sauvegardes', icon: 'fas fa-database', active: false },
      { label: 'Configuration', icon: 'fas fa-cogs', active: false }
    ]
  }
]

// Reactive data
const currentGroupIndex = ref(0)
const activeSubmenu = ref<string | null>(null)
const menusPerPage = 5

// Computed properties
const totalGroups = computed(() => Math.ceil(allMenus.length / menusPerPage))

const visibleMenus = computed(() => {
  const start = currentGroupIndex.value * menusPerPage
  const end = start + menusPerPage
  return allMenus.slice(start, end)
})

// Methods
const previousGroup = () => {
  if (currentGroupIndex.value > 0) {
    currentGroupIndex.value--
    closeSubmenu()
  }
}

const nextGroup = () => {
  if (currentGroupIndex.value < totalGroups.value - 1) {
    currentGroupIndex.value++
    closeSubmenu()
  }
}

const toggleSubmenu = (menuId: string) => {
  if (activeSubmenu.value === menuId) {
    activeSubmenu.value = null
  } else {
    activeSubmenu.value = menuId
  }
}

const closeSubmenu = () => {
  activeSubmenu.value = null
}
</script>

<style scoped>
/* Import Font Awesome */
@import '@fortawesome/fontawesome-free/css/all.css';

/* Custom shadow for menu items */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Transition effects */
.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}

.transition-colors {
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}
</style>