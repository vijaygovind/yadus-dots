import { Buddy } from '../components/Buddy/Buddy'
import { PuzzleCard } from '../components/PuzzleCard/PuzzleCard'
import { puzzles } from '../data/puzzles'
import type { Puzzle } from '../types/puzzle'

interface GalleryScreenProps {
  completedPuzzles: string[]
  dotLevel: 'easy' | 'hard'
  buddyEnabled: boolean
  motionEnabled: boolean
  onSelectPuzzle: (puzzle: Puzzle) => void
}

export function GalleryScreen({
  completedPuzzles,
  dotLevel,
  buddyEnabled,
  motionEnabled,
  onSelectPuzzle,
}: GalleryScreenProps) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800">Yadu&apos;s Dots</h1>
        <p className="mt-2 text-lg text-slate-600">
          Connect with Buddy! · {dotLevel === 'easy' ? '1–10 dots' : '1–20 dots'}
        </p>
      </header>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {puzzles.map((puzzle) => (
          <PuzzleCard
            key={puzzle.id}
            puzzle={puzzle}
            completed={completedPuzzles.includes(puzzle.id)}
            onSelect={() => onSelectPuzzle(puzzle)}
            motionEnabled={motionEnabled}
          />
        ))}
      </div>

      {buddyEnabled && (
        <div className="mt-8 flex justify-center">
          <Buddy
            expression="waving"
            message="Pick a picture, Yadu!"
            size="sm"
            position="center"
            motionEnabled={motionEnabled}
          />
        </div>
      )}
    </div>
  )
}
