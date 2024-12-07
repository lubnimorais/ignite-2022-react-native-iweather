import { fireEvent, render, screen, waitFor } from "@__tests__/utils/customRender"

import { api } from "@services/api"

import { mockCityApiResponse } from "@__tests__/mocks/api/mockCityApiResponse"

import { Search } from "."

describe('Screen: Search', () => {
  it('should be show city option.', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockCityApiResponse })

    render(<Search />)

    const searchInput = screen.getByTestId('search-input')

    fireEvent.changeText(searchInput, "Jadonburgh")

    const option = await waitFor(async () => screen.findByText(/Jadonburgh/i));

    expect(option).toBeTruthy()
  })
})