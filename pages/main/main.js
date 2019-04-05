var strophe = require('../../utils/strophe.js')
var WebIM = require('../../utils/WebIM.js')
var WebIM = WebIM.default
var app = getApp();

Page({
  data: {
    search_btn: true,
    search_friend: false,
    show_mask: false,
    myName: '',
    member: [],
    friends:null
  },
  // 点击删除按钮
  shanchu(e){
    var url = app.globalData.url;
    var openid = wx.getStorageSync('openid');
    var friendopenid = e.currentTarget.dataset.openid;
    var that = this;
    wx.showModal({
      title: '删除',
      content: '确定要删除好友吗？',
      success(res){
        if(res.confirm){
          // 确定删除
          wx.request({
            url: url +'deletefriends',
            data:{
              openid:openid,
              friendopenid: friendopenid
            },
            success(res){
              if(res.data.err==1){
                console.log("删除成功");
                wx.request({
                  url: url + 'friends',
                  data: {
                    openid: openid
                  },
                  success(res) {
                    console.log(res);
                    if(res.data.err==1){
                      that.setData({ friends: res.data.user });
                    }else{
                      that.setData({ friends: [] });
                    }
                  }
                })
              }
            }
          })
        }else if(!res.confirm){

        }
      }
    })
  },
  onLoad: function (option) {
    var myName = wx.getStorageSync('myUsername');
    console.log(myName);
    this.setData({
      myName: myName
    })
  },
  onShow: function () {
    // 获取消息列表
    var openid = wx.getStorageSync('openid');
    console.log(app.globalData.url)
    var url = app.globalData.url;
    var that = this;
    wx.request({
      url: url +'friends',
      data:{
        openid:openid
      },
      success(res){
        console.log(res);
        if (res.data.err == 1) {
          that.setData({ friends: res.data.user });
        } else {
          that.setData({ friends: [] });
        }
      }
    })
    
    var rosters = {
      success: function (roster) {
        var member = []
        for (var i = 0; i < roster.length; i++) {
          if (roster[i].subscription == "both") {
            member.push(roster[i])
          }
        }
        that.setData({
          member: member
        })
        wx.setStorage({
          key: 'member',
          data: that.data.member
        })
      }
    }

    console.log(rosters);
    WebIM.conn.getRoster(rosters)
  },
  moveFriend: function (message) {
    var that = this
    var rosters = {
      success: function (roster) {
        var member = []
        for (var i = 0; i < roster.length; i++) {
          if (roster[i].subscription == "both") {
            member.push(roster[i])
          }
        }
        that.setData({
          member: member
        })
      }
    }
    if (message.type == 'unsubscribe' || message.type == 'unsubscribed') {
      WebIM.conn.removeRoster({
        to: message.from,
        success: function () {
          WebIM.conn.unsubscribed({
            to: message.from
          });
          WebIM.conn.getRoster(rosters)
        }
      })
    }
  },
  handleFriendMsg: function (message) {
    var that = this
    //console.log(message)
    wx.showModal({
      title: '添加好友请求',
      content: message.from + '请求加为好友',
      success: function (res) {
        if (res.confirm == true) {
          //console.log('vvvvvvvvvvvvv')
          WebIM.conn.subscribed({
            to: message.from,
            message: "[resp:true]"
          })
          WebIM.conn.subscribe({
            to: message.from,
            message: "[resp:true]"
          })
        } else {
          WebIM.conn.unsubscribed({
            to: message.from,
            message: "rejectAddFriend"
          })
          //console.log('delete_friend')
        }
      },
      fail: function (error) {
        //console.log(error)
      }
    })

  },
  delete_friend: function () {
    var delName = event.target.dataset.username

    console.log(event)
    wx.showModal({
      title: '确认删除好友' + delName,
      cancelText: '取消',
      confirmText: '删除',
      success: function (res) {
        if (res.confirm == true) {
          WebIM.conn.removeRoster({
            to: delName,
            success: function () {
              WebIM.conn.unsubscribed({
                to: delName
              });
            },
            error: function (error) {
            }
          })
        }

      },
      fail: function (error) {
      }
    })
  },
  openSearch: function () {
    this.setData({
      search_btn: false,
      search_friend: true,
      show_mask: true
    })
  },
  cancel: function () {
    this.setData({
      search_btn: true,
      search_friend: false,
      show_mask: false
    })
  },
  add_new: function () {
    wx.navigateTo({
      url: '../add_new/add_new'
    })
  },
  tab_chat: function () {
    wx.redirectTo({
      url: '../chat/chat'
    })
  },
  close_mask: function () {
    this.setData({
      search_btn: true,
      search_friend: false,
      show_mask: false
    })
  },
  tab_setting: function () {
    wx.redirectTo({
      url: '../settings/settings'
    })
  },
  into_inform: function () {
    wx.navigateTo({
      url: '../inform/inform'
    })
  },
  into_groups: function () {
    wx.navigateTo({
      url: '../groups/groups'
    })
  },
  into_room: function (event) {
    var that = this
    var nameList = {
      myName: that.data.myName,
      your: event.target.dataset.username
    }
    wx.navigateTo({
      url: '../chatroom/chatroom?username=' + JSON.stringify(nameList)
    })
  },
  into_info: function (event) {
    wx.navigateTo({
      url: '../friend_info/friend_info?yourname=' + event.target.dataset.username
    })
  }

})