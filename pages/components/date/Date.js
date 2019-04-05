// pages/components/date/Date.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    startChange:String,
    endChange:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentDate: "",
    dayList: '',
    currentDayList: '',
    currentObj: '',
    currentDay: '',
    currentClickKey: '',
    startDate: '选择出发时间',
    endDate: '选择到达时间',
    today: false,
    nowDate: '',
    is_choose: false,
    choose_start: false,
    choose_end: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    doDay: function (e) {
      var that = this
      var currentObj = that.data.currentObj
      var Y = currentObj.getFullYear();
      var m = currentObj.getMonth() + 1;
      var d = currentObj.getDate();
      var str = ''
      if (e.currentTarget.dataset.key == 'left') {
        m -= 1
        if (m <= 0) {
          str = (Y - 1) + '/' + 12 + '/' + d
        } else {
          str = Y + '/' + m + '/' + d
        }
      } else {
        m += 1
        if (m <= 12) {
          str = Y + '/' + m + '/' + d
        } else {
          str = (Y + 1) + '/' + 1 + '/' + d
        }
      }
      currentObj = new Date(str)
      this.setData({
        currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月',
        currentObj: currentObj
      })
      this.setSchedule(currentObj);
    },
    getCurrentDayString: function () {
      var objDate = this.data.currentObj
      if (objDate != '') {
        return objDate
      } else {
        var c_obj = new Date()
        var a = c_obj.getFullYear() + '/' + (c_obj.getMonth() + 1) + '/' + c_obj.getDate()
        return new Date(a)
      }
    },
    setSchedule: function (currentObj) {
      var that = this
      var m = currentObj.getMonth() + 1
      var Y = currentObj.getFullYear()
      var d = currentObj.getDate();
      var dayString = Y + '/' + m + '/' + currentObj.getDate()
      var currentDayNum = new Date(Y, m, 0).getDate()
      var currentDayWeek = currentObj.getUTCDay() + 1
      var result = currentDayWeek - (d % 7 - 1);
      var firstKey = result <= 0 ? 7 + result : result;
      var currentDayList = []
      var f = 0
      for (var i = 0; i < 42; i++) {
        let data = []
        if (i < firstKey - 1) {
          currentDayList[i] = ''
        } else {
          if (f < currentDayNum) {
            currentDayList[i] = f + 1
            f = currentDayList[i]
          } else if (f >= currentDayNum) {
            currentDayList[i] = ''
          }
        }
      }
      that.setData({
        currentDayList: currentDayList
      })
    },

    // 设置点击事件
    onClickItem: function (e) {
      console.log(e);
      console.log(this.data.currentObj, this.data.currentDayList, this.data.nowDate);
      // 今天的日期
      var nowDate = this.data.nowDate;
      var y = nowDate.substr(0, 4);
      var m = nowDate.split("月")[0].split("年")[1];
      var d = this.data.currentDay;
      // 选择的日期
      var date = e.currentTarget.dataset.date;
      var c_y = date.substr(0, 4);
      var c_m = date.split("月")[0].split("年")[1];
      var c_d = e.currentTarget.dataset.day;
      console.log(y, m, d);
      console.log(c_y, c_m, c_d);
      //选择日期
      if (this.data.choose_start) {// 选择开始日期
        console.log("选择开始日期")
        if (c_m < m || c_y < y) {
          console.log("不能选择今天之前");
        } else if (c_m == m && c_y == y) {
          if (c_d < d) {
            console.log("不能选择今天之前");
          } else {
            if (e.currentTarget.dataset.day == this.data.currentDay) {//如果选的是今天
              this.setData({ today: true, currentClickKey: e.currentTarget.id });
              var startDate = date + e.currentTarget.dataset.day+'日';
              this.setData({ startDate: startDate,today:true });
            } else {
              this.setData({
                currentClickKey: e.currentTarget.id,
                today: false
              });
              var startDate = date + e.currentTarget.dataset.day + '日';
              this.setData({ startDate: startDate });
            }
          }
        } else {
          if (e.currentTarget.dataset.day == this.data.currentDay) {
            this.setData({ today: true, currentClickKey: e.currentTarget.id });
            var startDate = date + e.currentTarget.dataset.day+'日';
            this.setData({ startDate: startDate });
          } else {
            this.setData({
              currentClickKey: e.currentTarget.id,
              today: false
            });
            var startDate = date + e.currentTarget.dataset.day + '日';
            this.setData({ startDate: startDate });
          }
        }
      } else {//选择结束日期
        console.log("选择结束日期")
        if (c_m < m || c_y < y) {
          console.log("不能选择今天之前");
        } else if (c_m == m && c_y == y) {
          if (c_d < d) {
            console.log("不能选择今天之前");
          } else {
            if (e.currentTarget.dataset.day == this.data.currentDay) {
              this.setData({ today: true, currentClickKey: e.currentTarget.id });
              var endDate = date + e.currentTarget.dataset.day+'日';
              this.setData({ endDate: endDate });
            } else {
              this.setData({
                currentClickKey: e.currentTarget.id,
                today: false
              });
              var endDate = date + e.currentTarget.dataset.day + '日';
              this.setData({ endDate: endDate });
            }
          }
        } else {
          if (e.currentTarget.dataset.day == this.data.currentDay) {
            this.setData({ today: true, currentClickKey: e.currentTarget.id });
            var endDate = date + e.currentTarget.dataset.day+'日';
            this.setData({ endDate: endDate });
          } else {
            this.setData({
              currentClickKey: e.currentTarget.id,
              today: false
            });
            var endDate = date + e.currentTarget.dataset.day + '日';
            this.setData({ endDate: endDate });
          }
        }
      }


    },
    // 
    // 点击出发日期
    choose_start() {
      this.setData({ is_choose: true, choose_start: true, choose_end: false });
    },
    // 点击到达日期
    choose_end() {
      this.setData({ is_choose: true, choose_end: true, choose_start: false });
    },
    sure_btn() {
      // this.setData({is_choose:false});
      console.log(this.data.startDate, this.data.endDate);
      var endDate = this.data.endDate;
      var e_y = endDate.substr(0, 4);
      var e_m = endDate.split("月")[0].split("年")[1];
      var e_d = endDate.split("日")[0].split("月")[1];
      // 选择的日期
      var startDate = this.data.startDate;
      var s_y = startDate.substr(0, 4);
      var s_m = startDate.split("月")[0].split("年")[1];
      var s_d = startDate.split("日")[0].split("月")[1];
      console.log("出发年月日：" + s_y, s_m, s_d);
      console.log("到达年月日：" + e_y, e_m, e_d);
      s_y = parseInt(s_y);
      s_m = parseInt(s_m);
      s_d = parseInt(s_d);
      e_y = parseInt(e_y);
      e_m = parseInt(e_m);
      e_d = parseInt(e_d);
      if (startDate != "选择出发时间" && endDate != "选择到达时间") {
        if (s_y > e_y) {
          wx.showToast({
            title: '日期错误请重选',
            mask: true,
            image: "/images/pay_lose.png",
            duration: 1000
          })
          return;
        }
        if (s_y == e_y && s_m > e_m) {
          wx.showToast({
            title: '日期错误请重选',
            mask: true,
            image: "/images/pay_lose.png",
            duration: 1000
          })
          return;
        }
        if (s_y == e_y && s_m == e_m && s_d > e_d) {
          console.log(s_m,e_m,s_d,e_d);
          console.log(1111);
          wx.showToast({
            title: '日期错误请重选',
            mask: true,
            image: "/images/pay_lose.png",
            duration: 1000
          })
          return;
        }
        this.setData({ is_choose: false });

        var datas = {
          startDate: s_y + '-' + s_m + '-' + s_d,
          endDate: e_y + '-' + e_m + '-' + e_d
        } // detail对象，提供给事件监听函数
        this.triggerEvent('getDate', datas) //myevent自定义名称事件传值
        
      } else {
        console.log(222222222);
        this.setData({ is_choose: false });
        var datas = {
          startDate: s_y+'-'+s_m+'-'+s_d,
          endDate: e_y + '-' + e_m + '-' + e_d
        } // detail对象，提供给事件监听函数
        this.triggerEvent('getDate', datas) //myevent自定义名称事件传值
      }
    },
    sure_er(){
      this.setData({ is_choose: false });
    }
  },
  ready: function(){
    var currentObj = this.getCurrentDayString()
    this.setData({
      currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月',
      currentDay: currentObj.getDate(),
      currentObj: currentObj,
      nowDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月'
    })
    this.setSchedule(currentObj);
  },
})
