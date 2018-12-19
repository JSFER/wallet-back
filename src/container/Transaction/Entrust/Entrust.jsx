import React from 'react'

export default class Entrust extends React.Component {
    state = {
        msg: '委托信息'
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div>{this.state.msg}</div>
        )
    }
}
