import React from 'react'
import Draggable from 'react-draggable'

import './Popup.css'
import './Photos.css'

export default class Popup extends React.Component {
    constructor(props) {
        super(props)

        this.safariIframe = React.createRef()
        this.safariBody = React.createRef()
        this.state = {
            isFullscreen: props.isFullscreen,
            input: 'dsd'
        }

    }

    componentDidMount() {
        document.addEventListener('keydown', this.onEnter)
    }

    
    onInput = ev => {
        this.setState({
            input: ev.target.value
        })
        if (ev.which === 13) {
            let input = this.state.input
            input.replace('https://', '')
            if (this.safariIframe.current)
                this.safariIframe.current.src = `https://${input}`
        }
    }

    close = ev => {
        this.props.closePopup(this.props.type)
    }


    render() {
        return (
            <Draggable
                handle=".top-bar"
                bounds="html">
                <div
                    className="window popup safari" >
                    <div className="top-bar">
                        <div className="buttons">
                            <div onClick={this.close} className="close">
                                <a className="closebutton"><span><strong>x</strong></span></a>
                            </div>
                        </div>

                        <input type="text" placeholder="Search or enter website name" onKeyPress={this.onInput} className="safari-search" />
                    </div>
                    <div ref={this.safariBody} className="safari-body">
                        <div className="h3">Favorites</div>                            
                    </div>
                    <iframe src="" ref={this.safariIframe} className="iframe-safari" />

                </div>
            </Draggable>
        )
    }
}
