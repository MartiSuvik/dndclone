"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Frame {
  id: number
  image: string
  defaultPos: { x: number; y: number } // Simplified for 2×2
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  isHovered: boolean
  name: string        // added for brand overlay
  website: string     // added for brand link
  description: string // added for hover description
}

interface FrameComponentProps {
  image: string
  width: number | string
  height: number | string
  className?: string
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  showFrame: boolean
  isHovered: boolean
  name: string        // added for brand overlay
  website: string     // added for brand link
  description: string // added for hover description
}

function FrameComponent({
  image,
  width,
  height,
  className = "",
  edgeHorizontal,
  edgeVertical,
  mediaSize,
  showFrame,
  isHovered,
  name,
  website,
  description,
}: FrameComponentProps) {
  // Detect mobile via window width
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768)
    }
  }, [])
  const [tapCount, setTapCount] = useState(0)

  return (
    <div
      className={`relative ${className}`}
      style={{ width, height, transition: "width 0.3s ease-in-out, height 0.3s ease-in-out" }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 1, transition: "all 0.3s ease-in-out" }}
        >
          <div
            className="w-full h-full overflow-hidden"
            style={{
              transform: `scale(${mediaSize})`,
              transformOrigin: "center",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <img className="w-full h-full object-cover" src={image} alt="" />
          </div>
        </div>
      </div>
      {/* Overlay with conditional behavior for mobile (tap-based) or desktop (hover-based) */}
      <div
        onClick={(e) => {
          e.stopPropagation()
          if (!isMobile && isHovered) {
            window.open(website, "_blank")
          } else if (isMobile) {
            if (tapCount === 0) setTapCount(1)
            else if (tapCount === 1) window.open(website, "_blank")
          }
        }}
        onMouseLeave={() => setTapCount(0)}
        style={{ zIndex: 3 }}
        className={`absolute inset-0 cursor-pointer transition-colors ${
          isMobile
            ? tapCount === 1
              ? "bg-black bg-opacity-50"
              : "bg-black bg-opacity-20"
            : isHovered
            ? "bg-black bg-opacity-50"
            : "bg-black bg-opacity-20"
        }`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none px-4">
          <h2 className="text-xl font-bold">{name}</h2>
          {(isMobile ? tapCount >= 1 : isHovered || tapCount >= 1) && (
            <>
              <p className="mt-2 text-sm text-center px-4 py-2 max-w-md">{description}</p>
              <span className="mt-1 text-s text-gray-300 italic">Click to visit</span>
            </>
          )}
        </div>
      </div>
      {showFrame && (
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          {/* Edges */}
          <div
            className="absolute top-0 left-16 right-16 h-16"
            style={{
              backgroundImage: `url(${edgeHorizontal})`,
              backgroundSize: "auto 64px",
              backgroundRepeat: "repeat-x",
            }}
          />
          <div
            className="absolute bottom-0 left-16 right-16 h-16"
            style={{
              backgroundImage: `url(${edgeHorizontal})`,
              backgroundSize: "auto 64px",
              backgroundRepeat: "repeat-x",
              transform: "rotate(180deg)",
            }}
          />
          <div
            className="absolute left-0 top-16 bottom-16 w-16"
            style={{
              backgroundImage: `url(${edgeVertical})`,
              backgroundSize: "64px auto",
              backgroundRepeat: "repeat-y",
            }}
          />
          <div
            className="absolute right-0 top-16 bottom-16 w-16"
            style={{
              backgroundImage: `url(${edgeVertical})`,
              backgroundSize: "64px auto",
              backgroundRepeat: "repeat-y",
              transform: "scaleX(-1)",
            }}
          />
        </div>
      )}
    </div>
  )
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  showFrames?: boolean
  hoverSize?: number
  gapSize?: number
}

export function DynamicFrameLayout({
  frames: initialFrames,
  className,
  showFrames = false,
  hoverSize = 2, // Adjust how large the "hovered" row/col becomes
  gapSize = 4,
}: DynamicFrameLayoutProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

  const getRowSizes = () => {
    if (hovered === null) return "1fr 1fr"
    const { row } = hovered
    return row === 0 ? `${hoverSize}fr 1fr` : `1fr ${hoverSize}fr`
  }

  const getColSizes = () => {
    if (hovered === null) return "1fr 1fr"
    const { col } = hovered
    return col === 0 ? `${hoverSize}fr 1fr` : `1fr ${hoverSize}fr`
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : "bottom"
    const horizontal = x === 0 ? "left" : "right"
    return `${vertical} ${horizontal}`
  }

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
          width: "80vw",
          height: "80vh",
        }}
      >
        {initialFrames.map((frame) => {
          const row = frame.defaultPos.y
          const col = frame.defaultPos.x
          const transformOrigin = getTransformOrigin(col, row)

          return (
            <motion.div
              key={frame.id}
              className="relative"
              style={{
                transformOrigin,
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
            >
              <FrameComponent
                image={frame.image}
                width="100%"
                height="100%"
                className="absolute inset-0"
                corner={frame.corner}
                edgeHorizontal={frame.edgeHorizontal}
                edgeVertical={frame.edgeVertical}
                mediaSize={frame.mediaSize}
                borderThickness={frame.borderThickness}
                borderSize={frame.borderSize}
                showFrame={showFrames}
                isHovered={hovered?.row === row && hovered?.col === col}
                name={frame.name}
                website={frame.website}
                description={frame.description}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
