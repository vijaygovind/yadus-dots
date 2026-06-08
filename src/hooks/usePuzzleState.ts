import { useCallback, useMemo, useState } from 'react'
import type { Dot, Puzzle } from '../types/puzzle'

export interface PuzzleState {
  expectedNext: number
  connectedDots: Dot[]
  segments: Array<{ from: Dot; to: Dot }>
  isComplete: boolean
  wrongDotN: number | null
  highlightNext: boolean
}

export function usePuzzleState(puzzle: Puzzle, level: 'easy' | 'hard') {
  const dots = useMemo(() => puzzle.levels[level].dots, [puzzle, level])

  const [expectedNext, setExpectedNext] = useState(1)
  const [connectedDots, setConnectedDots] = useState<Dot[]>([])
  const [segments, setSegments] = useState<Array<{ from: Dot; to: Dot }>>([])
  const [wrongDotN, setWrongDotN] = useState<number | null>(null)
  const [highlightNext, setHighlightNext] = useState(false)

  const isComplete = expectedNext > dots.length

  const reset = useCallback(() => {
    setExpectedNext(1)
    setConnectedDots([])
    setSegments([])
    setWrongDotN(null)
    setHighlightNext(false)
  }, [])

  const connectDot = useCallback(
    (dot: Dot) => {
      if (isComplete) return false

      if (dot.n !== expectedNext) {
        setWrongDotN(dot.n)
        setHighlightNext(true)
        setTimeout(() => setWrongDotN(null), 600)
        return false
      }

      const lastDot = connectedDots[connectedDots.length - 1]
      if (lastDot) {
        setSegments((prev) => [...prev, { from: lastDot, to: dot }])
      }

      setConnectedDots((prev) => [...prev, dot])
      setExpectedNext((prev) => prev + 1)
      setHighlightNext(false)
      setWrongDotN(null)
      return true
    },
    [connectedDots, expectedNext, isComplete],
  )

  const nextDot = dots.find((d) => d.n === expectedNext) ?? null

  return {
    dots,
    expectedNext,
    connectedDots,
    segments,
    isComplete,
    wrongDotN,
    highlightNext,
    nextDot,
    connectDot,
    reset,
  }
}
