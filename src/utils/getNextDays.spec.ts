import { getNextDays } from "./getNextDays"

describe('Get next five days', () => {
  it('should be return the next five days', () => {
    const days = getNextDays()
    
    expect(days.length).toBe(5)
  })
})

