import type { Puzzle } from '../../types/puzzle'

export const treePuzzle: Puzzle = {
  id: 'tree',
  label: 'Tree',
  fillColor: '#2ECC71',
  outlinePath:
    'M 50,12 L 72,48 L 62,48 L 78,72 L 58,72 L 65,88 L 35,88 L 42,72 L 22,72 L 38,48 L 28,48 Z M 42,88 L 42,95 L 58,95 L 58,88 Z',
  previewPath: 'M 50,15 L 70,70 L 30,70 Z',
  levels: {
    easy: {
      dots: [
        { n: 1, x: 50, y: 12 },
        { n: 2, x: 62, y: 32 },
        { n: 3, x: 72, y: 48 },
        { n: 4, x: 62, y: 48 },
        { n: 5, x: 78, y: 72 },
        { n: 6, x: 58, y: 72 },
        { n: 7, x: 65, y: 88 },
        { n: 8, x: 50, y: 95 },
        { n: 9, x: 35, y: 88 },
        { n: 10, x: 28, y: 48 },
      ],
    },
    hard: {
      dots: [
        { n: 1, x: 50, y: 12 },
        { n: 2, x: 56, y: 22 },
        { n: 3, x: 62, y: 32 },
        { n: 4, x: 68, y: 40 },
        { n: 5, x: 72, y: 48 },
        { n: 6, x: 68, y: 48 },
        { n: 7, x: 62, y: 48 },
        { n: 8, x: 70, y: 60 },
        { n: 9, x: 78, y: 72 },
        { n: 10, x: 68, y: 72 },
        { n: 11, x: 58, y: 72 },
        { n: 12, x: 62, y: 80 },
        { n: 13, x: 65, y: 88 },
        { n: 14, x: 58, y: 95 },
        { n: 15, x: 50, y: 95 },
        { n: 16, x: 42, y: 95 },
        { n: 17, x: 35, y: 88 },
        { n: 18, x: 38, y: 80 },
        { n: 19, x: 28, y: 48 },
        { n: 20, x: 38, y: 32 },
      ],
    },
  },
}
