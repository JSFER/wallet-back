import React from 'react'
import { connect } from 'react-redux'
import find from 'lodash/find'
import get from 'lodash/get'

// modules
import { Table, Input, Row, Col, Button, Form, Modal, notification } from 'antd'
import columns from './clientColumns'
import Edit from './Edit'

const FormItem = Form.Item

@Form.create()
@connect(state => ({
    Client: state.Client,
}))
class Client extends React.Component {
    state = {
        clientId: '',
        agentId: '',
        groupId: '',
        visible: false,
        currentClientId: '',
        action: 'add',
    }
    componentDidMount() {
        this.fetch({
            pageNo: 0,
        })
    }
    fetch = payload => {
        this.props.dispatch({
            type: 'Client/fetchClientsAsync',
            payload,
        })
    }
    onAddClient = () => {
        this.setState({
            visible: true,
        })
    }
    onPagination = next => {
        this.fetch({
            pageNo: next - 1,
        })
    }
    onQuery = () => {
        const { pageNo } = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.fetch({
                    pageNo,
                    params: values,
                })
            }
        })
    }
    handleSubmit = (values, action) => {
        const type = action === 'add' ? 'Client/addClientAsync' : 'Client/updateClientAsync'

        this.props.dispatch({
            type,
            payload: {
                id: this.state.currentClientId,
                params: {
                    clientAgentId: values.group[0],
                    clientGroupId: values.group[1],
                    clientIdNo: values.clientIdNo,
                    clientName: values.clientName,
                    clientNo: values.clientNo,
                    clientPassword: values.clientPassword,
                    clientPhone: values.clientPhone,
                    status: values.status,
                },
                callback: () => {
                    this.fetch({
                        pageNo: 0,
                    })
                    notification.info({
                        message: '提示',
                        description: `${action === 'add' ? '添加' : '更新'}成功！`,
                    })
                },
            },
        })
    }
    render() {
        const { Client } = this.props
        const { getFieldDecorator } = this.props.form
        const { clients, pageNo, pageSize, total } = Client
        const { clientId, agentId, groupId, currentClientId } = this.state
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        }
        const currentClient = find(clients, ['id', currentClientId])

        return (
            <div style={{ paddingTop: 20 }}>
                <Row>
                    <Col span={7}>
                        <FormItem {...formItemLayout} label="客户编号">
                            {getFieldDecorator('clientId', {
                                initialValue: clientId,
                            })(<Input placeholder="请输入客户编号" />)}
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...formItemLayout} label="代理人ID">
                            {getFieldDecorator('agentId', {
                                initialValue: agentId,
                            })(<Input placeholder="请输入代理人ID" />)}
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...formItemLayout} label="分组ID">
                            {getFieldDecorator('groupId', {
                                initialValue: groupId,
                            })(<Input placeholder="请输入分组ID" />)}
                        </FormItem>
                    </Col>
                    <Col span={3} style={{ textAlign: 'right', paddingTop: 4 }}>
                        <Button type="primary" onClick={this.onQuery}>
                            查询
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.onAddClient}>
                            添加客户
                        </Button>
                    </Col>
                </Row>
                <Table
                    style={{ marginTop: 20 }}
                    columns={columns(this)}
                    dataSource={clients}
                    pagination={{
                        current: pageNo + 1,
                        pageSize,
                        total,
                        onChange: this.onPagination,
                    }}
                />
                <Modal
                    width={innerWidth * 0.8}
                    visible={this.state.visible}
                    okText={'确认'}
                    cancelText={'取消'}
                    title={'添加客户'}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                        })
                    }}
                    onOk={() => {
                        const form = this.modalRef.getForm()

                        form.validateFields((err, values) => {
                            if (!err) {
                                this.handleSubmit(values, this.state.action)
                                form.resetFields()
                                this.setState({
                                    visible: false,
                                })
                            }
                        })
                    }}
                >
                    <Edit
                        ref={ref => (this.modalRef = ref)}
                        {...currentClient}
                        clientStatus={get(currentClient, 'clientStatusEnum.code')}
                    />
                </Modal>
            </div>
        )
    }
}

export default Client
