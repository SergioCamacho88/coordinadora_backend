import { getTransportistas } from '../repositories/transportista.repository'

export const getTransportistasUseCase = async (onlyAvailable: boolean) => {
  return await getTransportistas(onlyAvailable)
}
