import React, {Component, Fragment} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity,
		 Alert, Image, Modal,} from 'react-native';
import './variables.js';
import pxToDp from './pxToDp';

export default class MenuScreen extends Component 
{
  static navigationOptions = {header: null};

  constructor(props)
  {
    super(props);
    
    this.state = 
    {
      menu_category: ["Hot Coffees", "Hot Teas", "Hot Drinks", "Hot Breakfast", "Lunch"],
      menu_content: 
      [
        {dish_id: 1, dish_name: "Caffè Americano", dish_category: "Hot Coffees", dish_price: 15,
         dish_options: ["hot", "ice", "sweetness", "size"],},
        {dish_id: 2, dish_name: "Blonde Roast", dish_category: "Hot Coffees", dish_price: 28,
          dish_options: ["hot", "ice", "sweetness", "size"],},
        {dish_id: 3, dish_name: "Caffè Misto", dish_category: "Hot Coffees", dish_price: 8,
          dish_options: ["hot", "ice", "sweetness", "size"],},
        {dish_id: 4, dish_name: "Dark Roast Coffee", dish_category: "Hot Coffees", dish_price: 20,
          dish_options: ["hot", "ice", "sweetness", "size"],},
        {dish_id: 5, dish_name: "Cappuccino", dish_category: "Hot Coffees", dish_price: 45,
          dish_options: ["hot", "ice", "sweetness", "size"],},
        {dish_id: 6, dish_name: "Smoked Butterscotch Latte", dish_category: "Hot Coffees", dish_price: 7,
          dish_options: ["hot", "ice", "sweetness", "size"],},
      ],
      dish_options: 
      [
        {option_name: "hot", option_content: ["hot", "not hot"]},
        {option_name: "ice", option_content: ["no ice", "iced"]},
        {option_name: "sweetness", option_content: ["no sugar", "25% sugar", "50% sugar", "100% sugar"]},
        {option_name: "size", option_content: ["medium", "large", "extra large"],},
      ],
      chosenMenuCategoryIndex: 0,
      ChoosePreferenceVisible: false,
      current_choosing_item: {dish_options: [], dish_preference: [], dish_total_price: 0},
    };
  }

  componentWillUnmount() {this.setState = (state,callback)=>{ return; };}

  componentDidMount()
  {
      
  }

  _onPressMenuCategory = (idx) =>
  {
    this.state.chosenMenuCategoryIndex = idx;
    this.setState({
      chosenMenuCategoryIndex: this.state.chosenMenuCategoryIndex,
    })
  }

  _onPressChoosePreference = (idx) =>
  {
    this.state.ChoosePreferenceVisible = true;
    this.state.current_choosing_item.dish_id = this.state.menu_content[idx].dish_id;
    this.state.current_choosing_item.dish_name = this.state.menu_content[idx].dish_name;
    this.state.current_choosing_item.dish_category = this.state.menu_content[idx].dish_category;
    this.state.current_choosing_item.dish_price = this.state.menu_content[idx].dish_price;
    this.state.current_choosing_item.dish_options = this.state.menu_content[idx].dish_options;
    for(let i = 0; i < this.state.menu_content[idx].dish_options.length; i++)
    {
      let dish_preference_temp = 
      {
        preference_name: this.state.menu_content[idx].dish_options[i],
        preference_content: "NULL"
      }
      this.state.current_choosing_item.dish_preference.push(dish_preference_temp);
    }
    this.state.current_choosing_item.dish_amount = 1;
    this.setState({
      ChoosePreferenceVisible: this.state.ChoosePreferenceVisible,
      current_choosing_item: this.state.current_choosing_item
    })
  }

  _cancelChoosePreference = () =>
  {
    this.state.current_choosing_item = {dish_options: [], dish_preference: []},
    this.state.ChoosePreferenceVisible = false;
    this.setState({
      ChoosePreferenceVisible: this.state.ChoosePreferenceVisible,
      current_choosing_item: this.state.current_choosing_item,
    })
  }

