import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@__tests__/utils/customRender"

import { api } from "@services/api"

import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherAPIResponse"
import { mockCityApiResponse } from "@__tests__/mocks/api/mockCityApiResponse"

import { saveStorageCity } from "@libs/asyncStorage/cityStorage"

import { Dashboard } from "."

describe('Screen: Dashboard', () => {
  beforeAll(async () => {
    const city = {
      id: '1',
      name: "Caruaru",
      latitude: -50.1118,
      longitude: -96.7837
    }

    await saveStorageCity(city)
  })

  it('should be show city weather.', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse })

    render(<Dashboard />)

    await waitFor(() => expect(screen.findByText(/new allieport/i, {}, { timeout: 3000})).toBeTruthy());

    // expect(cityName).toBeTruthy()
  })

  it('should be show another selected weather city.', async () => {
    /**
     * 1 - buscar informações do tempo/clima da cidade selecionada
     * 2 - buscar as informações da cidade
     * 3-  buscar as informações do tempo/clima da nova cidade selecionada
     * 
    */ 

    // Mocka uma requisição de cada vez
    jest.spyOn(api, 'get')
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse })
      .mockResolvedValueOnce({ data: mockCityApiResponse })
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse })

    render(<Dashboard />)

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'))

    const cityName = 'São Paulo'

    await waitFor(() => act(() => {
      const search = screen.getByTestId('search-input')
      fireEvent.changeText(search, cityName)
    }))

    await waitFor(() => act(() => {
      fireEvent.press(screen.getByText(cityName, { exact: false }))
    }))

    expect(screen.getByText(cityName, { exact: false })).toBeTruthy()
  })
})