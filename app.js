//app.js

App({
  onLaunch: function () {
    // wx.setTabBarItem({
    //   index: 4,
    //   text: 'asdf'
    // })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.cloud.init({
      env:"zzuli-as-open-plt-qfh5y"
    })
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  },
  async loadJointASList(userid){
    const db = wx.cloud.database();
    let res = await db.collection("Stu")
    .where({
      _id: userid
    })
    .field({
      join_ids:true
    }).get()

    // console.log(res.data)
    if(!res.data[0].join_ids) return
    this.globalData.user_joint_ids = res.data[0].join_ids
  },
  cleanFormat(text){
    return text.replace(/([#]*)/g,"").replace(/(&.*;)/g,"")
  }
  
  ,
  globalData: {
    userInfo: null,
    as_infos: null,
    is_logged_in:false,

    user_group:'',

    user_Id:"",
    user_name:"",
    user_info:{},
    is_verified:false,
    user_joint_ids:[],

    index_need_refresh : false
  }
})