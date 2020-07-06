const app = getApp();

Page({
  data:
  {
    resturant: "",
    table_id: "",
    order_price: 0,
    order_amount: 0,
    order_content: [],
    total_order_content: [],
    menu: [], 
    menu_selection: [],
    scroll_height: 0
  },
  onLoad: function () 
  {
    this.setData({ resturant: app.globalData.resturant });
    this.setData({ table_id: app.globalData.table_id });
    this.setData({ order_price: app.globalData.order_price });
    this.setData({ order_amount: app.globalData.order_amount });
    this.setData({ order_content: app.globalData.order_content });
    this.setData({ menu: app.globalData.menu });
    this.setData({ menu_selection: app.globalData.menu_selection });

    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (352) - 30
    })

    this.placeOrderReceived();
  },
  orderNow: function()
  {
    if (app.globalData.order_amount > 0) 
    {
      /* 用户点击立即下单后，向服务器发生placeOrder事件 */
      var message = new Object;
      message.event = "placeOrder";
      message.username = app.globalData.username;
      message.table_id = app.globalData.table_id;
      message.dine_in_id = app.globalData.dine_in_id;
      message.order_content = app.globalData.order_content;
      message.order_price = app.globalData.order_price;
      message.order_amount = app.globalData.order_amount;
      app.globalData.socket.emit('message', message);
    }
    else
    {
      wx.showToast({
        title: '什么都没点呢!',
        icon: 'none',
        duration: 2000
      })
    }
  },
  placeOrderReceived: function () {
    /* 收到placeOrderReceived事件 */
    app.globalData.socket.on('placeOrderReceived', msg => {
      /* 清除当前单内容，以便下次单使用 */
      this.cleanOrder();

      /* 提示下单成功 */
      wx.showModal({
        title: '提示',
        content: '下单成功！',
        showCancel: false,
        mask: true,
        success(res) {
          if (res.confirm) {
            /* 回到主页 */
            wx.reLaunch({ url: '../index/index' })
          }
        }
      });

    })
  },
  emptyCart: function()
  {
    var self = this;
    wx.showModal({
      title: '清空本单',
      content: '注意！清空后无法撤回！',
      success(res) {
        if (res.confirm) {
          self.cleanOrder();
        }
      }
    })
  },
  cleanOrder: function () 
  {
    this.setData({ order_content: [] });
    this.setData({ order_amount: 0 });
    this.setData({ order_price: 0 });
    app.globalData.order_content = this.data.order_content;
    app.globalData.order_amount = 0;
    app.globalData.order_price = 0;
    wx.getStorage({
      key: 'menu&menu_selection&taste_option',
      success: function (res) {
        app.globalData.menu = res.data.menu;
        app.globalData.menu_selection = res.data.menu_selection;
      },
    })
  },
})