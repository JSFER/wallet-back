import React from 'react'
import { Row, Col, Form, Input, Select, Button, Table, Modal, notification } from 'antd'
import { connect } from 'react-redux'
import find from 'lodash/find'

// style
import './ProductManage.css'

// components
import Edit from './Edit'
import columnsGenerator from './columns'

const FormItem = Form.Item
const Option = Select.Option

@connect(state => ({
    ...state.Product,
}))
@Form.create()
export default class ProductManage extends React.Component {
    editModalRef = null
    state = {
        editModalVisible: false,
        currentProduct: null,
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'Product/queryProductsAction',
            payload: {
                params: {
                    current: 1,
                    size: 10,
                },
            },
        })
    }
    handleEditSubmit = values => {
        this.props.dispatch({
            type: 'Product/updateItemAction',
            payload: {
                id: this.state.currentProduct.id,
                params: values,
                cb: () => {
                    notification.info({
                        message: '提示',
                        description: '更新成功！',
                    })
                },
            },
        })
    }
    handleQuerySubmit = e => {
        e.preventDefault()
    }
    handleItemDelete = id => {
        Modal.confirm({
            title: '确认删除',
            content: '确认要删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                this.props.dispatch({
                    type: 'Product/deleteItemAction',
                    payload: {
                        id,
                        cb: () => {
                            notification.info({
                                message: '提示',
                                description: '删除成功！',
                            })
                        },
                    },
                })
            },
        })
    }
    handleItemEdit = id => {
        const item = find(this.props.products, ['id', id])

        this.setState({
            editModalVisible: true,
            currentProduct: item,
        })
    }
    handlePageChage = next => {
        this.props.dispatch({
            type: 'Product/queryProductsAction',
            payload: {
                params: {
                    current: next,
                    size: 10,
                },
            },
        })
    }
    render() {
        const { products, current, size, total } = this.props
        const { getFieldDecorator } = this.props.form
        const columns = columnsGenerator(this.handleItemDelete, this.handleItemEdit)
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
                <Form onSubmit={this.handleQuerySubmit}>
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
                        dataSource={products}
                        pagination={{
                            current,
                            pageSize: size,
                            total,
                            onChange: this.handlePageChage,
                        }}
                    />
                </div>
                <Modal
                    width={800}
                    visible={this.state.editModalVisible}
                    title={'产品编辑'}
                    onOk={() => {
                        const form = this.editModalRef.getForm()

                        form.validateFields((err, values) => {
                            if (!err) {
                                this.handleEditSubmit(values)
                                form.resetFields()
                                this.setState({
                                    editModalVisible: false,
                                })
                            }
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            editModalVisible: false,
                        })
                    }}
                >
                    <Edit
                        ref={ref => {
                            this.editModalRef = ref
                        }}
                        {...this.state.currentProduct}
                    />
                </Modal>
            </div>
        )
    }
}
