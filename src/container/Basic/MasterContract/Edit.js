import React from 'react'
import { Row, Col, Form, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

@Form.create()
class MasterEdit extends React.Component {
    render() {
        const { contractinfos } = this.props
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
                    <Col span={16}>
                        <FormItem {...formItemLayout} label="主力合约">
                            {getFieldDecorator('idList', {
                                rules: [{ required: true, message: '请选择合约' }],
                                initialValue: undefined,
                            })(
                                <Select mode="multiple">
                                    {
                                        contractinfos.map((v,key) => {
                                            return <Option key={key} value={v.id}>{v.commodityNo} {v.contractNo} {v.contractName}</Option>
                                        })
                                    }
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default MasterEdit