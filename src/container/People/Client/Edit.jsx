import React from 'react'
import { Row, Col, Form, Input, Select, Cascader } from 'antd'
import { connect } from 'dva'

const FormItem = Form.Item
const Option = Select.Option

@Form.create()
@connect(
    state => ({ agents: state.Agent.agents})
)
class ClientEdit extends React.Component {
    parse = (agents) => {
        
    }
    render() {
        const { clientNo, clientName, clientStatus, clientPhone, clientIdNo, clientPassword, clientAgentId, clientGroupId } = this.props
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
                        <FormItem {...formItemLayout} label="客户编号">
                            {getFieldDecorator('clientNo', {
                                rules: [{ required: true, message: '客户编号不能为空' }],
                                initialValue: clientNo,
                            })(<Input placeholder="请输入客户编号" />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="客户名称">
                            {getFieldDecorator('clientName', {
                                rules: [{ required: true, message: '客户名称不能为空' }],
                                initialValue: clientName,
                            })(<Input placeholder="请输入客户名称" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="客户状态">
                            {getFieldDecorator('status', {
                                rules: [{ required: true, message: '请选择客户状态' }],
                                initialValue: clientStatus,
                            })(
                                <Select>
                                    <Option value="Y">允许交易</Option>
                                    <Option value="N">禁止交易</Option>
                                    <Option value="C">只可平仓</Option>
                                    <Option value="D">禁止登陆</Option>
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="手机号">
                            {getFieldDecorator('clientName', {
                                rules: [{ required: true, message: '手机号不能为空' }],
                                initialValue: clientPhone,
                            })(<Input placeholder="请输入手机号" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="身份证号码">
                            {getFieldDecorator('clientIdNo', {
                                rules: [{ required: true, message: '身份证号码不能为空' }],
                                initialValue: clientIdNo,
                            })(<Input placeholder="请输入身份证号码" />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="客户密码">
                            {getFieldDecorator('clientPassword', {
                                rules: [{ required: true, message: '身份证号码不能为空' }],
                                initialValue: clientPassword,
                            })(<Input type="password" placeholder="请输入客户密码" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem {...formItemLayout} label="选择分组">
                            {getFieldDecorator('aaa', {
                                rules: [{ required: true, message: '分组不能为空' }],
                                initialValue: [clientAgentId, clientGroupId],
                            })(<Cascader options={this.parse(agents)} />)}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default ClientEdit
