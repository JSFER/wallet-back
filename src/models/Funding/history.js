import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

export default {
    state: {
        Historys: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateHistorys: (state, { Historys, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.Historys = Historys.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchHistoryAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                History: { pageSize },
            } = rootState
            const { clientNo, startDate, endDate } = params
            const res = await ApiService.post(`/api/fund/history/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientNo,
                startDate,
                endDate
            })

            if (res.code === 200) {
                dispatch({
                    type: 'History/updateHistorys',
                    payload: {
                        Historys: res.data && res.data.data?res.data.data: res.data,
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