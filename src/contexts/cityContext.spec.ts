import { renderHook } from "@testing-library/react-native"

import { useCity } from "@hooks/useCity"

describe('Context: CityContext', () => {
  it('should be change selected city', () => {
    renderHook(() => useCity())
  })
})