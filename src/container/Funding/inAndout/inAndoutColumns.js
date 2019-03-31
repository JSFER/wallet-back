import moment from "moment";

export default [
    {
        title: '出入金ID',
        dataIndex: 'id',
        key: 'outInMoneyId',
    },
    {
        title: '客户编号（登入账号）',
        dataIndex: 'clientNo',
        key: 'clientNo',
    },
    {
        title: '资金方向',
        dataIndex: 'outOrIn',
        key: 'outOrIn',
        render: (d) => {
            return d === 'O' ? '出金' : '入金'
        }
    },
    {
        title: '变动金额',
        dataIndex: 'changeMoney',
        key: 'changeMoney',
    },
    {
        title: '变动时间',
        dataIndex: 'changeTime',
        key: 'changeTime',
    },
    {
        title: '币种',
        dataIndex: 'currencyNo',
    },
    {
        title: '方式',
        dataIndex: 'mode',
        render: (m) => {
            return m == 1 ? '后台人工' : '网页自动'
        }
    },
    {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
    },
]
