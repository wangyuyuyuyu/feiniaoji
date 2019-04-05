//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    is_login:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.my_getUserInfo();
        
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.switchTab({
            url: '/pages/homepage/homepage',
          })
        }
      })
    }
  },
  my_getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    var that = this;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        that.setData({is_login:true});
        var code = res.code;
        var url = app.globalData.url;
        var userInfo = app.globalData.userInfo;
        console.log(userInfo);
        wx.request({
          url: url + 'index',
          data: {
            code: code,
            nickname: userInfo.nickName,
            headerimg: userInfo.avatarUrl
          },
          success: function (res) {
            console.log(res);
            wx.setStorageSync('openid', res.data.openid);
            var url = app.globalData.url;
            var openid = res.data.openid;
            console.log(openid);
            wx.request({
              url: url + 'user',
              data: {
                openid: openid
              },
              success: function (res) {
                console.log(res);
                wx.setStorageSync('user', res.data.user);
                if (res.data.user.state == 0) {//未认证，跳转添加页面
                  wx.redirectTo({
                    url: '/pages/regist/regist',
                  })
                }
              }
            })
          }
        })
        if (e.detail.userInfo != '') {
          wx.switchTab({
            url: '/pages/homepage/homepage',
          })
        }
      },
      fail(){
        console.log("用户拒绝授权");
      }
    })
    
  }
})
