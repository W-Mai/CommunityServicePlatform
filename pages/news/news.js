var app = getApp();
// pages/login/login.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindName: '',
    bindPassword: '',
    isChecked: false,
    userId: '',
    is_logged_in:false,

  },

  // 获取用户名
  bindNameInput: function (e) {
    this.setData({
      bindName: e.detail.value
    })
    var that = this;
    if (that.data.bindName.length !== 0 && that.data.bindPassword.length !== 0) {
      this.setData({
        isChecked: true
      })
    } else if (that.data.bindName.length === 0) {
      this.setData({
        isChecked: false
      })
    }
  },


  // 获取密码
  bindPasswordInput: function (e) {
    this.setData({
      bindPassword: e.detail.value
    })
    var that = this;
    if (that.data.bindName.length !== 0 && that.data.bindPassword.length !== 0) {
      this.setData({
        isChecked: true
      })
    } else if (that.data.bindPassword.length === 0) {
      this.setData({
        isChecked: false
      })
    }
  },
  // 点击登录
  async bindingSuccess(){
    var that = this;
    var bindName = that.data.bindName;
    var bindPassword = that.data.bindPassword;
    if (bindName.length !== 0 && bindPassword.length !== 0) {

      wx.showLoading({
        title: '登陆中……',
        mask: true
      })
      
      let res = await db.collection('Stu').where({
        username: bindName,
        password: bindPassword
      }).field({
        password:false
      }).get().catch(res => {
        wx.showToast({
          title: '网络错误，大概……',
          icon: 'none',
          duration: 2000
        })
      })

      console.log(res.data);
      if(res.data.length == 0){
        wx.showToast({
          title: '用户不存在或密码错误',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '登录成功',
        })
        // 保存手机号，真实姓名，身份证号，邮箱 保存用户名
        that.setData({
          username: res.data[0].userName,
        })
        app.globalData.user_Id = res.data[0]._id;
        app.globalData.user_name= res.data[0].username;
        app.globalData.is_logged_in = true
        app.globalData.user_group = res.data[0].user_group
        app.globalData.user_info = res.data[0].userInfo
        app.globalData.is_verified = res.data[0].is_verified
        app.globalData.index_need_refresh = true

        db.collection('Stu').doc(res.data[0]._id).watch({
          onChange: function(snapshot) {
            let changes = snapshot.docChanges[0].updatedFields
              for (let obj in changes) {
                let key = obj.slice(obj.search("\\.")+1)
                app.globalData.user_info[key] = changes[obj];
                console.log(key, changes[obj])
              }
            console.log('snapshot', snapshot)
          },
          onError: function(err) {
            console.error('the watch closed because of error', err)
          }
        })
        

        await app.loadJointASList(res.data[0]._id)
        console.log(res.data[0])
        setTimeout(() => {
          wx.switchTab({
            url:'../select_main_page/select_main_page'
          })
        }, 1000);
 
      }
        
    }
  },
  bindConfirm(e){
    this.bindingSuccess()
  }
  ,
  onShow() {
    this.setData({
      is_logged_in : app.globalData.is_logged_in
    })

    if(this.data.is_logged_in){
      let tmpUserinfo = {
        name : app.globalData.user_info["姓名"],
        college : app.globalData.user_info["学院"]
      }

      this.setData({
        userInfo : tmpUserinfo
      })
    }
    console.log(this.data)
  },
  logoutOnClick(event) {
    app.globalData.is_logged_in = false;
    app.globalData.user_group = ""
    app.globalData.user_Id = "";
    app.globalData.user_name= "";
    app.globalData.user_info = {}
    app.globalData.is_verified = false
    app.globalData.index_need_refresh = true
    this.setData({
      is_logged_in: app.globalData.is_logged_in,
      bindName: '',
      bindPassword: '',
    })
  },
  blocksBtOnClick(){
    wx.navigateTo({
      url: '../inform_new/inform_new',
    })
  }

})