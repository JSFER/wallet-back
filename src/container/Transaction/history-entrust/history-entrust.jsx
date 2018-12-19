import React from 'react'

export default class Historyentrust extends React.Component {
    state = {
        msg: '历史委托'
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div>{this.state.msg}</div>
        )
    }
}
