import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import Finder from "./main"

import "style.css"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <div className="plasmo-z-50 plasmo-flex plasmo-fixed plasmo-top-32 plasmo-right-8">
      <Finder />
    </div>
  )
}

export default PlasmoOverlay
