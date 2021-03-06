// pages/main/main.js
var app = getApp();
const db = wx.cloud.database()

const MAX_JOINT_COUNT = 2

Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    info:{
      name : "正在加载中……",
      information : "正在加载中……",
      campus:"正在加载中……"
    },
    is_logged_in:false,
    joint:false,
    nameList: [],
    open_ID: "",
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
  async onLoad(options) {
    let id = options.id
    this.setData({
      is_logged_in:app.globalData.is_logged_in,
      nameList:app.globalData.user_joint_ids
    })

    wx.showLoading({
      title: '加载中……',
    })
    await this.fetchData(id)
    console.log(this.data.nameList.indexOf(id))
    if(this.data.nameList.indexOf(id) > -1){
      this.setData({
        joint:true
      })
    }
    wx.hideLoading()
  },
  async bindRegister() {
    const _ = db.command;
    wx.showLoading({
      title: '请求中……',
    })

    let applied_type_list = await db.collection('ASInformations').where({
      _id:_.in(app.globalData.user_joint_ids)
    }).field({
      category:true
    }).get().catch(res => {
      wx.showToast({
        title: '网络错误，大概……',
        icon: 'none',
        duration: 2000
      })
    })

    let student_as_count = 0;
    for(let ele_type in applied_type_list.data){
      if(applied_type_list.data[ele_type].category!="校级组织"){
        student_as_count += 1;
      }
    }

    console.log(applied_type_list, student_as_count)

    if(this.data.info.category != "校级组织" && student_as_count>=MAX_JOINT_COUNT){
      wx.hideLoading()
      wx.showToast({
        title: `报名个数已达上限${MAX_JOINT_COUNT}个`,
        icon:"none"
      })
      return
    }

    let res = await wx.cloud.callFunction({
      name: "register",
      data:{
        join_id:this.data.info._id,
        user_id:app.globalData.user_Id,
        op_mode:0
      }
    })
    wx.hideLoading()
    if(!res.result){
      wx.showToast({
        title: '报名失败，已报名或网络错误',
        icon:"none"
      })
    }else{
      wx.showToast({
        title: '报名成功！',
      })
      this.setData({
        joint: true
      })
      setTimeout(() => {
        wx.showToast({
          title: '请到“审核”页面填写报名表',
          icon:"none"
        })
      }, 1500);
      await app.loadJointASList(app.globalData.user_Id)
    }
    // console.log(this.data.info._id, app.globalData.user_Id, res)
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
  btcopy(){
    wx.setClipboardData({
      data: this.data.info.qqgroup.toString(),
    })
  }
})