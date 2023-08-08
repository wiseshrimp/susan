import React from 'react'
import Draggable from 'react-draggable'

import './Popup.css'
import './Photos.css'

export default class Delete extends React.Component {

    render() {
        return (
            <Draggable
                handle=".top-bar"
                bounds="html">
        <div className="window popup">
            <div className="top-bar">
                <div className="buttons">
                    <div className="close">
                        <div className="closebutton"><span><strong>×</strong></span></div>
                    </div>
                </div>
            </div>
            <div className="instructions-body">
                <div className="instructions-container">
                    SUSAN
                </div>

            </div>
        </div>
        </Draggable>
        )
    }
}
