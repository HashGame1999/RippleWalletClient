import React, { useState, useEffect } from 'react'

const FlashNotice = ({ isOpen, message, onClose }) => {
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsFadingOut(true)
        const fadeOutTimer = setTimeout(() => {
          onClose()
          setIsFadingOut(false)
        }, 500)
        return () => clearTimeout(fadeOutTimer)
      }, 2500)
      return () => clearTimeout(timer)
    } else {
      setIsFadingOut(false)
    }
  }, [isOpen, onClose])

  return (
    isOpen && (
      <div
        className={`fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-64 ${isFadingOut ? 'opacity-0 transition-opacity duration-500' : 'opacity-100 transition-opacity duration-500'
          }`}
        role="alert"
      >
        <span className="block sm:inline">{message}</span>
      </div>
    )
  )
}

export default FlashNotice 