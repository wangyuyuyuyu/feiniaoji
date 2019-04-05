// pages/regist/regist.js
var app = getApp();
var wxApi = require('../../utils/wxApi')
var wxRequest = require('../../utils/wxRequest')
var Promise = require('../../utils/es6-promise.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    index:0,
    array:['男','女'],
    isname:true,
    isphone: true,
    is_country: true,
    is_sub:false,
    is_weixin:true,
    name:'',
    qu:'',
    phone:'',
    country:'',
    des:'',
    weixin:''
  },
  // 点击提交进入主页
  go_homepage(){
    
    var phone = this.data.phone;
    var qu = this.data.qu;
    var name = this.data.name;
    var sex = this.data.index;
    var country = this.data.country;
    var des = this.data.des;
    var weixin = this.data.weixin;
    var that = this;
    console.log(phone.length, qu, name, sex, country,des);
    if(phone.length!=11){//手机号验证位数
      wx.showToast({
        title: '手机号错误',
        image:'/images/pay_lose.png'
      })
      return;
    }
    // 手机号验证正确
    var url = app.globalData.url;
    var openid = wx.getStorageSync('openid');
    console.log(openid);
    wx.request({
      url: url+'adduser',
      data:{
        areacode:qu,
        username:name,
        phone:phone,
        sex:sex,
        nation:country,
        describe:des,
        openid:openid,
        wxaccount: weixin
      },
      success:function(res){
        console.log(res);
        if(res.data.err==1){//成功添加
          wx.switchTab({
            url: '/pages/homepage/homepage',
          })
        }else{//添加失败
          wx.showToast({
            title: '添加失败请重试',
            image: '/images/pay_lose.png'
          })
        }
        
      }
    })
    
    
  },
  // 性别
  bindPickerChange(e){
    this.setData({index:e.detail.value});
    console.log(this.data.index);
  },
  // 名字
  name(e){
    this.setData({name:e.detail.value});
    if (this.data.name.length > 0) {
      this.setData({ isname: false })
    } else {
      this.setData({ isname: true })
    }
    this.can_sub();
  },
  // 电话号码
  phone(e) {
    this.setData({ phone: e.detail.value });
    this.phone_on();
    this.can_sub();
  },
  // 区号
  qu(e) {
    this.setData({ qu: e.detail.value });
    this.phone_on();
    this.can_sub();
  },
  // 国家
  country(e) {
    this.setData({ country: e.detail.value });
    if(this.data.country.length>0){
      this.setData({is_country:false})
    }else{
      this.setData({ is_country: true })
    }
    this.can_sub();
  },
  // 判断区号和号码是否填写
  phone_on(){
    var phone = this.data.phone;
    var qu = this.data.qu;
    if (phone != '' && qu != ''){
      this.setData({ isphone:false});
    }else{
      this.setData({ isphone: true });
    }
  },
  // 获取微信号
  weixin(e) {
    var weixin = e.detail.value;
    this.setData({ weixin: weixin });
    var url = app.globalData.url;
    var that = this;
    wx.request({
      url: url+'wxaccount',
      data:{
        wxaccount: weixin
      },
      success(res){
        console.log(res);
        if(res.data.err == 0){
          that.setData({ is_weixin: true })
        } else if (res.data.err == 1){
          that.setData({ is_weixin: false })
        }
      }
    })
    this.can_sub();
  },
  // 获取描述
  des(e){
    this.setData({des:e.detail.value});
  },
  // 判断是否能提交
  can_sub(){
    var name = this.data.name;
    var phone = this.data.phone;
    var country = this.data.country;
    var qu = this.data.qu;
    var weixin = this.data.weixin;
    if (name != '' && phone != '' && country != '' && qu != ''&&weixin!=''){
      this.setData({is_sub:true});
    }else{
      this.setData({ is_sub: false });
      console.log("信息未填写完整")
    }
  },
  // 环信登录函数
  hxloign: function (name, pwd) {
    console.log("登录")
    var options = {
      apiUrl: WebIM.config.apiURL,
      user: name,
      pwd: pwd,
      grant_type: 'password',
      appKey: WebIM.config.appkey //应用key
    }
    wx.setStorage({
      key: "myUsername",
      data: name
    })
    WebIM.conn.open(options)
  },
  // 注册并登录函数
  register: function (name, pwd) {
    var types = 0;
    var that = this;
    var options = {
      apiUrl: WebIM.config.apiURL,
      username: name,
      password: pwd,
      nickname: "",
      appKey: WebIM.config.appkey,
      success: function (res) {
        if (res.statusCode == "200") {
          console.log("注册成功")
          var data = {
            apiUrl: WebIM.config.apiURL,
            user: name,
            pwd: pwd,
            grant_type: "password",
            appKey: WebIM.config.appkey
          };
          console.log(data)
          wx.setStorage({
            key: "myUsername",
            data: name
          });
          that.hxloign(name, pwd);

        }
      },
      error: function (res) {
        if (res.statusCode !== "200") {
          console.log("已经注册，直接登录");
          types = 1;
          that.hxloign(name, pwd);
        }
      }
    };
    if (types == 0) {
      WebIM.utils.registerUser(options);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var getUserInfo = wxApi.wxGetUserInfo();
    getUserInfo().then(res=>{
      that.setData({userInfo:res.userInfo})
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