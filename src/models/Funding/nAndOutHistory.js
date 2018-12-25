import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

export default {
    state: {
        nAndOutHistorys: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updatenAndOutHistorys: (state, { nAndOutHistorys, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.nAndOutHistorys = nAndOutHistorys.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchnAndOutHistorysAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                NAndOutHistory: { pageSize },
            } = rootState
            const { clientNo, startDate, endDate } = params
            const res = await ApiService.post(`/api/fund/out/in/history/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientNo,
                startDate,
                endDate
            })

            if (res.code === 200) {
                dispatch({
                    type: 'NAndOutHistory/updatenAndOutHistorys',
                    payload: {
                        nAndOutHistorys: res.data && res.data.data?res.data.data: res.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        }
    }),
}
