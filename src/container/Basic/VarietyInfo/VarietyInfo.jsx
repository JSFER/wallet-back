import React from 'react'
import { connect } from 'react-redux'

// modules
import { Table, Modal, Row, Col, Button, notification } from 'antd'
import Edit from './Edit'

import columns from './columns'

@connect(state => ({
    ...state.Variety,
}))
class VarietyInfo extends React.Component {
    state = {
        variety: {},
        action: 'add',
        visible: false,
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
    handleSubmit = (values, action) => {
        const actionName = action === 'add' ? 'addVarietyAsync' : 'updateVarietyAsync'

        this.props.dispatch({
            type: 'Variety/' + actionName,
            payload: {
                id: this.state.variety.id,
                params: values,
                callback: () => {
                    notification.info({
                        message: '提示',
                        description: action === 'add' ? '添加' : '更新' + '成功',
                    })
                    this.fetch()
                },
            },
        })
    }
    handleAdd = () => {
        this.setState({
            visible: true,
            variety: {},
            action: 'add'
        })
    }
    onPagination = next => {
        this.props.dispatch({
            type: 'Variety/fetchVarietiesAsync',
            payload: {
                pageNo: next - 1,
            },
        })
    }
    render() {
        const { varieties, pageNo, pageSize, total } = this.props
        const { action, variety, visible } = this.state
        const title = action === 'add' ? '添加品种' : '编辑品种'

        return (
            <div className="page-variety">
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.handleAdd}>
                            添加品种
                        </Button>
                    </Col>
                </Row>
                <Table
                    style={{ marginTop: 20 }}
                    columns={columns(this)}
                    dataSource={varieties}
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
                    okText="确认"
                    cancelText="取消"
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
                        {...variety}
                    />
                </Modal>
            </div>
        )
    }
}

export default VarietyInfo