  _confirmChoosePreference = () =>
  {
    let has_this_item = false;
    if(this.state.current_choosing_item.dish_amount <= 0)
      return;
    
    this.state.current_choosing_item.dish_total_price = this.state.current_choosing_item.dish_price * 
                                                        this.state.current_choosing_item.dish_amount;
    for(let i = 0; i < global.variables.current_order_content.length; i++)
    {
      if(this.state.current_choosing_item.dish_name == global.variables.current_order_content[i].dish_name)
      {
        let has_this_preference = true;
        for(let j = 0; j < this.state.current_choosing_item.dish_preference.length; j++)
        {
          if(this.state.current_choosing_item.dish_preference[j].preference_content != 
             global.variables.current_order_content[i].dish_preference[j].preference_content)
          {
            has_this_preference = false;
            break;
          }
        }
        if(has_this_preference)
        {
          global.variables.current_order_content[i].dish_amount += this.state.current_choosing_item.dish_amount;
          global.variables.current_order_content[i].dish_total_price += this.state.current_choosing_item.dish_total_price;
          has_this_item = true;
          break;
        }
      }
    }
    if(!has_this_item)
      global.variables.current_order_content.push(this.state.current_choosing_item);
    
    global.variables.current_total_price += this.state.current_choosing_item.dish_total_price;                                                   
                                                
    this.state.current_choosing_item = {dish_options: [], dish_preference: []},
    this.state.ChoosePreferenceVisible = false;
    this.setState({
      ChoosePreferenceVisible: this.state.ChoosePreferenceVisible,
      current_choosing_item: this.state.current_choosing_item,
    })
  }

  _plusChoosingItemAmount = () =>
  {
    this.state.current_choosing_item.dish_amount += 1;
    this.setState({
      current_choosing_item: this.state.current_choosing_item,
    })
  }

  _minusChoosingItemAmount = () =>
  {
    if(this.state.current_choosing_item.dish_amount >= 1)
      this.state.current_choosing_item.dish_amount -= 1;
    this.setState({
      current_choosing_item: this.state.current_choosing_item,
    })
  }
  _choosingItemPreference = (sub_item, sub_sub_item) =>
  {
    for(let i = 0; i < this.state.current_choosing_item.dish_preference.length; i++)
    {
      if(this.state.current_choosing_item.dish_preference[i].preference_name == sub_item)
      {
        this.state.current_choosing_item.dish_preference[i].preference_content = sub_sub_item;
      }
    }
    this.setState({
      current_choosing_item: this.state.current_choosing_item,
    })
  }

  _checkTheOptionIsSelected = (option_name) =>
  {
    for(let i = 0; i < this.state.current_choosing_item.dish_preference.length; i++)
    {
      if(this.state.current_choosing_item.dish_preference[i].preference_content == option_name)
        return true;
    }
    return false;
  }
  
  render() {
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>

		{/* header */}
		<View style={styles.header}>

		  {/* resturant name */}
		  <Image source={require('./images/logo.png')} style={styles.resturantImg}/>
		  <Text style={styles.headerText}>{global.variables.resturant}</Text>
		 
		</View>

	  {/* search bar */}
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBar}><Text style={styles.searchBarText}>type to search</Text></View>
    </View>

