import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

export default {
    state: {
        HistoryCreditLists: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateHistoryCreditLists: (state, { HistoryCreditLists, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.HistoryCreditLists = HistoryCreditLists.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchHistoryCreditListAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                HistoryCreditList: { pageSize },
            } = rootState
            const { clientNo, startDate, endDate } = params
            const res = await ApiService.post(`/api/fund/credit/history/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientNo,
                startDate,
                endDate
            })

            if (res.code === 200) {
                dispatch({
                    type: 'HistoryCreditList/updateHistoryCreditLists',
                    payload: {
                        HistoryCreditLists: res.data && res.data.data?res.data.data: res.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        },
        // async addClientAsync({ params, callback }, rootState) {
        //     const {
        //         App: { userId },
        //     } = rootState
        //     const res = await ApiService.post('/api/fund/history/query/page', Object.assign(params, { userId }))

        //     if (res.code === 200) {
        //         callback && callback()
        //     }
        // },
    }),
}