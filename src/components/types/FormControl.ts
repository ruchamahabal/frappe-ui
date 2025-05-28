export interface FormControlProps {
  label?: string
  description?: string
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | 'range'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'autocomplete'
  size?: 'sm' | 'md'
  required?: boolean
  modelValue?: any
}
