import React from 'react'
import { connect } from 'react-redux'

// modules
import { Table, Modal, Row, Col, Button, Form } from 'antd'
import columns from './columns'
import Edit from './Edit'


const FormItem = Form.Item

@Form.create()
@connect(state => ({
    Customer: state.Customer,
}))
export default class Customer extends React.Component {
    state = {
        pageNo: '',

        customer: {},
        action: 'add',
        visible: false,
    }
    componentDidMount() {
        this.fetch({
            pageNo: 0,
        })
    }
    fetch = payload => {
        this.props.dispatch({
            type: 'Customer/fetchCustomerAsync',
            payload,
        })
    }
    handleAdd = () => {
        this.setState({
            visible: true,
            action: 'add',
            contractinfo: {},
        })
    }
    onPagination = next => {
        this.fetch({
            pageNo: next - 1,
        })
    }
    render() {
        const { Customer } = this.props
        const { getFieldDecorator } = this.props.form
        const { Customers, pageNo, pageSize, total } = Customer
        const { action, visible, customer } = this.state
        const title = action === 'add' ? '添加客户组模板' : '编辑客户组模板'
        return (
            <div style={{paddingTop: 20}}>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.handleAdd}>
                            添加客户组模板
                        </Button>
                    </Col>
                </Row>
                <Table
                    style={{ marginTop: 20 }}
                    columns={columns}
                    dataSource={Customers}
                    pagination={{
                        current: pageNo + 1,
                        pageSize,
                        total,
                        onChange: this.onPagination,
                    }}
                />
                <Modal
                    width={innerWidth * 0.8}
                    visible={visible}
                    title={title}
                    okText='确认'
                    cancelText='取消'
                    onOk={() => {
                        const form = this.modalRef.getForm()

                        form.validateFields((err, values) => {
                            if (!err) {
                                this.handleSubmit(values, action)
                                form.resetFields()
                                this.setState({
                                    visible: false,
                                })
                            }
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                        })
                    }}
                >
                    <Edit
                        ref={ref => {
                            this.modalRef = ref
                        }}
                        {...customer}
                    />
                </Modal>
            </div>
        )
    }
}
