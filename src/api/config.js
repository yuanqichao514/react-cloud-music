import axios from 'axios'

export const baseUrl = "https://netease-cloud-music-api-eosin-one.vercel.app/"

// 拦截器配置
const axiosInstance = axios.create({
    baseURL: baseUrl
})

axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.log(err, '网络错误');
    }
)

export {
    axiosInstance
}