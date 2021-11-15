const utils = require('../../utils/util.js')
import { srvImg } from "../../utils/api"

var app = getApp();
const db = wx.cloud.database()
const _ = db.command
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
    ascategories:[],
    currentFilterIndex: -1,
    is_logged_in:false,

    banner_srcs:[
      srvImg.banner("IMG_0030.jpg"),
      srvImg.banner("IMG_0029.jpg"),
      srvImg.banner("IMG_0028.jpg"),
    ],

    scrollView_left:0,

    default_logo:"/images/ZZULI Logo Blue.png",
    
    re_st_flag:0,
   },
// 作用于wxml中的函数
  cleanFormat (text){
    return text.replace(/([#]*)/g,"").replace(/(&.*;)/g,"")
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("OnLoad")
    this.setData({
      is_logged_in : app.globalData.is_logged_in,
      re_st_flag : options.re_st_flag,
      infoData: [],
    })
    if(this.data.re_st_flag == 1){
      this.setData({
        ascategories:[
          {"name":"校级组织","url":srvImg.ui_logos("学校.png"),"cate":"校级组织"},
        ],
        currentFilterIndex:0,
        
        currentPage:0
      })
    }else{
      this.setData({
        ascategories:[
          {"name":"思想政治","url":srvImg.ui_logos("更新变更.png"),"cate":"思想政治类"},
          {"name":"学术科技","url":srvImg.ui_logos("专家人才.png"),"cate":"学术科技类"},
          {"name":"创新创业","url":srvImg.ui_logos("企业公司.png"),"cate":"创新创业类"},
          {"name":"文化体育","url":srvImg.ui_logos("运动比赛.png"),"cate":"文化体育类"},
          {"name":"志愿公益","url":srvImg.ui_logos("同事群组.png"),"cate":"志愿公益类"},
          {"name":"自律互助","url":srvImg.ui_logos("健康安全.png"),"cate":"自律互助类"},
        ],
        infoData: []
      })
    }
    this.fetchData()
    app.globalData.index_need_refresh = false
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
    // console.log("OnShow")
    console.log("need",app.globalData.index_need_refresh)
    if(app.globalData.index_need_refresh){
      app.globalData.index_need_refresh = false

      this.setData({
        infoData:[],
        currentPage:0
      })
      this.fetchData()
    }
    setTimeout(() => {
      this.setData({
        scrollView_left:45
      })

      setTimeout(() => {
        this.setData({
          scrollView_left:0
        })
      }, 1500);
    }, 500);

    
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
    // console.log("chudi");
    
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
      let id = this.data.currentFilterIndex
      if(id == -1) {
        this.setData({
          db_filter:{
            category:_.neq('校级组织')
          }
        })
      } else{
        this.setData({
          db_filter:{
            category:this.data.ascategories[id].cate
          }
        })
      }

      if(app.globalData.is_logged_in){
        let campusCode = app.globalData.user_info["校区"]
        let tmpDbFilter = this.data.db_filter
        if(campusCode == 0){
          tmpDbFilter["campus"] = "科学校区"
        }else if(campusCode == 1){
          tmpDbFilter["campus"] = "东风校区"
        }
      }


      let res = null;
      // console.log(this.data.currentFilterIndex == -1)

      res = await db.collection('ASInformations')
      .where(this.data.db_filter)
      .limit(MAX_LIMIT)
      .skip(this.data.currentPage*MAX_LIMIT).get()

      this.setData({
        infoData:this.data.infoData.concat((res=>{ //过滤掉markdown格式文本
          res.forEach(elem=>{
            elem["filter_content"] = app.cleanFormat(elem.information)
          })
          return res
        })(res.data))
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
      })
    } else{
      this.setData({
        currentFilterIndex:id,
      })
    }


    
    this.setData({
      infoData:[],
      currentPage:0
    })
    this.fetchData()
  }
})

