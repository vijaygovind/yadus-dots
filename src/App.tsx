import { useCallback, useState } from 'react'
import { GrownUpPanel } from './components/GrownUpPanel/GrownUpPanel'
import { useMotionEnabled } from './hooks/useReducedMotion'
import { useSettings } from './hooks/useSettings'
import { GalleryScreen } from './screens/GalleryScreen'
import { PuzzleScreen } from './screens/PuzzleScreen'
import type { Puzzle } from './types/puzzle'

type Screen = 'gallery' | 'puzzle'

export default function App() {
  const { settings, completedPuzzles, updateSetting, markCompleted } = useSettings()
  const motionEnabled = useMotionEnabled(settings.calmMode)

  const [screen, setScreen] = useState<Screen>('gallery')
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null)
  const [grownUpOpen, setGrownUpOpen] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const handleSelectPuzzle = useCallback((puzzle: Puzzle) => {
    setSelectedPuzzle(puzzle)
    setScreen('puzzle')
  }, [])

  const handleBack = useCallback(() => {
    setScreen('gallery')
    setSelectedPuzzle(null)
  }, [])

  const handleReset = useCallback(() => {
    setResetKey((k) => k + 1)
  }, [])

  return (
    <div className="min-h-screen">
      <button
        type="button"
        onClick={() => setGrownUpOpen(true)}
        className="fixed right-4 top-4 z-30 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-500 shadow hover:bg-white"
        title="Grown-up settings"
      >
        Grown-up
      </button>

      {screen === 'gallery' && (
        <GalleryScreen
          completedPuzzles={completedPuzzles}
          dotLevel={settings.dotLevel}
          buddyEnabled={settings.buddyEnabled}
          motionEnabled={motionEnabled}
          onSelectPuzzle={handleSelectPuzzle}
        />
      )}

      {screen === 'puzzle' && selectedPuzzle && (
        <PuzzleScreen
          puzzle={selectedPuzzle}
          dotLevel={settings.dotLevel}
          soundEnabled={settings.soundEnabled}
          buddyEnabled={settings.buddyEnabled}
          motionEnabled={motionEnabled}
          onBack={handleBack}
          onComplete={markCompleted}
          resetKey={resetKey}
        />
      )}

      <GrownUpPanel
        open={grownUpOpen}
        settings={settings}
        onClose={() => setGrownUpOpen(false)}
        onUpdate={updateSetting}
        onReset={handleReset}
        showReset={screen === 'puzzle'}
      />
    </div>
  )
}
