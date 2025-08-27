<template>
  <FormModal
     :open="visible" title="Nouvelle une société" @ok="submitForm" cancelText="Fermer" okText="ENREGISTRER" @cancel="visible = false"
  >
    <a-form
        layout="vertical"
        class="space-y-4"
        ref="formRef"
      >
        <a-form-item
          label="Nom de la Société"
          :rules="[{ required: true, message: 'Veuillez entrer le nom de la société' }]"
        >
          <a-input v-model:value="form.nom" placeholder="Entrez le nom" />
        </a-form-item>

        <a-form-item
          label="Secteur d'Activité"
          :rules="[{ required: true, message: 'Veuillez entrer le secteur d\'activité' }]"
        >
          <a-input v-model:value="form.secteur" placeholder="Secteur" />
        </a-form-item>

        <a-form-item
          label="Nombre d'Employés"
          :rules="[{ required: true, message: 'Veuillez entrer le nombre d\'employés' }]"
        >
          <a-input-number v-model:value="form.employes" class="w-full" />
        </a-form-item>

        <a-form-item
          label="Statut"
          :rules="[{ required: true, message: 'Veuillez choisir un statut' }]"
        >
          <a-select v-model:value="form.statut" placeholder="Choisir un statut">
            <a-select-option value="Actif">Actif</a-select-option>
            <a-select-option value="En retard">En retard</a-select-option>
            <a-select-option value="Archive">Archive</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="Dernière Cotisation"
          :rules="[{ required: true, message: 'Veuillez sélectionner la date de cotisation' }]"
        >
          <a-date-picker v-model:value="form.cotisation" class="w-full" format="DD/MM/YYYY" />
        </a-form-item>
      </a-form>
  </FormModal>
</template>

<script setup>
import { ref } from 'vue'
import FormModal from '@/components/Utils/FormModal.vue'

const visible = ref(false)
const formRef = ref()
const form = ref({
  nom: '',
  secteur: '',
  employes: '',
  statut: '',
  cotisation: ''
})

const rules = {
  nom: [{ required: true, message: 'Nom requis', trigger: 'blur' }],
  adresse: [{ required: true, message: 'Adresse requise', trigger: 'blur' }],
  email: [{ required: true, type: 'email', message: 'Email invalide', trigger: 'blur' }],
  telephone: [{ required: true, message: 'Téléphone requis', trigger: 'blur' }]
}

function submitForm() {
  formRef.value.validate().then(() => {
    console.log('Formulaire soumis:', form.value)
    visible.value = false
    form.value = { nom: '', adresse: '', email: '', telephone: '' } // reset
  }).catch((err) => {
    console.log('Erreur validation:', err)
  })
}

// Exposer visible pour le parent
defineExpose({ visible })
</script>


