export default [
    {
        title: '客户编号',
        dataIndex: 'contractNo',
        key: 'contractNo',
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
        title: '1',
        dataIndex: 'clientIdNo',
        key: 'clientIdNo',
    },
    {
        title: '2',
        dataIndex: 'clientRegistDate',
        key: 'clientRegistDate',
    },
]
