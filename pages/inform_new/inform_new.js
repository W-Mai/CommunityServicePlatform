// pages/inform_new/inform_new.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"朱晗蕾",

    college_index :0,
    college_array:[
      "科学校区",
      "东风校区"
    ],
    gender_index :0,
    gender_array:[
      "女",
      "男",
      "其他"
    ],
    currentDate:"1999-04-04",

    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:app.globalData.user_info
    })
    console.log(this.data.userInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindPickerChange(e){
    let pickerId = e.currentTarget.dataset.id
    if(pickerId == "campus"){
      this.setData({
        college_index: e.detail.value
      })
    }else if(pickerId == "gender"){
      this.setData({
        gender_index: e.detail.value
      })
    }else if(pickerId == "birthday"){
      this.setData({
        currentDate : e.detail.value
      })
    }
  },
  submit_info(){
    wx.showLoading({
      title: '提交中……',
    })
    let user_id = app.globalData.user_Id
    wx.cloud.callFunction({
      name: "update",
      data: {
        user_id: user_id,
        userInfo: this.data.userInfo,
      }
    })

    wx.hideLoading()
    wx.showLoading({
      title: '审核中……',
    })
    setTimeout(() => {
      wx.hideLoading({
        success: (res) => {
          wx.showToast({
            title: '审核完毕',
          })
        },
      })
    }, 2000);
  }
})