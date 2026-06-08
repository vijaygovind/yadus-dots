import { motion } from 'framer-motion'
import { Buddy } from '../Buddy/Buddy'

interface CelebrationProps {
  puzzleLabel: string
  fillColor: string
  outlinePath: string
  motionEnabled?: boolean
  onPlayAgain: () => void
  onNextPicture: () => void
}

const CONFETTI_COLORS = ['#FF6B6B', '#FECA57', '#48DBFB', '#FF9FF3', '#1DD1A1', '#5F27CD']

function ConfettiPiece({ index, motionEnabled }: { index: number; motionEnabled: boolean }) {
  const left = 10 + (index * 7) % 80
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length]
  const delay = (index % 5) * 0.1

  if (!motionEnabled) return null

  return (
    <motion.div
      className="pointer-events-none absolute top-0 h-3 w-2 rounded-sm"
      style={{ left: `${left}%`, backgroundColor: color }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{ y: 400, opacity: 0, rotate: 360 }}
      transition={{ duration: 2.5, delay, ease: 'easeOut' }}
    />
  )
}

export function Celebration({
  puzzleLabel,
  fillColor,
  outlinePath,
  motionEnabled = true,
  onPlayAgain,
  onNextPicture,
}: CelebrationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-sky-playground/90 p-6 backdrop-blur-sm"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <ConfettiPiece key={i} index={i} motionEnabled={motionEnabled} />
      ))}

      <div className="flex max-w-lg flex-col items-center gap-6 rounded-3xl bg-white p-8 shadow-2xl">
        <motion.svg
          viewBox="0 0 100 100"
          className="h-48 w-48"
          initial={motionEnabled ? { scale: 0.5, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <motion.path
            d={outlinePath}
            fill={fillColor}
            stroke={fillColor}
            strokeWidth="2"
            initial={{ fillOpacity: 0 }}
            animate={{ fillOpacity: 0.85 }}
            transition={{ duration: 0.8 }}
          />
        </motion.svg>

        <Buddy
          expression="cheering"
          message={`Yay Yadu! It's a ${puzzleLabel}!`}
          size="lg"
          position="center"
          motionEnabled={motionEnabled}
        />

        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={onPlayAgain}
            className="rounded-full bg-pastel-yellow px-8 py-4 text-lg font-bold text-slate-700 shadow-md transition hover:brightness-105"
          >
            Play again?
          </button>
          <button
            type="button"
            onClick={onNextPicture}
            className="rounded-full bg-pastel-green px-8 py-4 text-lg font-bold text-slate-700 shadow-md transition hover:brightness-105"
          >
            Next picture?
          </button>
        </div>
      </div>
    </motion.div>
  )
}
