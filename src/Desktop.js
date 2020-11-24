import React from 'react'
import Sketch from 'react-p5'
import GlitchClip from 'react-glitch-effect/core/Clip'

import './glitch.css'

import Clock from './Clock'
import Popup from './Popup'
import Photos from './Photos'
import Update from './Update'
import {POPUPS, VIDEOS, VIDEO_LINKS, UPDATE_VIDEOS, SOUNDS} from './constants'
import './App.css'

import Selfie1 from './assets/Selfie1.png'
import Selfie2 from './assets/Selfie2.png'
import Selfie3 from './assets/Selfie3.png'

let NUM_OF_MINUTES = 9

 
const AVATAR_PHOTOS = [
  Selfie1,
  Selfie2,
  Selfie3,
  Selfie2
]

let isDev = false


class Desktop extends React.Component {
  constructor(props) {
    super(props)

    this.desktop = React.createRef()
    this.videoFeed = React.createRef()
    this.openingVideo = React.createRef()
    this.photosOpeningVideo = React.createRef()
    this.emptyRoomVideo = React.createRef()
    this.endEmptyRoomVideo = React.createRef()
    this.privateFolderVideo = React.createRef()
    this.endPrivateVideo = React.createRef()
    this.treeVideo = React.createRef()
    this.battery = React.createRef()
    this.wifi = React.createRef()
    this.finder = React.createRef()
    this.trash = React.createRef()
    this.safariOpening = React.createRef()
    this.safariWork = React.createRef()
    this.safariWorkEnd = React.createRef()
    this.safariBing = React.createRef()
    this.updateNotification0 = React.createRef()
    this.updateNotification1 = React.createRef()
    this.updateNotification2 = React.createRef()
    this.updateNotification3 = React.createRef()
    this.endingSequence = React.createRef()
    this.preUpdate = React.createRef()
    this.glitchOverlay = React.createRef()
    this.startup = React.createRef()
    this.notification = React.createRef()
    this.newSusan = React.createRef()

    this.updateInterval = null
    this.timeInterval = null

    this.state = {
      popups: [],
      hasLoaded: false, // for video play error
      activeVideo: null,
      isDragging: false,
      endClient: [null, null],
      startClient:[null, null],
      isLoading: false,
      isPrivateHidden: false,
      images: [],
      updates: [],
      isFirstScreen: isDev ? false : true,
      isPlayingOpening: false,
      fullscreen: '',
      isDraggingScreen: false,
      isGlitching: false,
      updateCount: 0,
      hasUpdated: false,
      isPlayingClosing: false,
      isMobile:  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isChrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
      minutes: NUM_OF_MINUTES,
      seconds: 0
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onDragStart)
    window.addEventListener('resize', this.onResize)
    if (isDev) {
      setTimeout(this.addUpdate, NUM_OF_MINUTES * 60000)
      this.timeInterval = setInterval(this.updateTime, 1000)
    }
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.videoFeed.current.srcObject = stream
          setTimeout(this.takePhoto, 3000)
          setTimeout(this.takePhoto, 15000)
          setTimeout(this.takePhoto, 20000)
          setTimeout(this.takePhoto, 30000) // TO DO: Stop camera after taking last photo
        })
        .catch(function (err0r) {
          console.log(err0r) // TO DO: Popup error about webcam
        })
    }

  }

  updateTime = ev => {
    let minutes, seconds
    if (!this.state.seconds && !this.state.minutes) {
      clearInterval(this.timeInterval)
      return
    } else if(!this.state.seconds) {
      minutes = this.state.minutes - 1
      seconds = 59
    } else {
      minutes = this.state.minutes
      seconds = this.state.seconds - 1
    }
    this.setState({
      minutes,
      seconds
    })
  }

  addUpdate = ev => {
    if (this.state.isFirstScreen) {
      setTimeout(this.addUpdate, NUM_OF_MINUTES * 60000)
      return
    }
    if (!this.notification.current) return
    this.notification.current.play()
    let id = Date.now()
    this.setState({
      updates: [...this.state.updates, 
        {
          id,
          component: <Update 
            id={id} 
            idx={id} 
            update={this.updateDesktop} 
            isUpdating={this.state.isPlayingClosing}
            willDisappear={this.state.updateCount < 4} setDragging={this.setDragging} />
        }
      ]
    })
    if (this.state.updateCount < 4) {
      this.playVideo(VIDEOS[`updateNotification${this.state.updateCount}`], false)
    }
  }

  updateDesktop = ev => {
    if (this.state.isPlayingClosing) return
    this.desktop.current.style.opacity = 0
    clearInterval(this.updateInterval)
    this.setState({
      isGlitching: false,
      isPlayingClosing: true,
      popups: []
    })
    setTimeout(this.playClosingSequence, 6000)
  }

  playClosingSequence = ev => {
    this.desktop.current.style.opacity = 1
    this.playVideo(VIDEOS.endingSequence, false)
  }

  setDragging = isDraggingScreen => {
    this.setState({
      isDraggingScreen
    })
  }

  addPopup = ev => {
    if (this.state.activeVideo === VIDEOS.updateNotification0 || this.state.updateCount > 0) return
    if (this.state.popups.includes(ev.target.dataset.popup)) {
      if (ev.target.dataset.popup === POPUPS.FULLSCREEN) {
        this.setState({
          fullscreen: ev.target.dataset.img
        })
      } else return
    }
    if (ev.target.dataset.popup === POPUPS.FULLSCREEN) {
      this.setState({
        fullscreen: ev.target.dataset.img,
        popups: [...this.state.popups, ev.target.dataset.popup]
      })
      return
    }
    this.setState({
      popups: [...this.state.popups, ev.target.dataset.popup]
    })
    this.playVideo(ev)
  }

  resetVideo = video => {
    this[video].current.classList.remove('avatar-video')
    this[video].current.classList.add('hidden-video')
    this[video].current.currentTime = 0
    this[video].current.pause()
  }

  takePhoto = ev => {
    if (!this.videoFeed) return
    if (!this.videoFeed.current) return
    var img = document.createElement('img')
    let aImg = document.createElement('img')
    aImg.src = AVATAR_PHOTOS[this.state.images.length]
    aImg.onload = ev => {
      let video = this.videoFeed.current
      var context, canvas
      var width = video.offsetWidth
        , height = video.offsetHeight
  
      canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
  
      context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, width, height)
      
      context.drawImage(aImg, width / 5, height - aImg.height / aImg.width * width, width, aImg.height / aImg.width * width)
  
      img.src = canvas.toDataURL('image/png')
      this.setState({
        images: [...this.state.images, img.src]
      })
    }
  }

  closePopup = (popup, isWork = false) => {

    if (this.state.activeVideo) {
      if (popup !== POPUPS.FULLSCREEN && !UPDATE_VIDEOS.includes(this.state.activeVideo) )
        this.resetVideo(this.state.activeVideo)
    }
    
    if (popup === POPUPS.QUERETARO) {
      this.playVideo(VIDEOS.endEmptyRoomVideo, false)
    }
    else if (popup === POPUPS.PRIVATE) {
      this.playVideo(VIDEOS.endPrivateVideo, false)
    }
    else if (isWork) {
      this.playVideo(VIDEOS.safariWorkEnd, false)
    } 
    else {
      let idx = this.state.popups.findIndex(p => p === popup)
      let popups = this.state.popups.slice()
      popups.splice(idx, 1)
      if (UPDATE_VIDEOS.includes(this.state.activeVideo)) {
        this.setState({
          popups
        })
        return
      }
      this.setState({
        popups,
        activeVideo: null
      })
      return
    }

    let idx = this.state.popups.findIndex(p => p === popup)
    let popups = this.state.popups.slice()
    popups.splice(idx, 1)
    if (UPDATE_VIDEOS.includes(this.state.activeVideo)) {
      this.setState({
        popups
      })
      return
    }
    this.setState({
      popups
    })
  }

  onDrag = ev => {
    if (!this.state.isDragging || this.state.isDraggingScreen) return
    this.setState({
      endClient: [ev.clientX, ev.clientY]
    })
  }

  onDragEnd = ev => {
    if (!this.state.isDragging || this.state.isDraggingScreen) return
    document.removeEventListener('mousemove', this.onDrag)
    document.removeEventListener('mouseup', this.onDragEnd)

    this.setState({
      isDragging: false,
      endClient: [null, null],
      startClient:[null, null]
    })
  }

  onDragStart = ev => {
    document.addEventListener('mousemove', this.onDrag)
    document.addEventListener('mouseup', this.onDragEnd)
    this.setState({
      isDragging: true,
      startClient: [ev.clientX, ev.clientY],
      endClient: [ev.clientX, ev.clientY]
    })
  }

  onMouseLeave = ev => {
    ev.persist()
    if (!this.state.isDragging || this.state.isDraggingScreen)
      return
    if (ev.clientX > window.innerWidth || ev.clientX < 0 || ev.clientY > window.innerHeight || ev.clientY < 0) {
      this.setState({
        isDragging: false
      })
    }    
  }

  onResize = ev => {
    this.setState({
      hasResized: true
    })
  }

  draw = p5 => {
    if (this.state.hasResized) {
      this.setState({
        hasResized: false
      })
      p5.resizeCanvas(window.innerWidth, window.innerHeight)
    }
    p5.clear()
    if (this.state.isDragging && !this.state.isDraggingScreen) {
      this.drawDragRect(p5)
    }
  }

  drawDragRect(p5) {
    p5.fill('rgba(130, 78, 125, 0.49)')
    p5.stroke('rgba(130, 78, 125, 0.88)')
    p5.strokeWeight(1)
    let {startClient, endClient} = this.state
    let x = startClient[0]
    let y = startClient[1]
    let width = endClient[0] - startClient[0]
    let height = endClient[1] - startClient[1]
    if (width < 0) {
      x = endClient[0]
      width = Math.abs(width)
    }
    if (height < 0) {
      y = endClient[1]
      height = Math.abs(height)
    }
    
    p5.rect(
      x,
      y,
      width,
      height
    )
  }

  openNewDesktop = ev => {
    this.setState({
      updates: [],
      isPlayingClosing: false,
      hasUpdated: true
    })
    this.desktop.current.style.opacity = 1
    this.startup.current.play()
    setTimeout(this.introduceNewSusan, 2000)
  }

  introduceNewSusan = ev => {
    this.playVideo(VIDEOS.newSusan, false)
  }

  playVideo = (ev, isEl = true) => {
    let ref = isEl ? ev.target.dataset.ref : ev

    if (this.state.activeVideo === VIDEOS.updateNotification0) {
      let isUpdateVideo = UPDATE_VIDEOS.includes(ref)
      if (!isUpdateVideo) return
    } else if (this.state.updateCount > 0) {
      let isUpdateVideo = UPDATE_VIDEOS.includes(ref)
      if (!isUpdateVideo) return
    }

    if (this.state.activeVideo) {
      this.resetVideo(this.state.activeVideo)
    }

    if (!this[ref] || !this[ref].current) return
    this[ref].current.classList.remove('hidden-video')
    this[ref].current.classList.add('avatar-video')
    this[ref].current.play()

    this.setState({
      activeVideo: VIDEOS[ref]
    })
  }

  setup = (p5, canvasParentRef) => {
    p5.createCanvas(
      window.innerWidth, 
      window.innerHeight)
    .parent(canvasParentRef)
  }

  onResize = ev => {
    this.setState({
      hasResized: true
    })
  }

  draw = p5 => {
    if (this.state.hasResized) {
      this.setState({
        hasResized: false
      })
      p5.resizeCanvas(window.innerWidth, window.innerHeight)
    }
    p5.clear()
    if (this.state.isDragging && !this.state.isDraggingScreen) {
      this.drawDragRect(p5)
    }
  }

  onLoadedData = ev => {
    if (ev.target.dataset.ref === VIDEOS.emptyRoomVideo) {
      ev.target.addEventListener('timeupdate', this.onTimeUpdate)
    }
    if (ev.target.dataset.ref === VIDEOS.openingVideo) 
      this.setState({
        isVideoLoaded: true
      })
  }

  hideVideo = ev => {
    ev.target.classList.remove('avatar-video')
    ev.target.classList.add('hidden-video')
    ev.target.currentTime = 0
    ev.target.pause()

    if (ev.target.dataset.ref.includes('updateNotification')) {
      if (this.state.updateCount === 3) {
        this.glitchOverlay.current.style.opacity = 1
        this.updateInterval = setInterval(this.addUpdate, 700)
        this.playVideo(VIDEOS.preUpdate, false)
        this.setState({
          updateCount: this.state.updateCount + 1,
          isGlitching: true
        })
        return
      } else {
        setTimeout(this.addUpdate, 5500)
      }
      this.setState({
        updateCount: this.state.updateCount + 1,
        activeVideo: null
      })
      return
    }

    if (ev.target.dataset.ref === VIDEOS.endingSequence) {
      this.setState({
        activeVideo: null
      })
      setTimeout(this.openNewDesktop, 5000)
      this.desktop.current.style.opacity = 0
      return
    }

    if (ev.target.dataset.ref === VIDEOS.newSusan) {
      this.setState({
        activeVideo: null
      })
      this.desktop.current.style.opacity = 0
      return
    }

    if (ev.target.dataset.ref === VIDEOS.endPrivateVideo) {
      this.setState({
        activeVideo: null,
        isPrivateHidden: true
      })
      return
    }

    if (ev.target.dataset.ref === VIDEOS.openingVideo) {
      this.setState({
        activeVideo: null,
        isPlayingOpening: false
      })
      this.startup.current.play()
      this.timeInterval = setInterval(this.updateTime, 1000)
      return
    }

    this.setState({
      activeVideo: null
    })
  }

  renderPopup = (type, idx) => {
    switch (type) {
      case POPUPS.CLOCK:
        return <Clock
          setDragging={this.setDragging}
          closePopup={this.closePopup} />
      case POPUPS.SAFARI:
        return <Popup 
          key={`${type}-${idx}`} 
          setDragging={this.setDragging}
          playVideo={this.playVideo}
          closePopup={this.closePopup} />
      case POPUPS.FULLSCREEN:
        return <Photos 
          key={`${type}-${idx}`}
          type={type}
          setDragging={this.setDragging}
          image={this.state.fullscreen}
          setDragging={this.setDragging}
          closePopup={this.closePopup}
        />
      default:
        return <Photos 
          key={`${type}-${idx}`}
          type={type}
          isPrivateHidden={this.state.isPrivateHidden}
          images={type === POPUPS.PRIVATE ? this.state.images : []}
          addPopup={this.addPopup}  
          setDragging={this.setDragging}
          closePopup={this.closePopup}
          playVideo={this.playVideo}
          setDragging={this.setDragging}
          setFullscreen={this.setFullscreen} />
    }
  }

  onTimeUpdate = ev => {
    if (ev.target.currentTime > ev.target.duration - 0.5) {
      ev.target.pause()
    }
  }

  renderVideo = (key, idx) => (
    <div className="video-parent">
      <video className="hidden-video" 
        key={`${key}-${idx}`}
        width="500px" height="500px" 
        type="video/webm"  
        ref={this[key]}
        data-ref={key}
        onLoadedData={this.onLoadedData}
        onEnded={this.hideVideo}
        src={VIDEO_LINKS[key]} />
    </div>
  )

  renderFirstScreen = () => (
    <div>
      <div className="background"></div>
      {this.state.isPlayingOpening ? null : <Popup 
        hasLoaded={this.state.isVideoLoaded}
        playOpening={this.playOpening} 
        setDragging={this.setDragging}
        isInstructions={true} />}
    </div>
  )

  playOpening = () => {
    this.playVideo(VIDEOS.openingVideo, false)
    this.setState({
      isFirstScreen: false,
      isPlayingOpening: true
    })
  }

  setFullscreen = img => {
    this.setState({
      fullscreen: img
    })
  }

  renderTime = () => {
    let {minutes, seconds} = this.state
    minutes = minutes.toString()
    seconds = seconds.toString().length === 1 ? `0${seconds.toString()}` : seconds.toString()
  
    return (
    <div className="time-text">{minutes}:{seconds}</div>
    )
  }

  renderUpdates = update => update.component

  renderMain = () => (
    <div>
      {this.state.isPlayingClosing ? null : <Sketch setup={this.setup} draw={this.draw} />}
      <div ref={this.glitchOverlay} className={`glitch-background ${this.state.isPlayingClosing || this.state.hasUpdated ? 'invisible' : ''}`}></div>
      <div>
        {this.state.popups.map(this.renderPopup)}
        {this.state.updates.map(this.renderUpdates)}
        <div className="os-container">
          <GlitchClip disabled={!this.state.isGlitching}>
            <div className={`background ${this.state.isPlayingClosing || this.state.hasUpdated ? 'newbackground' : ''} ${this.state.isPlayingClosing ? 'invisible' : ''}`} onMouseLeave={this.onMouseLeave} />
          </GlitchClip>
        <div className={`top-bar-container ${this.state.isPlayingClosing || this.state.hasUpdated ? 'invisible' : ''}`}>
          <div className="left-bar-container">
            <div data-ref="finder" onClick={this.playVideo} className="icon apple"></div>
          </div>
          <div className="right-bar-container">
            <div data-ref="wifi" onClick={this.playVideo} className="icon wifi"></div>
            <div data-ref="battery" onClick={this.playVideo} className="icon battery"></div>
            <div className="icon time" data-popup={POPUPS.CLOCK} onClick={this.addPopup}></div>
            <div className="time-text">{this.renderTime()}</div>
          </div>
        </div>
        <div className={`dashboard-container ${this.state.isPlayingClosing || this.state.hasUpdated ? 'invisible' : ''}`}>
          <div data-ref="finder" onClick={this.playVideo} className="dashboard-icon finder"></div>
          <div 
            data-popup={POPUPS.SAFARI}
            onClick={this.addPopup} data-ref="safariOpening" className="dashboard-icon safari"></div>
          <div className="dashboard-icon photos" 
            data-ref="photosOpeningVideo"
            data-popup={POPUPS.PHOTOS}
            onClick={this.addPopup}></div>
          <div data-ref="zoom" onClick={this.playVideo} className="dashboard-icon zoom"></div>
          <div className="right-dashboard"></div>
          <div onClick={this.playVideo} data-ref="trash" className="dashboard-icon trash"></div>

        </div>
        </div>
      </div>
    </div>
  )

  renderSound = sound => (
    <audio ref={this[sound.name]}>
      <source src={sound.sound} type={`audio/${sound.type}`} />
    </audio>
  )

  renderWeb = () => (
    <GlitchClip disabled={!this.state.isGlitching}>
      {this.state.isGlitching ? null : <video className="video-feed" autoPlay ref={this.videoFeed} />}
      {Object.keys(VIDEO_LINKS).map(this.renderVideo)}
      {SOUNDS.map(this.renderSound)}
      {this.state.isFirstScreen | this.state.isPlayingOpening ? this.renderFirstScreen() : this.renderMain()}
    </GlitchClip>
  )

  renderMobile = () => (
    <Popup hasLoaded={this.state.isVideoLoaded}
      isFail={this.state.isChrome || this.state.isMobile}
      playOpening={this.playOpening} 
      setDragging={this.setDragging}
      isInstructions={true} />
  )

  render() {
    return (
      <div className="desktop" ref={this.desktop}>
        {this.state.isMobile || !this.state.isChrome ? this.renderMobile() : this.renderWeb()}
      </div>
    )
  }
}

export default Desktop
