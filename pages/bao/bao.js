const app = getApp()


Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    success:false,
    date: '2000-01-01',
    maxTextLen:[200, 200],
    textLen:[0, 0],
    list:[
      {
        id:0,
        name:"政治面貌"
      },
      {
        id:1,
        name:"籍贯"
      },
      {
        id:2,
        name:"民族"
      },
      {
        id:3,
        name:"学院"
      },
      {
        id:4,
        name:"专业班级"
      },
      {
        id:5,
        name:"联系方式"
      },
      {
        id:6,
        name:"QQ号"
      },
      {
        id:7,
        name:"组织名称"    /*这里可以自动获取*/
      },
      {
        id:8,
        name:"部门一"
      },
      {
        id:9,
        name:"部门二"
      }
    ],

    as_id:"",
    user_id:""
  },
  async onLoad(option){
    this.setData({
      as_id:option.id,
      user_id:app.globalData.user_Id
    })

  } ,
  changeDate(e){
    this.setData({ date:e.detail.value});
  },

  getWords(e) {
    let id = e.currentTarget.dataset.id
          // 设置最大字符串长度(为-1时,则不限制)
          // 文本长度
    let textLen = this.data.textLen;
    textLen[id-1] = e.detail.value.length

    this.setData({
      textLen: textLen
    });
  },
 
  //  返回界面
  return_home: function (e) {
    wx.switchTab({
      url: '../../pages/verify/verify',
    })
 
  },
  
               
  submit: function (e) {//这个是提交后提示哪些信息错误，没填，你们后端自己改改
    var that = this
    if (this.data.Code == '') {
      wx.showToast({
        title: '请输入验证码',
        image: '/images/error.png',
        duration: 2000
      })
      return
    } else if (this.data.Code != this.data.VerificationCode) {
      wx.showToast({
        title: '验证码错误',
        image: '/images/error.png',
        duration: 2000
      })
      return
    }
    else if (this.data.NewChanges == '') {
      wx.showToast({
        title: '请输入密码',
        image: '/images/error.png',
        duration: 2000
      })
      return
    } else if (this.data.NewChangesAgain != this.data.NewChanges) {
      wx.showToast({
        title: '两次密码不一致',
        image: '/images/error.png',
        duration: 2000
      })
      return
    } else {
      var that = this
      var phone = that.data.phone;
      wx.request({
        url: getApp().globalData.baseUrl + '/Coachs/insert' ,
        method: "POST",
        data: {
          coachid: phone,
          coachpassword: that.data.NewChanges
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          wx.showToast({
            title: '提交成功~',
            icon: 'loading',
            duration: 2000
          })
          console.log(res)
          that.setData({
            success: true
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }
})