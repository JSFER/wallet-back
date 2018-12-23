import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'
import { root } from 'postcss';

const Historyentrust = {
    state: {
        Hentrusts: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateHentrusts: (state, { Hentrusts, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.Hentrusts = Hentrusts.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchHentrustsAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                Historyentrust: { pageSize },
            } = rootState
            const { clientNo } = params
            const res = await ApiService.post(`/api/trans/history/order/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientNo
            })

            if (res.code === 200) {
                dispatch({
                    type: 'Historyentrust/updateHentrusts',
                    payload: {
                        Hentrusts: res.data.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        }
    }),
}

export default Historyentrust
