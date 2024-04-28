export function trimFormValues<TValues extends Record<string, any>>(values: TValues) {
  const trimmedValues = {} as TValues
  const keys = Object.keys(values) as (keyof TValues)[]

  keys.forEach((key) => {
    const value = values[key]

    if (typeof value === 'string') {
      trimmedValues[key] = value.trim()
      return
    }

    trimmedValues[key] = value
  })

  return trimmedValues
}
