"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"
import { motion } from "framer-motion"
import { useGrayscaleStore } from "@/lib/store"

const colorfulColors = [
  "#000000",
  "#808080",
  "#800000",
  "#808000",
  "#008000",
  "#008080",
  "#000080",
  "#800080",
  "#808040",
  "#004040",
  "#0080FF",
  "#004080",
  "#8000FF",
  "#804000",
  "#FFFFFF",
  "#C0C0C0",
  "#FF0000",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FF00FF",
  "#FFFF80",
  "#80FFFF",
  "#FF8080",
  "#FF8040",
  "#80FF80",
  "#40FF80",
  "#8080FF",
  "#8040FF",
  "#FF0080",
  "#FF4080",
]

const grayscaleColors = ["#000000", "#FFFFFF", "#808080", "#C0C0C0"]

export function MSPaintCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentTool, setCurrentTool] = useState("brush")
  const [currentColor, setCurrentColor] = useState("#000000")

  const { isGrayscaleEnabled } = useGrayscaleStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      // Set white background
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw the main text in MS Paint style
      drawMainText(ctx)
    }

    const drawMainText = (ctx: CanvasRenderingContext2D) => {
      const rect = canvas.getBoundingClientRect()

      // Main text
      ctx.font = "bold 24px Arial, sans-serif"
      ctx.fillStyle = isGrayscaleEnabled ? "#000000" : "#FF0000"
      ctx.textAlign = "center"
      ctx.fillText("I MAKE GOOD UI", rect.width / 2, rect.height / 2 - 5)

      // Add some MS Paint style decorations
      ctx.fillStyle = isGrayscaleEnabled ? "#808080" : "#0000FF"
      ctx.fillRect(30, 30, 12, 12)

      ctx.fillStyle = isGrayscaleEnabled ? "#C0C0C0" : "#00FF00"
      ctx.beginPath()
      ctx.arc(rect.width - 50, 40, 8, 0, 2 * Math.PI)
      ctx.fill()

      ctx.strokeStyle = isGrayscaleEnabled ? "#000000" : "#FFFF00"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(30, rect.height - 50)
      ctx.lineTo(80, rect.height - 30)
      ctx.stroke()
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [isGrayscaleEnabled])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineCap = "round"

    if (currentTool === "brush") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = currentColor
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    } else if (currentTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.beginPath()
      ctx.fill()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.beginPath()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Redraw main text
    const rect = canvas.getBoundingClientRect()
    ctx.font = "bold 24px Arial, sans-serif"
    ctx.fillStyle = isGrayscaleEnabled ? "#000000" : "#FF0000"
    ctx.textAlign = "center"
    ctx.fillText("I MAKE GOOD UI", rect.width / 2, rect.height / 2 - 5)
  }

  const availableColors = isGrayscaleEnabled ? grayscaleColors : colorfulColors

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        filter: isGrayscaleEnabled ? "grayscale(100%)" : "grayscale(0%)",
        transition: "filter 0.5s ease-in-out",
      }}
    >
      {/* MS Paint Window */}
      <div
        className="bg-gray-300 border-2 border-gray-400 shadow-lg"
        style={{
          borderStyle: "outset",
          borderWidth: "2px",
        }}
      >
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white px-2 py-1 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white flex items-center justify-center text-xs">🎨</div>
            <span className="font-bold">untitled - Paint</span>
          </div>
          <div className="flex gap-1">
            <button className="w-4 h-4 bg-gray-300 text-black text-xs flex items-center justify-center hover:bg-gray-400">
              _
            </button>
            <button className="w-4 h-4 bg-gray-300 text-black text-xs flex items-center justify-center hover:bg-gray-400">
              □
            </button>
            <button className="w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600">
              ×
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="bg-gray-200 border-b border-gray-400 px-2 py-1">
          <div className="flex gap-4 text-sm">
            {["File", "Edit", "View", "Image", "Colors", "Help"].map((menu) => (
              <button key={menu} className="px-2 py-1 hover:bg-blue-600 hover:text-white rounded-sm">
                {menu}
              </button>
            ))}
          </div>
        </div>

        {/* Tools and Canvas Area */}
        <div className="bg-gray-200 p-1">
          {/* Tool Palette - Moved up and more compact */}
          <div className="flex gap-2 mb-2 flex-wrap">
            <div className="flex gap-1">
              {/* Selection Tool */}
              <button
                onClick={() => setCurrentTool("select")}
                className={`w-6 h-6 border border-gray-400 flex items-center justify-center text-xs hover:bg-gray-300 ${
                  currentTool === "select" ? "bg-blue-200 border-blue-500" : "bg-white"
                }`}
                style={{ borderStyle: "inset" }}
                title="Select"
              >
                ⬚
              </button>

              {/* Eraser */}
              <button
                onClick={() => setCurrentTool("eraser")}
                className={`w-6 h-6 border border-gray-400 flex items-center justify-center text-xs hover:bg-gray-300 ${
                  currentTool === "eraser" ? "bg-blue-200 border-blue-500" : "bg-white"
                }`}
                style={{ borderStyle: "inset" }}
                title="Eraser"
              >
                🧽
              </button>

              {/* Brush */}
              <button
                onClick={() => setCurrentTool("brush")}
                className={`w-6 h-6 border border-gray-400 flex items-center justify-center text-xs hover:bg-gray-300 ${
                  currentTool === "brush" ? "bg-blue-200 border-blue-500" : "bg-white"
                }`}
                style={{ borderStyle: "inset" }}
                title="Brush"
              >
                🖌️
              </button>

              {/* Line */}
              <button
                onClick={() => setCurrentTool("line")}
                className={`w-6 h-6 border border-gray-400 flex items-center justify-center text-xs hover:bg-gray-300 ${
                  currentTool === "line" ? "bg-blue-200 border-blue-500" : "bg-white"
                }`}
                style={{ borderStyle: "inset" }}
                title="Line"
              >
                /
              </button>

              {/* Rectangle */}
              <button
                onClick={() => setCurrentTool("rectangle")}
                className={`w-6 h-6 border border-gray-400 flex items-center justify-center text-xs hover:bg-gray-300 ${
                  currentTool === "rectangle" ? "bg-blue-200 border-blue-500" : "bg-white"
                }`}
                style={{ borderStyle: "inset" }}
                title="Rectangle"
              >
                ▭
              </button>

              {/* Ellipse */}
              <button
                onClick={() => setCurrentTool("ellipse")}
                className={`w-6 h-6 border border-gray-400 flex items-center justify-center text-xs hover:bg-gray-300 ${
                  currentTool === "ellipse" ? "bg-blue-200 border-blue-500" : "bg-white"
                }`}
                style={{ borderStyle: "inset" }}
                title="Ellipse"
              >
                ⭕
              </button>
            </div>

            {/* Color Selection */}
            <div className="flex items-center gap-2 ml-4">
              <div className="flex gap-1">
                {availableColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentColor(color)}
                    className={`w-5 h-5 border border-gray-600 hover:border-black ${
                      currentColor === color ? "border-2 border-black" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>

              {/* Clear Button */}
              <button
                onClick={clearCanvas}
                className="px-2 py-1 bg-gray-300 border border-gray-400 text-xs hover:bg-gray-400 ml-2"
                style={{ borderStyle: "outset" }}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Canvas Area - Reduced height */}
          <div className="bg-white border-2 border-gray-500" style={{ borderStyle: "inset" }}>
            <canvas
              ref={canvasRef}
              className="w-full h-48 md:h-56 lg:h-64 cursor-crosshair block"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-200 border-t border-gray-400 px-2 py-1 text-xs flex justify-between">
          <span>
            {isGrayscaleEnabled ? "Grayscale Mode" : "Color Mode"}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
