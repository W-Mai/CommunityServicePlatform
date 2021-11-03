// pages/editior_page/editior_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info : "",

    passback : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      info:options.info,
      passback:options.data
    })
  },

  updateValue(e){
    this.setData({
      passback:e.detail.value
    })
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
  onClick(){
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]

    let prePassback = prevPage.data.userInfo
    prePassback[this.data.info] = this.data.passback
    prevPage.setData({
      userInfo:prePassback
    })
    wx.navigateBack()
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

  }
})