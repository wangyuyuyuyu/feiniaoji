// pages/my/my.js
var app = getApp();
var wxApi = require('../../utils/wxApi')
var wxRequest = require('../../utils/wxRequest')
var Promise = require('../../utils/es6-promise.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  // 点击待确认、待支付...进入我的订单时
  go_order(e){
    console.log(e);
    var num = e.currentTarget.dataset.num;
    wx.navigateTo({
      url: '/pages/order/my_order/my_order?num='+num
    })
  },
  // 进入我的订单页面
  go_my_order(){
    wx.navigateTo({
      url: '/pages/order/my_order/my_order',
    })
  },
  // 进入我的行程页面
  go_mytrip(){
    wx.navigateTo({
      url: '/pages/mytrip/mytrip',
    })
  },
  // 进入我的评价页面
  go_my_comment() {
    wx.navigateTo({
      url: '/pages/my/my_comment/mycomment',
    })
  },
  // 进入我的信息页面
  go_myinfo(){
    wx.navigateTo({
      url: '/pages/my_info/info_list/info_list',
    })
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
    var that = this;
    var url = app.globalData.url;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: url + 'user',
      data: {
        openid: openid
      },
      success: function (res) {
        console.log(res);
        that.setData({ userInfo: res.data.user || '' })
      }
    });
    app.globalData.start_place = "选择出发地";
    app.globalData.end_place = "选择目的地";
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