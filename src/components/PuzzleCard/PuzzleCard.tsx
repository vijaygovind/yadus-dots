import { motion } from 'framer-motion'
import type { Puzzle } from '../../types/puzzle'

interface PuzzleCardProps {
  puzzle: Puzzle
  completed?: boolean
  onSelect: () => void
  motionEnabled?: boolean
}

export function PuzzleCard({
  puzzle,
  completed = false,
  onSelect,
  motionEnabled = true,
}: PuzzleCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={motionEnabled ? { scale: 1.04, y: -4 } : undefined}
      whileTap={motionEnabled ? { scale: 0.97 } : undefined}
      className="relative flex flex-col items-center gap-3 rounded-3xl bg-white p-5 shadow-md transition-shadow hover:shadow-xl"
    >
      {completed && (
        <span className="absolute right-3 top-3 text-2xl" title="Completed!">
          ⭐
        </span>
      )}
      <svg viewBox="0 0 100 100" className="h-28 w-28">
        <path
          d={puzzle.previewPath}
          fill={puzzle.fillColor}
          fillOpacity={0.35}
          stroke={puzzle.fillColor}
          strokeWidth="2"
        />
      </svg>
      <span className="text-xl font-bold text-slate-700">{puzzle.label}</span>
    </motion.button>
  )
}
