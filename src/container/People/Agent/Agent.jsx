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
        groupModalMode: 'add',
        addGroupModalVisible: false,
        groupNoValue: '',
        groupNameValue: '',
        agentModalMode: 'add',
        addAgentModalVisible: false,
        agentNoValue: '',
        agentNameValue: '',
        currentAgentId: '',
        currentGroupId: '',
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
                                <Button
                                    type="primary"
                                    size="small"
                                    ghost
                                    onClick={() => {
                                        this.setState({
                                            agentModalMode: 'edit',
                                            addAgentModalVisible: true,
                                            agentNameValue: agent.clientAgentName,
                                            agentNoValue: agent.clientAgentNo,
                                            currentAgentId: agent.id,
                                        })
                                    }}
                                >
                                    编辑
                                </Button>
                            </div>
                            <div className="button">
                                <Button
                                    type="danger"
                                    size="small"
                                    ghost
                                    onClick={() => {
                                        Modal.confirm({
                                            title: '确定要删除吗？',
                                            onOk: () => {
                                                this.props.dispatch({
                                                    type: 'Agent/deleteAgentAsync',
                                                    payload: {
                                                        id: agent.id,
                                                        callback: () => {
                                                            this.fetch()
                                                            notification.info({
                                                                message: '提示',
                                                                description: '删除成功',
                                                            })
                                                        },
                                                    },
                                                })
                                            },
                                        })
                                    }}
                                >
                                    删除
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    onAgentAdd = () => {
        this.setState({
            agentModalMode: 'add',
            addAgentModalVisible: true,
        })
    }
    onGroupAdd = () => {
        const { agents } = this.props

        if (!agents.length) {
            Modal.info({
                title: '提示',
                content: '请先添加代理人',
            })
        } else {
            this.setState({
                groupModalMode: 'edit',
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
                                <Button
                                    type="primary"
                                    size="small"
                                    ghost
                                    onClick={() => {
                                        this.setState({
                                            groupModalMode: 'edit',
                                            addGroupModalVisible: true,
                                            groupNameValue: group.clientGroupName,
                                            groupNoValue: group.clientGroupNo,
                                            currentGroupId: group.id,
                                        })
                                    }}
                                >
                                    编辑
                                </Button>
                            </div>
                            <div className="button">
                                <Button
                                    type="danger"
                                    size="small"
                                    ghost
                                    onClick={() => {
                                        Modal.confirm({
                                            title: '确定要删除吗？',
                                            onOk: () => {
                                                this.props.dispatch({
                                                    type: 'Agent/deleteGroupAsync',
                                                    payload: {
                                                        id: group.id,
                                                        callback: () => {
                                                            this.fetch()
                                                            notification.info({
                                                                message: '提示',
                                                                description: '删除成功',
                                                            })
                                                        },
                                                    },
                                                })
                                            },
                                        })
                                    }}
                                >
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
                    visible={this.state.addAgentModalVisible}
                    title={'添加代理人'}
                    okText={'确认'}
                    cancelText={'取消'}
                    destroyOnClose
                    onOk={() => {
                        const isAdding = this.state.agentModalMode === 'add'

                        this.props.dispatch({
                            type: isAdding ? 'Agent/addAgentAsync' : 'Agent/updateAgentAsync',
                            payload: {
                                id: this.state.currentAgentId,
                                params: {
                                    clientAgentNo: this.state.agentNoValue,
                                    clientAgentName: this.state.agentNameValue,
                                },
                                callback: () => {
                                    notification.info({
                                        message: '提示',
                                        description: isAdding ? '添加' : '更新' + '代理人成功',
                                    })
                                    this.fetch()
                                    this.setState({
                                        addAgentModalVisible: false,
                                        agentNameValue: '',
                                        agentNoValue: '',
                                    })
                                },
                            },
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            addAgentModalVisible: false,
                        })
                    }}
                >
                    <React.Fragment>
                        <Form.Item label="代理人编号">
                            <Input
                                value={this.state.agentNoValue}
                                onChange={e => {
                                    this.setState({ agentNoValue: e.target.value })
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="代理人名称">
                            <Input
                                value={this.state.agentNameValue}
                                onChange={e => {
                                    this.setState({ agentNameValue: e.target.value })
                                }}
                            />
                        </Form.Item>
                    </React.Fragment>
                </Modal>
                <Modal
                    visible={this.state.addGroupModalVisible}
                    title={'添加分组'}
                    okText={'确认'}
                    cancelText={'取消'}
                    destroyOnClose
                    onOk={() => {
                        const { agents } = this.props
                        const { currentAgentIdx, groupModalMode, currentGroupId } = this.state
                        const isAdding = groupModalMode === 'add'

                        this.props.dispatch({
                            type: isAdding ? 'Agent/addGroupAsync' : 'Agent/updateGroupAsync',
                            payload: {
                                id: currentGroupId,
                                params: {
                                    clientAgentId: agents[currentAgentIdx].id,
                                    clientGroupNo: this.state.groupNoValue,
                                    clientGroupName: this.state.groupNameValue,
                                },
                                callback: () => {
                                    notification.info({
                                        message: '提示',
                                        description: isAdding ? '添加' : '更新' + '分组成功',
                                    })
                                    this.fetch()
                                    this.setState({
                                        addGroupModalVisible: false,
                                        groupNameValue: '',
                                        groupNoValue: '',
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
