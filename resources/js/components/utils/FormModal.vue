<template>
  <a-modal
    :open="visible"
    :title="title"
    @ok="handleOk"
    @close="handleCancel"
  >
    <slot></slot>
  </a-modal>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: Boolean,
  title: String
})

const emit = defineEmits(['update:visible', 'ok', 'cancel'])

function handleOk() {
  emit('ok')
  emit('update:visible', false) // fermer le modal
}

function handleCancel() {
  emit('cancel')
  emit('update:visible', false) // fermer le modal
}
</script>
