import React from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Form, Input, notification } from 'antd'
import className from 'classnames'
import get from 'lodash/get'

import './Agent.css'

@connect(state => ({ ...state.Agent }))
class Agent extends React.Component {
    state = {
        currentAgentIdx: 0,
        groups: [],
        addGroupModalVisible: false,
        groupNoValue: '',
        groupNameValue: '',
    }
    componentDidMount() {
        this.fetch()
    }
    fetch = () => {
        this.props.dispatch({
            type: 'Agent/fetchAgentAsync',
            payload: {
                callback: agents => {
                    this.onAgentItemClick(get(agents, '[0]'), 0)
                },
            },
        })
    }
    onGroupItemClick = group => {}
    onAgentItemClick = (agent, idx) => {
        this.setState({
            currentAgentIdx: idx,
            groups: agent.clientGroupList,
        })
    }
    renderAgents = () => {
        const { agents } = this.props

        return (
            <div className="items">
                {agents.map((agent, idx) => {
                    const { currentAgentIdx } = this.state
                    const cls = className({
                        item: true,
                        active: idx === currentAgentIdx,
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
    onAgentAdd = () => {}
    onGroupAdd = () => {
        const { agents } = this.props

        if (!agents.length) {
            Modal.info({
                title: '提示',
                content: '请先添加代理人',
            })
        } else {
            this.setState({
                addGroupModalVisible: true,
            })
        }
    }
    renderGroups = () => {
        const { groups } = this.state

        return (
            <div className="items groups">
                {groups.map(group => {
                    return (
                        <div key={group.id} className="item" onClick={this.onGroupItemClick.bind(this, group)}>
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
                        <div className="title">
                            <span>代理人</span>
                            <Button onClick={this.onAgentAdd} type="primary" size="small" ghost>
                                +添加
                            </Button>
                        </div>
                        {this.renderAgents()}
                    </div>
                    <div className="group-box">
                        <div className="title">
                            <span>分组</span>
                            <Button onClick={this.onGroupAdd} type="primary" size="small" ghost>
                                +添加
                            </Button>
                        </div>
                        {this.renderGroups()}
                    </div>
                </div>
                <Modal
                    visible={this.state.addGroupModalVisible}
                    title={'添加分组'}
                    okText={'确认'}
                    cancelText={'取消'}
                    destroyOnClose
                    onOk={() => {
                        const { agents } = this.props
                        const { currentAgentIdx } = this.state

                        this.props.dispatch({
                            type: 'Agent/addGroupAsync',
                            payload: {
                                params: {
                                    clientAgentId: agents[currentAgentIdx].id,
                                    clientGroupNo: this.state.groupNoValue,
                                    clientGroupName: this.state.groupNameValue,
                                },
                                callback: () => {
                                    notification.info({
                                        message: '提示',
                                        description: '添加分组成功',
                                    })
                                    this.fetch()
                                    this.setState({
                                        addGroupModalVisible: false
                                    })
                                },
                            },
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            addGroupModalVisible: false,
                        })
                    }}
                >
                    <React.Fragment>
                        <Form.Item label="分组编号">
                            <Input
                                value={this.state.groupNoValue}
                                onChange={e => {
                                    this.setState({ groupNoValue: e.target.value })
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="分组名称">
                            <Input
                                value={this.state.groupNameValue}
                                onChange={e => {
                                    this.setState({ groupNameValue: e.target.value })
                                }}
                            />
                        </Form.Item>
                    </React.Fragment>
                </Modal>
            </div>
        )
    }
}

export default Agent
