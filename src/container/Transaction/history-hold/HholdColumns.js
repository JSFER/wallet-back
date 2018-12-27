import moment from "moment";

export default [
    {
        title: '委托记录ID',
        dataIndex: 'orderId',
        key: 'orderId',
    },
    // {
    //     title: '客户编号（登录帐号）',
    //     dataIndex: 'clientNo',
    //     key: 'clientNo',
    // },
    {
        title: '品种编号',
        dataIndex: 'commodityNo',
        key: 'commodityNo',
    },
    {
        title: '合约编号',
        dataIndex: 'contractNo',
        key: 'contractNo',
    },
    {
        title: '持仓方向',
        dataIndex: 'directEnum',
        key: 'directEnum',
        render: data => {
            return data.text
        },
    },
    {
        title: '持仓价',
        dataIndex: 'holdPrice',
        key: 'holdPrice',
    },
    {
        title: '持仓数量',
        dataIndex: 'holdVol',
        key: 'holdVol',
    },
    {
        title: '成交时间',
        dataIndex: 'matchTime',
        key: 'matchTime',
        render: data => {
            return moment(data).format('YYYY-MM-DD HH:mm:ss')
        },
    },
]
