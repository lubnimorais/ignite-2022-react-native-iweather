import { fireEvent, render, screen } from "@testing-library/react-native"

import { SelectList } from "@components/SelectList"

describe('Component: SelectList', () => {
  it('should be return city details selected.', () => {
    const data = [
      {
        id: '1',
        name: 'Jacobsville',
        latitude: 88.3319,
        longitude: -2.5047
      },
      {
        id: '2',
        name: 'San Tan Valley',
        latitude: -26.1493,
        longitude: 6.0821
      }
    ]

    const onPress =  jest.fn()

    render(
      <SelectList
          data={data}
          onChange={() => {}}
          onPress={onPress}
      />
    )

    const selectedCity = screen.getByText(/Jacobsville/i)
    /** 
     * DISPARA O EVENTO DE PRESS DO BOTÃO, DO TOQUE DE SELEÇÃO DA CIDADE
     * */ 
    fireEvent.press(selectedCity)

    // expect(onPress).toHaveBeenCalledTimes(1)
    expect(onPress).toHaveBeenCalledWith(data[0])
  });

  it("not should be show options when data props is empty", () => {
    render(
      <SelectList
          data={[]}
          onChange={() => {}}
          onPress={() => {}}
      />
    )

    const options = screen.getByTestId('options')
    
    expect(options.children).toHaveLength(0)
  })
})