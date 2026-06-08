import { motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import type { Dot, Puzzle } from '../../types/puzzle'
import { DOT_COLORS } from '../../types/puzzle'
import { isWithinSnapRadius, pointerToViewBox } from '../../lib/geometry'

interface DotCanvasProps {
  puzzle: Puzzle
  dots: Dot[]
  segments: Array<{ from: Dot; to: Dot }>
  expectedNext: number
  nextDot: Dot | null
  wrongDotN: number | null
  highlightNext: boolean
  isComplete: boolean
  motionEnabled?: boolean
  onConnect: (dot: Dot) => boolean
  onWrongAttempt: () => void
}

export function DotCanvas({
  puzzle,
  dots,
  segments,
  expectedNext,
  nextDot,
  wrongDotN,
  highlightNext,
  isComplete,
  motionEnabled = true,
  onConnect,
  onWrongAttempt,
}: DotCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dragLine, setDragLine] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const lastConnected = dots.find((d) => d.n === expectedNext - 1) ?? null

  const handleDotClick = useCallback(
    (dot: Dot) => {
      const success = onConnect(dot)
      if (!success) onWrongAttempt()
    },
    [onConnect, onWrongAttempt],
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, dot: Dot) => {
      if (isComplete) return

      if (dot.n === expectedNext) {
        handleDotClick(dot)
        return
      }

      if (lastConnected && dot.n === lastConnected.n) {
        setIsDragging(true)
        ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
        return
      }

      handleDotClick(dot)
    },
    [expectedNext, handleDotClick, isComplete, lastConnected],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      const pos = pointerToViewBox(e.clientX, e.clientY, rect)
      setDragLine(pos)
    },
    [isDragging],
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !svgRef.current || !nextDot) {
        setIsDragging(false)
        setDragLine(null)
        return
      }

      const rect = svgRef.current.getBoundingClientRect()
      const snapped = isWithinSnapRadius(e.clientX, e.clientY, nextDot, rect)

      if (snapped) {
        const success = onConnect(nextDot)
        if (!success) onWrongAttempt()
      } else {
        onWrongAttempt()
      }

      setIsDragging(false)
      setDragLine(null)
    },
    [isDragging, nextDot, onConnect, onWrongAttempt],
  )

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        className="aspect-square w-full touch-none rounded-3xl bg-white shadow-xl"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <path
          d={puzzle.outlinePath}
          fill={isComplete ? puzzle.fillColor : 'none'}
          fillOpacity={isComplete ? 0.85 : 0}
          stroke={puzzle.fillColor}
          strokeWidth="0.5"
          strokeOpacity={0.2}
          className="transition-all duration-700"
        />

        {segments.map((seg, i) => (
          <line
            key={`seg-${i}`}
            x1={seg.from.x}
            y1={seg.from.y}
            x2={seg.to.x}
            y2={seg.to.y}
            stroke="#F5C842"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        ))}

        {isDragging && lastConnected && dragLine && (
          <line
            x1={lastConnected.x}
            y1={lastConnected.y}
            x2={dragLine.x}
            y2={dragLine.y}
            stroke="#F5C842"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="2 1"
            opacity={0.8}
          />
        )}

        {dots.map((dot) => {
          const isConnected = dot.n < expectedNext
          const isNext = dot.n === expectedNext
          const isWrong = dot.n === wrongDotN
          const shouldHighlight = isNext && highlightNext
          const baseRadius = isNext && shouldHighlight ? 3.8 : isNext ? 3.2 : 2.8
          const color = DOT_COLORS[(dot.n - 1) % DOT_COLORS.length]

          return (
            <g key={dot.n}>
              <motion.circle
                cx={dot.x}
                cy={dot.y}
                r={baseRadius}
                fill={isConnected ? color : 'white'}
                stroke={color}
                strokeWidth="0.6"
                animate={
                  isWrong && motionEnabled
                    ? { x: [0, -1.5, 1.5, -1.5, 1.5, 0] }
                    : isNext && motionEnabled
                      ? { scale: [1, 1.15, 1] }
                      : {}
                }
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: `${dot.x}px ${dot.y}px` }}
                className="cursor-pointer"
                onPointerDown={(e) => handlePointerDown(e, dot)}
              />
              <text
                x={dot.x}
                y={dot.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={isNext ? '3.2' : '2.8'}
                fontWeight="bold"
                fill={isConnected ? 'white' : color}
                className="pointer-events-none select-none"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                {dot.n}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
