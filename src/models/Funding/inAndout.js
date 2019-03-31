import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

export default {
    state: {
        InAndouts: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateInAndouts: (state, { InAndouts, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.InAndouts = InAndouts.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchInAndoutAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                InAndout: { pageSize },
            } = rootState
            const { clientNo } = params
            const res = await ApiService.post(`/api/fund/out/in/query?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientNo
            })
            if (res.code === 200) {
                dispatch({
                    type: 'InAndout/updateInAndouts',
                    payload: {
                        InAndouts: res.data && res.data.data?res.data.data: res.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        },
        async addOutAndIn({ body, callback }, rootState){
            const { userId } = rootState.App
            const res = await ApiService.post(`/api/fund/out/in/add`, {
                ...body,
                userId
            })

            if (res.code === 200) {
                callback && callback()
                dispatch({
                    type: 'InAndout/fetchInAndoutAsync',
                    payload: {
                        pageNo: 0
                    }
                })
            }
        }
    }),
}
