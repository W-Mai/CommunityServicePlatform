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

    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:app.globalData.user_info
    })
    this.setData({
      college_index : this.data.userInfo["校区"],
      gender_index : this.data.userInfo["性别"],
      currentDate : this.data.userInfo["生日"],
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

    wx.hideLoading()
    wx.showLoading({
      title: '审核中……',
    })
    setTimeout(() => {
      wx.hideLoading({
        success: (res) => {
          if(this.checkIsOk()){
            wx.showToast({
              title: '审核成功',
            })
            setTimeout(()=>{
              wx.showLoading({
                title: '加载中……',
              })

              let tmpUserInfo = this.data.userInfo
              tmpUserInfo["生日"] = this.data.currentDate
              tmpUserInfo["性别"] = this.data.gender_index
              tmpUserInfo["校区"] = this.data.college_index

              wx.cloud.callFunction({
                name: "update",
                data: {
                  user_id: user_id,
                  userInfo: tmpUserInfo,

                  is_verified : true
                }
              })

              app.globalData.is_verified = true
              setTimeout(()=>{
                wx.hideLoading()
              },1000)
            }, 1000)

          }else{
            setTimeout(()=>{
              wx.showToast({
                title: '审核失败',
              })
            }, 2000)
            
          }


          
        },
      })
    }, 2000);
  },
  objGetVal(key){
    let res = this.data.userInfo[key]

    if(res){
      let res2 = res.toString().trim()
      return res2.length ? res2 : ""
    }
    return ""
  }
  ,
  checkIsOk(){
    if(!this.objGetVal("姓名").length){
      console.log(this.objGetVal("姓名"))
      wx.showToast({
        title: '请完善姓名',
        icon : "none"
      })
      return false
    } else if(!this.objGetVal("政治面貌").length){
      wx.showToast({
        title: '请完善政治面貌',
        icon : "none"
      })
      return false
    } else if(!this.objGetVal("籍贯").length){
      wx.showToast({
        title: '请完善籍贯',
        icon : "none"
      })
      return false
    } else if(!this.objGetVal("民族").length){
      wx.showToast({
        title: '请完善民族',
        icon : "none"
      })
      return false
    } else if(!this.objGetVal("QQ").length){
      wx.showToast({
        title: '请完善QQ号',
        icon : "none"
      })
      return false
    } else if(!this.objGetVal("学院").length){
      wx.showToast({
        title: '请完善学院',
        icon : "none"
      })
      return false
    } else if(!this.objGetVal("班级").length){
      wx.showToast({
        title: '请完善班级',
        icon : "none"
      })
      return false
    } 
    return true
  }
})