import { AnimatePresence, motion } from 'framer-motion'

interface FeedbackToastProps {
  message: string | null
  motionEnabled?: boolean
}

export function FeedbackToast({ message, motionEnabled = true }: FeedbackToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={motionEnabled ? { opacity: 0, y: -12, scale: 0.9 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={motionEnabled ? { opacity: 0, y: -8 } : undefined}
          className="pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full bg-pastel-pink px-6 py-3 text-lg font-bold text-slate-700 shadow-lg"
        >
          {message} 😊
        </motion.div>
      )}
    </AnimatePresence>
  )
}
