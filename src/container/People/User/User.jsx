import React from 'react'
import { connect } from 'react-redux'
import find from 'lodash/find'
import get from 'lodash/get'

// modules
import { Table, Input, Row, Col, Button, Form, Modal, notification } from 'antd'
import columns from './Columns'
import Edit from './Edit'

const FormItem = Form.Item

@Form.create()
@connect(state => ({
    User: state.User,
}))
class User extends React.Component {
    state = {
        clientId: '',
        agentId: '',
        groupId: '',
        visible: false,
        currentClientId: '',
        action: 'add',

        email: "",
        realName: "",
        userName: "",
        password: "",
        sysRoleCustomList: [],
    }
    componentDidMount() {
        this.fetch({
            pageNo: 0,
        })
    }
    fetch = payload => {
        this.props.dispatch({
            type: 'User/fetchUsersAsync',
            payload,
        })
    }
    onAddUser = () => {
        this.setState({
            action: 'add',
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
    // 添加用户
    handleSubmit = (values, action) => {
        const type = action === 'add' ? 'User/addUserAsync' : 'User/updateUserAsync'

        this.props.dispatch({
            type,
            payload: {
                id: this.state.currentClientId,
                params: {
                    email: values.email,
                    realName: values.realName,
                    sysRoleCustomList: [],
                    userName: values.userName,
                    password: values.password
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
        const { User } = this.props
        const { getFieldDecorator } = this.props.form
        const { users, pageNo, pageSize, total } = User
        const { clientId, agentId, groupId, currentClientId } = this.state
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        }
        const currentClient = find(users, ['id', currentClientId])

        return (
            <div style={{ paddingTop: 20 }}>
                {/* <Row>
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
                </Row> */}
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.onAddUser}>
                            添加用户
                        </Button>
                    </Col>
                </Row>
                <Table
                    style={{ marginTop: 20 }}
                    columns={columns(this)}
                    dataSource={users}
                    pagination={{
                        current: pageNo + 1,
                        pageSize,
                        total,
                        onChange: this.onPagination,
                    }}
                />
                <Modal
                    width={innerWidth * 0.5}
                    visible={this.state.visible}
                    okText={'确认'}
                    cancelText={'取消'}
                    title={'添加用户'}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                        })
                    }}
                    onOk={() => {
                        const form = this.modalRef.getForm()

                        form.validateFields((err, values) => {
                            if (!err) {
                                // console.log(values)
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

export default User
