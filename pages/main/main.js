// pages/main/main.js
var app = getApp();
const db = wx.cloud.database()

Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    info:{
      name : "正在加载中……",
      information : "正在加载中……",
     
    },
    is_logged_in:false
  },

  async fetchData(id){
    
    let res = await db.collection('ASInformations').where({
      _id:id
    }).get()
    this.setData({
      info:res.data[0]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({
      is_logged_in:app.globalData.is_logged_in
    })
    this.fetchData(id)
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

  }
})