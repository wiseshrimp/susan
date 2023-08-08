import React from 'react'
import Draggable from 'react-draggable'

import './Update.css'

export default class Revert extends React.Component {
    constructor(props) {
        super(props)

        this.window = React.createRef()
    }

    onDragStart = ev => {
        this.props.setDragging(true)

    }

    onDragStop = ev => {
        this.props.setDragging(false)
    }

    render() {
        return (
            <Draggable
                onStart={this.onDragStart}
                onStop={this.onDragStop}
                handle=".top-bar"
                style={{
                    top: '30vh',
                    left: 'calc(50vw - 125px)'
                }}
                bounds="html">
                <div
                ref={this.window}
                    className="window popup update-container" >
                    <div className="top-bar">
                        <div className="buttons">
                            <div onClick={this.closeUpdate} className="close">
                                <div className="closebutton"><span><strong>×</strong></span></div>
                            </div>
                        </div>
                        <div className="title-header">Software Update</div>
                    </div>
                    <div className="update-body">
                        <div className="update-text">Revert back to old operating system?</div>
                        <div className="update-button" onClick={this.props.revert}>Revert</div>
                    </div>
                </div>
            </Draggable>
        )
    }
}
