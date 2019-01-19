import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

const breadcrumbNameMap = {
    '/basic/exchangeRate': '基础设置 / 币种汇率信息',
    '/basic/marketInfo': '基础设置 / 市场信息',
    '/basic/varietyInfo' : '基础设置 / 品种信息',
    '/basic/contractInfo' : '基础设置 / 合约信息',
    '/basic/masterContract' : '基础设置 / 主力合约',

    '/people/user': '人员管理 / 用户管理',
    '/people/client': '人员管理 / 客户管理',
    '/people/agent': '人员管理 / 代理人管理',

    '/params/insureMoney': '参数信息 / 保证金模板信息',
    '/params/poundage': '参数信息 / 手续费模板信息',

    // 交易查询
    '/transaction/query': '交易查询 / 成交信息',
    '/transaction/entrust': '交易查询 / 委托信息',
    // '/transaction/deal': '交易查询 / 成交信息',
    '/transaction/hold': '交易查询 / 持仓信息',
    '/transaction/history-entrust': '交易查询 / 历史委托',
    '/transaction/history-deal': '交易查询 / 历史成交',
    '/transaction/history-hold': '交易查询 / 历史持仓',
}

@withRouter
class BreadcrumbCustom extends Component {
    render() {
        return <div style={{fontSize: 13, padding: 12}}>{breadcrumbNameMap[this.props.history.location.pathname]}</div>
    }
}

export default BreadcrumbCustom
