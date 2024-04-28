export type StatusResponse = {
  code: number
  status: 'OK' | 'error'
  message?: string
}

export type OrderInput = {
  orderby: string
  order?: 'ASC' | 'DESC'
}
