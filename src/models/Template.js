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
        money: {
            moneys: [],
            pageNo: 0,
            pageSize: 10,
            total: 0,
        },
    },
    reducers: {
        updateInsureTemplates: (state, { templates, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.insure.templates = templates.map(t => ({ key: t.id, ...t }))
            nState.insure.total = total
            nState.insure.pageNo = pageNo

            return nState
        },
        updateInsureMoneys: (state, { moneys, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.money.moneys = moneys.map(m => ({ key: m.id, ...m }))
            nState.money.total = total
            nState.money.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchInsureTemplatesAsync({ pageNo = 0, params = {} }, rootState) {
            const { pageSize } = rootState.Template.insure
            const res = await ApiService.get(
                `/api/feeTemplate/query/page?pageIndex=${pageNo}&pageSize=${pageSize}&type=0`,
            )

            if (res.code === 200) {
                dispatch({
                    type: 'Template/updateInsureTemplates',
                    payload: {
                        templates: res.data.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        },
        async fetchInsureMoneysAsync({ id, pageNo = 0, params = {}, callback }, rootState) {
            const { pageSize } = rootState.Template.money
            const res = await ApiService.get(
                `/api/feeTemplate/commodity／query/page?feeTemplateId=${id}&pageIndex=${pageNo}&pageSize=${pageSize}`,
            )

            if (res.code === 200) {
                dispatch({
                    type: 'Template/updateInsureMoneys',
                    payload: {
                        moneys: res.data.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        },
    }),
}

export default Template
