const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    VerificationCode: '',
    Code: '',
    NewChanges: '',
    NewChangesAgain: '',
    success: false,
    state: '',
    userName:'',
    passWord: '',
    warn:null,

    college_index :0,
    college_array:[
      "科学校区",
      "东风校区"
    ],
  },
  /**
    * 获取验证码
    */

  //  返回登陆界面
  return_home: function (e) {
    wx.navigateBack({
     
    })

  },
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  handleVerificationCode: function (e) {
    console.log(e);
    this.setData({
      Code: e.detail.value
    })
  },
  handleNewChanges: function (e) {
    console.log(e);
    this.setData({
      NewChanges: e.detail.value
    })
  },
  handleNewChangesAgain: function (e) {
    console.log(e);
    this.setData({
      NewChangesAgain: e.detail.value
    })

  },
  bindUserNameInput:function (e) {
    console.log(e);
    this.setData({
      userName: e.detail.value
    })
  },
  doGetCode: function () {
    var that = this;
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })

    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    // var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    wx.request({
      url: '', //后端判断是否已被注册， 已被注册返回1 ，未被注册返回0
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("成功")
        that.setData({
          state: res.data
        })
        
      }
    })
  },
  async submit(e) {
    console.log("warn",this.data.warn)

    var userName = this.data.userName;
    var NewChanges = this.data.NewChanges;
    var phone = this.data.phone;
    var isPhone = "";
    var isExistStuID = "";

    // 判断电话是否注册过
    console.log("电话", phone)
    let res = await db.collection('Stu').where({
      stuPhone:phone
    }).get().then(res => {
      console.log("查询手机号是否被注册",res.data)
      console.log("查询的数据长度", res.data.length)
      if(res.data.length != 0){
        isPhone = res.data[0].stuPhone;
      }
      // console.log("phone:", isPhone);
    })

    // 查询学号是否被注册过
    let ans = await db.collection('Stu').where({
      username:userName
    }).get().then(ans => {
      console.log("查询学号号是否被注册",ans.data)
      console.log("查询的数据长度", ans.data.length)
      if(ans.data.length != 0){
        isExistStuID = ans.data[0].userName;
      }
    })


    if (this.data.NewChanges == '') {
      wx.showToast({
        title: '请输入密码',
        icon:'none',
        duration: 2000
      })
      return
    } else if (this.data.NewChangesAgain != this.data.NewChanges) {
      wx.showToast({
        title: '两次密码不一致',
        icon:'none',
        duration: 2000
      })
      return
    }
    else if(this.data.NewChangesAgain.length < 6){
      wx.showToast({
        title:"密码过短（不能低于6位）！",
        icon:'none',
        duration: 2000
      })
      return
    }
    else if(isPhone != ""){
        wx.showToast({
          title:"该手机号已被注册！",
          icon:'none',
          duration: 2000
        })
        return
    }
    else if(isExistStuID != ""){
      wx.showToast({
        title:"该学号已被注册！",
        icon:'none',
        duration: 2000
      })
      return
  }
    else if (this.data.phone === '' || this.data.phone.length != 11) {
      console.log("手机号", this.data.phone, this.data.phone.length )
      wx.showToast({
        title:"手机号格式不正确！",
        icon:'none',
        duration: 2000
      })
      return
    }
    else if(this.data.userName.length != 12 || (this.data.userName[0] != 5 && this.data.userName[1] != 4))
    {
      console.log("54开头", this.data.userName[0], userName[1])
      wx.showToast({
        title:"学号格式不正确！",
        icon:'none',
        duration: 2000
      })
      return
    }

    this.setData({
      success:true
    })

    await db.collection('Stu').add({
      data: {
        username: userName,
        password: NewChanges,
        userInfo:{
          "校区":this.data.college_index,
          "手机号": this.data.phone,
          "姓名":this.data.college_array[this.data.college_index] + "的小可爱",
          "学号":userName
        },
        is_verified: false
      },
    })

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
    }
  }
})