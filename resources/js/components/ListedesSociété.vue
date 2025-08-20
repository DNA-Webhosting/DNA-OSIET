<template>
  <div class="min-h-screen sm:p-4">
    <div class="w-full mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-t-lg shadow-sm p-3 sm:p-4 animate-fade-in-down">
        <div class="flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between gap-3 sm:gap-4">
          <!-- Boutons de filtre -->
          <div class="flex flex-wrap items-center justify-between md:gap-1.5 lg:gap-4">
            <button
              class="flex items-center gap-1.5 px-2.5 py-1.5 md:px-1 md:text-xs sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                ></path>
              </svg>
              <span class="hidden xs:inline">Filter</span>
            </button>

            <!-- Filtres dynamiques -->
            <button
              v-for="(filter, i) in filters"
              :key="i"
              @click="activeFilter = filter.value"
              :class="[
                'px-2.5 py-1.5 sm:px-3 md:px-1 md:text-xs sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors',
                activeFilter === filter.value
                  ? filter.activeClass
                  : filter.defaultClass
              ]"
            >
              {{ filter.label }}
            </button>
          </div>

          <!-- Search + bouton action -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
            <div class="relative flex-1 sm:flex-none w-full sm:w-64">
              <input
                v-model="search"
                type="text"
                placeholder="Search"
                class="w-full bg-gray-50 pl-8 pr-3 sm:pr-4 md:text-xs py-2 text-sm text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors"
              />
              <svg
                class="absolute left-2.5 sm:left-3 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <button
              @click="addSociete"
              class="px-3 py-2 sm:px-4 md:text-xs text-sm font-medium bg-green-700 text-white rounded-md hover:bg-blue-600 transition-colors whitespace-nowrap"
            >
              <span class="sm:hidden">+ Nouvelle Société</span>
              <span class="hidden sm:inline">+ Nouvelle Société</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Tableau Desktop -->
      <div class="hidden lg:block bg-white rounded-b-lg shadow-sm overflow-hidden animate-fade-in-up">
        <div class="overflow-x-auto">         
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-500/10">
              <tr>
                <th
                  v-for="(col, i) in tableColumns"
                  :key="i"
                  class="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  {{ col }}
                </th>
              </tr>
            </thead>
            
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(item, index) in filteredData"
                :key="index"
                class="hover:bg-blue-50 transition-colors animate-slide-in"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ item.nom }}
                </td>
                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                  {{ item.secteur }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {{ item.employes }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    :class="getStatusClass(item.statut)"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ item.statut }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ item.cotisation }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      v-for="(action, i) in actions"
                      :key="i"
                      :title="action.label"
                      :class="action.class"
                      @click="action.handler(item)"
                    >
                      <component :is="action.icon" class="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Cards Mobile/Tablet -->
      <div class="lg:hidden bg-white rounded-b-lg shadow-sm animate-fade-in-up">
        <div class="divide-y divide-gray-200">
          <div
            v-for="(item, index) in filteredData"
            :key="index"
            class="p-4 hover:bg-gray-50 transition-colors animate-slide-in"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="flex flex-col space-y-3">
              <!-- Header de la card -->
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-medium text-gray-900 truncate">
                    {{ item.nom }}
                  </h3>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ item.secteur }}
                  </p>
                </div>
                <span
                  :class="getStatusClass(item.statut)"
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 flex-shrink-0"
                >
                  {{ item.statut }}
                </span>
              </div>

              <!-- Informations -->
              <div class="grid grid-cols-2 text-center  text-xs">
                <div class="text-left">
                  <span class="text-gray-500">Employés:</span>
                  <span class="ml-1 font-medium text-gray-900">{{ item.employes }}</span>
                </div>
                <div class="text-right">
                  <span class="text-gray-500">Cotisation:</span>
                  <span class="ml-1 font-medium text-gray-900">{{ item.cotisation }}</span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center justify-center lg:justify-end space-x-3 pt-2 border-t border-gray-100">
                <button
                  v-for="(action, i) in actions"
                  :key="i"
                  :title="action.label"
                  :class="action.class"
                  @click="action.handler(item)"
                  class="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <component :is="action.icon" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Message si aucun résultat -->
        <div v-if="filteredData.length === 0" class="p-8 text-center">
          <div class="text-gray-400 mb-2">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <p class="text-sm text-gray-500">Aucune société trouvée</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { h } from "vue"

