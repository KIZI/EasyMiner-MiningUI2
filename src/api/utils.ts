export function cleanParams(params: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      if (Array.isArray(value)) return !!value.length
      if (typeof value === 'string') return !!value

      return value !== undefined && value !== null
    }),
  )
}
