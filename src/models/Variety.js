import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

const Variety = {
    state: {
        varieties: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateVarieties: (state, { varieties, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.varieties = varieties.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchVarietiesAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                Variety: { pageSize },
            } = rootState
            const res = await ApiService.post(`/api/commodity/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`, {})

            if (res.code === 200) {
                dispatch({
                    type: 'Variety/updateVarieties',
                    payload: {
                        varieties: res.data.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        },
        async addVarietyAsync({ params, callback }, rootState) {
            const {
                App: { userId },
            } = rootState
            const res = await ApiService.post('/api/commodity/add', Object.assign(params, { userId }))

            if (res.code === 200) {
                callback && callback()
            }
        },
    }),
}

export default Variety
