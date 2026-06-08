export type DotLevel = 'easy' | 'hard'

export interface Dot {
  n: number
  x: number
  y: number
}

export interface PuzzleLevel {
  dots: Dot[]
}

export interface Puzzle {
  id: string
  label: string
  fillColor: string
  outlinePath: string
  previewPath: string
  levels: Record<DotLevel, PuzzleLevel>
}

export interface AppSettings {
  soundEnabled: boolean
  buddyEnabled: boolean
  dotLevel: DotLevel
  calmMode: boolean
}

export const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  buddyEnabled: true,
  dotLevel: 'easy',
  calmMode: false,
}

export const DOT_COLORS = [
  '#FF6B6B',
  '#FF9F43',
  '#FECA57',
  '#48DBFB',
  '#1DD1A1',
  '#5F27CD',
  '#FF9FF3',
  '#54A0FF',
  '#00D2D3',
  '#FF6348',
  '#2ED573',
  '#FFA502',
  '#70A1FF',
  '#FF4757',
  '#7BED9F',
  '#5352ED',
  '#FF7F50',
  '#2F3542',
  '#A3CB38',
  '#FDA7DF',
] as const
