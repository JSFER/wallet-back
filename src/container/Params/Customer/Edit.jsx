import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Input, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

@Form.create()
@connect(state => ({
    Template: state.Template,
}))

class Edit extends React.Component {
    render() {

        const { Template } = this.props
        // poundage 手续费， insure 保证金
        const { insure, poundage  } = Template
        console.log(Template)
        // 保证金
        let children = [];
        for (let i = 0; i < insure.templates.length; i++) {
            children.push(<Option key={i + 'insure'} value={insure.templates[i].id}>{insure.templates[i].feeTemplateName}</Option>);
        }
        // 手续费
        let children2 = [];
        for (let i = 0; i < poundage.templates.length; i++) {
            children2.push(<Option key={i} value={poundage.templates[i].id}>{poundage.templates[i].feeTemplateName}</Option>);
        }

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
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="客户组编号">
                            {getFieldDecorator('clientGroupNo', {
                                rules: [{ required: true, message: '客户组编号不能为空' }],
                                initialValue: '',
                            })(
                                <Select>
                                    <Option value="Y">允许交易</Option>
                                    <Option value="N">禁止交易</Option>
                                    <Option value="C">只可平仓</Option>
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="客户组名称">
                            <div>名称</div>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="手续费">
                            {getFieldDecorator('feeTemplateId', {
                                rules: [{ required: true, message: '手续费不能为空' }],
                                initialValue: '',
                            })(
                                <Select
                                  
                                    placeholder="请选择手续费"
                                >
                                    {children2}
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="保证金">
                            {getFieldDecorator('depositTemplateId', {
                                rules: [{ required: false, message: '保证金不能为空' }],
                                initialValue: '',
                            })(
                                <Select
                           
                                    placeholder="请选择保证金"
                                >
                                    {children}
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Edit