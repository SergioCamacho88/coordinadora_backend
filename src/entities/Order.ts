export interface Order {
    id: number
    userId: number
    weight: number
    dimensions: string
    productType: string
    destinationAddress: string
    status: 'En espera' | 'En tránsito' | 'Entregado'
    createdAt: Date
  }
  