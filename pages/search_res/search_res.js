// pages/search_res/search_res.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:{},
    birds:[],
    have_search:false,
    options:{}
  },

  // 点击查看详情
  go_trip_details(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/trip_details/trip_details?id=' + id,
    })
  },
  // 点击再次搜索
  search_again(){
    var options = this.data.options;
    var obj = options;
    if (obj.start_country.legnth > 2) {
      obj.start_country = obj.start_country.substr(0, 2) + '...';
    }
    if (obj.end_country.legnth > 2) {
      obj.end_country = obj.end_country.substr(0, 2) + '...';
    }
    this.setData({ search: obj });
    var that = this;
    console.log(obj);
    wx.showLoading({
      title: '加载中',
      success:function(){
        // 获取搜索数据
        var url = app.globalData.url;
        if (obj.startDate == '' || obj.endDate == '') {
          var data = {
            start: obj.start_place,
            startpoint: options.start_country,
            ends: obj.end_place,
            endpoint: options.end_country,
          }
        } else {
          var data = {
            start: obj.start_place,
            starttime: obj.startDate,
            startpoint: options.start_country,
            ends: obj.end_place,
            endpoint: options.end_country,
            endtime: obj.endDate,
          }
        }
        console.log(data);
       
        wx.request({
          url: url + 'birdsseach',
          data: data,
          success(res) {
            console.log(res);
            wx.hideLoading();
            var birds = res.data.birds;
            that.setData({ birds: birds });
            if (birds.length > 0) {
              that.setData({ have_search: true });
            }
          }
        })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ options: options })
    var obj = options;
    if(obj.start_country.legnth>2){
      obj.start_country = obj.start_country.substr(0,2)+'...';
    }
    if (obj.end_country.legnth > 2) {
      obj.end_country = obj.end_country.substr(0, 2) + '...';
    }
    this.setData({search:obj});
    console.log(obj);
    // 获取搜索数据
    var url = app.globalData.url;
    if (obj.startDate == '' || obj.endDate == ''){
      var data = {
        start: obj.start_place,
        startpoint: options.start_country,
        ends: obj.end_place,
        endpoint: options.end_country,
      }
    }else{
      var data = {
        start: obj.start_place,
        starttime: obj.startDate,
        startpoint: options.start_country,
        ends: obj.end_place,
        endpoint: options.end_country,
        endtime: obj.endDate,
      }
    }
    console.log(data);
    var that = this;
    wx.request({
      url: url +'birdsseach',
      data: data,
      success(res){
        console.log(res);
        var birds = res.data.birds;
        that.setData({ birds: birds });
        if(birds.length>0){
          that.setData({ have_search:true});
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