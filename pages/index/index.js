var app = getApp();
const db = wx.cloud.database()
// 查询当前用户所有的 counters
const MAX_LIMIT = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoData: [],
    currentPage:0,
    ascategories:[
      {"name":"志愿公益","url":"/image/one.png"},
      {"name":"学术科技","url":"/image/one.png"},
      {"name":"文化体育","url":"/image/one.png"},
      {"name":"思想政治","url":"/image/one.png"},
      {"name":"创新创业","url":"/image/one.png"},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
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
    console.log("chudi");
    
    this.setData({
      currentPage:this.data.currentPage+1
    })
    this.fetchData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  async fetchData(){
    try {
      let res = await db.collection('ASInformations').limit(MAX_LIMIT).skip(this.data.currentPage*MAX_LIMIT).get()
      this.setData({
        infoData:this.data.infoData.concat(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }
})