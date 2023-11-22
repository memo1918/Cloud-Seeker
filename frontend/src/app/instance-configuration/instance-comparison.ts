export interface InstanceComparison {
  name: string,
  price: {
    [name: string]: any
  },
  fields: {
    [name: string]: { value: string, unit: string }
  },
  skus: string[]
}
