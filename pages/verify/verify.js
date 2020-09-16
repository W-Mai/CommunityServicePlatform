var app = getApp();
// pages/verify/verify.js
Page({

  data:{
    is_logged_in:false,
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
     
    /**新增** */
      addNewPrice: function() {
        let newArray = {
          Name: "空社团",
          Statu:"未报名",
          id:1
        }
        this.setData({
          addPrice: this.data.addPrice.concat(newArray)
        })
    },
     
    /****删除*///这个事件有错误
      delete: function(e) {
        let that = this
        let index = e.target.dataset.index //数组下标
        let arrayLength = that.data.addPrice.length //数组长度
        let newArray = []
        if (arrayLength > 1) {
          //数组长度>1 才能删除
          for (let i = 0; i < arrayLength; i++) {
            if (i !== index) {
              newArray.push(that.data.addPrice[i])
            }
          }
          that.setData({
            addPrice: newArray
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '必须设置一个收费项目',
          })
        }
      },

      baoming:function(){
        wx.navigateTo({
          url: '../../pages/bao/bao',//要跳转到的页面路径
          })
      },

    /**获取输入框信息**/
    onShow: function (options) {
      this.setData({
        is_logged_in:app.globalData.is_logged_in
      })
    },
    submitHandler(event){
      wx.switchTab({
        url: '../news/news',
      })
    }
})