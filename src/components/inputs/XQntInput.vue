<template>
  <XInput
    v-model="value"
    maxlength="12"
    data-maska="9.99#,##"
    data-maska-tokens="9:[0-9]:repeated"
    data-maska-reversed
    v-maska
  >
    <template
      v-for="(_, slot) in $slots"
      :key="slot"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
        :key="slot"
      />
    </template>
  </XInput>
</template>

<script setup>
import { computed } from 'vue'
import XInput from 'src/components/inputs/XInput.vue'
import { vMaska } from 'maska'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: false
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

</script>
