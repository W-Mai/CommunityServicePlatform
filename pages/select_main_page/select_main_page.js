// pages/select_main_page/select_main_page.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_logged_in:false,
    
    path:"",
    openType:"switchTab",

    user_group:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

    this.setData({
      is_logged_in:app.globalData.is_logged_in,
      user_group:app.globalData.user_group,
    })
    if(!this.data.is_logged_in){
      this.setData({
        path:"/pages/news/news",
        openType:"switchTab"
      })
    }else{
      if(app.globalData.user_info["校区"] == 0){
        this.setData({
          path:"/pages/main/main?id=b827452b5f6b1955012b879d6ce9c73c",
          openType:"navigate"
        })
      }else{
        this.setData({
          path:"/pages/main/main?id=b827452b5f6b1955012b879562a44e7c",
          openType:"navigate"
        })
      }
      
    }
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