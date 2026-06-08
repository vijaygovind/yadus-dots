import type { Puzzle } from '../../types/puzzle'
import { carPuzzle } from './car'
import { catPuzzle } from './cat'
import { flowerPuzzle } from './flower'
import { hatPuzzle } from './hat'
import { housePuzzle } from './house'
import { treePuzzle } from './tree'

export const puzzles: Puzzle[] = [
  catPuzzle,
  hatPuzzle,
  flowerPuzzle,
  treePuzzle,
  carPuzzle,
  housePuzzle,
]

export function getPuzzleById(id: string): Puzzle | undefined {
  return puzzles.find((p) => p.id === id)
}
