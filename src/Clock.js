import React from 'react'
import Draggable from 'react-draggable'


export default class extends React.Component {
    constructor(props) {
        super(props)
    }
    close = ev => {
        this.props.closePopup(this.props.type)
    }

    onDragStart = ev => {
        this.props.setDragging(true)

    }
    onDragEnd = ev => {
        this.props.setDragging(false)
    }

    render () {
        return (
            <Draggable
                onStart={this.onDragStart}
                onStop={this.onDragEnd}
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
                    </div>
                </div>
            </Draggable>
        )
    }
}