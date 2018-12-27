import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

export default {
    state: {
        contractinfos: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateContractInfos: (state, { contractinfos, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.contractinfos = contractinfos.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchContractInfosAsync({ pageNo }, rootState) {
            const {
                ContractInfo: { pageSize },
            } = rootState
            const res = await ApiService.get(`/api/contract/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`)

            if (res.code === 200) {
                dispatch({
                    type: 'ContractInfo/updateContractInfos',
                    payload: {
                        contractinfos: res.data.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        },
        // 添加
        async addContractInfoAsync({ params, callback }, rootState) {
            const {
                App: { userId },
            } = rootState
            const res = await ApiService.post('/api/contract/add', Object.assign(params, { id: userId }))

            if (res.code === 200) {
                callback && callback()
            }
        },
        // 修改
        async updateContractInfoAsync({ id, params, callback }) {
            const res = await ApiService.put(`/api/contract/update/${id}`, params)

            if (res.code === 200) {
                callback && callback()
            }
        },
        // 获取详情
        async fetchContractInfoAsync({ id, callback }) {
            const res = await ApiService.get(`/api/contract/update/query/${id}`)

            if (res.code === 200) {
                callback && callback(res.data)
            }
        },
        // 删除
        async deleteContractInfoAsync({ id, callback }) {
            const res = await ApiService.delete(`/api/contract/delete/${id}`)

            if (res.code === 200) {
                callback && callback()
            }
        },
    }),
}