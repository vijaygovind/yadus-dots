import type { Dot } from '../types/puzzle'

const VIEWBOX_SIZE = 100

export function distanceBetweenDots(a: Dot, b: Dot, svgWidth: number): number {
  const dx = ((a.x - b.x) / VIEWBOX_SIZE) * svgWidth
  const dy = ((a.y - b.y) / VIEWBOX_SIZE) * svgWidth
  return Math.hypot(dx, dy)
}

export function isWithinSnapRadius(
  pointerX: number,
  pointerY: number,
  dot: Dot,
  svgRect: DOMRect,
  snapRadiusPx = 40,
): boolean {
  const dotPxX = svgRect.left + (dot.x / VIEWBOX_SIZE) * svgRect.width
  const dotPxY = svgRect.top + (dot.y / VIEWBOX_SIZE) * svgRect.height
  return Math.hypot(pointerX - dotPxX, pointerY - dotPxY) <= snapRadiusPx
}

export function pointerToViewBox(
  clientX: number,
  clientY: number,
  svgRect: DOMRect,
): { x: number; y: number } {
  const x = ((clientX - svgRect.left) / svgRect.width) * VIEWBOX_SIZE
  const y = ((clientY - svgRect.top) / svgRect.height) * VIEWBOX_SIZE
  return { x, y }
}

export function dotToPixel(dot: Dot, svgRect: DOMRect): { x: number; y: number } {
  return {
    x: (dot.x / VIEWBOX_SIZE) * svgRect.width,
    y: (dot.y / VIEWBOX_SIZE) * svgRect.height,
  }
}