      {/* menu category */}
      <View  style = {styles.menuCategoryContainer}>
        <ScrollView style = {styles.menu_category} horizontal = {true} showsHorizontalScrollIndicator = {false}>
          {this.state.menu_category.map((item, idx) => {
            return(
              this.state.chosenMenuCategoryIndex == idx ? 
              <TouchableOpacity
              style={{backgroundColor: "#FBC02D", width: "auto", height: 36, paddingLeft: 16, paddingRight: 16,
                      borderRadius: 100, marginRight: 12, flexDirection: 'column', justifyContent:'center', alignItems: 'center',
                      shadowColor: '#e0e0e0', shadowOffset: {width: 2, height: 2}, shadowRadius: 2, shadowOpacity: 1}}
              onPress={() => this._onPressMenuCategory(idx)}
              key={idx}
              >
                <Text style = {styles.menu_category_text}>{item}</Text>
              </TouchableOpacity> :
              <TouchableOpacity
              style={{backgroundColor: "#f5f5f5", width: "auto", height: 36, paddingLeft: 16, paddingRight: 16,
                      borderRadius: 100, marginRight: 12, flexDirection: 'column', justifyContent:'center', alignItems: 'center',
                      shadowColor: '#e0e0e0', shadowOffset: {width: 1, height: 1}, shadowRadius: 2, shadowOpacity: 1}}
              onPress={() => this._onPressMenuCategory(idx)}
              key={idx}
              >
                <Text style = {styles.menu_category_text}>{item}</Text>
              </TouchableOpacity>

          )})}
        </ScrollView>
      </View>

      {/* menu content */}
      <View style = {styles.menuContentContainer}>
        <ScrollView style = {styles.menu_content} showsVerticalScrollIndicator = {false}>
          {this.state.menu_content.map((item, idx) => {
            return(
              this.state.menu_category[this.state.chosenMenuCategoryIndex] == item.dish_category ? 
              <View
              style={{
                      backgroundColor: "#ffffff", height: 110, marginBottom: 30, 
                    }}
              key={idx}
              >
                <Image source={require('./images/temp.jpg')} style={styles.dish_img}/>
                <Text style={styles.dish_name}>{item.dish_name}</Text>
                <Text style={styles.dish_price}>${item.dish_price}</Text>
                <ScrollView style={styles.dish_options}
                            horizontal= {true} showsVerticalScrollIndicator = {false}>
                  {item.dish_options.map((sub_item, idx) => {
                    return(
                        <View key={idx} style={styles.dish_options_tag}>
                          <Text style={styles.dish_options_text}>{sub_item}</Text>
                        </View>
                      )})}
                </ScrollView>
                <TouchableOpacity style={styles.choose_preference_button}
                onPress={() => this._onPressChoosePreference(idx)}>
                  <Image source={require('./images/plus.png')} style={styles.choose_preference_button_img}/>
                </TouchableOpacity>
              </View> : 
              <View key={idx}></View>
          )})}
        </ScrollView>
      </View>

    {/* choose preference panel */}
		<Modal
		  animationType = "slide"
		  transparent = {false}
      presentationStyle = "formSheet"
		  visible = {this.state.ChoosePreferenceVisible}
		>
		 <View style={styles.shareTableFather}>
      <TouchableOpacity 
      style={styles.shareTableCancel}
      onPress={() => {this._cancelChoosePreference();}}>
        <Image source={require('./images/cancel.png')} style={styles.shareTableCancelIcon}/>
      </TouchableOpacity>

      <Text style={styles.choosing_item_dish_name}>{this.state.current_choosing_item.dish_name}</Text>

      <View style={styles.choosing_item_dish_amount_panel}>
        <TouchableOpacity 
         style={styles.choosing_item_dish_amount_panel_minus_button}
         onPress={() => {this._minusChoosingItemAmount()}}>
          <Image source={require('./images/minus.png')} style={styles.choosing_item_dish_amount_panel_minus_img}/>
        </TouchableOpacity>
        <Text style={styles.choosing_item_dish_amount}>{this.state.current_choosing_item.dish_amount}</Text>
        <TouchableOpacity 
         style={styles.choosing_item_dish_amount_panel_plus_button}
         onPress={() => {this._plusChoosingItemAmount()}}>
          <Image source={require('./images/plus.png')} style={styles.choosing_item_dish_amount_panel_plus_img}/>
        </TouchableOpacity>
      </View>

      <Text style={styles.choosing_item_dish_price}>${this.state.current_choosing_item.dish_price}</Text>

