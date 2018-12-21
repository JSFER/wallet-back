import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

const Entrust = {
    state: {
        entrusts: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateEntrusts: (state, { entrusts, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.entrusts = entrusts.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchEntrustsAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                Entrust: { pageSize },
            } = rootState
            const { clientNo } = params
            const res = await ApiService.post(`/api/trans/order/query?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientNo
            })

            if (res.code === 200) {
                dispatch({
                    type: 'Entrust/updateEntrusts',
                    payload: {
                        entrusts: res.data,
                        // total: res.data.total,
                        pageNo,
                    },
                })
            }
        }
    }),
}

export default Entrust
