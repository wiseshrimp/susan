import React from 'react'
import Draggable from 'react-draggable'

import './Popup.css'
import './Zoom.css'

export default class Zoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isZoom: false
        }

        this.videoEl = React.createRef()
        this.bottomBar = React.createRef()
    }

    componentDidMount() {
        this.bottomBar.current.setAttribute('draggable', false)
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.isZoom !== this.props.isZoom) {
            this.setState({
                top: `${Math.random() * window.innerHeight / 2}px`,
                left: `${Math.random() * (window.innerWidth - window.innerWidth / 2) + window.innerWidth / 4}px`,
                isZoom: this.props.isZoom
            })
            this.videoEl.current.currentTime = 0
            this.videoEl.current.play()
        }
    }

    close = ev => {
        this.props.closeZoom()
    }

    onDragStart = ev => {
        this.props.setDragging(true)

    }
    onDragEnd = ev => {
        this.props.setDragging(false)
    }

    renderZoom = () => (
        <Draggable 
            handle=".top-bar"
            bounds="html"
            onStart={this.onDragStart}
            onStop={this.onDragEnd}>
            <div 
                className="window popup" >
                <div className="top-bar">
                <div className="buttons">
                    <div onClick={this.close} className="close">
                        <div className="closebutton"><span><strong>×</strong></span></div>
                    </div>
                </div>
                <div className="title-header">Zoom</div>
            </div>
                <div className="zoom-body">
                    {this.renderVideo()}
                    {this.renderZoomBar()}
                </div>
            </div>
        </Draggable>
    )

    hideVideo = ev => {
        this.videoEl.current.style.display = 'none'
    }

    renderVideo = () => (
        <video 
            onEnded={this.hideVideo}
            ref={this.videoEl}
            muted={true}
            onTimeUpdate={this.onTimeUpdate}
            src="https://sues-website.s3.us-east-2.amazonaws.com/susan/ZoomWindow.mp4" />
    )

    renderZoomBar = () => (
        <img 
            ref={this.bottomBar}
            alt="bottom bar menu of Zoom app with mute, pause video, etc."
            src="https://sues-website.s3.us-east-2.amazonaws.com/susan/BottomBar.png" />
    )

    onTimeUpdate = ev => {
        if (ev.target.currentTime > ev.target.duration - 0.5) {
          ev.target.pause()
        }
      }    

    render() {
        return (
            <div className={`${this.state.isZoom ? 'zoom-container' : 'zoom-hidden'}`}>
                {this.renderZoom()}
            </div>
        )
    }
}
