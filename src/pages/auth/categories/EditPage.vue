<template>
  <XEdit
    v-model="form"
    :api-get="`/api/categories/${route.params.id}`"
    :api-put="`/api/categories/${route.params.id}`"
    :return-to="{ name: 'categories-list' }"
    :get-item-function="getItem"
    path-form="categories"
    title="Categorias"
    redirect-to="categories-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEdit from 'src/components/crud/form/XEdit.vue'
import { useRoute } from 'vue-router'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import helpers from 'src/utils/helpers'

const route = useRoute()

const form = ref({
  file: null,
  image: null,
  name: null,
  description: null,
  status: null
})

const getItem = async () => {
  try {
    const { data } = await api({ url: `/api/categories/${route.params.id}` })

    fetch(data.data.image_url)
      .then(async response => {
        const contentType = response.headers.get('content-type')
        const blob = await response.blob()
        const file = new File([blob], data.data.image, { contentType })
        data.data.file = file
        helpers.toBase64(file).then(base64 => {
          data.data.image = base64
        })
        form.value = data.data
      })
  } catch (error) {
    notify.error(error)
  }
}

</script>
