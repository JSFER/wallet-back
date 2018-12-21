export default [
    {
        title: '市场编号',
        dataIndex: 'exchangeNo',
        key: 'exchangeNo',
    },
    {
        title: '品种编号',
        dataIndex: 'commodityNo',
        key: 'commodityNo',
    },
    {
        title: '品种名称',
        dataIndex: 'commodityName',
        key: 'commodityName',
    },
    {
        title: '品种状态',
        dataIndex: 'commodityStatusEnum',
        key: 'commodityStatusEnum',
        render: data => {
            return data.text
        },
    },
    {
        title: '最小变动单位',
        dataIndex: 'minTick',
        key: 'minTick',
    },
    {
        title: '最小单位价值',
        dataIndex: 'minTickPrice',
        key: 'minTickPrice',
    },
    {
        title: '币种编号',
        dataIndex: 'currencyNo',
        key: 'currencyNo'
    },
    {
        title: '单笔最大下单量',
        dataIndex: 'maxSingleOrderVol',
        key: 'maxSingleOrderVol'
    },
    {
        title: '最大持仓量',
        dataIndex: 'maxHolVol',
        key: 'maxHolVol'
    }
]
