import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

const Hold = {
    state: {
        holds: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateHolds: (state, { holds, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.holds = holds.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchHoldsAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                Hold: { pageSize },
            } = rootState
            const { clientNo } = params
            const res = await ApiService.post(`/api/trans/hold/query?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientNo
            })

            if (res.code === 200) {
                dispatch({
                    type: 'Hold/updateHolds',
                    payload: {
                        holds: res.data,
                        // total: res.data.total,
                        pageNo,
                    },
                })
            }
        }
    }),
}

export default Hold
