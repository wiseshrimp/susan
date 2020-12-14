import React from 'react'
import Draggable from 'react-draggable'

import './Update.css'

export default class Update extends React.Component {
    constructor(props) {
        super(props)

        this.window = React.createRef()

        this.state = {
            isHidden: false,
            top: this.props.willDisappear ? '40vh' : `${Math.random() * window.innerHeight}px`,
            left: `${Math.random() * window.innerWidth}px`
        }
    }

    componentDidMount() {
        if (this.props.willDisappear) {
            setTimeout(this.disappear, 2000)
        }
    }

    disappear = ev => {2
        return (
            <Draggable
                onStart={this.onDragStart}
                onStop={this.onDragStop}
                handle=".top-bar"
                style={{
                    top: this.state.top, 
                    left: this.state.left,
                    pointerEvents: this.props.willDisappear || this.props.isUpdating ? 'none' : 'all'
                }}
                bounds="html">
                <div
                ref={this.window}
                    className="window popup update-container" >
                    <div className="top-bar">
                        <div className="buttons">
                            <div onClick={this.closeUpdate} className="close">
                                <div className="closebutton"><span><strong>x</strong></span></div>
                            </div>
                        </div>
                        <div className="title-header">Software Update</div>
                    </div>
                    <div className="update-body">
                        <div className="update-text">An update is available for your Mac.</div>
                        <div className="update-button" onClick={this.update}>Update</div>
                    </div>
                </div>
            </Draggable>
        )
    }
}
