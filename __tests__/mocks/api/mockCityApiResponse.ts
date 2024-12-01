/**
 * EXEMPLO DE RETORNO DE REQUISIÇÃO FEITA PARA A API
 * QUE RETORNA OS DADOS DA CIDADE.
 */

import { CityAPIResponse } from "@services/getCityByNameService";

export const mockCityApiResponse: CityAPIResponse = {
  id: '1',
  name: 'São Paulo',
  sys: {
    country: 'BR'
  },
  coord: {
    lat: 8.1108,
    lon: 126.0633 
  }
}