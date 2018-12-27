import moment from "moment";

export default [
    {
        title: '委托记录ID',
        dataIndex: 'orderId',
        key: 'orderId',
    },
    {
        title: '客户编号（登录帐号）',
        dataIndex: 'clientNo',
        key: 'clientNo',
    },
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
        title: '成交方向',
        dataIndex: 'directEnum',
        key: 'directEnum',
        render: data => {
            return data.text
        },
    },
    {
        title: '开仓或平仓',
        dataIndex: 'openOrCloseEnum',
        key: 'openOrCloseEnum',
        render: data => {
            return data.text
        },
    },
    {
        title: '成交价',
        dataIndex: 'matchPrice',
        key: 'matchPrice',
    },
    {
        title: '成交数量',
        dataIndex: 'matchVol',
        key: 'matchVol',
    },
    {
        title: '成交时间',
        dataIndex: 'matchTime',
        key: 'matchTime',
        render: data => {
            return moment(data).format('YYYY-MM-DD HH:mm:ss')
        },
    },
    {
        title: '手续费',
        dataIndex: 'fee',
        key: 'fee',
    },
    {
        title: '手续费币种',
        dataIndex: 'currencyNo',
        key: 'currencyNo',
    },
]
