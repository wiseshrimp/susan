import React from 'react'
import Draggable from 'react-draggable'

import './Captions.css'

import {CAPTION_VIDEO_LINKS} from './constants'

export default class Captions extends React.Component {
    constructor(props) {
        super(props)

        Object.keys(CAPTION_VIDEO_LINKS).forEach(key => { // Video refs
            this[key] = React.createRef()
        })
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.activeVideo !== this.props.activeVideo) {
            if (prevProps.activeVideo) {
                this.resetVideo(prevProps.activeVideo)
            }
            if (this.props.activeVideo) {
                this.playVideo(this.props.activeVideo)
            }
        }
    }

    resetVideo = video => {
        this[video].current.classList.remove('captions-video')
        this[video].current.classList.add('hidden-video')
        this[video].current.currentTime = 0
        this[video].current.pause()
    }

    playVideo = video => {
        this[video].current.classList.remove('hidden-video')
        this[video].current.classList.add('captions-video')
        this[video].current.play()    
    }

    renderVideo = (key, idx) => {
        return (
            <div key={`caption-${key}-${idx}`} className="video-parent">
                <video className="hidden-video" 
                    width="500px" height="500px" 
                    type="video/mp4"
                    ref={this[key]}
                    data-ref={key}
                    src={CAPTION_VIDEO_LINKS[key]} />
            </div>
        )
    }
    onDragStart = ev => {
        this.props.setDragging(true)
    }

    onDragEnd = ev => {
        this.props.setDragging(false)
    }

    close = () => {
        this.props.turnOffCaptions()
    }

    render () {
        return (
            <Draggable
                onStart={this.onDragStart}
                onStop={this.onDragEnd}
                handle=".top-bar"
                bounds="html">
                <div
                    className="window popup captions-window" >
                    <div className="top-bar">
                        <div className="buttons">
                            <div onClick={this.close} className="close">
                                <div href="" className="closebutton"><span><strong>x</strong></span></div>
                            </div>
                        </div>
                        <div className="title-header">Captions</div>
                    </div>
                    <div className="caption-videos">
                        {Object.keys(CAPTION_VIDEO_LINKS).map(this.renderVideo)}
                    </div>
                    <div className="captions-body"></div>
                </div>
        </Draggable>
    )
    }
}
