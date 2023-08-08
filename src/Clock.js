import React from 'react'
import Draggable from 'react-draggable'
import Clock from 'react-clock'

import 'react-clock/dist/Clock.css'
import './Clock.css'

export default class TopBarClock extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: new Date()
        }
    }

    componentDidMount() {
        setInterval(() => {this.setState({value: new Date()})}, 1000)
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

    renderClock = () => (
        <Clock 
            value={this.state.value}
            renderNumbers={true}
            renderMinuteMarks={false} />
    )
    render() {
      return(
        <Draggable
                onStart={this.onDragStart}
                onStop={this.onDragEnd}
                handle=".top-bar"
                bounds="html">
                <div
                    className="window popup clock" >
                    <div className="top-bar">
                        <div className="buttons">
                            <div onClick={this.close} className="close">
                                <div href="" className="closebutton"><span><strong>×</strong></span></div>
                            </div>
                        </div>
                        <div className="title-header">Clock</div>
                    </div>
                    <div className="clock-body">
                        {this.renderClock()}
                    </div>
                </div>
        </Draggable>
      )
    }
  }