import React from 'react'
import Draggable from 'react-draggable'

import './Popup.css'
import './Photos.css'
import { VIDEOS } from './constants'

export default class Popup extends React.Component {
    constructor(props) {
        super(props)

        this.safariIframe = React.createRef()
        this.safariBody = React.createRef()
        this.state = {
            isFullscreen: props.isFullscreen,
            input: '',
            type: 'home'
        }

    }

    componentDidMount() {
        document.addEventListener('keydown', this.onEnter)
    }

    
    onInput = (ev) => {
        this.setState({
            input: ev.target.value
        })
        if (ev.which === 13) {
            let input = this.state.input
            input.replace('https://', '')
            if (this.safariIframe.current)
                this.safariIframe.current.src = `https://${input}`
                this.setState({
                    type: 'browse'
                })
        }
    }

    close = ev => {
        this.props.closePopup(this.props.type, this.state.type === 'work')
    }

    renderInstructionsBody = () => (
        <div>
            <div className="instructions-text">
                Welcome to your computer.<br />
                        Come do whatever you would normally do: look at photos, browse the internet, whatever your heart desires.
                    </div>
            {this.props.hasLoaded ? <button className="continue-button" onClick={this.props.playOpening}>Continue</button> : null}
        </div>
    )

    renderFail = () => (
        <div>
            <div className="instructions-text">
                Hello!<br/>Currently, Susan only works on Google Chrome and on desktop. Please come again soon!
            </div>
        </div>
    )

    renderType = () => {
        switch (this.state.type) {
            case 'home':
                return (
                    <div ref={this.safariBody} className="safari-body">
                        <div className="h3">Favorites</div>
                        <div className="favorites-container">
                            <div onClick={this.setType} data-type='work' data-ref="safariWork" className="fave-c">
                                <div data-type='work' data-ref="safariWork" className="fave-icon">
                                    <div data-type="work" data-ref="safariWork" className="bing-text">W</div></div>
                                    <div data-type='work' data-ref="safariWork" className="fave-text">Work</div>
                            </div>
                            <div onClick={this.setType} data-type='bing' data-ref="safariBing" className="fave-c">
                                <div data-type='bing'  data-ref="safariBing" className="fave-icon bing-icon">
                                    <div data-type="bing" data-ref="safariBing" className="bing-text">B</div>
                                </div>
                                <div data-type='bing' data-ref="safariBing" className="fave-text">Bing</div>
                            </div>
                        </div>
                    </div>
                )
            case 'work':
                return (
                    <div ref={this.safariBody} className="safari-body">
                    <iframe title="spreadsheet" className="spreadsheet" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1FcmOAbh3wGzKmkMLinzyK27ioqewdgVUl4sJV4hHMdpI-CuN5cmtyetANHHRmh_kzLGKEzUbeX-C/pubhtml?widget=true&amp;headers=false"></iframe>                    </div>
                )
            default:
                return (
                    <iframe title="browser" src={this.state.type === 'bing' ? 'https://bing.com' : ''} ref={this.safariIframe} className="iframe-safari" /> 
                )
        }
    }

    setType = ev => {
        if (ev.target.dataset.ref) {
            this.props.playVideo(ev)
        } 
        if (this.state.type === 'work' && ev.target.dataset.type !== 'work') {
            this.props.playVideo(VIDEOS.safariWorkEnd, false)
        } 
        if (this.state.type === 'bing' && ev.target.dataset.type !== 'bing') {
            this.props.resetVideo(VIDEOS.safariBing)
        }
        this.setState({
            type: ev.target.dataset.type
        })
    }

    renderSafari  = () => (
        <div
            className="window popup safari" >
            <div className="top-bar">
                <div className="buttons">
                    <div onClick={this.close} className="close">
                        <div className="closebutton"><span><strong>×</strong></span></div>
                    </div>
                    <div className="back-c">
                        <div className="back"></div>
                    </div>
                    <div className="forward-c">
                        <div className="forward"></div>
                    </div>
                    <div onClick={this.setType} data-type="home" className="home-c">
                        <div data-type="home" className="home"></div>
                    </div>
                </div>

                <input type="text" placeholder="Search or enter website name" onKeyPress={this.onInput} className="safari-search" />
                <div className="right-align-safari"></div>
            </div>
            {this.renderType()}
        </div>
    )

    onDragStart = ev => {
        this.props.setDragging(true)

    }
    onDragEnd = ev => {
        this.props.setDragging(false)
    }


    render() {
        return (
            <Draggable
                onStart={this.onDragStart}
                onStop={this.onDragEnd}
                handle=".top-bar"
                bounds="html">
                    {this.renderSafari()}
            </Draggable>
        )
    }
}
