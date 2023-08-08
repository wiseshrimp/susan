import { useGlitch } from 'react-powerglitch'
import Desktop from './Desktop'
import './container.css'
import { useEffect, useRef, useState } from 'react'

const glitchOptions = {
    "createContainers": true,
    "hideOverflow": false,
    "timing": {
      "duration": 1650
    },
    "glitchTimeSpan": {
      "start": 0.05,
      "end": 0.7
    },
    "shake": {
      "velocity": 15,
      "amplitudeX": 0.2,
      "amplitudeY": 0.2
    },
    "slice": {
      "count": 10,
      "velocity": 15,
      "minHeight": 0.02,
      "maxHeight": 0.15,
      "hueRotate": true
    },
    "pulse": false
  }

const DesktopContainer = () => {
    const glitch = useGlitch(glitchOptions)
    const [isGlitching, setGlitch] = useState(false)

    const startGlitch = () => {
        setGlitch(true)
    }

    const stopGlitch = () => {
        setGlitch(false)
    }

    const ref = useRef()

    useEffect(() => {
        glitch.stopGlitch()
    }, [])

    return (
        <div className='desktop-container' ref={!isGlitching ? ref : glitch.ref}>
            <Desktop isGlitching={isGlitching} startGlitch={startGlitch} stopGlitch={stopGlitch} />
        </div>
    )
}

export default DesktopContainer
