// 支持async
import regeneratorRuntime from '../utils/runtime'

const imageUpload = async (imageList)=>{
    let fileListId = [];
    wx.showLoading({
        title: '图片上传中',
        mask : true
    })
    for (let index = 0; index < imageList.length; index++) {
        const element = imageList[index];
        // 取出当前的文件格式 .jpg .png
        let suffix = /\.\w+$/.exec(element)[0]
        // 进行同步存储
        await wx.cloud.uploadFile({
            cloudPath: `blog/${Date.now()}-${Math.floor(Math.random()*100000)}${suffix}`,
            filePath : element,                                                             // 文件路径
        }).then(res => {
            fileListId.push(res.fileID)
        }).catch(error => {
        })
    }
    wx.hideLoading()
    return fileListId
}

export {
    imageUpload
}
