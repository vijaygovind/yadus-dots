import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_SETTINGS, type AppSettings, type DotLevel } from '../types/puzzle'

const SETTINGS_KEY = 'yadus-dots-settings'
const COMPLETED_KEY = 'yadus-dots-completed'

function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

function loadCompleted(): string[] {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY)
    if (!raw) return []
    return JSON.parse(raw) as string[]
  } catch {
    return []
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings)
  const [completedPuzzles, setCompletedPuzzles] = useState<string[]>(loadCompleted)

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completedPuzzles))
  }, [completedPuzzles])

  const updateSetting = useCallback(<K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const markCompleted = useCallback((puzzleId: string) => {
    setCompletedPuzzles((prev) => (prev.includes(puzzleId) ? prev : [...prev, puzzleId]))
  }, [])

  const setDotLevel = useCallback((dotLevel: DotLevel) => {
    updateSetting('dotLevel', dotLevel)
  }, [updateSetting])

  return {
    settings,
    completedPuzzles,
    updateSetting,
    setDotLevel,
    markCompleted,
    isCompleted: (puzzleId: string) => completedPuzzles.includes(puzzleId),
  }
}
