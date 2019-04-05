// pages/my_info/phone/phone.js
var app = getApp();
var openid = wx.getStorageSync('openid');
var url = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qu:'',
    num:''
  },
  get_qu(e){
    var qu = e.detail.value;
    console.log(qu);
    this.setData({qu:qu});
  },
  get_num(e) {
    var num = e.detail.value;
    console.log(num);
    this.setData({ num: num });
  },
  change(){
    var areacode = this.data.qu;
    var phone = this.data.num;

    if (areacode == '' || areacode || phone == '' || phone) {
      wx.showToast({
        title: '不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.request({
      url: url + 'saveuser',
      data: {
        openid: openid,
        areacode: areacode,
        phone: phone
      },
      success(res) {
        console.log(res);
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
        console.log(res)
        that.setData({
          qu: '' || res.data.user.areacode,
          num: '' || res.data.user.dateline
        });
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