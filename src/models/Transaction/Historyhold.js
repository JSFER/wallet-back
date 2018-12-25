import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

const Historyhold = {
    state: {
        Hholds: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateHholds: (state, { Hholds, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.Hholds = Hholds.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchHholdsAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                Historyhold: { pageSize },
            } = rootState
            const { clientNo } = params
            const res = await ApiService.post(`/api/trans/history/hold/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientNo
            })

            if (res.code === 200) {
                dispatch({
                    type: 'Historyhold/updateHholds',
                    payload: {
                        Hholds: res.data.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        }
    }),
}

export default Historyhold
