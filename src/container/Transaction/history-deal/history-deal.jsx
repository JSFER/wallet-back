import React from 'react'

export default class Historydeal extends React.Component {
    state = {
        msg: '历史成仓'
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div>{this.state.msg}</div>
        )
    }
}
