// pages/trip_details/trip_details.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_fly:false,//是否进行中
    is_complete:false,//是否已完成
    is_xieyi:false,//下单说明
    is_my:false,//如果是自己的行程
    is_cancel:false,//是否已取消
    road_list: [1, 1, 1],
    birds:{},
    box:[],
    types:[],
    all_birds:[],
    date:'',
    a:{},
    score:0,
    widths:0
  },
  // 点击立即下单
  go_order_sub(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order/order_sub/order_sub?id=' + id,
    })
  },
  // 点击立即沟通
  go_order_online(e) {
    var url = app.globalData.url;
    var openid = wx.getStorageSync('openid');
    var uopenid = this.data.birds.uopenid;
    var user = wx.getStorageSync('user');
    var myName = user.wxaccount;
    var your = this.data.birds.uwxaccount;

    var nameList = {
      myName: myName,
      your: your
    };
    wx.request({
      url: url + 'openidfriend',
      data: {
        openid: openid,
        friendopenid: uopenid
      },
      success(res) {
        if (res.data.err == 1) {
          wx.navigateTo({
            url: '/pages/chatroom/chatroom?username=' + JSON.stringify(nameList)
          })
        } else {
          wx.showModal({
            title: '出错了',
            content: '请稍后再试',
            showCancel: false
          })
        }
      }
    })
  },
  // 取消行程
  trip_cancel(e){
    var url = app.globalData.url;
    var id = e.currentTarget.dataset.id;
    var that = this;
    wx.showModal({
      title: '取消行程！',
      content: '确定要取消行程吗？',
      success(res){
        if(res.confirm){//点击确定
          wx.request({
            url: url + 'birdsstate',
            data: {
              birdsid: id,
              state: 3
            },
            success(res) {
              console.log(res);
              if(res.data.err==1){
                that.setData({is_cancel:true});
              }
            }
          })
        }else if(res.cancel){
          console.log("未取消行程")
        }
      }
    })
  },
  // 显示下单说明
  show_xieyi(){
    this.setData({ is_xieyi:true});
  },
  xieyi_off(){
    this.setData({is_xieyi:false});
  },
  // 进入行程详情页面
  go_tripDetails(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/trip_details/trip_details?id=' + id,
    })
  },
  // 点击修改行程
  trip_revise(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/trip_revise/trip_revise?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取此行程信息
    var birdsid = options.id;
    var url = app.globalData.url;
    var that = this;
    wx.request({
      url: url+'birds',
      data:{
        birdsid: birdsid
      },
      success:function(res){
        console.log(res);
        var birds = res.data.birds;
        that.setData({birds: birds});
        // console.log(birds.usore)
        var score = parseFloat(birds.usore)*10/2;
        // console.log(score);
        score = Math.round(score);
        that.setData({ score: score})
        // console.log(score);
        // var state = 1;
        // 判断订单状态,默认待出发状态state=0;
        var state = birds.bstate;
        if(state==1){
          that.setData({is_fly:true});
        }else if(state==2){
          that.setData({ is_complete: true });
        } else if (state == 3){
          that.setData({ is_cancel: true });
        }else if(state==0){
          that.setData({
            is_fly: false,
            is_complete: false,
            is_xieyi: false,
            is_my: false,
            is_cancel: false,
          }) 
        }
        console.log(birds.udescribe)
        if (birds.udescribe == null || birds.udescribe == '' || birds.udescribe){
          birds.udescribe=""
        }
        console.log(birds.udescribe)
        // 判断是否是自己的行程
        var id = birds.buserid;
        var user = wx.getStorageSync('user');
        // console.log(user);
        if (id == user.id) {//id相等则说明是自己的行程
          that.setData({ is_my: true });
        }
        // 行李箱
        var box = birds.bbox.split(",");
        that.setData({box:box});
        // 货物类型
        var types = birds.btypes.split(",");
        var types_arr = [];
        for(var i=0;i<types.length;i++){
          if(types[i].length!=0){
            types_arr.push(types[i]);
          }
        }
        that.setData({ types: types_arr})
        // 时间戳装换时间
        var timestamp = birds.bdateline;
        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var date = (d.getFullYear()) + "-" +(d.getMonth() + 1) + "-" +(d.getDate()) + " " + (d.getHours()) + ":" +(d.getMinutes()) + ":" +(d.getSeconds());
        that.setData({date:date});

        // 判断剩余空间重量
        var widths = (Number(birds.btotalweight) - Number(birds.bresidueweight)) / Number(birds.btotalweight) * 100 + '%';
        // console.log(widths)
        that.setData({ widths: widths });
      }
    });
    // 获取其他行程信息推荐
    var url = app.globalData.url;
    wx.request({
      url: url + 'selbirds',
      success(res) {
        var all_birds = [];
        for(var i=0;i<res.data.birds.length;i++){
          if(i<3){
            all_birds.push(res.data.birds[i]);
          }
        }
        that.setData({ all_birds: all_birds })
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