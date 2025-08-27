<template>
  <a-modal
    :open="localVisible"
    :title="title"
    @ok="handleOk"
    @cancel="handleCancel"
    :closable="true"
  >
    <slot></slot>
  </a-modal>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  title: String
})

const emit = defineEmits(['update:visible', 'ok', 'cancel'])

// état local pour gérer la visibilité
const localVisible = ref(props.visible)

// synchroniser avec la prop si elle change depuis l'extérieur
watch(() => props.visible, (val) => {
  localVisible.value = val
})

function handleOk() {
  emit('ok')
  localVisible.value = false
  emit('update:visible', false)
}

function handleCancel() {
  emit('cancel') // tu peux garder ou supprimer cet emit si tu veux
  localVisible.value = false
  emit('update:visible', false)
}
</script>
