import moment from "moment";

export default [
    {
        title: '客户编号',
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
        title: '匹配时间',
        dataIndex: 'matchTime',
        key: 'matchTime',
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
        title: '金额',
        dataIndex: 'matchPrice',
        key: 'matchPrice',
    },
    {
        title: '风险报单',
        dataIndex: 'riskOrderEnum.text',
        key: 'riskOrderEnum.text',
    },
    {
        title: '2',
        dataIndex: 'clientRegistDate',
        key: 'clientRegistDate',
    },
]
