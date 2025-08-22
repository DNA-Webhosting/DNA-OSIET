<template>
  <div class="min-h-screen md:p-4 mb-5">
    <div class="mx-auto bg-white rounded-lg border-2 border-gray-100 shadow-md overflow-hidden animate-fade-in">
      
      <!-- Header -->
      <div class="lg:flex lg:items-center md:flex items-center space-y-4 lg:space-y-0 md:space-y-0 md:items-center justify-between p-4 border-b border-gray-200">
        <h1 class="text-lg text-center lg:text-left md:text-left font-semibold text-gray-800 w-full">
          Tableau de suivi des cotisations
        </h1>

        <!-- Search + Bouton -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <div class="relative flex-1 sm:flex-none items-center w-full sm:w-64">
            <input v-model="search" type="text" placeholder="Rechercher un nom..."
              class="w-full bg-gray-50 pl-10 pr-3 sm:pr-4 md:text-sm py-2 text-sm text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors" />
            <svg class="absolute left-3 top-2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <button @click="openModal = true"
            class="px-4 py-2 md:text-sm font-medium bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors whitespace-nowrap">
            + Ajouter
          </button>
        </div>
      </div>

      <!-- Table desktop -->
      <div class="hidden lg:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-3 text-left font-medium text-gray-700">N°</th>
              <th class="px-4 py-3 text-center font-medium text-gray-700">Nom & Prénom</th>
              <th class="px-4 py-3 text-center font-medium text-gray-700">Mois</th>
              <th class="px-4 py-3 text-center font-medium text-gray-700">Montant attendu</th>
              <th class="px-4 py-3 text-center font-medium text-gray-700">Montant payé</th>
              <th class="px-4 py-3 text-center font-medium text-gray-700">Date paiement</th>
              <th class="px-4 py-3 text-center font-medium text-gray-700">Solde</th>
              <th class="px-4 py-3 text-center font-medium text-gray-700">Observation</th>
              <th class="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <transition-group tag="tbody" name="fade-slide" class="divide-y divide-gray-100 bg-white">
            <tr v-for="(cotisation, index) in filteredCotisations" :key="index" class="hover:bg-gray-50">
              <td class="px-4 py-3 text-gray-600">{{ index + 1 }}</td>
              <td class="px-4 py-3 font-medium text-gray-800 text-center">{{ cotisation.nom }}</td>
              <td class="px-4 py-3 text-gray-600 text-center">{{ cotisation.mois }}</td>
              <td class="px-4 py-3 text-gray-600 text-center">{{ cotisation.attendu }} Ar</td>
              <td class="px-4 py-3 text-gray-600 text-center">{{ cotisation.paye }} Ar</td>
              <td class="px-4 py-3 text-gray-600 text-center">{{ cotisation.date }}</td>
              <td class="px-4 py-3 font-semibold text-center"
                :class="cotisation.solde === 0 ? 'text-green-600' : 'text-red-600'">
                {{ cotisation.solde }} Ar
              </td>
              <td class="px-4 py-3 text-center">
                <span class="px-2 py-1 rounded-full text-xs font-medium" :class="{
                  'bg-green-100 text-green-700': cotisation.observation === 'OK',
                  'bg-yellow-100 text-yellow-700': cotisation.observation === 'Partiel',
                  'bg-red-100 text-red-700': cotisation.observation === 'Impayé'
                }">
                  {{ cotisation.observation }}
                </span>
              </td>
              <td class="px-4 py-3 text-center">
                <button @click.stop="openMenu($event, index)">
                  <i class="fa-solid fa-ellipsis text-gray-600 hover:text-gray-800"></i>
                </button>
              </td>
            </tr>
          </transition-group>
        </table>
      </div>

      <!-- Mobile + md cards -->
      <div class="block md:block lg:hidden p-2 md:p-4 space-y-4">
        <transition-group name="fade-slide" tag="div">
          <div v-for="(cotisation, index) in filteredCotisations" :key="index"
            class="bg-gray-50 rounded-xl shadow-sm p-4 md:p-6 border border-gray-200 animate-fade-in-up hover:shadow-lg transition-shadow">
            
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700">#{{ index + 1 }}</span>
              <span class="px-2 py-1 rounded-full text-xs font-medium md:text-sm" :class="{
                'bg-green-100 text-green-700': cotisation.observation === 'OK',
                'bg-yellow-100 text-yellow-700': cotisation.observation === 'Partiel',
                'bg-red-100 text-red-700': cotisation.observation === 'Impayé'
              }">
                {{ cotisation.observation }}
              </span>
            </div>

            <p class="font-semibold text-gray-800 md:text-lg">{{ cotisation.nom }}</p>
            <p class="text-gray-600 text-sm md:text-base">{{ cotisation.mois }}</p>

            <div class="mt-2 grid grid-cols-2 gap-2 text-sm md:text-base">
              <div class="bg-white rounded-md p-2 md:p-3 border text-center">
                <p class="text-gray-500">Attendu</p>
                <p class="font-medium">{{ cotisation.attendu }} Ar</p>
              </div>
              <div class="bg-white rounded-md p-2 md:p-3 border text-center">
                <p class="text-gray-500">Payé</p>
                <p class="font-medium">{{ cotisation.paye }} Ar</p>
              </div>
              <div class="bg-white rounded-md p-2 md:p-3 border text-center">
                <p class="text-gray-500">Date</p>
                <p class="font-medium">{{ cotisation.date }}</p>
              </div>
              <div class="bg-white rounded-md p-2 md:p-3 border text-center font-semibold"
                :class="cotisation.solde === 0 ? 'text-green-600' : 'text-red-600'">
                <p class="text-gray-500">Solde</p>
                <p>{{ cotisation.solde }} Ar</p>
              </div>
              <div class="col-span-2 text-center relative">
                <button @click.stop="openMenu($event, index)">
                  <i class="fa-solid fa-ellipsis text-gray-600 hover:text-gray-800"></i>
                </button>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

    </div>

    <!-- Menu global overlay -->
    <div
      v-if="menuOpen !== null"
      :style="{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }"
      class="fixed w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 menu-context"
      @mouseleave="closeMenu"
    >
      <button @click="modifier(menuOpen); closeMenu()"
        class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600">
        Modifier
      </button>
      <button @click="supprimer(menuOpen); closeMenu()"
        class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600">
        Supprimer
      </button>
    </div>

    <!-- Modal ajout -->
    <div v-if="openModal" class="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div class="bg-white w-full max-w-3xl rounded-2xl border-2 border-gray-300 shadow-2xl animate-fade-in-up">
        <h2 class="text-lg md:text-xl p-4 w-full rounded-t-2xl bg-blue-400 text-white text-center font-semibold ">
          Ajouter une cotisation
        </h2>
        <form @submit.prevent="confirmerAjout" class="grid grid-cols-1 p-4 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom et prénom(s)</label>
            <input v-model="form.nom" type="text"
              class="w-full border-1 border-gray-400 rounded-md px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Montant payé</label>
            <input v-model.number="form.paye" type="number"
              class="w-full border-1 border-gray-400 rounded-md px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mois</label>
            <input v-model="form.mois" type="text"
              class="w-full border-1 border-gray-400 rounded-md px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date paiement</label>
            <input v-model="form.date" type="text" placeholder="ex: 15/02/2025"
              class="w-full border-1 border-gray-400 rounded-md px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Montant attendu</label>
            <input v-model.number="form.attendu" type="number"
              class="w-full border-1 border-gray-400 rounded-md px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Solde</label>
            <input v-model="form.solde" type="number"
              class="w-full border-1 border-gray-400 rounded-md px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-300 focus:outline-none"
              readonly />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Observation</label>
            <select v-model="form.observation"
              class="w-full border-1 border-gray-400 rounded-t-md py-2 text-sm text-black focus:outline-none">
              <option value="OK">OK</option>
              <option value="Partiel">Partiel</option>
              <option value="Impayé">Impayé</option>
            </select>
          </div>
          <div class="md:col-span-2 flex justify-end gap-3 pt-4">
            <button type="button" @click="openModal = false"
              class="px-4 py-2 bg-gray-200 rounded-md text-black/75 font-medium text-sm hover:bg-gray-300 transition">Annuler</button>
            <button type="submit"
              class="px-4 py-2 bg-green-600 text-white rounded-md font-semibold text-sm hover:bg-green-700 transition">Confirmer</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";

