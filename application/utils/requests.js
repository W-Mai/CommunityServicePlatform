//封装request方法
let shower_counter = 0

const request = (options) => {
    return new Promise((resolve, reject) => {
        //提示一下
        options.title = options.title ?? "加载中"
        if (shower_counter === 0){
            wx.showLoading({
                title: options.title
            })
        }
        shower_counter++;
        //网络请求
        wx.request({
            url: options.url,
            data: options.data,
            method: options.method,
            header: options.header,
            success: function (res) {
                shower_counter --;
                if (shower_counter === 0)
                    wx.hideLoading()
                //服务器返回数据
                if (res.statusCode === 200) {
                    resolve(res);
                } else {
                    //返回错误提示信息
                    reject(res.data);
                }
            },
            fail: function (e) {
                shower_counter --;
                if (shower_counter === 0) {
                    wx.hideLoading()
                    wx.showToast({
                        title: '无法连接服务器',
                        icon: 'loading',
                        duration: 1000
                    })
                }
                reject('网络出错');
            }
        })
    });
}

module.exports = {
    request: request
}