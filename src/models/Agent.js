import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

const Agent = {
    state: {
        agents: [],
    },
    reducers: {
        updateAgent: (state, { agents }) => {
            const nState = cloneDeep(state)

            nState.agents = agents.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchAgentAsync(){
            const res = await ApiService.post(`/api/base/clientAgent/all`)

            if( res.code === 200){
                dispatch({
                    type: 'Agent/updateAgent',
                    payload: {
                        agents: res.data.data,
                    }
                })
            }
        }
    })
}

export default Agent