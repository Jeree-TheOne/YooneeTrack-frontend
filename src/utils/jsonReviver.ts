export function jsonReviver(key: string, value: any): any {
  if (typeof value === 'string' && isValidDate(new Date(value))) return new Date(value)

  return value
}

function isValidDate(value: any): boolean {
  return value instanceof Date && !isNaN(value as any)
}
