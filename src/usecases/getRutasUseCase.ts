import { getRutas } from '../repositories/ruta.repository'

export const getRutasUseCase = async () => {
  return await getRutas()
}
