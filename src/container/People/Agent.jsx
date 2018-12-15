import React from 'react'

import './Agent.css'

class Agent extends React.Component {
    render() {
        return (
            <div className="p-agent">
                <div className="box">
                    <div className="agent-box">
                        <div className="title">代理人</div>
                    </div>
                    <div className="group-box">
                        <div className="title">分组</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Agent