export default {
  name: "Tableau",
  data() {
    return {
      search: "",
      activeFilter: "all",
      filters: [
        {
          label: "Toutes",
          value: "all",
          activeClass: "bg-blue-600 text-white",
          defaultClass: "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50",
        },
        {
          label: "Archives",
          value: "archive",
          activeClass: "bg-blue-600 text-white",
          defaultClass: "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50",
        },
        {
          label: "En retard",
          value: "late",
          activeClass: "bg-blue-600 text-white",
          defaultClass: "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50",
        },
      ],
      tableColumns: [
        "Nom de la Société",
        "Secteur d'Activité",
        "Nombre d'Employés",
        "Statut",
        "Dernière Cotisation",
        "Actions",
      ],
      tableData: [
        { nom: "DNA WEBHOSTING", secteur: "Développement de nouvelle App", employes: "17", statut: "Actif", cotisation: "01/01/2025" },
        { nom: "DNA WEBHOSTING", secteur: "Développement de nouvelle App", employes: "17", statut: "En retard", cotisation: "01/01/2025" },
        { nom: "DNA WEBHOSTING", secteur: "Développement de nouvelle App", employes: "17", statut: "Archive", cotisation: "01/01/2025" },
      ],
      actions: [
        {
          label: "Voir",
          class: "text-gray-400 hover:text-gray-600 transition-colors",
          icon: {
            render() {
              return h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
                h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" }),
              ])
            },
          },
          handler: (item) => alert("Voir " + item.nom),
        },
        {
          label: "Modifier",
          class: "text-gray-400 hover:text-blue-600 transition-colors",
          icon: {
            render() {
              return h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
                h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }),
              ])
            },
          },
          handler: (item) => alert("Modifier " + item.nom),
        },
        {
          label: "Supprimer",
          class: "text-gray-400 hover:text-red-600 transition-colors",
          icon: {
            render() {
              return h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
                h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }),
              ])
            },
          },
          handler: (item) => alert("Supprimer " + item.nom),
        },
      ],
    }
  },
  computed: {
    filteredData() {
      return this.tableData.filter((item) => {
        // filtre par recherche
        const matchesSearch = item.nom.toLowerCase().includes(this.search.toLowerCase())
        // filtre par statut
        const matchesFilter =
          this.activeFilter === "all" ||
          (this.activeFilter === "late" && item.statut === "En retard") ||
          (this.activeFilter === "archive" && item.statut === "Archive")

        return matchesSearch && matchesFilter
      })
    },
  },
  methods: {
    getStatusClass(statut) {
      if (statut === "Actif") return "bg-green-100 text-green-800"
      if (statut === "En retard") return "bg-red-100 text-red-800"
      if (statut === "Archive") return "bg-gray-200 text-gray-600"
      return "bg-gray-100 text-gray-500"
    },
    addSociete() {
      alert("Nouvelle Société ajoutée !")
    },
  },
}
</script>

<style scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-slide-in {
  animation: slideIn 0.5s ease-out both;
}

/* Breakpoints personnalisés */
@media (min-width: 475px) {
  .xs\:inline {
    display: inline;
  }
}

/* Optimisations mobile */
@media (max-width: 1023px) {
  /* Masquer le scroll horizontal sur mobile */
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
}

/* Très petits écrans */
@media (max-width: 375px) {
  .min-h-screen {
    padding: 0.5rem;
  }
}
</style>