import React from 'react'

export default class Historyhold extends React.Component {
    state = {
        msg: '历史持仓'
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div>{this.state.msg}</div>
        )
    }
}
