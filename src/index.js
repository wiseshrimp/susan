
import reportWebVitals from './reportWebVitals';
import React from 'react'
import ReactDOM from 'react-dom'
import './animations.css'
import './index.css'
import './media.css'

import Desktop from './Desktop'

ReactDOM.render(<Desktop />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals()
