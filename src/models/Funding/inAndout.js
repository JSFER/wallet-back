import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

const inAndout = {
    state: {
        clients: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateClients: (state, { clients, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.clients = clients.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchDealsAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                Client: { pageSize },
            } = rootState
            const { clientId, agentId, groupId } = params
            const res = await ApiService.post(`/api/client/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientIdNo: clientId,
                clientGroupId: groupId,
                clientAgentId: agentId
            })

            if (res.code === 200) {
                dispatch({
                    type: 'Client/updateClients',
                    payload: {
                        clients: res.data.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        },
        async addClientAsync({ params, callback }, rootState) {
            const {
                App: { userId },
            } = rootState
            const res = await ApiService.post('/api/client/add', Object.assign(params, { userId }))

            if (res.code === 200) {
                callback && callback()
            }
        },
    }),
}

export default inAndout
