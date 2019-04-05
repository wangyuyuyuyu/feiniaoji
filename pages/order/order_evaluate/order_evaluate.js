// pages/order/order_evaluate/order_evaluate.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_evaluate:false,
    // 评分星星图片
    starImg:'/images/star1.png',
    imgs: ['/images/star1.png', '/images/star2.png' , '/images/star3.png', '/images/star4.png' , '/images/star5.png'],
    star:0,
    ping:'',
    infos:{},
    ucomment:{}
  },
  // 对订单的评价
  get_ping(e){
    this.setData({ping:e.detail.value});
  },
  // 点击选择星星
  btn(e){
    console.log(e);
    var imgs = this.data.imgs;
    var num = parseInt(e.currentTarget.dataset.num);
    var starImg = imgs[e.currentTarget.dataset.num];
    this.setData({ starImg: starImg, star: num+1});
  },
  // 点击确定提交评价
  sub(){
    var url = app.globalData.url;
    var openid = wx.getStorageSync('openid');
    var data = {
      openid:openid,
      birdsid:this.data.infos.bid,
      birdsuserid:this.data.infos.userid,
      ordernumber :this.data.infos.numbers,
      comment: this.data.ping,
      star: this.data.star
    };
    console.log(data);
    wx.request({
      url: url+'addcomments',
      data:data,
      success(res){
        console.log(res);
        if(res.data.err==1){
          wx.showToast({
            title: '评价成功',
            success:function(){
              console.log(111);
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({ infos: options});
    var url = app.globalData.url;
    var openid = wx.getStorageSync('openid');
    var that = this;
    var data = {
      openid: openid,
      birdsid: options.bid,
      birdsuserid: options.userid,
      ordernumber: options.numbers,
    }
    console.log(data);
    // 获取对方的评价
    wx.request({
      url: url +'birdsordercomment',
      data:data,
      success(res){
        console.log(res);
        if(res.data.user==2){
          if (res.data.usercomments!=null){
            that.setData({ ucomment: res.data.usercomments, is_evaluate:true})
          }else{
            that.setData({ is_evaluate: false })
          }
        }else{
          if (res.data.birdscomments != null) {
            that.setData({ ucomment: res.data.birdscomments, is_evaluate: true })
          } else {
            that.setData({ is_evaluate: false })
          }
        }
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