<template>
  <XFormGroup>

    <XFileInput
      v-model:file-value="form.file"
      v-model:image-value="form.image"
      :rules="[val => !!val || 'Imagem da Categoria é obrigatória!']"
      accept=".jpeg, .jpg, .png"
      max-file-size="1048576"
      class="col-md-grow"
      label="Imagem da Categoria"
    />

    <XInput
      v-model="form.name"
      :rules="[val => !!val || 'Nome é obrigatório!']"
      class="col-md-grow"
      label="Nome"
      maxlength="30"
    />

    <XInput
      v-model="form.description"
      class="col-md-grow"
      label="Descrição"
      maxlength="100"
    />

    <XEnumSelect
      v-model="form.status"
      :rules="[val => !!val || 'Status é obrigatório!']"
      class="col-md-grow"
      label="Status"
      enum-name="status"
    />

    <XBtnGroup>
      <q-space />
      <XSbtBtn />
    </XBtnGroup>

  </XFormGroup>
</template>

<script setup>
import { computed } from 'vue'
import XSbtBtn from 'src/components/buttons/XSbtBtn.vue'
import XInput from 'src/components/inputs/XInput.vue'
import XEnumSelect from 'src/components/inputs/XEnumSelect.vue'
import XFormGroup from 'src/components/crud/form/XFormGroup.vue'
import XBtnGroup from 'src/components/crud/form/XBtnGroup.vue'
import XFileInput from 'src/components/inputs/XFileInput.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formRef: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const form = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

</script>
