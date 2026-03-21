'use client'

import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    // Grid config
    const cellSize = 60
    // Drift speed in px/s — very slow
    const driftX = 8
    const driftY = 6
    let offsetX = 0
    let offsetY = 0
    let lastTime = performance.now()

    const drawGrid = (ts: number) => {
      const delta = (ts - lastTime) / 1000
      lastTime = ts

      offsetX = (offsetX + driftX * delta) % cellSize
      offsetY = (offsetY + driftY * delta) % cellSize

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)'
      ctx.lineWidth = 0.5

      // Vertical lines
      for (let x = -offsetX; x < canvas.width + cellSize; x += cellSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = -offsetY; y < canvas.height + cellSize; y += cellSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      requestAnimationFrame(drawGrid)
    }

    const raf = requestAnimationFrame(drawGrid)

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}
