// pages/my_info/des/des.js
var app = getApp();

var url = app.globalData.url;
var openid = wx.getStorageSync('openid');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    des:'',
    placeho:''
  },
  // 获取输入内容
  getinput(e) {
    var des = e.detail.value
    this.setData({ des: des });
  },
  // 提交保存
  change() {
    var des = this.data.des;
    wx.request({
      url: url + 'saveuser',
      data: {
        openid: openid,
        describe: des
      },
      success(res) {
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
        that.setData({ placeho: res.data.user.describe || that.data.placeho });
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