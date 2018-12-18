export default [
    {
        title: '币种编号',
        dataIndex: 'currencyNo',
        key: 'currencyNo',
    },
    {
        title: '币种名称',
        dataIndex: 'currencyName',
        key: 'currencyName',
    },
    {
        title: '汇率',
        dataIndex: 'exchangeRate',
        key: 'exchangeRate',
    },
    {
        title: '是否基币',
        dataIndex: 'currencyStatusEnum',
        key: 'currencyStatusEnum',
        render: data => {
            return data.text
        },
    },
    {
        title: '修改时间',
        dataIndex: 'modifyDateTime',
        key: 'modifyDateTime',
    },
    {
        title: '修改操作员编号',
        dataIndex: 'userId',
        key: 'userId',
    },
]
