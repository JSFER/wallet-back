import React from 'react'
import { Row, Col, Form, Input, Select, Button, Table } from 'antd'
import { connect } from 'react-redux'
import columns from './columns'

// style
import './ProductManage.css'

const FormItem = Form.Item
const Option = Select.Option

const data = [
    {
        name: 123,
        profile: '123',
        status: 0,
        url: 123412314,
        limit: 123,
        applyForCount: 1234,
        type: 123,
    },
    {
        name: 123,
        type: 123,
        profile: '123',
        status: 0,
        url: 123412314,
        limit: 123,
        applyForCount: 1234,
    },
]

@connect()
@Form.create()
export default class ProductManage extends React.Component {
    handleSubmit = e => {
        e.preventDefault()
    }
    render() {
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
            <div className="page-product-manage">
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="产品名称">
                                {getFieldDecorator('name')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="产品类别">
                                {getFieldDecorator('type', {
                                    initialValue: 'all',
                                })(
                                    <Select>
                                        <Option value="all">全部</Option>
                                    </Select>,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="产品状态">
                                {getFieldDecorator('status', {
                                    initialValue: -1,
                                })(
                                    <Select>
                                        <Option value={-1}>全部</Option>
                                        <Option value={0}>下架</Option>
                                        <Option value={1}>上架</Option>
                                    </Select>,
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <div className="table-wrapper">
                    <Table
                        rowSelection={{
                            onChange: (selectedRowKeys, selectedRows) => {
                                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
                            },
                            getCheckboxProps: record => ({
                                name: record.name,
                            }),
                        }}
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>
        )
    }
}
