import { useCallback, useEffect, useState } from 'react'
import { Buddy, type BuddyExpression } from '../components/Buddy/Buddy'
import { Celebration } from '../components/Celebration/Celebration'
import { DotCanvas } from '../components/DotCanvas/DotCanvas'
import { FeedbackToast } from '../components/FeedbackToast/FeedbackToast'
import { playBoopSound, playCelebrationJingle, playConnectSound, resumeAudioContext } from '../lib/audio'
import { usePuzzleState } from '../hooks/usePuzzleState'
import type { DotLevel, Puzzle } from '../types/puzzle'

interface PuzzleScreenProps {
  puzzle: Puzzle
  dotLevel: DotLevel
  soundEnabled: boolean
  buddyEnabled: boolean
  motionEnabled: boolean
  onBack: () => void
  onComplete: (puzzleId: string) => void
  onResetRequest?: () => void
  resetKey?: number
}

export function PuzzleScreen({
  puzzle,
  dotLevel,
  soundEnabled,
  buddyEnabled,
  motionEnabled,
  onBack,
  onComplete,
  resetKey = 0,
}: PuzzleScreenProps) {
  const {
    dots,
    expectedNext,
    segments,
    isComplete,
    wrongDotN,
    highlightNext,
    nextDot,
    connectDot,
    reset,
  } = usePuzzleState(puzzle, dotLevel)

  const [buddyExpression, setBuddyExpression] = useState<BuddyExpression>('waving')
  const [buddyMessage, setBuddyMessage] = useState(`Let's draw a ${puzzle.label}!`)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    reset()
    setShowCelebration(false)
    setBuddyExpression('waving')
    setBuddyMessage(`Let's draw a ${puzzle.label}!`)
    setFeedbackMessage(null)
  }, [puzzle.id, dotLevel, resetKey, reset])

  useEffect(() => {
    if (isComplete && !showCelebration) {
      setShowCelebration(true)
      if (soundEnabled) playCelebrationJingle()
      onComplete(puzzle.id)
    }
  }, [isComplete, showCelebration, soundEnabled, onComplete, puzzle.id])

  const handleConnect = useCallback(
    (dot: Parameters<typeof connectDot>[0]) => {
      void resumeAudioContext()
      const success = connectDot(dot)
      if (success) {
        if (soundEnabled) playConnectSound()
        setBuddyExpression('idle')
        setBuddyMessage('')
        setFeedbackMessage(null)
      }
      return success
    },
    [connectDot, soundEnabled],
  )

  const handleWrongAttempt = useCallback(() => {
    void resumeAudioContext()
    if (soundEnabled) playBoopSound()
    setBuddyExpression('encouraging')
    setBuddyMessage('Try again!')
    if (nextDot) {
      setFeedbackMessage(`Almost! Try ${nextDot.n}`)
    }
    setTimeout(() => {
      setFeedbackMessage(null)
      setBuddyMessage('')
      setBuddyExpression('idle')
    }, 2000)
  }, [nextDot, soundEnabled])

  return (
    <div className="relative mx-auto max-w-2xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full bg-white px-5 py-2 font-bold text-slate-600 shadow hover:bg-slate-50"
        >
          ← Back
        </button>
        <span className="text-lg font-bold text-slate-700">{puzzle.label}</span>
        <span className="w-20" />
      </div>

      <FeedbackToast message={feedbackMessage} motionEnabled={motionEnabled} />

      <DotCanvas
        puzzle={puzzle}
        dots={dots}
        segments={segments}
        expectedNext={expectedNext}
        nextDot={nextDot}
        wrongDotN={wrongDotN}
        highlightNext={highlightNext}
        isComplete={isComplete}
        motionEnabled={motionEnabled}
        onConnect={handleConnect}
        onWrongAttempt={handleWrongAttempt}
      />

      {buddyEnabled && (
        <div className="mt-4 flex justify-end">
          <Buddy
            expression={buddyExpression}
            message={buddyMessage}
            size="sm"
            position="corner"
            motionEnabled={motionEnabled}
          />
        </div>
      )}

      {showCelebration && (
        <Celebration
          puzzleLabel={puzzle.label}
          fillColor={puzzle.fillColor}
          outlinePath={puzzle.outlinePath}
          motionEnabled={motionEnabled}
          onPlayAgain={() => {
            setShowCelebration(false)
            reset()
            setBuddyExpression('waving')
            setBuddyMessage(`Let's draw a ${puzzle.label}!`)
          }}
          onNextPicture={() => {
            setShowCelebration(false)
            onBack()
          }}
        />
      )}
    </div>
  )
}