const search = ref("");
const openModal = ref(false);
const menuOpen = ref<number | null>(null);
const menuPosition = ref({ x: 0, y: 0 });

const cotisations = ref([
  { nom: "DNA Webhosting", mois: "Janvier 2025", attendu: 20000, paye: 20000, date: "05/01/2025", solde: 0, observation: "OK" },
  { nom: "John Doe", mois: "Février 2025", attendu: 20000, paye: 10000, date: "10/02/2025", solde: 10000, observation: "Partiel" },
  { nom: "Jane Smith", mois: "Mars 2025", attendu: 20000, paye: 0, date: "-", solde: 20000, observation: "Impayé" },
]);

const form = ref({ nom: "", mois: "", attendu: 0, paye: 0, date: "-", observation: "OK" });

// Filtrage dynamique sur nom et prénom
const filteredCotisations = computed(() => {
  const term = search.value.toLowerCase().trim();
  if (!term) return cotisations.value;
  return cotisations.value.filter(c =>
    c.nom.toLowerCase().includes(term)
  );
});

// Calcul automatique du solde à chaque modification du formulaire
watch(() => form.value.paye, (newVal, oldVal) => {
  form.value.solde = form.value.attendu - form.value.paye;
});
watch(() => form.value.attendu, (newVal, oldVal) => {
  form.value.solde = form.value.attendu - form.value.paye;
});

function confirmerAjout() {
  const solde = form.value.attendu - form.value.paye;
  cotisations.value.push({ ...form.value, solde });
  form.value = { nom: "", mois: "", attendu: 0, paye: 0, date: "-", observation: "OK" };
  openModal.value = false;
}

function openMenu(event: MouseEvent, index: number) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const isMobile = window.innerWidth < 1024;

  menuOpen.value = index;

  if (isMobile) {
    menuPosition.value = {
      x: Math.min(rect.left, window.innerWidth - 170),
      y: rect.top - 75
    };
  } else {
    menuPosition.value = {
      x: Math.min(rect.right - 160, window.innerWidth - 170),
      y: rect.bottom + 8
    };
  }
}

function closeMenu() {
  menuOpen.value = null;
}

function modifier(index: number) {
  const c = cotisations.value[index];
  form.value = { ...c };
  openModal.value = true;
  closeMenu();
}

function supprimer(index: number) {
  cotisations.value.splice(index, 1);
  closeMenu();
}

function handleClickOutside(e: MouseEvent) {
  if (!(e.target as HTMLElement).closest(".menu-context") && !(e.target as HTMLElement).closest("button")) {
    closeMenu();
  }
}

onMounted(() => window.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => window.removeEventListener("click", handleClickOutside));
</script>


<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fadeIn 0.6s ease-out; }
.animate-fade-in-up { animation: fadeIn 0.8s ease-out; }

.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.4s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(10px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
