import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateEvenlyDistributedPositions(
  count: number,
  canvasWidth: number,
  canvasHeight: number,
  cardWidth: number,
  cardHeight: number,
): { x: number; y: number }[] {
  if (count === 0) return []

  const positions: { x: number; y: number }[] = []
  const cols = Math.min(count, 4) 
  const horizontalPadding = 20
  const verticalPadding = 20 
  const availableWidth = canvasWidth - (2 * horizontalPadding)
  const horizontalSpacing = cols > 1 ? (availableWidth - (cols * cardWidth)) / (cols - 1) : 0
  const minHorizontalSpacing = 20
  const actualHorizontalSpacing = Math.max(horizontalSpacing, minHorizontalSpacing)
  
  for (let col = 0; col < cols; col++) {
    const x = horizontalPadding + col * (cardWidth + actualHorizontalSpacing)
    const y = verticalPadding
    
    // Ensure positions stay within canvas bounds
    const clampedX = Math.max(0, Math.min(canvasWidth - cardWidth, x))
    const clampedY = Math.max(0, Math.min(canvasHeight - cardHeight, y))
    
    positions.push({ x: clampedX, y: clampedY })
  }

  return positions
}


