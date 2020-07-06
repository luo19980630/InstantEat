import React, {Component, Fragment} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity,
         Alert, Image, Modal,} from 'react-native';
import './variables.js';
import pxToDp from './pxToDp';

export default class CartScreen extends Component 
{
  constructor(props)
  {
    super(props);
    
    this.state = 
    {
      current_order_content: global.variables.current_order_content,
      current_total_price: global.variables.current_total_price
    }
  }

  componentDidMount()
  {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.state.current_order_content = global.variables.current_order_content;
      this.state.current_total_price = global.variables.current_total_price;
      this.setState({
        current_order_content: this.state.current_order_content,
        current_total_price: this.state.current_total_price,
      })
    });
  }

  componentWillUnmount() { this._unsubscribe(); this.setState = (state,callback)=>{ return; }; }

  _placeOrder = () =>
  {
    // clean
    this._onLongPressEmptyOrder();
  }

  _onLongPressEmptyOrder = () =>
  {
    global.variables.current_order_content = [];
    global.variables.current_total_price = 0;
    this.state.current_order_content = [];
    this.state.current_total_price = 0;
    this.setState({
      current_order_content: this.state.current_order_content,
    })
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>

        {/* header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Cart</Text>
        </View>

        {/* current order content */}
        <View style={styles.current_order_content_container}>
        <ScrollView style={styles.current_order_content}>
          {this.state.current_order_content.map((item, idx) => {
            return(
              <View style={styles.current_order_content_box} key={idx}>
                <View style={styles.current_order_content_dish_amount}>
                  <Text style={styles.current_order_content_dish_amount_text}>{item.dish_amount}</Text>
                </View>
                <Text style={styles.current_order_content_dish_name}>{item.dish_name}</Text>
                <Text style={styles.current_order_content_dish_total_price}>${item.dish_total_price}</Text>
                <View style={styles.current_order_content_dish_preference_container}>
                  <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false} style={styles.current_order_content_dish_preference}>
                    {item.dish_preference.map((sub_item, sub_idx) => {
                      return(
                        sub_idx == item.dish_preference.length - 1 ? 
                          <Text key={sub_idx} style={styles.current_order_content_dish_preference_text}>{sub_item.preference_content} </Text>:
                          <Text key={sub_idx} style={styles.current_order_content_dish_preference_text}>{sub_item.preference_content}, </Text>
                      )})}
                  </ScrollView>
                </View>
              </View>
            )})}
        </ScrollView>
        </View>
        

        {/* place order button */}
        <TouchableOpacity 
          style={styles.placeOrder}
          onPress={() => {this._placeOrder();}}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>

        {/* current total price */}
        <Text style={styles.totalPrice}>
          ${global.variables.current_total_price}
        </Text>
        
        {/* empty current order content */}
        <TouchableOpacity 
          style={styles.emptyOrder}
          onLongPress={() => {this._onLongPressEmptyOrder();}}>
          <Image source={require('./images/empty.png')} style={styles.emptyOrderImg}/>
        </TouchableOpacity>

      </SafeAreaView>
  )}

}

const styles = StyleSheet.create({
  header: 
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 6,
  },
  headerText: 
  {
    fontSize: 18,
    fontWeight: "bold"
  },
  current_order_content_container:
  {
    marginTop: 4,
    height: pxToDp(970),
  },
  current_order_content_box:
  {
    height: 72
  },
  current_order_content_dish_amount:
  {
    backgroundColor: "#f5f5f5", 
    width: 30, 
    height: 30,
    position: "absolute", 
    left: 20,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: "center",
    shadowColor: '#e0e0e0',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 4,
    shadowOpacity: 1
  },
  current_order_content_dish_amount_text:
  {
    fontSize: 18,
    fontWeight: "bold"
  },
  current_order_content_dish_name:
  {
    position: "absolute",
    top: 3,
    left: 64,
    fontSize: 20,
    fontWeight: "bold"
  },
  current_order_content_dish_total_price:
  {
    position: "absolute",
    top: 3,
    right: 20,
    fontSize: 20,
    fontWeight: "bold"
  },
  current_order_content_dish_preference_container:
  {
    width: pxToDp(420),
  },
  current_order_content_dish_preference:
  {
    position: "absolute",
    top: 30,
    left: 64,
    height: pxToDp(100),
  },
  current_order_content_dish_preference_text:
  {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: 'italic',
    color: "#f57f17",
  },
  placeOrder: 
  {
    backgroundColor: "#FBC02D", 
    width: 140, 
    height: 56,
    position: "absolute", 
    left: 20,
    bottom: 20,
    borderRadius: 14,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: "center",
    shadowColor: '#ffecb3',
    shadowOffset: {width: 6, height: 6},
    shadowRadius: 4,
    shadowOpacity: 1
  },
  placeOrderText: 
  {
    fontSize: 18,
    fontWeight: "bold"
  },
  totalPrice:
  {
    position: "absolute", 
    left: 180,
    bottom: 31,
    fontSize: 28,
    fontWeight: "bold"
  },
  emptyOrder:
  {
    backgroundColor: "#f5f5f5", 
    width: 56, 
    height: 56,
    position: "absolute", 
    right: 20,
    bottom: 20,
    borderRadius: 14,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: "center",
    shadowColor: '#e0e0e0',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 4,
    shadowOpacity: 1
  },
  emptyOrderImg:
  {
    width: 42,
    height: 42
  }
})