import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Table, Modal } from 'antd'
import { templateColumns } from './columns'
import Money from './Money'

@connect(state => ({
    insure: state.Template.insure,
    money: state.Template.money,
}))
class InsureMoney extends React.Component {
    state = {
        detailVisible: false,
    }
    componentDidMount() {
        this.fetch()
    }
    fetch = () => {
        this.props.dispatch({
            type: 'Template/fetchInsureTemplatesAsync',
            payload: {
                pageNo: 0,
            },
        })
    }
    onPagination = () => {}
    render() {
        const { templates, pageNo, pageSize, total } = this.props.insure

        return (
            <div className="page-insure-money">
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary">添加模板</Button>
                    </Col>
                </Row>
                <Table
                    style={{ marginTop: 20 }}
                    columns={templateColumns(this)}
                    dataSource={templates}
                    pagination={{
                        current: pageNo + 1,
                        pageSize,
                        total,
                        onChange: this.onPagination,
                    }}
                />
                <Modal
                    visible={this.state.detailVisible}
                    width={innerWidth * 0.8}
                    onCancel={() => {
                        this.setState({
                            detailVisible: false,
                        })
                    }}
                    onOk={() => {
                        this.setState({
                            detailVisible: false,
                        })
                    }}
                    okText="确定"
                    cancelText="取消"
                >
                    <Money {...this.props.money} />
                </Modal>
            </div>
        )
    }
}

export default InsureMoney
