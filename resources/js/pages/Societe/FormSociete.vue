<template>
  <FormModal
     :open="visible" title="Ajouter une société" @ok="submitForm"
  >
    <a-form
      :model="form"
      :rules="rules"
      ref="formRef"
      layout="vertical"
      class="space-y-4"
    >
      <a-form-item label="Nom de la société" name="nom">
        <a-input v-model:value="form.nom" placeholder="Nom de la société"/>
      </a-form-item>

      <a-form-item label="Adresse" name="adresse">
        <a-input v-model:value="form.adresse" placeholder="Adresse"/>
      </a-form-item>

      <a-form-item label="Email" name="email">
        <a-input v-model:value="form.email" placeholder="Email"/>
      </a-form-item>

      <a-form-item label="Téléphone" name="telephone">
        <a-input v-model:value="form.telephone" placeholder="Téléphone"/>
      </a-form-item>
    </a-form>
  </FormModal>
</template>

<script setup>
import { ref } from 'vue'
import FormModal from '@/components/FormModal.vue'

const visible = ref(false)
const formRef = ref()
const form = ref({
  nom: '',
  adresse: '',
  email: '',
  telephone: ''
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


