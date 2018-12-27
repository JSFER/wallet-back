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
        // 添加
        async addMarketInfoAsync({ params, callback }, rootState) {
            const {
                App: { userId },
            } = rootState
            const res = await ApiService.post('/api/exchange/add', Object.assign(params, { id: userId }))

            if (res.code === 200) {
                callback && callback()
            }
        },
        // 修改
        async updateMarketInfoAsync({ id, params, callback }) {
            const res = await ApiService.put(`/api/exchange/update/${id}`, params)

            if (res.code === 200) {
                callback && callback()
            }
        },
        // 获取详情
        async fetchMarketInfoAsync({ id, callback }) {
            const res = await ApiService.get(`/api/exchange/update/query/${id}`)

            if (res.code === 200) {
                callback && callback(res.data)
            }
        },
        // 删除
        async deleteMarketInfoAsync({ id, callback }) {
            const res = await ApiService.delete(`/api/exchange/delete/${id}`)

            if (res.code === 200) {
                callback && callback()
            }
        },
    }),
}