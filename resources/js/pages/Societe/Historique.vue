<template>
    <AppSidebarLayout>
        <div class="p-4">
            <div class="bg-white space-y-4 rounded-lg">
                <DataTable :columns="columns" :data="data" class="main-shadow mt-5" :show-index="true"
                    :actions="actions">

                    <template #default="{ column, record, text }">
                        <template v-if="column.key === 'act'">
                            <span class="text-blue-600">{{ text }}</span>
                        </template>
                    </template>

                </DataTable>

            </div>
        </div>
    </AppSidebarLayout>
</template>
<script setup lang="ts">
import { router } from "@inertiajs/vue3"
import AppSidebarLayout from "@/layouts/app/AppSidebarLayout.vue";
import Tableau from "@/components/utils/Tableau.vue";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import DataTable from "@/components/utils/DataTable.vue";

const columns = [
    { title: 'Date / Heure', dataIndex: 'date', key: 'date' },
    { title: 'Utilisateur', dataIndex: 'utilisateur', key: 'utilisateur' },
    { title: 'Société concernée', dataIndex: 'societe', key: 'societe' },
    { title: 'Action réalisée', dataIndex: 'act', key: 'act' },
    { title: 'Détails', dataIndex: 'details', key: 'details' },

]

const data = {
    data: [
        {
            date: '27/08/2025 09:20',
            utilisateur: 'Admin',
            societe: 'Société 1',
            act: 'Ajout d’une cotisation',
            details: 'Montant: 500 000 Ar'
        },
        {
            date: '27/08/2025 10:05',
            utilisateur: 'Dna',
            societe: 'Société 2',
            act: 'Modification fiche société',
            details: 'Changement adresse'
        },
        {
            date: '27/08/2025 11:42',
            utilisateur: 'Dna',
            societe: 'Société 3',
            act: 'Suppression alerte',
            details: 'Raison: erreur saisie'
        },
        {
            date: '27/08/2025 12:10',
            utilisateur: 'Dr Dna',
            societe: 'Société 4',
            act: 'Paiement enregistré',
            details: '200 000 Ar (Mobile Money)'
        }
    ],
}


const actions = [
    { text: "Modifier", action: (record) => formModal.value.update(record), icon: 'fa-pen-to-square', class: "bg-green-100 !text-red-500" },
    { text: "Supprimer", action: 'handleDelete', icon: 'fa-trash', },
    { text: "Voir", action: 'handleDelete', icon: 'fa-edit', },
]
</script>
<style></style>