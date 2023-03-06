<template>
  <div class="row q-gap-lg">

    <div class="col-12 row q-gap-lg">
      <q-input v-model="nif"
        class="col-md-grow col-xs-12"
        label="CPF/CNPJ"
        clearable
        :mask="nifMask"
        unmasked-value
        reverse-fill-mask
        maxlength="18"
        lazy-rules="ondemand"
        :rules="[
          val => !!val || 'CPF/CNPJ é obrigatório!',
          val => helpers.cpfCnpj(val) || 'CPF/CNPJ é inválido!'
        ]" />

      <q-input v-model="form.full_name"
        class="col-md-grow col-xs-12"
        label="Nome Completo/Razão Social"
        clearable
        maxlength="60"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Nome Completo/Razão Social é obrigatório!']" />

      <q-input v-model="form.name"
        class="col-md-grow col-xs-12"
        label="Nome Social/Nome Fantasia"
        clearable
        maxlength="30" />
    </div>

    <div class="col-12 row q-gap-lg">
      <q-input v-model="form.state_registration"
        class="col-md-grow col-xs-12"
        label="Inscrição Estadual"
        clearable
        maxlength="15" />

      <q-input v-model="form.city_registration"
        class="col-md-grow col-xs-12"
        label="Inscrição Municipal"
        clearable
        maxlength="12" />

      <q-input v-model="form.birthdate"
        type="date"
        class="col-md-grow col-xs-12"
        label="Dt. Nasc./Abertura"
        clearable
        stack-label
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Dt. Nasc./Abertura é obrigatório!']" />

      <q-select v-model="form.status"
        class="col-md-grow col-xs-12"
        :options="statusOptions"
        label="Status"
        option-value="id"
        option-label="name"
        emit-value
        map-options
        clearable
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Status é obrigatório!']" />
    </div>

    <div class="col-12 row q-gap-lg">
      <q-input v-model="form.email"
        type="email"
        class="col-md-grow col-xs-12"
        label="Email"
        clearable
        maxlength="100"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Email é obrigatório!']" />

      <q-input v-model="form.phone"
        class="col-md-grow col-xs-12"
        label="Telefone"
        clearable
        mask="(##) # ####-####"
        unmasked-value
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Telefone é obrigatório!']" />

      <SelectCity v-model="form.city_id"
        :options-default="[{ id: form.city_id, info: form.city }]" />
    </div>

    <div class="col-12 row q-gap-lg">
      <q-input v-model="form.zip_code"
        class="col-md-grow col-xs-12"
        label="CEP"
        clearable
        mask="#####-###"
        unmasked-value
        lazy-rules="ondemand"
        :rules="[val => !!val || 'CEP é obrigatório!']" />

      <q-input v-model="form.address"
        class="col-md-grow col-xs-12"
        label="Endereço"
        clearable
        maxlength="60"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Endereço é obrigatório!']" />

      <q-input v-model="form.district"
        class="col-md-grow col-xs-12"
        label="Bairro"
        clearable
        maxlength="30" />

      <q-input v-model="form.number"
        class="col-md-grow col-xs-12"
        label="N°"
        clearable
        maxlength="10" />

      <q-input v-model="form.complement"
        class="col-md-grow col-xs-12"
        label="Complemento"
        clearable
        maxlength="30" />
    </div>

    <div class="col-12">
      <q-btn type="submit"
        class="float-right"
        style="min-width: 120px;"
        label="Salvar"
        color="secondary"
        no-caps />
    </div>

  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import helpers from 'src/utils/helpers'
import SelectCity from 'src/components/SelectCity.vue'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'

const props = defineProps({
  modelValue: {
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

const nif = computed({
  get () {
    return helpers.nifMask(form.value.nif)
  },
  set (value) {
    form.value.nif = value
  }
})

const statusOptions = ref([])

const nifMask = computed(() => {
  if (form.value.nif) {
    return form.value.nif.length > 11 ? '##.###.###/####-##' : '###.###.###-##'
  }
  return '##.###.###/####-##'
})

const handleGetStatus = async () => {
  try {
    const { data } = await api({ url: '/api/tenant-status' })
    statusOptions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => handleGetStatus())

</script>