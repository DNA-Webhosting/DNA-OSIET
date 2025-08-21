<template>
  <div class="min-h-screen sm:p-4">
    <div class="w-full mx-auto border-1 border-gray-400/25 rounded-lg">
      <!-- Header -->
      <div class="bg-white rounded-t-lg shadow-sm p-3 sm:p-4 animate-fade-in-down">
        <div class="flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between gap-3 sm:gap-4">
          <!-- Filtres -->
          <div class="flex flex-wrap items-center justify-between md:gap-1.5 lg:gap-4">
            <button class="flex items-center gap-1.5 px-2.5 py-1.5 md:px-1 md:text-xs lg:text-md sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-black rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-0">
              <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              <span class="xs:inline">Filter</span>
            </button>

            <button v-for="(filter, i) in filters" :key="i" @click="activeFilter = filter.value" 
              :class="[ 'px-2.5 py-1.5 sm:px-3 md:px-1 md:text-xs lg:text-[14px] sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-0', activeFilter === filter.value ? filter.activeClass : filter.defaultClass ]">
              {{ filter.label }}
            </button>
          </div>

          <!-- Search + Bouton -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
            <div class="relative flex-1 sm:flex-none w-full sm:w-64">
              <input v-model="search" type="text" placeholder="Search" class="w-full bg-gray-50 pl-8 pr-3 sm:pr-4 md:text-xs py-2 text-sm text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors"/>
              <svg class="absolute left-2.5 sm:left-3 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <button @click="addSociete" class="px-3 py-2 sm:px-4 md:text-xs text-sm font-medium bg-green-700 text-white rounded-md hover:bg-blue-600 transition-colors whitespace-nowrap">
              <span class="sm:hidden">+ Nouvelle Société</span>
              <span class="hidden sm:inline">+ Nouvelle Société</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Table Desktop -->
      <div class="hidden lg:block bg-blue-100 rounded-b-lg shadow-sm overflow-visible animate-fade-in-up">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-500/10">
              <tr>
                <th v-for="(col, i) in tableColumns" :key="i" class="px-6 py-3 text-xs font-semibold text-black/40 uppercase tracking-wider">{{ col }}</th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(item, index) in filteredData" :key="index" class="transition-colors animate-slide-in" :style="{ animationDelay: `${index * 0.1}s` }">
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">{{ item.nom }}</td>
                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{{ item.secteur }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{{ item.employes }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center"><span :class="getStatusClass(item.statut)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">{{ item.statut }}</span></td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{{ item.cotisation }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">

                  <!-- Ellipsis Menu -->
                  <div class="relative inline-block text-left" @mouseenter="cancelCloseMenu" @mouseleave="closeMenuDelayed">
                    <button @click.stop="toggleMenu(index, $event)" class="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-0">
                      <i class="fa-solid fa-ellipsis text-gray-600"></i>
                    </button>

                    <teleport to="body">
                      <div v-if="openMenu === index" :style="{ top: menuPos.top + 'px', left: menuPos.left + 'px' }" 
                           class="absolute bg-white border border-gray-200 rounded-xl shadow-lg z-[9999] w-32"
                           @mouseenter="cancelCloseMenu" @mouseleave="closeMenuDelayed">
                        <button v-for="(action, i) in actions" :key="i" @click="action.handler(item); closeMenu()" 
                                class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left transition-colors">
                          <component :is="action.icon" class="w-4 h-4 mr-2"/>
                          {{ action.label }}
                        </button>
                      </div>
                    </teleport>
                  </div>

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Mobile / Tablet Cards -->
      <div class="lg:hidden bg-white rounded-b-lg shadow-sm animate-fade-in-up">
        <div class="divide-y divide-gray-200">
          <div v-for="(item,index) in filteredData" :key="index" class="p-4 hover:bg-gray-50 transition-colors animate-slide-in" :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="flex flex-col space-y-3">
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-medium text-gray-900 truncate">{{ item.nom }}</h3>
                  <p class="text-xs text-gray-500 mt-1">{{ item.secteur }}</p>
                </div>
                <span :class="getStatusClass(item.statut)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 flex-shrink-0">{{ item.statut }}</span>
              </div>

              <div class="grid grid-cols-2 text-center text-xs">
                <div class="text-left"><span class="text-gray-500">Employés:</span> <span class="ml-1 font-medium text-gray-900">{{ item.employes }}</span></div>
                <div class="text-right"><span class="text-gray-500">Cotisation:</span> <span class="ml-1 font-medium text-gray-900">{{ item.cotisation }}</span></div>
              </div>

              <!-- Actions Ellipsis Mobile -->
              <div class="flex items-center justify-center lg:justify-end pt-2 border-t border-gray-100 relative" @mouseenter="cancelCloseMenu" @mouseleave="closeMenuDelayed">
                <button @click.stop="toggleMenu(index, $event)" class="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-0">
                  <i class="fa-solid fa-ellipsis text-gray-600"></i>
                </button>

                <teleport to="body">
                  <div v-if="openMenu === index" :style="{ top: menuPos.top + 'px', left: menuPos.left + 'px' }" 
                       class="absolute bg-white border border-gray-200 rounded-xl shadow-lg z-[9999] w-32"
                       @mouseenter="cancelCloseMenu" @mouseleave="closeMenuDelayed">
                    <button v-for="(action, i) in actions" :key="i" @click="action.handler(item); closeMenu()" 
                            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left transition-colors">
                      <component :is="action.icon" class="w-4 h-4 mr-2"/>
                      {{ action.label }}
                    </button>
                  </div>
                </teleport>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, h } from "vue"

// Types
interface TableItem { nom:string, secteur:string, employes:string, statut:string, cotisation:string }
interface Filter { label:string, value:string, activeClass:string, defaultClass:string }
interface Action { label:string, icon:any, handler:(item:TableItem)=>void }

// State
const search = ref("")
const activeFilter = ref("all")
const openMenu = ref<number|null>(null)
const menuPos = ref({ top:0, left:0 })
let closeTimeout:ReturnType<typeof setTimeout>|null = null

// Filters
const filters = ref<Filter[]>([
  { label:"Toutes", value:"all", activeClass:"bg-blue-600 text-white", defaultClass:"text-gray-700 bg-white border border-gray-300 hover:bg-gray-50" },
  { label:"Archives", value:"archive", activeClass:"bg-blue-600 text-white", defaultClass:"text-gray-700 bg-white border border-gray-300 hover:bg-gray-50" },
  { label:"En retard", value:"late", activeClass:"bg-blue-600 text-white", defaultClass:"text-gray-700 bg-white border border-gray-300 hover:bg-gray-50" }
])

// Table
const tableColumns = ref(["Nom de la Société","Secteur d'Activité","Nombre d'Employés","Statut","Dernière Cotisation","Actions"])
const tableData = ref<TableItem[]>([
  { nom:"DNA WEBHOSTING", secteur:"Développement de nouvelle App", employes:"17", statut:"Actif", cotisation:"01/01/2025" },
  { nom:"DNA WEBHOSTING", secteur:"Développement de nouvelle App", employes:"17", statut:"En retard", cotisation:"01/01/2025" },
  { nom:"DNA WEBHOSTING", secteur:"Développement de nouvelle App", employes:"17", statut:"Archive", cotisation:"01/01/2025" }
])

// Actions
const actions = ref<Action[]>([
  { label:"Voir", icon:{ render(){ return h("i",{ class:"fa-solid fa-eye" }) } }, handler:(item)=>alert("Voir "+item.nom) },
  { label:"Modifier", icon:{ render(){ return h("i",{ class:"fa-solid fa-pen" }) } }, handler:(item)=>alert("Modifier "+item.nom) },
  { label:"Supprimer", icon:{ render(){ return h("i",{ class:"fa-solid fa-trash" }) } }, handler:(item)=>alert("Supprimer "+item.nom) },
])

// Computed
const filteredData = computed(()=>tableData.value.filter(item=>{
  const matchesSearch = item.nom.toLowerCase().includes(search.value.toLowerCase())
  const matchesFilter = activeFilter.value==="all" || (activeFilter.value==="late" && item.statut==="En retard") || (activeFilter.value==="archive" && item.statut==="Archive")
  return matchesSearch && matchesFilter
}))

// Methods
function getStatusClass(statut:string){
  if(statut==="Actif") return "bg-green-100 text-green-800"
  if(statut==="En retard") return "bg-red-100 text-red-800"
  if(statut==="Archive") return "bg-gray-200 text-gray-600"
  return "bg-gray-100 text-gray-500"
}

function addSociete(){ alert("Nouvelle Société ajoutée !") }

function toggleMenu(index:number,event:MouseEvent){
  event.stopPropagation()
  if(openMenu.value===index) openMenu.value=null
  else{
    openMenu.value=index
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    menuPos.value={ top:rect.bottom+window.scrollY, left:rect.right-128 }
  }
}

function closeMenuDelayed(){
  closeTimeout=setTimeout(()=>{ openMenu.value=null },300)
}

function cancelCloseMenu(){
  if(closeTimeout){ clearTimeout(closeTimeout); closeTimeout=null }
}

function closeMenu(){ openMenu.value=null }

// Lifecycle
onMounted(()=>{ document.addEventListener("click", ()=>{ openMenu.value=null }) })
onBeforeUnmount(()=>{ document.removeEventListener("click", ()=>{ openMenu.value=null }) })
</script>

<style scoped>
@keyframes fadeInDown{from{opacity:0;transform:translate3d(0,-100%,0);}to{opacity:1;transform:translate3d(0,0,0);}}
@keyframes fadeInUp{from{opacity:0;transform:translate3d(0,100%,0);}to{opacity:1;transform:translate3d(0,0,0);}}
@keyframes slideIn{from{opacity:0;transform:translateX(-20px);}to{opacity:1;transform:translateX(0);}}
.animate-fade-in-down{animation:fadeInDown 0.6s ease-out;}
.animate-fade-in-up{animation:fadeInUp 0.8s ease-out;}
.animate-slide-in{animation:slideIn 0.5s ease-out both;}
@media(min-width:475px){.xs\:inline{display:inline;}}
@media(max-width:1023px){.overflow-x-auto{-webkit-overflow-scrolling:touch;}}
@media(max-width:375px){.min-h-screen{padding:0.5rem;}}
</style>
