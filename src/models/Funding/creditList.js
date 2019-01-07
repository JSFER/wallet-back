import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

export default {
    state: {
        CreditLists: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateCreditLists: (state, { CreditLists, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.CreditLists = CreditLists.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchCreditListAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                CreditList: { pageSize },
            } = rootState
            const { clientNo, startDate, endDate } = params
            const res = await ApiService.post(`/api/fund/credit/query?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientNo,
                startDate,
                endDate
            })

            if (res.code === 200) {
                dispatch({
                    type: 'CreditList/updateCreditLists',
                    payload: {
                        CreditLists: res.data && res.data.data?res.data.data: res.data,
                        // total: res.data.total,
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