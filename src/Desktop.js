import React from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import Sketch from 'react-p5'

import Popup from './Popup'
import './App.css'

class Desktop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDragging: false,
      endClient: [null, null],
      startClient:[null, null],
      popups: [],
      isFullscreen: false
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }

  closeWindow = type => {
    let pidx = this.state.popups.findIndex(popup => popup === type)
    let popups = this.state.popups.slice()
    popups.splice(pidx, 1)
    this.setState({
      popups
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

  onDragStart = ev => { // 
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

  setFullscreen = isFullscreen => {
    this.setState({
      isFullscreen
    })
  }

  glitch = ev => {
    if (this.state.isGlitching)
      return
    this.setState({
      isGlitching: true
    })
    setTimeout(this.unglitch, 2000)
  }
  unglitch = () => {
    this.setState({
      isGlitching: false
    })
  }

  renderPopup = type => (
    <Popup 
      key={type}
      isFullscreen={this.state.isFullscreen}
      setFullscreen={this.setFullscreen}
      closeWindow={this.closeWindow}
      type={type} />
  )

  renderSubRoute = (route, idx) => (
    <Route exact path={route}
      key={`${route}-${idx}`}
      render={props => <Popup 
        {...props}
      setFullscreen={this.setFullscreen} 
      isFullscreen={this.state.isFullscreen} />}
    />
  )
  
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
    if (this.state.isGlitching) {
      p5.image(this.sueicon, Math.random() * window.innerWidth - this.sueicon.width / 2, window.innerHeight * Math.random() - this.sueicon.height / 2)
      p5.image(this.caticon, Math.random() * window.innerWidth - this.caticon.width / 2, window.innerHeight * Math.random() - this.caticon.height / 2)
      p5.image(this.monstericon, Math.random() * window.innerWidth - this.monstericon.width / 2, window.innerHeight * Math.random() - this.monstericon.height / 2)
    }
  }

  render() {
    return (
      <BrowserRouter>
    <Sketch setup={this.setup} draw={this.draw} />
      <div>
        <div id="fullscreen" className="fade-in">
          <img
            alt="fullscreen of project"
            id="fullscreen-img" 
            src="" />
          <div id="close-fullscreen">&#10005;</div>
        </div>
        <div className="os-container">
          <div className="background"
            onMouseDown={this.onDragStart}
            onMouseLeave={this.onMouseLeave}
          ></div>
          <div className="desktop-container">
            <div className="bar-container">
              <div 
                className="nav-button" 
                id="start-button"></div>
              <div className="nav-button" id="internet-expl-nav">
                Internet Explorer
              </div>
              <div className="right-nav">
              </div>
            </div>
          </div>
        </div>
      </div>
      </BrowserRouter>
    
    )
  }
}

export default Desktop
