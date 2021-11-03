// pages/teacher_manager/teacher_manager.js
var app = getApp();
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    each_toast_data_kexue:{},
    each_toast_data_dongfeng:{}
  },

  async fetchData(){
    const each_skip_num = 15
    let res;
    let resdata = [1];

    for(let c = 0; resdata.length != 0; c++){
      res = await db.collection("ASInformations").where({
        campus:'科学校区'
      }).skip(each_skip_num * c).limit(each_skip_num).get();
      
      resdata = res.data

      if(resdata.length == 0) break

      for(let each_item_index in resdata){
        let each_item = resdata[each_item_index]
        let that = this
        
        setTimeout(() => {
          let tmpData = that.data.each_toast_data_kexue
          tmpData[each_item._id] = {
            name : each_item.name,
            real : 0,
            ideal : each_item.user_list.length
          }
          that.setData({
            each_toast_data_kexue: tmpData 
          })

          db.collection("Application-Form").where({
            join_id: each_item._id
          }).field({
            join_id:true
          }).count().then(res=>{
            console.log(res.total)
            let real_count = res.total
            let tmpData2 = that.data.each_toast_data_kexue
            tmpData2[each_item._id].real = real_count
            that.setData({
              each_toast_data_kexue:tmpData2
            })
          })
        }, 100 * each_item_index);
      }
    }
    
    resdata = [1];
    
    for(let c = 0; resdata.length != 0; c++){
      res = await db.collection("ASInformations").where({
        campus:'东风校区'
      }).skip(each_skip_num * c).limit(each_skip_num).get();
      
      resdata = res.data

      if(resdata.length == 0) break

      for(let each_item_index in resdata){
        let each_item = resdata[each_item_index]
        let that = this
        
        setTimeout(() => {
          let tmpData = that.data.each_toast_data_dongfeng
          tmpData[each_item._id] = {
            name : each_item.name,
            real : 0,
            ideal : each_item.user_list.length
          }
          that.setData({
            each_toast_data_dongfeng: tmpData 
          })

          db.collection("Application-Form").where({
            join_id: each_item._id
          }).field({
            join_id:true
          }).count().then(res=>{
            console.log(res.total)
            let real_count = res.total
            let tmpData2 = that.data.each_toast_data_dongfeng
            tmpData2[each_item._id].real = real_count
            that.setData({
              each_toast_data_dongfeng:tmpData2
            })
          })
        }, 100 * each_item_index);
      }
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    await this.fetchData()
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