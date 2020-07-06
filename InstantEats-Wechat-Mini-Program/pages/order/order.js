const app = getApp();
var tempDish = { dish_id:"", dish_name: "", dish_type: "", dish_price: "",
                 dish_preference: "", dish_total_price: 0, dish_amount: 0 };
var tempMenuIndex = 0;

Page({
  data: 
  {
    order_price: 0,
    order_amount: 0,
    order_content: [],
    menu: [],
    whichMenuSelection: "",
    inSelectTasteOption: 0,
    addEventTargetID: JSON.stringify(''),
    addEventTargetName: "",
    addEventTargetFeature: "",
    tempDishAmount: 0,
    menu_selection: [],
    taste_option: [],
    scroll_height: 0,
  },
  onLoad: function () 
  {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (252) - 10
    })
  },
  onShow: function()
  {
    this.setData({ order_amount: app.globalData.order_amount });
    this.setData({ order_price: app.globalData.order_price });
    this.setData({ order_content: app.globalData.order_content });
    this.setData({ menu: app.globalData.menu });
    this.setData({ menu_selection: app.globalData.menu_selection });
    this.setData({ taste_option: app.globalData.taste_option });
    this.setData({ whichMenuSelection: this.data.menu_selection[0].selection_name });
  },
  selectMenu: function (event) 
  {
    this.setData({whichMenuSelection: event.currentTarget.dataset.name})
    for (var i = 0; i < this.data.menu_selection.length; i++) {
      if (JSON.stringify(event.currentTarget.dataset.name) ==
          JSON.stringify(this.data.menu_selection[i].selection_name)) 
      {
        this.data.menu_selection[i].selection_color = '#2196F3';
        this.data.menu_selection[i].selection_text_color = 'black';
      }
      else 
      {
        this.data.menu_selection[i].selection_color = 'white';
        this.data.menu_selection[i].selection_text_color = 'grey';
      }
    }
    this.setData({ menu_selection: this.data.menu_selection });
  },
  goToSelectTasteOption: function(event)
  {
    this.setData({ inSelectTasteOption: 1 });
    this.setData({ addEventTargetID: JSON.stringify(event.currentTarget.id) })
    this.setData({ addEventTargetName: event.currentTarget.dataset.name })
    this.setData({ addEventTargetFeature: event.currentTarget.dataset.feature })
  },
  selectTasteOption: function(event)
  {
    var i = 0;
    while (i < this.data.taste_option.length) 
    {
      if (JSON.stringify(event.currentTarget.dataset.type) == JSON.stringify(this.data.taste_option[i][0]
          .option_type))
      {
        for(var j = 0; j < this.data.taste_option[i].length; j++)
        {
          if (JSON.stringify(event.currentTarget.dataset.id) == JSON.stringify(this.data.taste_option[i]
              [j].option_id))
          {
            this.data.taste_option[i][j].option_color = '#2196F3';
            this.data.taste_option[i][j].isChosen = 1;
          }
          else
          {
            this.data.taste_option[i][j].option_color = 'grey';
            this.data.taste_option[i][j].isChosen = 0;
          }
        }
      }
      this.setData({ taste_option: this.data.taste_option });
      ++i;
    }
  },
  minusTempDish: function()
  {
    for (var i = 0; i < this.data.menu.length; i++) 
    {
      if (this.data.addEventTargetID == JSON.stringify(this.data.menu[i].dish_id +
        "_add")) 
      {
        // update
        this.setData({ addEventTargetName: this.data.menu[i].dish_name })
        tempDish.dish_id = this.data.menu[i].dish_id;
        tempDish.dish_name = this.data.menu[i].dish_name;
        tempDish.dish_type = this.data.menu[i].dish_type;
        tempDish.dish_price = this.data.menu[i].dish_price;

        if(tempDish.dish_amount > 0)
        {
          tempDish.dish_amount -= 1;
          tempDish.dish_total_price -= tempDish.dish_price;
          tempMenuIndex = i;
        }

        this.setData({ tempDishAmount: tempDish.dish_amount });
      }
    }
  },
  addTempDish: function () 
  {
    for (var i = 0; i < this.data.menu.length; i++) 
    {
      if (this.data.addEventTargetID == JSON.stringify(this.data.menu[i].dish_id +
        "_add")) 
      {
        // update
        this.setData({ addEventTargetName: this.data.menu[i].dish_name })
        tempDish.dish_id = this.data.menu[i].dish_id;
        tempDish.dish_name = this.data.menu[i].dish_name;
        tempDish.dish_type = this.data.menu[i].dish_type;
        tempDish.dish_price = this.data.menu[i].dish_price;

        tempDish.dish_amount += 1;
        tempDish.dish_total_price += tempDish.dish_price;
        tempMenuIndex = i;

        this.setData({ tempDishAmount: tempDish.dish_amount });
      }
    }
  },
  cancelTasteOption: function()
  {
    // clean
    var self = this;
    tempDish = {dish_id: "", dish_name: "", dish_type: "", dish_price: "",
      dish_preference: "", dish_total_price: 0, dish_amount: 0};
    tempMenuIndex = 0;
    wx.getStorage({
      key: 'menu&menu_selection&taste_option',
      success: function(res) {
        self.setData({ taste_option: res.data.taste_option });
      },
      fail: function(res)
      {
        console.log("hahahahahhaah");
      }
    })
    this.setData({ inSelectTasteOption: 0 });
    this.setData({ tempDishAmount: 0 });
  },
  confirmTasteOption: function(event)
  {
    if(tempDish.dish_amount == 0){this.cancelTasteOption()}
    else
    {
      var tempDishPreference = "";
      for (var x = 0; x < this.data.taste_option.length; x++) {
        for (var y = 0; y < this.data.taste_option[x].length; y++) {
          if (this.data.taste_option[x][y].isChosen == 1 &&
            this.data.addEventTargetFeature == this.data.taste_option[x][y].option_feature) {
            tempDishPreference += (this.data.taste_option[x][y].option_name + ", ");
          }
        }
      }
      tempDishPreference = tempDishPreference.substr(0, tempDishPreference.length - 2);
      tempDish.dish_preference = tempDishPreference;

      // confirm order_price & order_amount & menu_amount
      this.data.order_price += tempDish.dish_total_price;
      this.data.order_amount += tempDish.dish_amount;
      this.data.menu[tempMenuIndex].dish_total_amount += tempDish.dish_amount;

      // confirm order_content
      var existed = 0
      for (var j = 0; j < this.data.order_content.length; j++) {
        existed = 0;
        if (app.globalData.order_content[j].dish_name == tempDish.dish_name &&
          app.globalData.order_content[j].dish_preference == tempDish.dish_preference) {
          app.globalData.order_content[j].dish_amount += tempDish.dish_amount;
          app.globalData.order_content[j].dish_total_price += tempDish.dish_total_price
          existed = 1;
          break;
        }
      }
      if (!existed) { app.globalData.order_content.push(tempDish); }

      // sync
      this.setData({ order_amount: this.data.order_amount });
      this.setData({ order_price: this.data.order_price });
      this.setData({ order_content: this.data.order_content });
      this.setData({ menu: this.data.menu });
      app.globalData.order_amount = this.data.order_amount;
      app.globalData.order_price = this.data.order_price;
      app.globalData.menu = this.data.menu;

      // clean
      this.cancelTasteOption();
    }
  },
  placeOrder: function()
  {
    if(this.data.order_amount > 0)
    {
      wx.navigateTo({ url: '../placeOrder/placeOrder' })
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
})