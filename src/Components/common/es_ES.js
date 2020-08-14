export const messages = {
  'any.required': `{#label} es un campo requerido`,
  'string.base': `{#label} debe ser de tipo 'texto'`,
  'string.empty': `{#label} es obligatorio`,
  'string.max': `{#label} no debe tener mas de {#limit} caracteres`,
  'number.base': `{#label} debe ser de tipo 'número'`,
  'number.empty': `{#label} es obligatorio`,
  'number.min': `{#label} no debe ser menor a {#limit}`,
  'number.max': `{#label} no debe ser mayor a {#limit}`,
  'number.positive': `{#label} debe ser un número positivo`,
  'array.base': `{#label} debe ser de tipo 'array'`,
  'array.empty': `{#label} es obligatorio`,

  'date.base': '{{#label}} debe ser una fecha válida',
  'date.format': '{{#label}} must be in {msg("date.format." + #format) || #format} format',
  'date.greater': '{{#label}} must be greater than "{{#limit}}"',
  'date.less': '{{#label}} must be less than "{{#limit}}"',
  'date.max': '{{#label}} must be less than or equal to "{{#limit}}"',
  'date.min': '{{#label}} must be larger than or equal to "{{#limit}}"',
  // Messages used in date.format
  'date.format.iso': 'ISO 8601 date',
  'date.format.javascript': 'timestamp or number of milliseconds',
  'date.format.unix': 'timestamp or number of seconds'
}

export const errors2 = {
  'string.base': `{#label} debe ser de tipo 'texto'`,
  'string': { 'empty': `{#label} es obligatorio` },
  'string.max': `{#label} no debe tener mas de {#limit} caracteres`,
  'any.required': `{#label} es un campo requerido`,
  'number': {
    'base': `{#label} debe ser de tipo 'número'`,
    'empty': `{#label} es obligatorio`,
    'min': `{#label} no debe ser menor a {#limit}`
  }


}