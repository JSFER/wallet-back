import React from 'react'

export default class Deal extends React.Component {
    state = {
        msg: '成交信息'
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div>{this.state.msg}</div>
        )
    }
}
