const app = getApp();


Page({
  data:
  {
    resturant: "",
    table_id: "",
    total_order_content: [],
    total_order_price: 0,
    menu_selection: [],
    scroll_height: 0
  },
  onLoad: function () 
  {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (352) - 30
    })
    
    this.setData({ resturant: app.globalData.resturant });
    this.setData({ table_id: app.globalData.table_id });
    this.setData({ menu_selection: app.globalData.menu_selection });

    /* 向服务器发送requestDetailPage事件 */
    var message = new Object;
    message.event = 'requestDetailPage';
    message.table_id = app.globalData.table_id;
    message.dine_in_id = app.globalData.dine_in_id;
    app.globalData.socket.emit('message', message);

    /* 监听respondDetailPage事件 */
    app.globalData.socket.on('respondDetailPage', msg => {

      this.data.total_order_content = msg.total_order_content;
      this.data.total_order_price = msg.total_order_price;
      this.setData({ total_order_content: this.data.total_order_content });
      this.setData({ total_order_price: this.data.total_order_price });
      app.globalData.total_order_price = msg.total_order_price;
    })

    /* 监听dishCompleted事件 */
    app.globalData.socket.on('dishCompleted', msg => {
      for(var i = 0; i < this.data.total_order_content.length; i++)
      {
        if(this.data.total_order_content[i].dish_id == msg.dish_id &&
           this.data.total_order_content[i].order_id == msg.order_id &&
           this.data.total_order_content[i].dish_preference == msg.dish_preference)
        {
          this.data.total_order_content[i].dish_status = "已完成";
        }
      }
      this.setData({ total_order_content: this.data.total_order_content });
    })
  },
})