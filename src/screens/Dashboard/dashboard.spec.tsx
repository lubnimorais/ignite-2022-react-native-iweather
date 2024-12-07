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
      name: "New Allieport",
      latitude: -50.1118,
      longitude: -96.7837
    }

    await saveStorageCity(city)
  })

  it('should be show city weather.', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse })

    

    render(<Dashboard />)

    const cityName = await waitFor(() => screen.findByText(/new allieport/i));

    expect(cityName).toBeTruthy()
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
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse})
      .mockResolvedValueOnce({ data: mockCityApiResponse})
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse})

    render(<Dashboard />)

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'))

    const cityName = "Antelope";

    await waitFor(async () => await act(() => {
      const searchInput = screen.getByTestId('search-input')

      fireEvent.changeText(searchInput, cityName)
    }))

    await waitFor(async () => await act(async () => {
      fireEvent.press(await screen.getByText(cityName, { exact: false }))
    }))

    expect(await screen.getByText(cityName, { exact: false })).toBeTruthy()
  })
})