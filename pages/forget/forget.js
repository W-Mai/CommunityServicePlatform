const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputTel: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindTel: function (e) {
    this.setData({
      inputTel: e.detail.value
    })
  },
  bindreset: function (e) {
    var isExistTel = "";
    let res = db.collection('Stu').where({
      userInfo:{
        "手机号":  this.data.inputTel
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
          userInfo:{
            "手机号": this.data.inputTel
          }
        }).get().then(res => {
          console.log("数据：", res.data)
          stu_id = res.data[0]._id
          stuID = res.data[0].username
          console.log("学生_id", stu_id);
          console.log("学号:", stuID);

          var newPassword = stuID.slice(-6)

          // 学号.slice(-6) 重置为学号后六位
          console.log("后六位", newPassword);
          wx.cloud.callFunction({
            name: "resetPassword",
            data: {
              stuid: stu_id,
              newpassword: newPassword,
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

})