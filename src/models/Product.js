import ApiService from '@src/utils/ApiService'

const Product = {
    state: {},
    reducers: {},
    effects: () => ({
        async addProductAction({ params, cb }) {
            const res = await ApiService.post('/api/product/save', params)

            if (res.code === 0) {
                cb()
            }
        },
    }),
}

export default Product
