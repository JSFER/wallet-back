import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

const Query = {
    state: {
        querys: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateQuerys: (state, { querys, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.querys = querys.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchQuerysAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                Query: { pageSize },
            } = rootState
            const { clientNo } = params
            const res = await ApiService.post(`/api/trans/match/query?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientNo
            })

            if (res.code === 200) {
                dispatch({
                    type: 'Query/updateQuerys',
                    payload: {
                        querys: res.data,
                        // total: res.data.total,
                        pageNo,
                    },
                })
            }
        }
    }),
}

export default Query
