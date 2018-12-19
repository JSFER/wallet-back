import React from 'react'

export default class Hold extends React.Component {
    state = {
        msg: '持仓信息'
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div>{this.state.msg}</div>
        )
    }
}
