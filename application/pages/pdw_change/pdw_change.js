const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    changePwd: "",
    newChangePwd: "",
    inputTel: "",
  },

  // 获取用户输入的手机号
  bindTel: function (e) {
    this.setData({
      inputTel: e.detail.value
    })
  },

  // 获取用户输入的密码
  bindPassword: function (e) {
    this.setData({
      changePwd: e.detail.value
    })
  },

  bindPasswordAgain: function (e) {
    this.setData({
      newChangePwd: e.detail.value
    })
  },

  // 一键修改
  bindChange: function (e) {
    console.log("密码",this.data.changePwd);
    console.log("新密码密码",this.data.newChangePwd);
    if (this.data.changePwd == "" || this.data.newChangePwd == "") {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.changePwd != this.data.newChangePwd) {
      wx.showToast({
        title: '两次输入的密码不一致！',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.newChangePwd.length < 6) {
      wx.showToast({
        title: '密码过短（不能低于6位）！',
        icon: 'none',
        duration: 2000
      })
      return
    } else { // 输入合法，添加到数据库
      var isExistTel = "";
      let res = db.collection('Stu').where({
        userInfo: {
          "手机号": this.data.inputTel
        }
      }).get().then(res => {
        // 手机号已被注册则可以重置
        if (res.data.length != 0) {
          isExistTel = this.data.inputTel
        } else {
          wx.showToast({
            title: "该手机号不存在！",
            icon: 'none',
            duration: 2000
          })
          return
        }
        // 手机号已被注册则可以重置
        if (isExistTel != "") {
          var stu_id = "";
          var stuID = "";
          // 获取该手机号所有者的_id
          let res = db.collection('Stu').where({
            userInfo: {
              "手机号": this.data.inputTel
            }
          }).get().then(res => {
            // console.log("数据：", res.data)
            stu_id = res.data[0]._id
            stuID = res.data[0].username

            wx.cloud.callFunction({
              name: "resetPassword",
              data: {
                stuid: stu_id,
                newpassword: this.data.newChangePwd,
              }
            })
          })
          wx.showToast({
            title: "重置成功！",
            icon: 'none',
            duration: 2000
          })

          setTimeout(() => {
            wx.navigateBack({
              delta: 0,
            })
          }, 2000);

          return
        } else {
          wx.showToast({
            title: "该手机号不存在！",
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})