import React from 'react'

// style
import './Header.css'

export default class Header extends React.Component {
    render() {
        const date = (new Date()).toLocaleString()

        return (
            <div className="m-header">
                <div className="info">
                    {date}
                </div>
            </div>
        )
    }
}
