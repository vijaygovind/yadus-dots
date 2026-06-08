import { motion } from 'framer-motion'

export type BuddyExpression = 'idle' | 'encouraging' | 'cheering' | 'waving'

interface BuddyProps {
  expression?: BuddyExpression
  message?: string
  size?: 'sm' | 'md' | 'lg'
  position?: 'corner' | 'center'
  motionEnabled?: boolean
  className?: string
}

const sizes = {
  sm: 'w-24 h-24',
  md: 'w-36 h-36',
  lg: 'w-48 h-48',
}

export function Buddy({
  expression = 'idle',
  message,
  size = 'md',
  position = 'corner',
  motionEnabled = true,
  className = '',
}: BuddyProps) {
  const bounce = motionEnabled ? { y: [0, -6, 0] } : {}
  const wag = expression === 'cheering' && motionEnabled ? { rotate: [-4, 4, -4] } : {}

  return (
    <div
      className={`flex flex-col items-center gap-2 ${
        position === 'corner' ? 'items-end' : 'items-center'
      } ${className}`}
    >
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-[200px] rounded-2xl bg-white px-4 py-2 text-center text-sm font-bold text-slate-700 shadow-lg"
        >
          {message}
        </motion.div>
      )}
      <motion.div
        animate={{ ...bounce, ...wag }}
        transition={{
          duration: expression === 'cheering' ? 0.4 : 1.2,
          repeat: expression === 'cheering' || expression === 'waving' ? Infinity : 0,
          repeatType: 'reverse',
        }}
        className={sizes[size]}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-md">
          <ellipse cx="50" cy="72" rx="28" ry="8" fill="#00000018" />
          <ellipse cx="50" cy="55" rx="32" ry="30" fill="#E8A838" />
          <ellipse cx="50" cy="58" rx="22" ry="20" fill="#F5D078" />
          <circle cx="38" cy="28" r="14" fill="#E8A838" />
          <circle cx="62" cy="28" r="14" fill="#E8A838" />
          <ellipse cx="38" cy="32" rx="8" ry="10" fill="#C48820" />
          <ellipse cx="62" cy="32" rx="8" ry="10" fill="#C48820" />
          <circle cx="40" cy="52" r="5" fill="#2C1810" />
          <circle cx="60" cy="52" r="5" fill="#2C1810" />
          <circle cx="42" cy="50" r="2" fill="white" />
          <circle cx="62" cy="50" r="2" fill="white" />
          <ellipse cx="50" cy="62" rx="6" ry="4" fill="#C48820" />
          {expression === 'cheering' && (
            <path
              d="M 42,66 Q 50,74 58,66"
              fill="none"
              stroke="#C48820"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
          {expression === 'encouraging' && (
            <path
              d="M 44,66 Q 50,70 56,66"
              fill="none"
              stroke="#C48820"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
          {(expression === 'idle' || expression === 'waving') && (
            <path
              d="M 44,66 Q 50,68 56,66"
              fill="none"
              stroke="#C48820"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
          <motion.ellipse
            cx="78"
            cy="48"
            rx="10"
            ry="7"
            fill="#E8A838"
            animate={
              expression === 'waving' || expression === 'cheering'
                ? { rotate: [0, 20, 0, 20, 0] }
                : {}
            }
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{ transformOrigin: '78px 55px' }}
          />
          {expression === 'cheering' && (
            <>
              <text x="18" y="25" fontSize="14">
                ✨
              </text>
              <text x="72" y="18" fontSize="12">
                ⭐
              </text>
            </>
          )}
        </svg>
      </motion.div>
    </div>
  )
}
