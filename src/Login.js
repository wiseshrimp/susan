import React from 'react'

import './Login.css'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            areCaptions: false
        }

        this.input = React.createRef()
    }

    toggleCaptions = ev => {
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
    
    render () {
        return (
            <div>
                <div className="blur">
                    <div className="black-overlay"></div>
                    <div className="background"></div>
                </div>
                <div className="login-container">
                    <div className="user-icon"></div>
                    <input ref={this.input} onKeyDown={this.onKeyDown} className="password-input" placeholder="Enter Password" type="password"></input>
                    <div id="icons">
                        <div onClick={this.toggleCaptions} className={`icon-container ${this.state.areCaptions ? 'activated' : ''}`}>
                            <div id="accessibility"></div>
                            <div className="icon-text">Captions</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
