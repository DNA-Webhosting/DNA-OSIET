<template>
  <FormModal :open="visible" title="Nouvelle une société" @ok="submitForm" cancelText="Fermer" okText="ENREGISTRER"
    @cancel="visible = false">
    <a-form layout="vertical" class="grid grid-cols-1 md:grid-cols-2" ref="formRef" :model="newSociete"
      @finish="handleAddSociete">
      <a-form-item label="Nom & Prénom" name="nom" :rules="[{ required: true, message: 'Veuillez entrer le nom' }]"
        class="md:col-span-2">
        <a-input v-model:value="newSociete.nom" placeholder="Entrez le nom" class="w-full" />
      </a-form-item>

      <a-form-item label="Mois" name="mois" :rules="[{ required: true, message: 'Veuillez entrer le mois' }]"
        class="md:col-span-2">
        <a-input v-model:value="newSociete.secteur" placeholder="Entrez le mois" class="w-full" />
      </a-form-item>

      <a-form-item label="Montant attendu" name="attendu"
        :rules="[{ required: true, message: 'Veuillez entrer le montant attendu' }]">
        <a-input-number v-model:value="newSociete.employes" class="w-full" />
      </a-form-item>

      <a-form-item label="Montant payé" name="paye"
        :rules="[{ required: true, message: 'Veuillez entrer le montant payé' }]">
        <a-input-number v-model:value="newSociete.statut" class="w-full" />
      </a-form-item>

      <a-form-item label="Date paiement" name="date"
        :rules="[{ required: true, message: 'Veuillez sélectionner la date de paiement' }]" class="md:col-span-2">
        <a-date-picker v-model:value="newSociete.cotisation" class="w-full" format="DD/MM/YYYY" />
      </a-form-item>

      <a-form-item label="Solde" name="solde" :rules="[{ required: true, message: 'Veuillez entrer le solde' }]">
        <a-input-number v-model:value="newSociete.solde" class="w-full" />
      </a-form-item>

      <a-form-item label="Observation" name="observation"
        :rules="[{ required: true, message: 'Veuillez entrer l\'observation' }]">
        <a-select v-model:value="newSociete.observation" placeholder="Choisir une observation" class="w-full">
          <a-select-option value="OK">OK</a-select-option>
          <a-select-option value="Partiel">Partiel</a-select-option>
          <a-select-option value="Impayé">Impayé</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </FormModal>
</template>

<script setup>
import { ref } from 'vue'
import FormModal from '@/components/Utils/FormModal.vue'

const visible = ref(false)
const formRef = ref()
const newSociete = ref({
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
