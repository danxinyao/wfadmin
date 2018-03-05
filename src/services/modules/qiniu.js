import ajax from '../fetch'
import 'whatwg-fetch'
import store from '../../vuex'
const cdn = 'http://upload.qiniu.com/'

// /lxm_uploadfiles/商家ID/当前时间年月/新文件名
// 生成文件名
export const getResourceKey = (file) => {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let suffix = file.name.split('.').pop()
    return `wf_uploadfiles/${store.getters.account}/${year.toString() + month.toString()}/${date.valueOf()}_${RndNum(4)}.${suffix}`
}

// 生成随机数
const RndNum = (n) => {
    let rnd = ''
    for (let i = 0; i < n ; i++) {
        rnd += Math.floor(Math.random() * 10)
    }

    return rnd
}

export default {
    // 获取七牛上传token
    getUploadToken(isQiniu = true, fileName = '') {
        return ajax({
            url: '/Qiniu/GetUploadToken',
            method: 'post',
            body: {
                fileName: fileName
            },
            isQiniu
        })
    },
    // 上传图片
    uploadImg(file) {
        let data = new FormData()
        data.append('key', getResourceKey(file))
        data.append('token', store.getters.qiniuUploadToken)
        data.append('file', file)
        return new Promise((resolve, reject) => {
            fetch(cdn, {
                method: 'post',
                body: data,
            })
            .then((response) => response.json())
            .then((result) => {
                if (result.key && result.key != '') {
                    resolve(result)
                }
                else {
                    reject(result)
                    throw new Error(result.error)
                }
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}