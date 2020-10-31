import React from 'react'
import Draggable from 'react-draggable'
import {Link} from 'react-router-dom'

import './Popup.css'


export default class Popup extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
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


    render() {
        let fullscreenStyle = {}
        if (this.state.isFullscreen) {
            fullscreenStyle = {
                width: 'calc(100% - 4px)',
                top: '0',
                left: '0',
                height: 'calc(100% - 40px',
                transform: 'none'
            }
        }
        return (
            <Draggable 
                handle=".top-bar"
                bounds="html">
                <div 
                    ref={this.windowRef}
                    style={fullscreenStyle}
                    className="window popup" >
                    <div className="top-bar">
                    <Link to="/">
                        <div 
                            id="close-button"
                            className="noselect"
                            onClick={this.onWindowClose}>&#10005;</div>

                    </Link>
                    <div 
                            id="expand-button" className="noselect"
                            onClick={this.expandWindow}>
                                <div id="expand" />
                            </div>
                    </div>

                </div>
            </Draggable>
        )
    }
}
