import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

export default {
    state: {
        marketinfos: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateMarketinfos: (state, { marketinfos, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.marketinfos = marketinfos.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchMarketinfosAsync({ pageNo }, rootState) {
            const {
                MarketInfo: { pageSize },
            } = rootState
            const res = await ApiService.get(`/api/exchange/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`)

            if (res.code === 200) {
                dispatch({
                    type: 'MarketInfo/updateMarketinfos',
                    payload: {
                        marketinfos: res.data.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        },
        async addMarketInfoAsync({ params, callback }, rootState) {
            const {
                App: { id },
            } = rootState
            const res = await ApiService.post('/api/exchange/add', Object.assign(params, { id }))

            if (res.code === 200) {
                callback && callback()
            }
        },
    }),
}