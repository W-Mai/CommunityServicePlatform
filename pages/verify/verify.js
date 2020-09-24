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
        text2:"取消报名",
        help_content:[
          "单击“社团/组织”底部菜单栏。",
          "最上边可以选择分类，单击即可只显示当前分类的社团详情。",
          "单击喜欢的社团后，查看完简介后，即可单击底部绿色“报名”按钮。",
          "报名后，已报名的社团会出现在“审核”页面。",
          "在审核页面“提交报名表”后，等待审核详细结果。"
        ],
        ASVerifiedList:[],
      },
    
     
    /****删除*///这个事件有错误
    async delete(e) {
      wx.showLoading({
        title: '取消中……'
      })
      console.log(e)
      let join_id = e.currentTarget.dataset.id
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
      let name = e.currentTarget.dataset.name
      let is_verified = app.globalData.is_verified

      console.log(is_verified)

      if(!is_verified){
        wx.showToast({
          title:    '请先在个人中心完善信息后再填写报名表',
          icon:     "none",
          duration: 2000
        })
        return
      }
      wx.navigateTo({
        url: `../../pages/bao/bao?id=${id}&name=${name}`,//要跳转到的页面路径
      })
    },

    /**获取输入框信息**/
    async onShow(options) {
      if(!app.globalData.is_logged_in) {
        this.setData({
          is_logged_in:false
        })
        return
      }
      await app.loadJointASList(app.globalData.user_Id)
      this.setData({
        is_logged_in:app.globalData.is_logged_in,
        nameList:app.globalData.user_joint_ids,
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
      console.log(res.data)
      let tmpList = []
      let user_id = app.globalData.user_Id

      for(let index in res.data){
        let element = res.data[index]
        let appinfo = (await wx.cloud.callFunction({
          name: "manageApplication",
          data:{
            "form_info":{
                "user_id": user_id,
                "join_id": element._id
            },
            "op":"get"
        }
        })).result
        console.log(element)
        tmpList.push(
          {
            name : element.name,
            status : appinfo?appinfo.msg:"未提交报名表",
            join_id : element._id
          }
        )
      };

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