import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Input, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

@Form.create()
@connect(state => ({
    User: state.User,
}))

class Edit extends React.Component {
    render() {
        const { User } = this.props
        const { roles } = User
        let children = [];
        for (let i = 0; i < roles.length; i++) {
            children.push(<Option key={i} value={roles[i].id}>{roles[i].roleName}</Option>);
        }
        const { email, realName, userName, password, sysRoleCustomList } = this.props
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        }

        return (
            <Form>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="用户邮箱">
                            {getFieldDecorator('email', {
                                rules: [
                                    { type: 'email', message: '邮箱格式错误'}, 
                                    { required: true, message: '邮箱不能为空'}
                                ],
                                initialValue: email,
                            })(<Input placeholder="请输入用户邮箱" />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="真实姓名">
                            {getFieldDecorator('realName', {
                                rules: [{ required: true, message: '真实姓名不能为空' }],
                                initialValue: realName,
                            })(<Input placeholder="请输入真实姓名" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="用户名">
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '用户名不能为空' }],
                                initialValue: userName,
                            })(<Input placeholder="请输入用户名" />)}
                        </FormItem>
                    </Col>
                    { this.props.action == 'add' ?
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="密码">
                                {getFieldDecorator('password', {
                                    rules: [
                                        { type: 'string', min: 6, message: '长度不能小于6位'}, 
                                        { required: true, message: '密码不能为空'}
                                    ],
                                    initialValue: password,
                                })(<Input placeholder="请输入密码" />)}
                            </FormItem>
                        </Col>
                        :
                        <div></div>
                    }
                    
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="分配角色">
                            {getFieldDecorator('sysRoleCustomList', {
                                rules: [{ required: true, message: '请选择分配的角色' }],
                                initialValue: sysRoleCustomList,
                            })(
                                <Select
                                    labelInValue
                                    mode="multiple"
                                    placeholder="请选择分配的角色"
                                >
                                    {children}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Edit