import { useEffect, useState } from 'react'

export const useDifference = function (number: number, initialCount = 0) {
  const [lastLength, setLastLength] = useState(number)
  const [difference, setDifference] = useState(initialCount)
  useEffect(() => {
    setDifference(number - lastLength)
    setLastLength(number)
  }, [number])
  return difference
}
