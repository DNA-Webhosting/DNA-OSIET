<template>
  <div class="p-8">

    <button
      class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      @click="openForm"
    >
      Nouveau
    </button>

    <FormSociete ref="formSociete"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FormSociete from './FormSociete.vue'

const formSociete = ref(false)

function openForm() {
  formSociete.value.visible = true
}
//  "typescript": "^5.2.2",

</script>

