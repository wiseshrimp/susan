import React from 'react'
import Sketch from 'react-p5'
import GlitchClip from 'react-glitch-effect/core/Clip'

import './glitch.css'

import Clock from './Clock'
import Popup from './Popup'
import Photos from './Photos'
import Update from './Update'
import {POPUPS, VIDEOS, VIDEO_LINKS, UPDATE_VIDEOS} from './constants'
import './App.css'

import Selfie1 from './assets/Selfie1.png'
import Selfie2 from './assets/Selfie2.png'
import Selfie3 from './assets/Selfie3.png'

 
const AVATAR_PHOTOS = [
  Selfie1,
  Selfie2,
  Selfie3,
  Selfie2
]

let isDev = true


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
    this.preUpdate = React.createRef()

    this.updateInterval = null

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
      isMobile:  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isChrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onDragStart)
    window.addEventListener('resize', this.onResize)
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.videoFeed.current.srcObject = stream
          setTimeout(this.takePhoto, 3000)
          setTimeout(this.takePhoto, 15000)
          setTimeout(this.takePhoto, 20000)
          setTimeout(this.takePhoto, 30000) // TO DO: Stop camera after taking last photo
          setTimeout(this.addUpdate, 5000)
        })
        .catch(function (err0r) {
          console.log(err0r) // TO DO: Popup error about webcam
        })
    }
  }

  addUpdate = ev => {
    let id = Date.now()
    this.setState({
      updates: [...this.state.updates, 
        {
          id,
          component: <Update id={id} idx={id} update={this.updateDesktop} willDisappear={this.state.updateCount < 4} setDragging={this.setDragging} />
        }
      ]
    })
    if (this.state.updateCount < 4) {
      this.playVideo(VIDEOS[`updateNotification${this.state.updateCount}`], false)
    }
  }

  updateDesktop = ev => {
    this.desktop.current.style.opacity = 0
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
      if (popup !== POPUPS.FULLSCREEN) 
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
    } else {
      let idx = this.state.popups.findIndex(p => p === popup)
      let popups = this.state.popups.slice()
      popups.splice(idx, 1)
      this.setState({
        popups,
        activeVideo: null
      })
      return
    }
    let idx = this.state.popups.findIndex(p => p === popup)
    let popups = this.state.popups.slice()
    popups.splice(idx, 1)
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
        setInterval(this.addUpdate, 700)
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

  renderUpdates = update => update.component

  renderMain = () => (
    <div>
      <Sketch setup={this.setup} draw={this.draw} />
      <div>
        {this.state.popups.map(this.renderPopup)}
        {this.state.updates.map(this.renderUpdates)}
        <div className="os-container">
          <GlitchClip disabled={!this.state.isGlitching}>
            <div className="background" onMouseLeave={this.onMouseLeave} />
          </GlitchClip>
        <div className="top-bar-container">
          <div className="left-bar-container">
            <div data-ref="finder" onClick={this.playVideo} className="icon apple"></div>
          </div>
          <div className="right-bar-container">
            <div data-ref="wifi" onClick={this.playVideo} className="icon wifi"></div>
            <div data-ref="battery" onClick={this.playVideo} className="icon battery"></div>
            <div className="icon time" data-popup={POPUPS.CLOCK} onClick={this.addPopup}></div>
          </div>
        </div>
        <div className="dashboard-container">
          <div data-ref="finder" onClick={this.playVideo} className="dashboard-icon finder"></div>
          <div 
            data-popup={POPUPS.SAFARI}
            onClick={this.addPopup} data-ref="safariOpening" className="dashboard-icon safari"></div>
          <div className="dashboard-icon photos bump" 
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

  renderWeb = () => (
    <GlitchClip disabled={!this.state.isGlitching}>
      {this.state.isGlitching ? null : <video className="video-feed" autoPlay ref={this.videoFeed} />}
      {Object.keys(VIDEO_LINKS).map(this.renderVideo)}
      {this.state.isFirstScreen | this.state.isPlayingOpening ? this.renderFirstScreen() : this.renderMain()}
    </GlitchClip>
  )

  renderMobile = () => (
    <div>
      Sorry!
    </div>
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
