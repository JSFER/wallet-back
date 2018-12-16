import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import className from 'classnames'
import get from 'lodash/get'

import './Agent.css'

@connect(state => ({ ...state.Agent }))
class Agent extends React.Component {
    state = {
        currentAgentId: 0,
        groups: [],
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'Agent/fetchAgentAsync',
            payload: {
                callback: agents => {
                    this.onAgentItemClick(get(agents, '[0]'), 0)
                },
            },
        })
    }
    onGroupItemClick = (group ) => {
    }
    onAgentItemClick = (agent, idx) => {
        this.setState({
            currentAgentId: idx,
            groups: agent.clientGroupList,
        })
    }
    renderAgents = () => {
        const { agents } = this.props

        return (
            <div className="items">
                {agents.map((agent, idx) => {
                    const { currentAgentId } = this.state
                    const cls = className({
                        item: true,
                        active: idx === currentAgentId,
                    })
                    return (
                        <div key={agent.id} className={cls} onClick={this.onAgentItemClick.bind(this, agent, idx)}>
                            <div className="name">{agent.clientAgentName}</div>
                            <div className="button">
                                <Button type="primary" size="small" ghost>
                                    编辑
                                </Button>
                            </div>
                            <div className="button">
                                <Button type="danger" size="small" ghost>
                                    删除
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    renderGroups = () => {
        const { groups } = this.state

        return (
            <div className="items groups">
                {groups.map((group) => {
                    return (
                        <div key={group.id} className="item" onGroupItemClick={this.onGroupItemClick.bind(this, group)}>
                            <div className="name">{group.clientGroupName}</div>
                            <div className="button">
                                <Button type="primary" size="small" ghost>
                                    编辑
                                </Button>
                            </div>
                            <div className="button">
                                <Button type="danger" size="small" ghost>
                                    删除
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    render() {
        return (
            <div className="p-agent">
                <div className="box">
                    <div className="agent-box">
                        <div className="title">代理人</div>
                        {this.renderAgents()}
                    </div>
                    <div className="group-box">
                        <div className="title">分组</div>
                        {this.renderGroups()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Agent
