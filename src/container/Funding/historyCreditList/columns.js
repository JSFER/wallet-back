import moment from "moment";

export default [
    {
        title: '客户编号（登入账号）',
        dataIndex: 'clientNo',
        key: 'clientNo',
    },
    {
        title: '商品编号',
        dataIndex: 'commodityNo',
        key: 'commodityNo',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: data => {
            return moment(data).format('YYYY-MM-DD HH:mm:ss')
        },
    },
    {
        title: '资本',
        dataIndex: 'capital',
        key: 'capital',
    },
    {
        title: '交易',
        dataIndex: 'directEnum.text',
        key: 'directEnum.text',
        // render: data => {
        //     return statusMap[data.code]
        // },
    },
    {
        title: '当前金额',
        dataIndex: 'currencyNo',
        key: 'currencyNo',
    },
    {
        title: '浮动利润',
        dataIndex: 'floatProfit',
        key: 'floatProfit',
    },
    {
        title: '基金',
        dataIndex: 'frozenFund',
        key: 'frozenFund',
    },
]
