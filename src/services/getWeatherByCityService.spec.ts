import { api } from "./api";

import { getWeatherByCityService } from "./getWeatherByCityService";

import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherAPIResponse";

describe('Service: getWeatherByCityService', () => {
  it('should be return weather API data formatted', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse });

    const response = await getWeatherByCityService({ latitude: 123, longitude: 456})

    expect(response).toHaveProperty('today')
  })
})