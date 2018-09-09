import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'
import remove from 'lodash/remove'
import find from 'lodash/find'

const Product = {
    state: {
        products: [],
        current: 1,
        size: 10,
        total: 0,
    },
    reducers: {
        updateProduct: (state, { products, total, current }) => ({
            ...state,
            products,
            total,
            current,
        }),
    },
    effects: dispatch => ({
        async addProductAction({ params, cb }) {
            const res = await ApiService.post('/api/product/save', params)

            if (res.code === 0) {
                cb()
            }
        },
        async queryProductsAction({ params }) {
            const res = await ApiService.get('/api/product/query', { params })

            if (res.code === 0) {
                const { products, total, current } = res.data

                dispatch({
                    type: 'Product/updateProduct',
                    payload: {
                        products,
                        total,
                        current,
                    },
                })
            }
        },
        async deleteItemAction(
            { id, cb },
            {
                Product: { products, total, current },
            },
        ) {
            const nProducts = cloneDeep(products)
            const res = await ApiService.get(`/api/product/delete/${id}`)

            if (res.code === 0) {
                remove(nProducts, ['id', id])

                dispatch({
                    type: 'Product/updateProduct',
                    payload: {
                        products: nProducts,
                        total: total - 1,
                        current,
                    },
                })

                cb()
            }
        },
        async updateItemAction(
            { id, params, cb },
            {
                Product: { products, total, current },
            },
        ) {
            const nProducts = cloneDeep(products)
            const res = await ApiService.post(`/api/product/update/${id}`, params)

            if (res.code === 0) {
                const item = find(nProducts, ['id', id])

                Object.assign(item, params)

                dispatch({
                    type: 'Product/updateProduct',
                    payload: {
                        products: nProducts,
                        total,
                        current,
                    },
                })

                cb()
            }
        },
    }),
}

export default Product
