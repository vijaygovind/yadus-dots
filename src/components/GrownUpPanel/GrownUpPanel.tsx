import { AnimatePresence, motion } from 'framer-motion'
import type { AppSettings, DotLevel } from '../../types/puzzle'

interface GrownUpPanelProps {
  open: boolean
  settings: AppSettings
  onClose: () => void
  onUpdate: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void
  onReset: () => void
  showReset?: boolean
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label className="flex items-center justify-between gap-4 py-2">
      <span className="font-semibold text-slate-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-8 w-14 rounded-full transition-colors ${
          checked ? 'bg-pastel-green' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            checked ? 'left-7' : 'left-1'
          }`}
        />
      </button>
    </label>
  )
}

export function GrownUpPanel({
  open,
  settings,
  onClose,
  onUpdate,
  onReset,
  showReset = false,
}: GrownUpPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Grown-up Settings</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col divide-y divide-slate-100">
              <ToggleRow
                label="Sound"
                checked={settings.soundEnabled}
                onChange={(v) => onUpdate('soundEnabled', v)}
              />
              <ToggleRow
                label="Buddy"
                checked={settings.buddyEnabled}
                onChange={(v) => onUpdate('buddyEnabled', v)}
              />
              <ToggleRow
                label="Calm mode"
                checked={settings.calmMode}
                onChange={(v) => onUpdate('calmMode', v)}
              />

              <div className="py-4">
                <p className="mb-3 font-semibold text-slate-700">Dot count</p>
                <div className="flex gap-3">
                  {(['easy', 'hard'] as DotLevel[]).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => onUpdate('dotLevel', level)}
                      className={`flex-1 rounded-2xl px-4 py-3 font-bold transition ${
                        settings.dotLevel === level
                          ? 'bg-pastel-purple text-slate-800 shadow-md'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {level === 'easy' ? 'Easy (1–10)' : 'More dots (1–20)'}
                    </button>
                  ))}
                </div>
              </div>

              {showReset && (
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={onReset}
                    className="w-full rounded-2xl bg-pastel-orange px-4 py-3 font-bold text-slate-700 hover:brightness-105"
                  >
                    Reset puzzle
                  </button>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