      <ScrollView style={styles.choosing_item_dish_options}
                  horizontal= {false} showsVerticalScrollIndicator = {false}>
                  {this.state.current_choosing_item.dish_options.map((item, idx) => {
                    return(
                        <View key={idx}>
                          <Text style={styles.choosing_item_dish_options_tag}>{item}</Text>
                          {this.state.dish_options.map((sub_item, sub_idx) => {
                            return(
                                item == sub_item.option_name ? 
                                 <View style={styles.choosing_item_dish_options_box} key={sub_idx}>
                                  {sub_item.option_content.map((sub_sub_item, sub_sub_idx) => {
                                    return(
                                      this._checkTheOptionIsSelected(sub_sub_item) == true ?
                                      <TouchableOpacity key={sub_sub_idx}
                                       style={styles.choosing_item_dish_options_card_selected}
                                       onPress={() => {this._choosingItemPreference(sub_item.option_name, sub_sub_item)}}>
                                        <Text key={sub_sub_idx}
                                              style={styles.choosing_item_dish_options_card_text}>
                                              {sub_sub_item}
                                        </Text>
                                      </TouchableOpacity>:
                                      <TouchableOpacity key={sub_sub_idx}
                                       style={styles.choosing_item_dish_options_card_unselected}
                                       onPress={() => {this._choosingItemPreference(sub_item.option_name, sub_sub_item)}}>
                                        <Text key={sub_sub_idx}
                                              style={styles.choosing_item_dish_options_card_text}>
                                              {sub_sub_item}
                                        </Text>
                                      </TouchableOpacity>
                                  )})}
                                 </View> :
                                 <View key={sub_idx}></View>
                          )})}
                        </View>
                  )})}
      </ScrollView>

			<TouchableOpacity 
				style={styles.shareTableComfirmation}
				onPress={() => {this._confirmChoosePreference();}}>
				<Image source={require('./images/confirm.png')} style={styles.shareTableConfirmIcon}/>
			</TouchableOpacity>

		 </View>

		</Modal>

	  </SafeAreaView> 
	);
  }
}

