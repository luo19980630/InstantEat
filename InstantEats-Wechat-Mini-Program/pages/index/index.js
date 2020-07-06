const app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    resturant: '',
    table_id: '',
    dine_in_id: '',
    total_order_price: '',
    inGoTorequestService: 0,
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
        }
      })
    }

    /* 获取用户信息 */
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            app.globalData.username = res.userInfo.nickName;
          },
        });
      },
    });

    /* 与服务器建立连接 */
    if(app.globalData.dine_in_id == "")
    {
      app.globalData.io = require('../../utils/weapp.socket.io.js');
      app.globalData.socket = app.globalData.io('wss://jishi365.club/', {query: 'device_id=' + '食客'});
      console.log("连接服务器");
    }

    this.setData({ resturant: app.globalData.resturant });
    this.setData({ table_id: app.globalData.table_id });
    this.setData({ dine_in_id: app.globalData.dine_in_id });

    this.tableOpened();
    this.tableInUse();
    this.joinDecision();
    this.joinRequest();
    this.requestServiceReceived();
  },
  scan: function()
  {
    wx.scanCode({
      success: (res) => {
        this.setData({ table_id: res.result.substr(res.result.length - 3, res.result.length)});
        app.globalData.table_id = this.data.table_id;

        this.setData({ resturant: res.result.substr( 0, res.result.length - 3) });
        app.globalData.resturant = this.data.resturant;

        this.useTable();
      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败！请重试！', 
          icon: 'none',
          duration: 2000
        })
      },
    })

  },
  useTable: function()
  {
    var message = new Object;
    message.event = "useTable";
    message.username = app.globalData.username;
    message.resturant = app.globalData.resturant;
    message.table_id = app.globalData.table_id;

    /* 查看本地是否有dine_in_id */
    wx.getStorage({
      key: 'dine_in_id',
      success: function (res) {
        app.globalData.dine_in_id = res.data;
        this.setData({ dine_in_id: app.globalData.dine_in_id });

        /* 向服务器发送useTable事件 */
        message.dine_in_id = app.globalData.dine_in_id;
        app.globalData.socket.emit('message', message);
      },
      fail: function(res){
        /* 向服务器发送useTable事件 */
        message.dine_in_id = "";
        app.globalData.socket.emit('message', message);
      }
    })
  },
  tableOpened: function()
  {
    /* 监听服务器的tableOpened事件 */
    app.globalData.socket.on('tableOpened', msg => {

      app.globalData.dine_in_id = msg.dine_in_id;
      this.setData({ dine_in_id: app.globalData.dine_in_id });

      /* 存储dine_in_id到本地 （无论是否更新）*/
      wx.setStorage({
        key: 'dine_in_id',
        data: app.globalData.dine_in_id
      })

      /* 存储菜单与口味选择到本地 */
      wx.setStorage({
        key: 'menu&menu_selection&taste_option',
        data: {
          menu: msg.menu,
          menu_selection: msg.menu_selection,
          taste_option: msg.taste_option
        },
      })

      app.globalData.menu = msg.menu;
      app.globalData.menu_selection = msg.menu_selection;
      app.globalData.taste_option = msg.taste_option;

      /* 前往菜单页 */
      wx.navigateTo({ url: '../order/order' });
    })
  },
  tableInUse: function()
  {
    /* 监听服务器的tableInUse事件 */
    app.globalData.socket.on('tableInUse', msg => {

      wx.showModal({
        title: '本桌正在使用',
        content: '点击确定请向房主申请权限！',
        mask: true,
        complete(res) {
          if (res.confirm) 
          {
            /* 向服务器发送joinRequest事件 */
            var message = new Object
            message.event = 'joinRequest';
            message.table_id = app.globalData.table_id;
            message.username = app.globalData.username;
            app.globalData.socket.emit('message', message);
          }
        }
      });

    })
  },
  joinDecision: function ()
  {
    app.globalData.socket.on('joinDecision', msg => {
      if(msg.result == "approved")
      {
        wx.showModal({
          title: '房主同意了你的请求',
          content: '点击确定入桌点餐',
          success(res) {
            if (res.confirm) 
            {
              app.globalData.dine_in_id = msg.dine_in_id;
              this.setData({ dine_in_id: app.globalData.dine_in_id });

              /* 存储dine_in_id到本地 */
              wx.setStorage({
                key: 'dine_in_id',
                data: app.globalData.dine_in_id
              })

              /* 存储菜单与口味选择到本地 */
              wx.setStorage({
                key: 'menu&menu_selection&taste_option',
                data: {
                  menu: msg.menu,
                  menu_selection: msg.menu_selection,
                  taste_option: msg.taste_option
                },
              })

              app.globalData.menu = msg.menu;
              app.globalData.menu_selection = msg.menu_selection;
              app.globalData.taste_option = msg.taste_option;

              /* 前往菜单页 */
              wx.navigateTo({ url: '../order/order' });
            } 
          }
        })
      }
      else
      {
        wx.showToast({
          title: '入桌请求被驳回',
          icon: 'none',
          duration: 2000
        })
        app.globalData.table_id = "";
      }
    })
  },
  joinRequest: function()
  {
    app.globalData.socket.on('joinRequest', msg => {
      var message = new Object;
      message.event = 'joinDecision',
      message.requests_socket_id = msg.requests_socket_id,
      message.room_owners_username = app.globalData.username,
      message.table_id = app.globalData.table_id,

      wx.showModal({
        title: '收到入桌权限请求',
        content: '点击确定批准权限！',
        mask: true,
        complete(res) {
          if (res.confirm) 
          {
            /* 向服务器发送joinDecision事件 */
            message.result = 'approved'
            app.globalData.socket.emit('message', message);
          }
          else if (res.cancel)
          {
            /* 向服务器发送joinDecision事件 */
            message.result = 'denied'
            app.globalData.socket.emit('message', message);
          }
        }
      });
    })
  },
  requestServiceReceived: function()
  {
    app.globalData.socket.on('requestServiceReceived', msg => {

      this.setData({ inGoToRequestService: 0 });

      wx.showToast({
        title: '服务员正在前来！',
        icon: 'success',
        duration: 2000
      })

      // /* 恢复数据到初始状态 */
      // wx.clearStorage();
      // app.globalData.table_id = "";
      // app.globalData.dine_in_id = "";
      // app.globalData.username = "";
      // app.globalData.order_id = '';
      // app.globalData.order_price = 0;
      // app.globalData.order_amount = 0;
      // app.globalData.order_content = [];
      // app.globalData.total_order_price = 0;
      // app.globalData.menu = [];
      // app.globalData.menu_selection = [];
      // app.globalData.taste_option = [];

    })
  },
  goToMenu: function ()
  {
    if (app.globalData.dine_in_id == '')
    {
      wx.showToast({
        title: '请先扫描餐位二维码！',
        icon: 'none',
        duration: 2000
      })
    }
    else
    {
      wx.navigateTo({ url: '../order/order' });
    }
  },
  goToDetails: function()
  {
    if (app.globalData.dine_in_id == '') 
    {
      wx.showToast({
        title: '请先扫描餐位二维码！',
        icon: 'none',
        duration: 2000
      })
    }
    else 
    {
      wx.navigateTo({ url: '../details/details' });
    }
  },
  goToRequestService: function()
  {
    if (app.globalData.dine_in_id == '') 
    {
      wx.showToast({
        title: '请先扫描餐位二维码！',
        icon: 'none',
        duration: 2000
      })
    }
    else
    {
      this.setData({ inGoToRequestService: 1 });
    }
  },
  cancelRequestService: function()
  {
    this.setData({ inGoToRequestService: 0 });
  },
  confirmRequestService: function()
  {
    /* 向服务器发送requestService事件 */
    var message = new Object;
    message.event = 'requestService';
    message.table_id = app.globalData.table_id;
    message.dine_in_id = app.globalData.dine_in_id;
    app.globalData.socket.emit('message', message);
  }
})
