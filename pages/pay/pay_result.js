// pages/pay/pay_result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay_success:true,
    orderid:''
  },

  // go_order点击查看订单详情
  go_order(){
    var orderid = this.data.orderid;
    wx.navigateTo({
      url: '/pages/order/order_details/order_details?id=' + orderid+'&is_user=0',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options.judge=='true'){
      var judge = true;
    }else{
      var judge = false;
    }
    this.setData({ pay_success: judge, orderid: options.orderid});
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