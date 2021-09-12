import axios from 'axios'

let devBasePath = "http://localhost:8888/api/"
axios.defaults.timeout = 5000
axios.defaults.baseURL = devBasePath
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//请求拦截器
axios.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem('token')
        if (token) {
            config.headers = {
                'X-token': token
            }
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === 4003) {
            //禁用
            return false;
        }
        if (response.data.code === -1) {
            //未登录或者登录超时
            // localStorage.removeItem('token')
            // router.push({
            //   path:"/login",
            //   querry:{redirect: router.currentRoute.fullPath}//从哪个页面跳转
            // })
        }
        return response
    },
    err => {
        //   if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
        //     Toast({
        //         mes: '网络异常，连接超时...',
        //         timeout: 1500
        //     });
        //   }
        //网络超时
        return Promise.reject(err)
    }
)

export function get(url, params = {}, headers = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params,
                headers: headers
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}