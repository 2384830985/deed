// 支持 async
import regeneratorRuntime from '../utils/runtime'

/**
 * 请求云函数封装
 * @param options 请求数据
 * @returns {Promise<ICloud.CallFunctionResult>}
 */
const wxHttp = async function (options){
    // loading
    if (options.loading){
        wx.showLoading(options.loading)
    }
    return await wx.cloud.callFunction({
        name: options.name,
        data: {
            ...options.data
        }
    }).then(res=>{
        if (options.loading){wx.hideLoading()};
        if (options.toast){wx.showToast(options.toast)};
        if(res.errMsg==="cloud.callFunction:ok"){
            return res.result
        }else{
            wx.showToast({
                title: '系统错误请等待',
                duration: 2000
            })
            Promise.reject(`${options.data.$url}，当前接口请求失败，当前请求数据为（\n ${JSON.stringify(options.data)} \n）`)
        }
    })
}

export{
    wxHttp,
}
