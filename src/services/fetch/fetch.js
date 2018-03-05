// 引入window.fetch polyfill
import 'whatwg-fetch'
import { rootPath, qiniuApi } from './config'
import actions from '../../vuex/actions'
import store from '../../vuex'
import { Notification } from 'element-ui'

/**
 * 检查ajax返回的状态码,如果为401,则跳转到登录页
 * @param response
 * @returns {*}
 */
const checkStatus = function(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        // 如果没有登录,则跳转到登录页面
        if (response.status == 401) {
            window.location = '/login'
        }
        const error = new Error(response.statusText)
        error.response = response
        throw error
    }
}
/**
 * 参数为空时报错
 * @param param {string} 参数名
 */
const throwIfMissing = function(param) {
    throw new Error(param + '不能为空')
}
/**
 *
 * @param url {string}  接口路径,必填
 * @param body {object | array} data,传送给后端的数据
 * @param headers {object} 请求头
 * @param method {string} 请求方法 主要是'get'和'post',默认为get
 * @param path {string} 接口路径,默认为'/Api'
 * @param isShowFullLoading {boolean} 是否显示全屏loading动画,默认为false
 * @param auth {boolean} 是否需要口令
 * @param localLoading {boolean | string} 显示区域动画
 * @param isShowErrorTip {boolean} 是否显示错误信息,默认为true
 * @returns {Promise}
 */
const ajax = ({
    url = throwIfMissing('url'),
    formJson = true,
    body = null,
    headersData = { 'Content-Type': 'application/json; charset=utf-8' },
    method = 'get',
    path = rootPath,
    isShowFullLoading = false,
    auth = false,
    localLoading = false,
    isShowErrorTip = true,
    isQiniu = false,
}) => {
    let headers = {}
    if (auth && formJson) {
        headers = {
            ...headersData,
            Authorization: 'Bearer ' + store.getters.authToken
        }
    }
    else {
        headers = headersData
    }

    // 如果是调用的qiniu相关接口
    if (isQiniu) {
        path = qiniuApi
    }
    
    const options = {
        // credentials: 'same-origin', // 发送cookie
        // credentials: 'include', // cross-origin  调试用 上线删
        // withCredentials: true,  // cross-origin cookie  调试用 上线删
        method,
        headers,
    }

    let bodyString = ''
    if (formJson) {
        bodyString = JSON.stringify(body)
    } else {
        bodyString = Object.keys(body).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(body[key])
        }).join('&')
    }
    if (bodyString !== 'null') {
        options.body = bodyString
    }

    return new Promise((resolve, reject) => {
        // 显示全屏动画
        if (isShowFullLoading) {
            actions.showFullLoading(store, true)
        }
        // 显示局部动画
        if (localLoading) {
            actions.showLocalLoading(store, localLoading)
        }
        fetch(path + url, options)
            .then(checkStatus)
            .then((response) => response.json())
            .then((result) => {
                if (!formJson) {
                    resolve(result)
                }
                // 登录超时
                if (result.code == 40001) {
                    window.location = '/login'
                    return
                }
                // 返回正确数据
                if (result.code == 0) {
                    resolve(result.data)
                } 
                else if (result.code == 1) {
                    reject(result.message)
                    throw new Error(result.message)
                    
                    this.$message.warning('没有数据')
                } 
                else {
                    // 返回错误的数据
                    reject(result.message)
                    throw new Error(result.message)

                    Notification({
                        title: '接口' + url + '错误',
                        message: result.message,
                        type: 'error'
                    })
                }
                // 关闭全屏动画
                if (isShowFullLoading) {
                    actions.showFullLoading(store, false)
                }
                // 关闭局部动画
                if (localLoading) {
                    actions.showLocalLoading(store, '')
                }
            })
            .catch((error) => {
                // 关闭全屏动画
                if (isShowFullLoading) {
                    actions.showFullLoading(store, false)
                }
                // 关闭局部动画
                if (localLoading) {
                    actions.showLocalLoading(store, '')
                }
                // 显示错误提示
                reject(error)
                Notification({
                    title: '接口' + url + '错误',
                    // title: '错误',
                    message: error.message,
                    type: 'error'
                })
            })
    })
}

export default ajax