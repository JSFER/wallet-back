import axios from 'axios'
import { notification } from 'antd'
import qs from 'qs'
import { HOST } from '@src/config'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(config => {
    Object.assign(config, {
        data: qs.stringify(config.data),
    })

    if (process.env.NODE_ENV === 'development') {
        config.url = HOST + config.url
    }

    return config
})

axios.interceptors.response.use(
    res => {
        const { data } = res

        return {
            code: data.rtnCode,
            ...data,
        }
    },
    () => {
        notification.error({
            message: '网络异常，请检查网络连接',
            description: '',
        })

        return {
            code: -1,
        }
    },
)

export default axios
