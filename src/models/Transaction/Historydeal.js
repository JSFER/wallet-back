import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'
import { root } from 'postcss';

const Historydeal = {
    state: {
        Hdeals: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateHdeals: (state, { Hdeals, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.Hdeals = Hdeals.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchHdealsAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                Historydeal: { pageSize },
            } = rootState
            const { clientNo } = params
            const res = await ApiService.post(`/api/trans/history/match/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientNo
            })

            if (res.code === 200) {
                dispatch({
                    type: 'Historydeal/updateHdeals',
                    payload: {
                        Hdeals: res.data.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        }
    }),
}

export default Historydeal
