<template>
  <div class="flex flex-col gap-1.5">
    <FormLabel
      v-if="label"
      :label="label"
      size="sm"
      :required="required"
    />
    <Combobox
      v-model="value"
      :placeholder="placeholder || `Select ${doctype}`"
      :options="options.data"
      :openOnClick="true"
      @update:query="handleQueryUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Combobox } from '../../src/components/Combobox'
import debounce from '../../src/utils/debounce'
// @ts-ignore - Vue SFC without explicit types
import { createResource } from '../../src/resources'
import type { LinkProps, SelectOption } from './types'

const props = withDefaults(defineProps<LinkProps>(), {
  label: '',
  filters: () => ({}),
  showFieldTitleAsOption: true,
})
const emit = defineEmits(['update:modelValue'])

const searchText = ref<string>('')

const value = computed({
  get: () => props.modelValue,
  set: (val: SelectOption | string | undefined) => {
    if (typeof val === 'string') {
      emit('update:modelValue', val)
    } else {
      emit('update:modelValue', val?.value || '')
    }
  },
})

const options = createResource({
  url: 'frappe.desk.search.search_link',
  params: {
    doctype: props.doctype,
    txt: searchText.value,
    filters: props.filters,
  },
  method: 'POST',
  transform: (data: SelectOption[]) => {
    return data.map((doc) => {
      return {
        label:
          props.showTitleFieldAsOption && doc.label ? doc.label : doc.value,
        value: doc.value,
      }
    })
  },
})

const reloadOptions = (searchTextVal: string) => {
  options.update({
    params: {
      txt: searchTextVal,
      doctype: props.doctype,
    },
  })
  options.reload()
}

const handleQueryUpdate = debounce((newQuery: string) => {
  const val = newQuery || ''
  if (searchText.value === val) return
  searchText.value = val
  reloadOptions(val)
}, 300)

watch(
  () => props.doctype,
  () => {
    if (!props.doctype || props.doctype === options.doctype) return
    reloadOptions('')
  },
  { immediate: true },
)

watch(
  () => props.filters,
  () => {
    options.update({
      params: {
        doctype: props.doctype,
        txt: searchText.value,
        filters: props.filters,
      },
    })
    options.reload()
  },
)
</script>
