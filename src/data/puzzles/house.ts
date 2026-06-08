import type { Puzzle } from '../../types/puzzle'

export const housePuzzle: Puzzle = {
  id: 'house',
  label: 'House',
  fillColor: '#E67E22',
  outlinePath:
    'M 50,15 L 85,45 L 85,85 L 15,85 L 15,45 Z M 40,85 L 40,60 L 60,60 L 60,85',
  previewPath: 'M 50,20 L 80,50 L 80,85 L 20,85 L 20,50 Z',
  levels: {
    easy: {
      dots: [
        { n: 1, x: 50, y: 15 },
        { n: 2, x: 70, y: 32 },
        { n: 3, x: 85, y: 45 },
        { n: 4, x: 85, y: 65 },
        { n: 5, x: 85, y: 85 },
        { n: 6, x: 60, y: 85 },
        { n: 7, x: 60, y: 60 },
        { n: 8, x: 40, y: 60 },
        { n: 9, x: 40, y: 85 },
        { n: 10, x: 15, y: 45 },
      ],
    },
    hard: {
      dots: [
        { n: 1, x: 50, y: 15 },
        { n: 2, x: 60, y: 24 },
        { n: 3, x: 70, y: 32 },
        { n: 4, x: 78, y: 40 },
        { n: 5, x: 85, y: 45 },
        { n: 6, x: 85, y: 55 },
        { n: 7, x: 85, y: 65 },
        { n: 8, x: 85, y: 75 },
        { n: 9, x: 85, y: 85 },
        { n: 10, x: 72, y: 85 },
        { n: 11, x: 60, y: 85 },
        { n: 12, x: 60, y: 72 },
        { n: 13, x: 60, y: 60 },
        { n: 14, x: 40, y: 60 },
        { n: 15, x: 40, y: 72 },
        { n: 16, x: 40, y: 85 },
        { n: 17, x: 28, y: 85 },
        { n: 18, x: 15, y: 85 },
        { n: 19, x: 15, y: 65 },
        { n: 20, x: 15, y: 45 },
      ],
    },
  },
}
