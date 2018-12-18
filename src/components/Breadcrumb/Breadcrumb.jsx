import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

const breadcrumbNameMap = {
    '/basic/exchangeRate': '基础设置 / 币种汇率信息',
    '/basic/varietyInfo' : '基础设置 / 品种信息',
    '/people/client': '人员管理 / 客户管理',
    '/people/agent': '人员管理 / 代理人管理',
    '/params/insureMoney': '参数信息 / 保证金信息'
}

@withRouter
class BreadcrumbCustom extends Component {
    render() {
        return <div style={{fontSize: 13, padding: 12}}>{breadcrumbNameMap[this.props.history.location.pathname]}</div>
    }
}

export default BreadcrumbCustom
