<template>
  <XList>
    <template #body-cell-type="props">
      <q-td :props="props">
        <XBadge
          :name="enums.getName('role-types', props.row.type)"
          :color="enums.getColor('role-types', props.row.type)"
        />
      </q-td>
    </template>
  </XList>
</template>

<script setup>
import { useEnumsStore } from 'src/stores/enums'
import XList from 'src/components/crud/list/XList.vue'
import helpers from 'src/utils/helpers'
import XBadge from 'src/components/others/XBadge.vue'
import { useXListStore } from 'src/stores/xList'

const enums = useEnumsStore()
const xList = useXListStore()
xList.reset()
xList.title = 'Atribuições/Módulos'
xList.routeGroupName = 'roles'
xList.permissionsGroupName = 'roles'
xList.apiGroupName = 'roles'
xList.filterPlaceholder = 'Pesquisar por nome/descrição'
xList.columns = [
  {
    label: 'ID',
    name: 'id',
    field: 'id',
    align: 'center',
    required: true,
    sortable: true
  },
  {
    label: 'Nome',
    name: 'name',
    field: 'name',
    align: 'center',
    sortable: true
  },
  {
    label: 'Descrição',
    name: 'description',
    field: 'description',
    align: 'center',
    sortable: true
  },
  {
    label: 'Dt.Criação',
    name: 'created_at',
    field: 'created_at',
    align: 'center',
    sortable: true,
    format: (val) => helpers.brDateTime(val)
  },
  {
    label: 'Dt.Edição',
    name: 'updated_at',
    field: 'updated_at',
    align: 'center',
    sortable: true,
    format: (val) => helpers.brDateTime(val)
  },
  {
    label: 'Tipo',
    name: 'type',
    field: 'type',
    align: 'center',
    sortable: true,
    format: (val) => xList.gridMode ? enums.getName('role-types', val) : val
  }
]

</script>
