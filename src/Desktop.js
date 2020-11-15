import React from 'react'
import Sketch from 'react-p5'

import Popup from './Popup'
import Photos from './Photos'
import {POPUPS, VIDEOS, VIDEO_LINKS} from './constants'
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

class Desktop extends React.Component {
  constructor(props) {
    super(props)

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

    this.state = {
      popups: [],
      hasLoaded: false, // for video play error
      activeVideo: null,
      isDragging: false,
      endClient: [null, null],
      startClient:[null, null],
      isLoading: false,
      images: []
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
        })
        .catch(function (err0r) {
          console.log(err0r) // TO DO: Popup error about webcam
        })
    }
  }

  addPopup = ev => {
    if (this.state.popups.includes(ev.target.dataset.popup)) return
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

  closePopup = popup => {
    if (popup === POPUPS.QUERETARO) {
      this.playVideo(VIDEOS.endEmptyRoomVideo, false)
    }
    else if (popup === POPUPS.PRIVATE) {
      this.playVideo(VIDEOS.endPrivateVideo, false)
    }
    else if (this.state.activeVideo) {
      this.resetVideo(this.state.activeVideo)
    }
    let idx = this.state.popups.findIndex(p => p === popup)
    let popups = this.state.popups.slice()
    popups.splice(idx, 1)
    this.setState({
      popups,
      activeVideo: null
    })
  }


  onDrag = ev => {
    if (!this.state.isDragging) return
    this.setState({
      endClient: [ev.clientX, ev.clientY]
    })
  }

  onDragEnd = ev => {
    if (!this.state.isDragging) return
    document.removeEventListener('mousemove', this.onDrag)
    document.removeEventListener('mouseup', this.onDragEnd)

    this.setState({
      isDragging: false,
      endClient: [null, null],
      startClient:[null, null]
    })
  }

  onDragStart = ev => {
    if (!this.state.hasLoaded && this.state.isVideoLoaded) {
      this.setState({
        hasLoaded: true,
      })
      this.playVideo(VIDEOS.openingVideo, false)
    }
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
    if (!this.state.isDragging)
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
    if (this.state.isDragging) {
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
    if (this.state.activeVideo) {
      this.resetVideo(this.state.activeVideo)
    }

    let ref = isEl ? ev.target.dataset.ref : ev
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
    if (this.state.isDragging) {
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

    this.setState({
      activeVideo: null
    })
  }

  renderPopup = (type, idx) => {
    switch (type) {
      case POPUPS.SAFARI:
        return <Popup closePopup={this.closePopup} />
      default:
        return <Photos 
          key={`${type}-${idx}`}
          type={type}
          images={type === POPUPS.PRIVATE ? this.state.images : []}
          addPopup={this.addPopup}  
          closePopup={this.closePopup}
          playVideo={this.playVideo} />
    }
  }

  onTimeUpdate = ev => {
    if (ev.target.currentTime > ev.target.duration - 0.5) {
      ev.target.pause()
    }
  }

  renderVideo = (key, idx) => (
    <video className="hidden-video" 
      key={key}
      width="500px" height="500px" 
      type="video/webm"  
      ref={this[key]}
      data-ref={key}
      onLoadedData={this.onLoadedData}
      onEnded={this.hideVideo}
      src={VIDEO_LINKS[key]} />
  )

  render() {
    return (
      <div>
        <Sketch setup={this.setup} draw={this.draw} />
          <div>
            {this.state.popups.map(this.renderPopup)}
            <div className="os-container">
              <video autoPlay ref={this.videoFeed} />
              {Object.keys(VIDEO_LINKS).map(this.renderVideo)}
              <div className="background" onMouseLeave={this.onMouseLeave} />
            <div className="top-bar-container">
              <div className="left-bar-container">
                <div data-ref="finder" onClick={this.playVideo} className="icon apple"></div>
              </div>
              <div className="right-bar-container">
                <div data-ref="wifi" onClick={this.playVideo} className="icon wifi"></div>
                <div data-ref="battery" onClick={this.playVideo} className="icon battery"></div>
                <div className="icon time"></div>
              </div>
            </div>
            <div className="dashboard-container">
              <div data-ref="finder" onClick={this.playVideo} className="dashboard-icon finder"></div>
              <div 
                data-popup={POPUPS.SAFARI}
                onClick={this.addPopup} className="dashboard-icon safari"></div>
              <div className="dashboard-icon photos" 
                data-ref="photosOpeningVideo"
                data-popup={POPUPS.PHOTOS}
                onClick={this.addPopup}></div>
              <div className="right-dashboard"></div>
              <div onClick={this.playVideo} data-ref="trash" className="dashboard-icon trash"></div>

            </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Desktop
