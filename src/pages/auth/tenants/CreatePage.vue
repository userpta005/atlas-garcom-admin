<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'tenants-list' }"
    path-form="tenants"
    title="Contratantes"
    api-post="/api/tenants"
    redirect-to="tenants-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreate from 'src/components/crud/form/XCreate.vue'

const form = ref({
  nif: null,
  full_name: null,
  name: null,
  state_registration: null,
  city_registration: null,
  birthdate: null,
  status: null,
  email: null,
  phone: null,
  city_id: null,
  zip_code: null,
  address: null,
  district: null,
  number: null,
  complement: null,
  signature_id: null,
  due_day_id: null
})

</script>
