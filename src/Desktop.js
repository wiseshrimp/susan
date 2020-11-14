import React from 'react'
import Sketch from 'react-p5'

import Popup from './Popup'
import Photos from './Photos'
import './App.css'

const VIDEOS = {
  openingVideo: 'openingVideo',
  photosOpeningVideo: 'photosOpeningVideo',
  emptyRoomVideo: 'emptyRoomVideo',
  battery: 'battery',
  wifi: 'wifi',
  finder: 'finder',
  trash: 'trash'
}

class Desktop extends React.Component {
  constructor(props) {
    super(props)

    this.dashboardRef = React.createRef()
    this.openingVideo = React.createRef()
    this.photosOpeningVideo = React.createRef()
    this.emptyRoomVideo = React.createRef()
    this.endEmptyRoomVideo = React.createRef()
    this.battery = React.createRef()
    this.wifi = React.createRef()
    this.finder = React.createRef()
    this.trash = React.createRef()

    this.state = {
      hasLoaded: false, // for video play error
      activeVideo: null,
      isDragging: false,
      endClient: [null, null],
      startClient:[null, null],
      isDashboardVisible: false,
      isLoading: false,
      isPopup: false,
      isPhotoPopup: false,
      popup: null,
      vIdx: 0
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onDragStart)
    window.addEventListener('resize', this.onResize)
  }

  addPopup = () => {
    this.setState({
      isPopup: true
    })
  }

  addPhotoPopup = photo => {
    let isPhotoPopup
    if (this.state.isPhotoPopup) {
      isPhotoPopup = false
    }
    this.setState({
      isPhotoPopup: photo
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
        activeVideo: VIDEOS.openingVideo
      })
      this.openingVideo.current.play()
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

  showDashboard = () => {
    if (this.state.isDashboardVisible) return
    this.setState({
      isDashboardVisible: true
    })
    this.dashboardRef.current.classList.add('active')
    this.dashboardRef.current.classList.add('slide-up-fade-in')

  }

  hideDashboard = () => {
    this.setState({
      isDashboardVisible: false
    })
    this.dashboardRef.current.classList.remove('active')
    this.dashboardRef.current.classList.remove('slide-up-fade-in')
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

  playPhotos = ev => {
    if (this.state.activeVideo) {
      this[this.state.activeVideo].current.classList.add('hidden-video')
      this[this.state.activeVideo].current.pause()
      this[this.state.activeVideo].current.classList.remove('avatar-video')
    }
    let ref = ev.target.dataset.ref
    this[ref].current.classList.remove('hidden-video')
    this[ref].current.classList.add('avatar-video')
    this[ref].current.play()
    this.setState({
      activeVideo: VIDEOS[ref]
    })
    if (VIDEOS[ref] === 'photosOpeningVideo') {
      this.setState({
        popup: 'photos'
      })
    }
  }

  quitFullScreen = ev => {
    let activeVideo
    console.log(this.state)
    if (this.state.activeVideo) {
      this[this.state.activeVideo].current.pause()
      this[this.state.activeVideo].current.classList.remove('avatar-video')
      this[this.state.activeVideo].current.classList.add('hidden-video')
    }
    if (this.state.activeVideo === 'emptyRoomVideo') {
      activeVideo = 'endEmptyRoomVideo'
      this[activeVideo].current.classList.add('avatar-video')
      this[activeVideo].current.classList.remove('hidden-video')
      this[activeVideo].current.play()
    }
    this.setState({
      isPhotoPopup: false,
      activeVideo
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
    this.setState({
      isVideoLoaded: true
    })
  }

  hideVideo = ev => {
    ev.target.currentTime = 0
    ev.target.pause()
    ev.target.classList.remove('avatar-video')
    ev.target.classList.add('hidden-video')

    this.setState({
      activeVideo: null
    })
  }


  renderPopup = () => {
    if (this.state.popup === 'photos') return <Photos 
      addPopup={this.addPhotoPopup}  
      isPhotoPopup={this.state.isPhotoPopup}
      quitFullScreen={this.quitFullScreen}
      playVideo={this.playPhotos} />
    else return <Popup />
  }

  onTimeUpdate = ev => {
    if (ev.target.currentTime > ev.target.duration - 0.5) {
      ev.target.pause()
    }
  }

  render() {
    return (
      <div>
        <Sketch setup={this.setup} draw={this.draw} />
          <div>
            {this.state.popup ? this.renderPopup() : null}
            {this.state.isPhotoPopup ? this.renderPopup() : null}
            <div className="os-container">
              <video className="avatar-video" 
                width="500px" height="500px" 
                type="video/webm"  
                ref={this.openingVideo}
                onLoadedData={this.onLoadedData}
                onEnded={this.hideVideo}
                src="https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Opening_Full.webm" />
              <video className="hidden-video" 
                width="500px" height="500px" 
                type="video/webm"  
                ref={this.photosOpeningVideo}
                data-ref="photosOpeningVideo"
                onEnded={this.hideVideo}
                src="https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Photos_Opening_1.webm" />

              <video className="hidden-video" 
                width="500px" height="500px" 
                type="video/webm"  
                ref={this.emptyRoomVideo}
                onEnded={this.hideVideo}
                onTimeUpdate={this.onTimeUpdate}
                src="https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Photos_EmptyRoom.webm" />
              <video className="hidden-video" 
                width="500px" height="500px" 
                type="video/webm"  
                ref={this.endEmptyRoomVideo}
                onEnded={this.hideVideo}
                src="https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Photos_EmptyRoom_EnoughOfThat_1.webm" />
              <video className="hidden-video" 
                width="500px" height="500px" 
                type="video/webm"  
                ref={this.battery}
                onEnded={this.hideVideo}
                src="https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/TopBar_Battery_1.webm" />
              <video className="hidden-video" 
                width="500px" height="500px" 
                type="video/webm"  
                ref={this.wifi}
                onEnded={this.hideVideo}
                src="https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/TopBar_WiFi.webm" />
              <video className="hidden-video" 
                width="500px" height="500px" 
                type="video/webm"  
                ref={this.finder}
                onEnded={this.hideVideo}
                src="https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/TopBar_Finder.webm" />
              <video className="hidden-video" 
                width="500px" height="500px" 
                type="video/webm"  
                ref={this.trash}
                onEnded={this.hideVideo}
                src="https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Trash.webm" />
              <div className="background"
                onMouseLeave={this.onMouseLeave}
              ></div>
            <div className="top-bar-container">
              <div className="left-bar-container">
                <div data-ref="finder" onClick={this.playPhotos} className="icon apple"></div>
                {/* <div className="topbar-text">Finder</div> */}
              </div>
              <div className="right-bar-container">
                <div data-ref="wifi" onClick={this.playPhotos} className="icon wifi"></div>
                <div data-ref="battery" onClick={this.playPhotos} className="icon battery"></div>
                <div className="icon time"></div>
              </div>
            </div>
            <div className="dashboard-container"
              onMouseEnter={this.showDashboard}
              onMouseLeave={this.hideDashboard}
              ref={this.dashboardRef}>
              <div data-ref="finder" onClick={this.playPhotos} className="dashboard-icon finder"></div>
              <div onClick={this.addPopup} className="dashboard-icon safari"></div>
              <div className="dashboard-icon photos" 
                data-ref="photosOpeningVideo"
                onClick={this.playPhotos}></div>
              <div className="right-dashboard">

              </div>
              <div onClick={this.playPhotos} data-ref="trash" className="trash"></div>

            </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Desktop
