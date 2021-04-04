import React from 'react'
import Draggable from 'react-draggable'

import './Login.css'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            areCaptions: false,
            isHint: false
        }

        this.input = React.createRef()
    }

    componentDidUpdate = () => {
        if (this.props.isCaptions != this.state.areCaptions) {
            this.setState({
                areCaptions: this.props.isCaptions
            })
        }
    }

    toggleCaptions = ev => {
        if (this.state.areCaptions) this.props.turnOffCaptions()
        else this.props.turnOnCaptions()
        this.setState({
            areCaptions: !this.state.areCaptions
        })
    }

    onKeyDown = ev => {
        ev.target.classList.remove('shake')
        if (ev.which === 13) {
            if (!this.props.hasLoaded) {
                this.input.current.classList.add('shake')
                return
            }
            this.props.playOpening()
        }
    }

    activateHint = ev => {
        if (this.state.isHint) return
        this.setState({
            isHint: true
        })
        setTimeout(this.deactivateHint, 5000)
    }

    deactivateHint = ev => {
        this.setState({
            isHint: false
        })
    }

    renderInput = () => (
        <div className="login-container">
            <div className="user-icon"></div>
            <div className="login-input-container">
                <input 
                    onClick={this.activateHint}
                    ref={this.input} onKeyDown={this.onKeyDown} className="password-input" placeholder="Enter Password" type="password"></input>
            </div>
            <div className={`hint ${this.state.isHint ? 'active' : ''}`}>Anything you want...</div>

            <div id="icons">
                <div onClick={this.toggleCaptions} className={`icon-container ${this.state.areCaptions ? 'activated' : ''}`}>
                    <div id="accessibility"></div>
                    <div className="icon-text">Captions</div>
                </div>
            </div>
        </div>
    )

    renderWarning = () => (
        <Draggable
            handle=".top-bar">
            <div className="window popup">
                <div className="top-bar"></div>
                <div className="warning-body">
                    <div className="warning-icon"></div>
                    <div className="warning-text">
                        <b>Your computer needs to restart.</b>
                        <div>Susan only works on Google Chrome and desktop.</div>
                    </div>
                </div>
            </div>
        </Draggable>
    )
    
    render () {
        return (
            <div className="Login">
                {this.props.isMobile ? this.renderWarning() : null}
                <div className="blur">
                    <div className="black-overlay"></div>
                    <div className="background"></div>
                </div>
                {!this.props.isMobile ? this.renderInput() : null}
            </div>
        )
    }
}
