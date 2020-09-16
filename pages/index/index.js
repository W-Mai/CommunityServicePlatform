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
    db_filter:{},
    ascategories:[
      {"name":"志愿公益","url":"/image/同事群组.png","cate":"志愿公益类"},
      {"name":"学术科技","url":"/image/专家人才.png","cate":"学术科技类"},
      {"name":"文化体育","url":"/image/运动比赛.png","cate":"文化体育类"},
      {"name":"思想政治","url":"/image/更新变更.png","cate":"思想政治类"},
      {"name":"创新创业","url":"/image/企业公司.png","cate":"创新创业类"},
      {"name":"修身养性","url":"/image/健康安全.png","cate":"修身养性类"},
    ],
    currentFilterIndex: -1,
    is_logged_in:false,

    banner_srcs:[
      "cloud://zzuli-as-open-plt-qfh5y.7a7a-zzuli-as-open-plt-qfh5y-1303166244/SomePics/IMG_0030.jpg",
      "cloud://zzuli-as-open-plt-qfh5y.7a7a-zzuli-as-open-plt-qfh5y-1303166244/SomePics/IMG_0028.jpg",
      "cloud://zzuli-as-open-plt-qfh5y.7a7a-zzuli-as-open-plt-qfh5y-1303166244/SomePics/IMG_0029.jpg"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      is_logged_in:app.globalData.is_logged_in
    })
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
      let res = null;
      console.log(this.data.currentFilterIndex == -1)

      
      res = await db.collection('ASInformations')
      .where(this.data.db_filter)
      .limit(MAX_LIMIT)
      .skip(this.data.currentPage*MAX_LIMIT).get()

      this.setData({
        infoData:this.data.infoData.concat(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  },
  filterOnClick(event){
    let target = event.currentTarget.dataset;
    let id = target.id;
    if(this.data.currentFilterIndex == id) {
      this.setData({
        currentFilterIndex:-1,
        db_filter:{}
      })
    } else{
      this.setData({
        currentFilterIndex:id,
        db_filter:{
          category:this.data.ascategories[id].cate
        }
      })
    }

    this.setData({
      infoData:[],
      currentPage:0
    })
    this.fetchData()
  }
})