const styles = StyleSheet.create({
  header: 
  {
    height: 40,
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  resturantImg:
  {
    position: 'absolute',
    left: 12,
    width: 38,
    height: 38,
  },
  headerText: 
  {
    fontSize: 22,
    fontWeight: "bold",
    position: "absolute",
    left: 56,
    top: 6
  },
  searchBarContainer:
  {
    marginTop : 4,
    height: 54,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: "center",
  },
  searchBar:
  {
    width: pxToDp(590), 
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: "center",
    backgroundColor: "#f5f5f5", 
    shadowColor: '#e0e0e0',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 4,
    shadowOpacity: 1
  },
  searchBarText:
  {
    fontSize: 16,
    fontWeight: "500",
    color: "#9e9e9e"
  },
  menuCategoryContainer:
  {
    marginTop : 6,
    height: 50,
  },
  menu_category:
  {
    marginLeft: 16,
    marginTop: 10,
  },
  menu_category_text:
  {
    fontSize: 16,
    fontWeight: "500",
  },
  menuContentContainer:
  {
    flex: 1,
    marginTop: 20,
  },
  dish_img:
  {
    position: 'absolute',
    left: 18,
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  dish_name:
  {
    position: 'absolute',
    left: 130,
    fontSize: 20,
    fontWeight: "bold",
  },
  dish_options:
  {
    position: 'absolute',
    left: 130,
    top: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dish_options_tag:
  {
    width: 'auto', 
    height: 24,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    marginBottom: 4,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: "center",
    backgroundColor: "#f5f5f5", 
    shadowColor: '#e0e0e0',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 1
  },
  dish_price:
  {
    position: 'absolute',
    bottom: 0,
    left: 130,
    fontSize: 20,
    fontWeight: "bold",
  },
  dish_options_text:
  {
    fontSize: 16,
    fontWeight: "400",
  },
  choose_preference_button:
  {
    width: 34, 
    height: 34,
    position: "absolute",
    right: 22,
    bottom: 0,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: "center",
    backgroundColor: "#FBC02D", 
    shadowColor: '#e0e0e0',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 2,
    shadowOpacity: 1
  },
  choose_preference_button_img:
  {
    width: 22,
	  height: 22
  },
  shareTableFather: 
  {
    flex: 1,
    justifyContent:'center',
    alignItems: "center",
  },
  shareTableCancel:
  {
    position: "absolute",
    left: 20,
    top: 20,
    backgroundColor: "#f5f5f5", 
    width: 40, 
    height: 40,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: "center",
    shadowColor: '#e0e0e0',
    shadowOffset: {width: 4, height: 4},
    shadowRadius: 6,
    shadowOpacity: 1
  },
  shareTableCancelIcon:
  {
    width: 30,
    height: 30
  },
  choosing_item_dish_name:
  {
    position: "absolute",
    left: 24,
    top: 86,
    fontSize: 26,
    fontWeight: "bold",
  },
  choosing_item_dish_options:
  {
    position: "absolute",
    left: 24,
    top: 130,
  },
  choosing_item_dish_options_tag:
  {
    fontSize: 26,
    fontWeight: "bold",
  },
  choosing_item_dish_options_box:
  {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    marginBottom: 8,
  },
  choosing_item_dish_options_card_selected:
  {
    backgroundColor: "#f5f5f5",
    width: "auto", 
    height: 40, 
    paddingLeft: 16, 
    paddingRight: 16,
    borderRadius: 10, 
    borderColor: "#FBC02D",
    borderWidth: 4,
    marginRight: 14,
    marginBottom: 14, 
    justifyContent:'center',
    alignItems: 'center',
   
  },
  choosing_item_dish_options_card_unselected:
  {
    backgroundColor: "#f5f5f5", 
    width: "auto", 
    height: 38, 
    paddingLeft: 16, 
    paddingRight: 16,
    borderRadius: 10, 
    marginRight: 14,
    marginBottom: 14, 
    justifyContent:'center',
    alignItems: 'center',
    shadowColor: '#e0e0e0', 
    shadowOffset: {width: 1, height: 1}, 
    shadowRadius: 2, 
    shadowOpacity: 1
  },
  choosing_item_dish_options_card_text:
  {
    fontSize: 16,
    fontWeight: "500",
  },
  choosing_item_dish_price:
  {
    position: "absolute",
    left: 100,
    bottom: 65,
    fontSize: 26,
    fontWeight: "bold",
  },
  choosing_item_dish_amount_panel:
  {
    position: "absolute",
    right: 24,
    bottom: 50,
    backgroundColor: "#f5f5f5", 
    width: 134, 
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: "center",
    shadowColor: '#e0e0e0',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 6,
    shadowOpacity: 1
  },
  choosing_item_dish_amount_panel_plus_button:
  {
    position: "absolute",
    right: 16,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: "center",
  },
  choosing_item_dish_amount_panel_minus_button:
  {
    position: "absolute",
    left: 16,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: "center",
  },
  choosing_item_dish_amount_panel_plus_img:
  {
    width: 24,
    height: 24
  },
  choosing_item_dish_amount_panel_minus_img:
  {
    width: 20,
    height: 20
  },
  choosing_item_dish_amount:
  {
    fontSize: 34,
    fontWeight: "500",
  },
  shareTableComfirmation: 
  {
    backgroundColor: "#FBC02D", 
    width: 60, 
    height: 60,
    position: "absolute", 
    left: 24,
    bottom: 50,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: "center",
    shadowColor: '#ffecb3',
    shadowOffset: {width: 6, height: 6},
    shadowRadius: 6,
    shadowOpacity: 1
  },
  shareTableConfirmIcon: 
  {
    width: 36,
    height: 36
  },
});