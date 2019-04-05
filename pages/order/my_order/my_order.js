// pages/order/my_order/my_order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_user:0,//判断是用户还是飞鸟
    nav_choose:0,
    all_orders:[],
    orders:[],
    no_order:true
  },
  // 点击评价到达评价页面
  go_evaluate(e){
    var username = e.currentTarget.dataset.username; 
    var bid = e.currentTarget.dataset.bid; 
    var userid = e.currentTarget.dataset.userid; 
    var numbers = e.currentTarget.dataset.numbers; 
    // var 
    wx.navigateTo({
      url: `/pages/order/order_evaluate/order_evaluate?username=${username}&bid=${bid}&userid=${userid}&numbers=${numbers}`,
    })
  },
  // 飞鸟点击确认发货
  sure_goods(e){
    var id = e.currentTarget.dataset.id;
    var url = app.globalData.url;
    var that = this;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: url + 'saveorders',
      data: {
        birdsid: id,
        state: 3
      },
      success: function (res) {
        if (res.data.err == 1) {
          wx.showToast({
            title: '确认收货!',
            success: function () {
              if (res.err == 1) {//重新获取我是飞鸟时的订单信息
                wx.request({
                  url: url + 'birdsorders',
                  data: {
                    openid: openid
                  },
                  success(res) {
                    console.log(res);
                    that.setData({ orders: res.data.orders, all_orders: res.data.orders })
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  // 飞鸟点击确认订单
  sure_order(e){
    var url = app.globalData.url;
    var id = e.currentTarget.dataset.id;
    var that = this;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: url +'saveorders',
      data:{
        birdsid:id,
        state:1
      },
      success(res){
        if(res.data.err==1){//重新获取我是飞鸟时的订单信息
          wx.request({
            url: url + 'birdsorders',
            data: {
              openid: openid
            },
            success(res) {
              console.log(res);
              that.setData({ orders: res.data.orders, all_orders: res.data.orders })
            }
          })
        }
      }
    })
  },
  // 选择用户或飞鸟
  choose_header(e){
    this.setData({ is_user: e.currentTarget.dataset.num, nav_choose:0})
    var url = app.globalData.url;
    var openid = wx.getStorageSync('openid');
    var that = this;
    // 获取我的飞鸟订单
    if(this.data.is_user==0){
      wx.request({
        url: url + 'orders',
        data: {
          openid: openid
        },
        success(res) {
          console.log(res);
          if (res.data.err == 1) {
            that.setData({ orders: res.data.orders, all_orders: res.data.orders, no_order: false })
          } else {
            that.setData({ orders: {}, all_orders: {}, no_order: true })
          }
        }
      })
    }else{
      wx.request({
        url: url + 'birdsorders',
        data: {
          openid: openid
        },
        success(res) {
          console.log(res);
          if(res.data.err==1){
            that.setData({ orders: res.data.orders, all_orders: res.data.orders, no_order: false })
          }else{
            that.setData({ orders: {}, all_orders: {}, no_order: true })
          }
          
        }
      })
    }
    
  },
  // 选择订单状态
  choose_nav(e){
    var num = e.currentTarget.dataset.num;
    var index = num-1;
    this.setData({ nav_choose: num })
    var orders = this.data.all_orders;
    var arr = [];
    if (num == 0){
      this.setData({orders:this.data.all_orders});
    }else{
      for (var i = 0; i < orders.length; i++) {
        if (orders[i].ostate == index){
          arr.push(orders[i]);
        }
      }
      this.setData({orders:arr});
    }
    if(this.data.orders.length==0){
      this.setData({no_order:true})
    }else{
      this.setData({ no_order: false })
    }
  },
  // 点击查看详情
  go_order_details(e){
    var id = e.currentTarget.dataset.id;
    var is_user = this.data.is_user;
    wx.navigateTo({
      url: '/pages/order/order_details/order_details?id=' + id + '&is_user=' + is_user,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取我的订单
    var url = app.globalData.url;
    var openid = wx.getStorageSync('openid');
    var that = this;
    wx.request({
      url: url+'orders',
      data:{
        openid:openid
      },
      success(res){
        console.log(res);
        if (res.data.err==1){
          that.setData({ orders: res.data.orders, all_orders: res.data.orders ,no_order:false})
        } else if (res.data.err == 0){
          that.setData({ no_order: true })
        }
        // 直接点击待确认...进入
        if (options.num) {
          var num = options.num;
          // console.log(num)
          var index = num - 1;
          that.setData({ nav_choose: num })
          var orders = that.data.all_orders;
          var arr = [];
          if (num == 0) {
            that.setData({ orders: that.data.all_orders });
          } else {
            for (var i = 0; i < orders.length; i++) {
              if (orders[i].ostate == index) {
                arr.push(orders[i]);
              }
            }
            that.setData({ orders: arr });
            console.log(that.data.orders);
          }
          if (options.is_bird) {
            that.setData({ is_user: options.is_bird });
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