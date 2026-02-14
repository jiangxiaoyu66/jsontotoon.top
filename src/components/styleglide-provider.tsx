"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    StyleGlide?: { init: () => void }
  }
}

export function StyleGlideProvider() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.StyleGlide) {
      window.StyleGlide.init()
    }
  }, [])

  return null
}
