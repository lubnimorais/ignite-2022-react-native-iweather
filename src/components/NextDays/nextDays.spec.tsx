import { render, screen } from "@testing-library/react-native"

import { NextDays } from "@components/NextDays"

import clearDay from '@assets/clear_day.svg'

describe('Component: NextDays', () => {
  it('should be render day', () => {
    render(
    <NextDays 
        data={[
          { 
            day: '01/12',
            min: '30°c',
            max: '34°c',
            icon: clearDay,
            weather: 'Céu limpo' 
          },
          { 
            day: '02/12',
            min: '25°c',
            max: '35°c',
            icon: clearDay,
            weather: 'Céu limpo' 
          },
          { 
            day: '03/12',
            min: '23°c',
            max: '32°c',
            icon: clearDay,
            weather: 'Nublado' 
          },
          { 
            day: '04/12',
            min: '20°c',
            max: '33°c',
            icon: clearDay,
            weather: 'Céu limpo' 
          },
          { 
            day: '05/12',
            min: '15°c',
            max: '31°c',
            icon: clearDay,
            weather: 'Chuva' 
          }
        ]}  
      />
    )

    expect(screen.getByText('03/12')).toBeTruthy()
  })
})