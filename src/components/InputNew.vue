<template>
  <label :class="[type == 'checkbox' ? 'flex' : 'block', $attrs.class]">
    <span
      v-if="label && type != 'checkbox'"
      class="mb-2 block text-sm leading-4 text-gray-700"
    >
      {{ label }}
    </span>
    <div
      class="relative flex"
      :class="{ 'items-center': isNormalInput || type == 'select' }"
    >
      <FeatherIcon
        v-if="iconLeft && type != 'checkbox'"
        :name="iconLeft"
        class="absolute mx-2 h-4 w-4 text-gray-600"
        :class="{ 'mt-2': type == 'textarea' }"
      />
      <input
        v-if="isNormalInput"
        v-bind="inputAttributes"
        class="border-gray-400 placeholder-gray-500"
        ref="inputRef"
        :class="[
          {
            'form-input block w-full': type != 'checkbox',
            'form-checkbox': type == 'checkbox',
            'pl-8': iconLeft && type != 'checkbox',
          },
          inputClass,
        ]"
        :type="type || 'text'"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="passedInputValue"
      />
      <textarea
        v-if="type === 'textarea'"
        v-bind="inputAttributes"
        :placeholder="placeholder"
        class="placeholder-gray-500"
        :class="[
          'form-textarea block w-full resize-none',
          inputClass,
          {
            'pl-8': iconLeft,
          },
        ]"
        ref="input"
        :value="passedInputValue"
        :disabled="disabled"
        :rows="rows"
      ></textarea>
      <select
        v-if="type === 'select'"
        v-bind="inputAttributes"
        class="form-select block w-full"
        :class="{ 'pl-8': iconLeft }"
        ref="input"
        :disabled="disabled"
      >
        <option
          v-for="option in selectOptions"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled || false"
          :selected="passedInputValue === option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <span
      v-if="label && type == 'checkbox'"
      class="ml-2 inline-block text-base leading-4"
    >
      {{ label }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import debounce from '../utils/debounce.js'
import FeatherIcon from './FeatherIcon.vue'

interface InputProps {
  label?: string,
  type?: 'text' | 'number' | 'checkbox' | 'textarea' | 'select' | 'email' | 'password' | 'date',
  modelValue?: string | number | boolean | Object | Array<any>,
  placeholder?: string,
  inputClass?: string | Array<string> | Record<string, boolean>,
  debounce?: number,
  options?: string | Array<{ label: string, value: string }>,
  disabled?: boolean,
  rows?: number,
  iconLeft?: string,
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  rows: 3,
})

const emit = defineEmits(['update:modelValue', 'change', 'input'])
const attrs = useAttrs()

const passedInputValue = computed(() => {
	if ('value' in attrs) {
		return attrs.value
	}
	return props.modelValue	|| null
})

const inputAttributes = computed(() => {
	let attrs = {}
	let onInput = (e) => {
		emit('input', getInputValue(e))
	}
})

const inputRef = ref(null)
function getInputValue(e) {
	const input = e ? e.target : inputRef
    let value = inputRef.value
	if (props.type == 'checkbox') {
		value = inputRef.checked
	}
    return value
}

</script>
<style>
.form-select {
  background-image: url("data:image/svg+xml;utf8,<svg fill='none' width='8' xmlns='http://www.w3.org/2000/svg' viewBox='-4 -2 16 16'><path d='M4.5 3.636 6.136 2l1.637 1.636M4.5 8.364 6.136 10l1.637-1.636' stroke='%23333C44' stroke-linecap='round' stroke-linejoin='round'/></svg>");
}
</style>
