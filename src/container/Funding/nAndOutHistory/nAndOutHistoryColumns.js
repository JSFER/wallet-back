import moment from "moment";

export default [
    {
        title: '客户编号',
        dataIndex: 'clientNo',
        key: 'clientNo',
    },
    {
        title: '修改金额',
        dataIndex: 'changeMoney',
        key: 'changeMoney',
    },
    {
        title: '修改时间',
        dataIndex: 'changeTime',
        key: 'changeTime',
        render: data => {
            return moment(data).format('YYYY-MM-DD HH:mm:ss')
        },
    },
    {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
    },
    {
        title: '出入列举',
        dataIndex: 'outInModeEnum.text',
        key: 'outInModeEnum.text',
        // render: data => {
        //     return statusMap[data.code]
        // },
    }
]
