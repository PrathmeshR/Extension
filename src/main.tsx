import axios from "axios"
import React, { useState } from "react"

import "tailwindcss/tailwind.css"
import "style.css"

const Finder = () => {
  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const popupStyle = {
    width: "500px",
    height: "500px"
  }

  const fetchLocation = async () => {
    setIsLoading(true)
    // Fetch location here (IP API and ipinfo.io)
    // Once fetched, set location and setIsLoading(false)

    try {
      const response = await axios.get("https://api64.ipify.org?format=json")
      const ipAddress = response.data.ip

      // Now call a function to fetch the country and city based on ipAddress
      const { country, city } = await getCountryAndCity(ipAddress)

      // Create a string with HTML tags for styling
      const locationText = `
      Your Country is ${country} and City is ${city}
      `

      // Set the location with the formatted HTML string
      setLocation(locationText)
    } catch (error) {
      console.error("Error fetching IP address:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      style={popupStyle}
      className="plasmo-flex plasmo-flex-col plasmo-bg-indigo-800	 plasmo-rounded-md container plasmo-p-6 plasmo-justify-center plasmo-items-center ">
      <div className="plasmo-text-white plasmo-text-center plasmo-pt-4 plasmo-fixed plasmo-top-0 plasmo-left-0 plasmo-right-0 plasmo-font-bold plasmo-text-2xl mb-4 plasmo-bg-blue-500 plasmo-p-4">
        Location Finder
      </div>
      {location && (
        <p className="plasmo-mt-4 plasmo-mb-14 plasmo-text-center plasmo-text-white plasmo-font-bold plasmo-text-xl ">
          {location}
        </p>
      )}
      <button
        className={`  plasmo-py-4 plasmo-px-8 plasmo-mt-8 plasmo-rounded plasmo-font-bold plasmo-text-lg ${
          isLoading
            ? "plasmo-bg-blue-700 plasmo-text-white"
            : "plasmo-bg-blue-700 hover:plasmo-bg-black plasmo-text-white"
        }`}
        onClick={fetchLocation}
        disabled={isLoading}>
        {isLoading ? "Loading..." : "Click Me For Location"}
      </button>
    </div>
  )
}

async function getCountryAndCity(ipAddress) {
  try {
    const response = await axios.get(
      `https://ipinfo.io/${ipAddress}/json?token=082c0f42cd8807`
    )
    const { country, city } = response.data
    return { country, city }
  } catch (error) {
    console.error("Error fetching country and city:", error)
  }
}

export default Finder
