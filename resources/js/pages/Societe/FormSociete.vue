<template>
  <div>
    <!-- Utilisation du FormModal -->
    <FormModal
      v-model:open="open"
      title="Nouvelle Société"
      @ok="submitForm"
      @cancel="resetForm"
    >
      <!-- Les inputs -->
      <a-form layout="vertical" :model="formState">
        <a-form-item label="Nom de la société" required>
          <a-input v-model:value="formState.nom" placeholder="Entrer le nom" />
        </a-form-item>

        <a-form-item label="Adresse" required>
          <a-input v-model:value="formState.adresse" placeholder="Entrer l'adresse" />
        </a-form-item>

        <a-form-item label="Téléphone">
          <a-input v-model:value="formState.telephone" placeholder="Entrer le numéro" />
        </a-form-item>
      </a-form>
    </FormModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FormModal from '@/components/utils/FormModal.vue'

const open = ref(false)

const formState = ref({
  nom: '',
  adresse: '',
  telephone: ''
})

function resetForm() {
  formState.value = { nom: '', adresse: '', telephone: '' }
}

function submitForm() {
  console.log('✅ Formulaire soumis :', formState.value)
  // 👉 Ici tu peux faire un post via Inertia / Axios
  resetForm()
}

// Fonction pour ouvrir la modale
function add() {
    alert('ghfgfh');
  open.value = true;
}

// ✅ on expose la fonction "add" pour que le parent (ex: index.vue) puisse l'utiliser
defineExpose({
  add
})
</script>
