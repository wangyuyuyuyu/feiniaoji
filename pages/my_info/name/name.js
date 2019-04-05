// pages/my_info/name/name.js
var app = getApp();
var openid = wx.getStorageSync('openid');
var url = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    placeho: ''
  },
  // 获取输入内容
  getinput(e){
    var username = e.detail.value
    this.setData({username:username});
  },
  // 提交保存
  change(){
    var username = this.data.username;

    if (username == '' || username) {
      wx.showToast({
        title: '不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.request({
      url: url+'saveuser',
      data:{
        openid:openid,
        username:username
      },
      success(res){
        wx.showToast({
          title: '修改成功!',
        })
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    wx.request({
      url: url + 'user',
      data: {
        openid: openid
      },
      success: function (res) {
        that.setData({ placeho: res.data.user.username || that.data.placeho });
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