var app = getApp();
const db = wx.cloud.database()
const _ = db.command
// pages/verify/verify.js
Page({

  data:{
    is_logged_in:false,
    nameList: [],
    //初始化数组
     addPrice: [{
          Name: "空社团1",
          Statu:"未报名",
          id:1
        },
        {
          Name: "空社团2",
          Statu:"未报名",
          id:2
        }
      ],
        text1:"报名信息填写",
        text2:"取消报名"
    },
    ASVerifiedList:[],
     
    /****删除*///这个事件有错误
    async delete(e) {
      wx.showLoading({
        title: '取消中……'
      })

      let currentIndex = e.currentTarget.dataset.index
      let join_id = this.data.nameList[currentIndex]
      // let tmpList = this.data.nameList
      // tmpList.splice(currentIndex, 1)
      
      let user_id = app.globalData.user_Id
      // console.log(this.data.nameList[currentIndex], userid)

      let res = await wx.cloud.callFunction({
        name: "register",
        data:{
          join_id:join_id,
          user_id:user_id,
          op_mode:1
        }
      })
      wx.hideLoading()
      wx.showToast({
        title: '取消成功！',
        duration: 2000,
        mask:true,
        success:res=>{
          this.onShow()
        }
      })
      
    },

    baoming:function(e){
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `../../pages/bao/bao?id=${id}`,//要跳转到的页面路径
      })
    },

    /**获取输入框信息**/
    async onShow(options) {
      if(!app.globalData.is_logged_in) return
      await app.loadJointASList(app.globalData.user_Id)
      this.setData({
        is_logged_in:app.globalData.is_logged_in,
        nameList:app.globalData.user_joint_ids,
        ASVerifiedList:[]
      })
      if(!this.data.is_logged_in)return;
      wx.showLoading({
        title: '通讯中……',
      })
      let res = await db.collection("ASInformations")
      .where({
        _id:_.in(this.data.nameList)
      })
      .field({
        name : true
      })
      .get()
      console.log()
      let tmpList = []
      res.data.forEach(element => {
        tmpList.push(
          {
            name : element.name,
            status : "待审核收取那哦i回家oaks的法兰克偶就喀什酱豆腐"
          }
        )
      });
      this.setData({
        ASVerifiedList:tmpList
      })
      wx.hideLoading()
    },
    submitHandler(event){
      wx.switchTab({
        url: '../news/news',
      })
    }
})