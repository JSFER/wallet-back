import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

const Template = {
    state: {
        insure: {
            templates: [],
            pageNo: 0,
            pageSize: 10,
            total: 0,
        },
        detail: {
            details: [],
            pageNo: 0,
            pageSize: 10,
            total: 0,
        },
        poundage: {
            templates: [],
            pageNo: 0,
            pageSize: 10,
            total: 0,
        }
    },
    reducers: {
        updateTemplates: (state, { templates, total, pageNo, type }) => {
            const nState = cloneDeep(state)
            const key = type === 0 ? 'insure' : 'poundage'

            nState[key].templates = templates.map(t => ({ key: t.id, ...t }))
            nState[key].total = total
            nState[key].pageNo = pageNo

            return nState
        },
        updateDetails: (state, { details, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.detail.details = details.map(m => ({ key: m.id, ...m }))
            nState.detail.total = total
            nState.detail.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchTemplatesAsync({ pageNo = 0, type, params = {} }, rootState) {
            const { pageSize } = rootState.Template.insure
            const res = await ApiService.get(
                `/api/feeTemplate/query/page?pageIndex=${pageNo}&pageSize=${pageSize}&type=${type}`,
            )

            if (res.code === 200) {
                dispatch({
                    type: 'Template/updateTemplates',
                    payload: {
                        templates: res.data.data,
                        total: res.data.total,
                        pageNo,
                        type
                    },
                })
            }
        },
        async fetchDetailsAsync({ id, pageNo = 0, callback }, rootState) {
            const { pageSize } = rootState.Template.detail
            const res = await ApiService.get(
                `/api/feeTemplate/commodity／query/page?feeTemplateId=${id}&pageIndex=${pageNo}&pageSize=${pageSize}`,
            )

            if (res.code === 200) {
                dispatch({
                    type: 'Template/updateDetails',
                    payload: {
                        details: res.data.data,
                        total: res.data.total,
                        pageNo,
                    },
                })

                callback && callback()
            }
        },
        async addTemplateAsync({params, callback}){
            const res = await ApiService.post(`/api/feeTemplate/add`, params)

            if(res.code === 200){
                callback && callback()
            }
        },
        async deleteTemplateAsync({ id, callback}){
            const res = await ApiService.delete(`/api/feeTemplate/delete/${id}`)

            if (res.code === 200) {
                callback()
            }
        },
        async updateTemplateAsync({id, params, callback}){
            const res = await ApiService.put(`/api/feeTemplate/update/${id}`, params)

            if (res.code === 200) {
                callback()
            }
        }
    }),
}

export default Template
