// pages/about/about.js

import { img_url } from "../../utils/api";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        infos: [
            [
                {profile: img_url("ui_logos/auth_profile", "xbn.jpg"), rank: "项目经理", nick: "新兵南", sup: "强迫症带师"},
                {profile: img_url("ui_logos/auth_profile", "zhl.jpg"), rank: "前端设计", nick: "朱猪", sup: "欢迎找我在线撸猫"},
                {profile: img_url("ui_logos/auth_profile", "yhb.jpg"), rank: "前端设计", nick: "小耗子", sup: "我一天要背200个单词"},
                {profile: img_url("ui_logos/auth_profile", "wlx.jpg"), rank: "后端设计", nick: "大虾", sup: "爷有腹肌"}
            ], [
                {profile: img_url("ui_logos/auth_profile", "djx.jpg"), rank: "后端设计", nick: "嘉嘉", sup: "我的普通发是最标准的"},
                {profile: img_url("ui_logos/auth_profile", "cxx.jpg"), rank: "后端设计", nick: "心心", sup: "我不要再打代码了我想看电视剧"},
                {profile: img_url("ui_logos/auth_profile", "lz.jpg"), rank: "划水带师", nick: "梦梦", sup: "没错我就是最划水的一个（叉腰）"}
            ],
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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