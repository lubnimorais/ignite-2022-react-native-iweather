import { act, render, screen, waitFor } from "@__tests__/utils/customRender"

import { Routes } from "."

import { api } from "@services/api"

import { saveStorageCity } from "@libs/asyncStorage/cityStorage"
import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherAPIResponse"

describe('Routes', () => {
  it('should be render Search screen when not city selected.', async () => {
    render(<Routes />)

    // i -> ignora maiúsculo e minúsculo
    const title = await waitFor(() => screen.findByText(/^escolha um local/i))

    expect(title).toBeTruthy()
  })

  it('should be render Dashboard screen when has city selected.', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse})

    const city = {
      id: '1',
      name: "West Buddyborough",
      latitude: 7.1401,
      longitude: -59.3142
    }

    await saveStorageCity(city)

    await act(() => waitFor(() => render(<Routes />)))

    const title = screen.getByText(city.name)

    expect(title).toBeTruthy()
  })
})