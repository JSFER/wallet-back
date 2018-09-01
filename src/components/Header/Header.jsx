import React from 'react'
import { connect } from 'react-redux'

// style
import './Header.css'

@connect(state => ({ username: state.App.username }))
export default class Header extends React.Component {
    render() {
        const { username } = this.props

        return (
            <div className="m-header">
                <div className="info">
                    欢迎：
                    {username}
                </div>
            </div>
        )
    }
}
