<template>
  <AppSidebarLayout>
    <div class="min-h-screen md:p-4">
      <a-card bordered class="mx-auto bg-white overflow-hidden animate-fade-in">
        <!-- Header -->
        <div
          class="lg:flex lg:items-center lg:justify-between md:flex items-center space-y-4 md:space-y-0 md:items-center justify-between p-2">
          <h1
            class="text-lg lg:text-left md:text-left text-center lg:text-xl font-bold text-gray-600 w-full lg:max-w-xl">
            Suivi des cotisations
          </h1>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 sm:w-auto w-full">
            <a-input-search @search="showModal" placeholder="Rechercher..." />
            <Bouton @click="openForm" label="Ajouter" icon="plus" />
          </div>
        </div>

        <!-- Table desktop -->
        <div class="hidden lg:block overflow-x-auto">
          <a-table :columns="columns" :data-source="filteredCotisations" row-key="nom" bordered size="middle"
            :pagination="false" class="animate-fade-in text-center">
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.key === 'index'">
                <div class="text-center">{{ index + 1 }}</div>
              </template>

              <template v-else-if="column.key === 'solde'">
                <div class="text-center">
                  <span :class="record.solde === 0 ? 'text-green-600' : 'text-red-600'" class="font-semibold">
                    {{ record.solde }} Ar
                  </span>
                </div>
              </template>

              <template v-else-if="column.key === 'observation'">
                <div class="text-center">
                  <a-tag :color="record.observation === 'OK'
                    ? 'green'
                    : record.observation === 'Partiel'
                      ? 'orange'
                      : 'red'
                    ">
                    {{ record.observation }}
                  </a-tag>
                </div>
              </template>

              <template v-else-if="column.key === 'actions'">
                <div class="text-center">
                  <a-dropdown>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item @click="modifier(index)">Modifier</a-menu-item>
                        <a-menu-item danger @click="supprimer(index)">Supprimer</a-menu-item>
                      </a-menu>
                    </template>
                    <a-button type="text" class="text-gray-600 hover:text-gray-800">
                      <EllipsisOutlined />
                    </a-button>
                  </a-dropdown>
                </div>
              </template>

              <template v-else>
                <div class="text-center">{{ record[column.key] }}</div>
              </template>
            </template>
          </a-table>
        </div>

        <!-- Mobile + md cards -->
        <div class="block md:block lg:hidden p-2 md:p-4 space-y-4">
          <transition-group name="fade-slide" tag="div">
            <a-card v-for="(cotisation, index) in filteredCotisations" :key="index"
              class="bg-gray-50 rounded-xl border animate-fade-in-up text-center">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700">#{{ index + 1 }}</span>
                <a-tag :color="cotisation.observation === 'OK'
                  ? 'green'
                  : cotisation.observation === 'Partiel'
                    ? 'orange'
                    : 'red'
                  ">
                  {{ cotisation.observation }}
                </a-tag>
              </div>

              <p class="font-semibold text-gray-800 md:text-lg">{{ cotisation.nom }}</p>
              <p class="text-gray-600 text-sm md:text-base">{{ cotisation.mois }}</p>

              <div class="mt-2 grid grid-cols-2 gap-2 text-sm md:text-base">
                <a-card size="small" bordered>
                  <p class="text-gray-500">Montant attendu</p>
                  <p class="font-medium">{{ cotisation.attendu }} Ar</p>
                </a-card>
                <a-card size="small" bordered>
                  <p class="text-gray-500">Montant payé</p>
                  <p class="font-medium">{{ cotisation.paye }} Ar</p>
                </a-card>
                <a-card size="small" bordered>
                  <p class="text-gray-500">Date paiement</p>
                  <p class="font-medium">{{ cotisation.date }}</p>
                </a-card>
                <a-card size="small" bordered :class="cotisation.solde === 0 ? 'text-green-600' : 'text-red-600'">
                  <p class="text-gray-500">Solde</p>
                  <p>{{ cotisation.solde }} Ar</p>
                </a-card>
                <div class="col-span-2 text-center">
                  <a-dropdown>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item @click="modifier(index)">Modifier</a-menu-item>
                        <a-menu-item danger @click="supprimer(index)">Supprimer</a-menu-item>
                      </a-menu>
                    </template>
                    <a-button type="text" class="text-gray-600 hover:text-gray-800">
                      <EllipsisOutlined />
                    </a-button>
                  </a-dropdown>
                </div>
              </div>
            </a-card>
          </transition-group>
        </div>
      </a-card>

      <FormSuivi ref="formSuivi" />
    </div>
  </AppSidebarLayout>
</template>


<script setup lang="ts">
import AppSidebarLayout from "@/layouts/app/AppSidebarLayout.vue";
import { ref, computed, watch } from "vue";
import { EllipsisOutlined } from "@ant-design/icons-vue";
import Bouton from "@/components/utils/Bouton.vue";
import Search from "@/components/utils/Search.vue";
import FormSuivi from './FormSuivi.vue';

const formSuivi = ref(false)

function openForm() {
  formSuivi.value.visible = true
}


const search = ref("");
const showModal = ref(false);


const cotisations = ref([
  { nom: "DNA Webhosting", mois: "Janvier 2025", attendu: 20000, paye: 20000, date: "05/01/2025", solde: 0, observation: "OK" },
  { nom: "DNA Webhosting", mois: "Février 2025", attendu: 20000, paye: 10000, date: "10/02/2025", solde: 10000, observation: "Partiel" },
  { nom: "DNA Webhosting", mois: "Mars 2025", attendu: 20000, paye: 0, date: "-", solde: 20000, observation: "Impayé" },
]);

const newSociete = ref({
  nom: "",
  secteur: "",
  employes: 0,
  statut: "",
  cotisation: null,
});

const columns = [
  { title: "N°", key: "index", align: "center" },
  { title: "Nom & Prénom", dataIndex: "nom", key: "nom", align: "center" },
  { title: "Mois", dataIndex: "mois", key: "mois", align: "center" },
  { title: "Montant attendu", dataIndex: "attendu", key: "attendu", align: "center" },
  { title: "Montant payé", dataIndex: "paye", key: "paye", align: "center" },
  { title: "Date paiement", dataIndex: "date", key: "date", align: "center" },
  { title: "Solde", key: "solde", align: "center" },
  { title: "Observation", key: "observation", align: "center" },
  { title: "Actions", key: "actions", align: "center" },
];

// Filtrage dynamique
const filteredCotisations = computed(() => {
  const term = search.value.toLowerCase().trim();
  if (!term) return cotisations.value;
  return cotisations.value.filter(c => c.nom.toLowerCase().includes(term));
});

// Fonctions
function handleAddSociete() {
  // Ajoute une nouvelle société à la liste
  cotisations.value.push({
    nom: newSociete.value.nom,
    mois: "-", // on peut adapter
    attendu: 0,
    paye: 0,
    date: "-",
    solde: 0,
    observation: "OK",
  });

  // Réinitialiser le formulaire
  newSociete.value = { nom: "", secteur: "", employes: 0, statut: "", cotisation: null };

  // Fermer la modale
  showModal.value = false;
}

function modifier(index: number) {
  const c = cotisations.value[index];
  newSociete.value = { ...c };
  showModal.value = true;
}

function supprimer(index: number) {
  cotisations.value.splice(index, 1);
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fadeIn 0.8s ease-out;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
