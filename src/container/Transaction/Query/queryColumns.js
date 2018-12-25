import moment from "moment";

export default [
    {
        title: '客户编号',
        dataIndex: 'clientNo',
        key: 'clientNo',
    },
    {
        title: '匹配时间',
        dataIndex: 'matchTime',
        key: 'matchTime',
        render: data => {
            return moment(data).format('YYYY-MM-DD HH:mm:ss')
        },
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
