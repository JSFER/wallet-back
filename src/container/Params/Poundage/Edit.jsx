import React from 'react'
import { Transfer, Row, Col, Input, Form } from 'antd'
import { connect } from 'react-redux'
import get from 'lodash/get'
import find from 'lodash/find'

const FormItem = Form.Item

@Form.create()
@connect(state => ({
    ...state.Variety,
}))
class Edit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            targetKeys: props.mode === 'add' ? [] : props.details.map(d => d.commodityNo),
            selectedKeys: [],
        }
    }
    componentDidMount() {
        this.fetch()
    }
    fetch = () => {
        const { dispatch } = this.props

        dispatch({
            type: 'Variety/fetchVarietiesAsync',
            payload: {
                pageNo: 0,
            },
        })
    }
    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({
            selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
        })
    }
    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({
            targetKeys: nextTargetKeys,
        })
    }
    render() {
        const { varieties, feeTemplateName, remark } = this.props
        const { targetKeys, selectedKeys } = this.state
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 10,
            },
        }
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="模板名称">
                            {getFieldDecorator('feeTemplateName', {
                                rules: [{ required: true, message: '模板名称不能为空' }],
                                initialValue: feeTemplateName,
                            })(<Input placeholder="请输入模板名称" />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="备注">
                            {getFieldDecorator('remark', {
                                initialValue: remark,
                            })(<Input placeholder="请输入备注" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex">
                    <Col offset={1} span={13}>
                        <Transfer
                            dataSource={varieties.map( v => ({...v, key: v.commodityNo}))}
                            targetKeys={targetKeys}
                            selectedKeys={selectedKeys}
                            titles={['品种列表', '已选中']}
                            render={item => item.commodityName}
                            onSelectChange={this.handleSelectChange}
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col span={10}>
                        {targetKeys.map(tk => (
                            <FormItem
                                key={tk}
                                {...{ labelCol: { span: 14 }, wrapperCol: { span: 10 } }}
                                label={`${get(find(varieties, v => v.commodityNo === tk), 'commodityName')}的费率`}
                            >
                                {getFieldDecorator(`fee_${tk}`, {
                                    rules: [{ required: true, message: '费率不能为空' }],
                                    initialValue: get(find(this.props.details, d => d.commodityNo === tk), 'fee')
                                })(<Input type="number" placeholder={`请输入的费率`} />)}
                            </FormItem>
                        ))}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Edit
