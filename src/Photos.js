import React from 'react'
import Draggable from 'react-draggable'

import './Popup.css'

let TITLES = {
    emptyRoomVideo: 'queretaro'
}

export default class Photos extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            top: `${Math.random() * window.innerHeight / 2}px`,
            left: `${Math.random() * (window.innerWidth - window.innerWidth / 2) + window.innerWidth / 4}px`,
            title: props.isPhotoPopup ? TITLES[props.isPhotoPopup] : 'Photos',
            isPhotoFullscreen: false,
            isFullscreen: props.isFullscreen
        }

        this.windowRef = React.createRef()
        this.subWindowRef = React.createRef()
    }

    componentDidMount() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            Array.from(document.getElementsByClassName('caption')).forEach(caption => {
                caption.classList.add('mobile')
            })
        }
    }

    close = ev => {
        if (this.title === 'Photos') {
            this.props.closePhotos()
        } else {
            this.props.quitFullScreen()
        }
    }

    expandWindow = ev => {
        let isMinimized = this.state.isFullscreen
        this.props.setFullscreen(!isMinimized)
        this.windowRef.current.style.width = isMinimized ? '80vw' : 'width: calc(100% - 4px);'
        this.windowRef.current.style.transform = 'none'
        this.windowRef.current.style.top = '0'
        this.windowRef.current.style.left = '0'
        this.windowRef.current.style.height = isMinimized ? '70vh' : 'calc(100% - 40px)'
        this.subWindowRef.current.style.height = isMinimized ? '70vh' : 'calc(100% - 40px)'
        this.setState({
            isFullscreen: !isMinimized
        })
    }

    playVideo = ev => {
        this.setState({
            isPhotoFullscreen: true
        })
        this.props.playVideo(ev)
        this.props.addPopup(ev.target.dataset.ref)
    }

    renderPhoto = () => (
        <div className={`fullscreen-photo ${TITLES[this.props.isPhotoPopup]}`}></div>
    )

    renderIcons = () => (
        <div className="photos-container">
            <div className="i-container"
                data-ref="emptyRoomVideo"
                onDoubleClick={this.playVideo}>
                <div data-ref="emptyRoomVideo" className="icon-container">
                    <div data-ref="emptyRoomVideo" className="photo-container">
                        <div data-ref="emptyRoomVideo" className="photos-icon queretaro"></div>
                    </div>
                </div>
    <           div className="icon-title">queretaro</div>
            </div>
        </div>
    )

    render() {
        let fullscreenStyle = {}
        if (this.state.isFullscreen) {
            fullscreenStyle = {
                width: 'calc(100% - 4px)',
                top: '0',
                left: '0',
                height: 'calc(100% - 40px)',
                transform: 'none'
            }
        }
        return (
            <Draggable 
                handle=".top-bar"
                bounds="html">
                <div 
                    ref={this.windowRef}
                    style={{
                        top: this.state.top
                    }}
                    className="window popup" >
                    <div className="top-bar">
                    <div className="buttons">
                        <div className="close">
                            <a className="closebutton" onClick={this.close}><span><strong>x</strong></span></a>
                        </div>
                    </div>
                    <div className="title-header">{this.state.title}</div>
                </div>
                {this.props.isPhotoPopup && this.state.title !== 'Photos' ? this.renderPhoto() : this.renderIcons()}
                </div>
            </Draggable>
        )
    }
}
