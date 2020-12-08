import React from 'react'
import Draggable from 'react-draggable'

import './Popup.css'
import './Photos.css'
import { VIDEOS } from './constants'

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
                        <a className="closebutton"><span><strong>x</strong></span></a>
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
