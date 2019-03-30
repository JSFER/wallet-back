import ApiService from '@src/utils/ApiService'
import _ from 'lodash'

const Client = {
    state: {
        clients: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateClients: (state, { clients, total, pageNo }) => {
            const nState = _.cloneDeep(state)

            nState.clients = clients.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchClientsAsync({ pageNo = 0, params = {}, pageSize = 10 }, rootState) {
            const { clientId, agentId, groupId } = params
            const res = await ApiService.post(`/api/client/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientNo: clientId,
                clientGroupId: groupId,
                clientAgentId: agentId,
            })
            let clients = res.data.data

            dispatch({
                type: 'Agent/fetchAgentAsync',
                payload: {
                    callback: agents => {
                        clients = clients.map(client => {
                            const { clientAgentId, clientGroupId } = client

                            return {
                                ...client,
                                clientAgentName: _.chain(agents)
                                    .find(a => a.id == clientAgentId)
                                    .get('clientAgentName')
                                    .value(),
                                clientGroupName: _.chain(agents)
                                    .find(a => a.id == clientAgentId)
                                    .get('clientGroupList')
                                    .find(g => g.id == clientGroupId)
                                    .get('clientGroupName')
                                    .value(),
                            }
                        })

                        if (res.code === 200) {
                            dispatch({
                                type: 'Client/updateClients',
                                payload: {
                                    clients,
                                    total: res.data.total,
                                    pageNo,
                                },
                            })
                        }
                    },
                },
            })
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
        async updateClientAsync({ id, params, callback }) {
            const res = await ApiService.put(`/api/client/update/${id}`, params)

            if (res.code === 200) {
                callback && callback()
            }
        },
    }),
}

export default Client
