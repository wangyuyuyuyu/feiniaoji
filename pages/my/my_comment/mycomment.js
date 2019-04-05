// pages/my/my_comment/mycomment.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose:0,
    ucomments:[],
    mcomments:[],
    userbirds:0,
    userorders:0,
    user:{},
    scoreImg:''
  },
  choose(e){
    console.log(e);
    this.setData({choose:e.currentTarget.dataset.num});
  },
  // 点击去评价
  go_order(e) {
    var num = 5;
    var is_bird = e.currentTarget.dataset.is_bird;
    wx.navigateTo({
      url: '/pages/order/my_order/my_order?num=' + num+'&is_bird='+is_bird
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取我的用户信息
    var user = wx.getStorageSync('user');
    this.setData({user:user});
    var score = user.sore*10/2;
    score = Math.round(score);
    if(score==0){
      score = 1;
    }
    var scoreImg = `/images/el${score}.png`
    this.setData({ scoreImg: scoreImg});
    // 获取我的评论comments
    var url = app.globalData.url;
    var openid = wx.getStorageSync('openid');
    var that = this;
    wx.request({
      url: url +'comments',
      data:{
        openid:openid
      },
      success(res){
        console.log(res);
        // 装换昵称base64和时间戳
        var comments = res.data.comments;
        var comments1 = res.data.comments1;
        for(var i=0;i<comments.length;i++){
          comments[i].bdateline = util.get_time(comments[i].cdateline);
          comments[i].unickname = util.baseDecode(comments[i].unickname);
        }
        for (var i = 0; i < comments1.length; i++) {
          comments1[i].bdateline = util.get_time(comments1[i].cdateline);
          comments1[i].unickname = util.baseDecode(comments1[i].unickname);
        }
        console.log(comments,comments1);
        that.setData({ mcomments: comments, ucomments: comments1, userorders: res.data.userorders, userbirds: res.data.userbirds});
      }
    })

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