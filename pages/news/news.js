var app = getApp();
// pages/login/login.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindName: '',
    bindPassword: '',
    isChecked: false,
    userId: '',
    is_logged_in:false,

  },

  // 获取用户名
  bindNameInput: function (e) {
    this.setData({
      bindName: e.detail.value
    })
    var that = this;
    if (that.data.bindName.length !== 0 && that.data.bindPassword.length !== 0) {
      this.setData({
        isChecked: true
      })
    } else if (that.data.bindName.length === 0) {
      this.setData({
        isChecked: false
      })
    }
  },


  // 获取密码
  bindPasswordInput: function (e) {
    this.setData({
      bindPassword: e.detail.value
    })
    var that = this;
    if (that.data.bindName.length !== 0 && that.data.bindPassword.length !== 0) {
      this.setData({
        isChecked: true
      })
    } else if (that.data.bindPassword.length === 0) {
      this.setData({
        isChecked: false
      })
    }
  },
  // 点击登录
  async bindingSuccess(){
    var that = this;
    var bindName = that.data.bindName;
    var bindPassword = that.data.bindPassword;
    if (bindName.length !== 0 && bindPassword.length !== 0) {

      wx.showLoading({
        title: '登陆中……',
        mask: true
      })
      
      let res = await db.collection('Stu').where({
        username: bindName,
        password: bindPassword
      }).field({
        username:false,
        password:false
      }).get().catch(res => {
        wx.showToast({
          title: '网络错误，大概……',
          icon: 'none',
          duration: 2000
        })
      })

      console.log(res.data);
      if(res.data.length == 0){
        wx.showToast({
          title: '用户不存在或密码错误',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '登录成功',
        })
        // 保存手机号，真实姓名，身份证号，邮箱 保存用户名
        that.setData({
          userName: res.data[0].userName,
        })
        app.globalData.is_logged_in = true
 
        setTimeout(() => {
          wx.switchTab({
            url:'../index/index'
          })
        }, 1000);
 
      }
        
    }
  },
  onShow() {
    this.setData({
      is_logged_in : app.globalData.is_logged_in
    })

    console.log(this.data)
  },
  logoutOnClick(event) {
    app.globalData.is_logged_in = false;
    this.setData({
      is_logged_in: app.globalData.is_logged_in
    })
  },
  blocksBtOnClick(){
    wx.navigateTo({
      url: '../inform_new/inform_new',
    })
  }

})