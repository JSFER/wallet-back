import moment from "moment";

export default [
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
        title: '委托类型',
        dataIndex: 'orderTypeEnum',
        key: 'orderTypeEnum',
        render: data => {
            return data.text
        },
    },
    {
        title: '是否风险报单',
        dataIndex: 'riskOrderEnum',
        key: 'riskOrderEnum',
        render: data => {
            return data.text
        },
    },
    {
        title: '报单方向',
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
        title: '委托价格',
        dataIndex: 'orderPrice',
        key: 'orderPrice',  
    },
    {
        title: '委托数量',
        dataIndex: 'orderVol',
        key: 'orderVol',
    },
    {
        title: '委托时间',
        dataIndex: 'orderTime',
        key: 'orderTime',
        render: data => {
            return moment(data).format('YYYY-MM-DD HH:mm:ss')
        },
    },
    {
        title: '委托状态',
        dataIndex: 'orderStatusEnum',
        key: 'orderStatusEnum',
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
        title: '下单人',
        dataIndex: 'orderPerson',
        key: 'orderPerson',
    },
]
