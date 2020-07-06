import React, {Component, Fragment} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity,
         Alert, Image, Modal, InteractionManager,} from 'react-native';
import './variables.js';
import pxToDp from './pxToDp';

export default class CartScreen extends Component 
{
  constructor(props)
  {
    super(props);
    
    this.state = 
    {
      order_history: [{order_resturant: '', order_id: '', order_status: '', order_total_price: 0, order_content: []}],
      order_details_visible: false,
      choose_order_history_index: 0
    }
  }

  componentDidMount()
  {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.state.order_history = global.variables.order_history
      this.setState({
        order_history: this.state.order_history,
      })
    });
  }

  componentWillUnmount() { this._unsubscribe(); this.setState = (state,callback)=>{ return; }; }

  _onPressOrderContent = () => 
  {
    this.state.order_details_visible = true;
    this.setState({
      order_details_visible: this.state.order_details_visible,
    })
  }

  _cancelPressOrderContent = () =>
  {
    this.state.order_details_visible = false;
    this.setState({
      order_details_visible: this.state.order_details_visible,
    })
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>

        {/* header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Order History</Text>
        </View>

        <ScrollView style={styles.order_content_container}>
          {this.state.order_history.map((item, idx) => {
            return(
              <View style={styles.order_content_box} key={idx}>
                <TouchableOpacity 
                 style={styles.order_content} key={idx}
                 onPress={() => {this._onPressOrderContent();}}
                >
                  <Text style={styles.order_resturant}>{item.order_resturant}</Text>
                  <Text style={styles.order_id}>{item.order_id}</Text>
                  <Text style={styles.order_total_price}>${item.order_total_price}</Text>
                </TouchableOpacity>
              </View>
            )})}
        </ScrollView>

        {/* order details */}
        <Modal
          animationType = "slide"
          transparent = {false}
          presentationStyle = "formSheet"
          visible = {this.state.order_details_visible}
        >

          <TouchableOpacity 
            style={styles.shareTableCancel}
            onPress={() => {this._cancelPressOrderContent();}}>
            <Image source={require('./images/cancel.png')} style={styles.shareTableCancelIcon}/>
          </TouchableOpacity>
          
          {/* paid panel */}
          <View style={styles.current_order_total_price}> 
              <Text style={styles.current_order_total_price_text}>Total Paid: ${this.state.order_history[this.state.choose_order_history_index].order_total_price}</Text>
          </View>

          {/* current order content */}
          <View style={styles.current_order_content_container}>
          <ScrollView style={styles.current_order_content}>
            {this.state.order_history[this.state.choose_order_history_index].order_content.map((item, idx) => {
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
        
        </Modal>

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
  order_content_box:
  {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: "center",
  },
  order_content:
  {
    backgroundColor: "#f5f5f5", 
    width: pxToDp(580), 
    height: 100,
    marginTop: 10,
    marginBottom: 4,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent:'center',
    shadowColor: '#eeeeee', 
    shadowOffset: {width: 1, height: 1}, 
    shadowRadius: 2, 
    shadowOpacity: 1,
  },
  order_resturant:
  {
    marginLeft: 20,
    fontSize: 22,
    fontWeight: "bold"
  },
  order_id:
  {
    marginLeft: 20,
    marginTop: 4,
    fontSize: 18,
    fontWeight: "400"
  },
  order_total_price:
  {
    marginLeft: 20,
    marginTop: 4,
    fontSize: 18,
    fontWeight: "400",
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
  current_order_total_price:
  {
    marginTop: 84,
    marginLeft: 20,
  },
  current_order_total_price_text:
  {
    fontSize: 24,
    fontWeight: "bold"
  },
  current_order_content_container:
  {
    marginTop: 20,
    height: pxToDp(970),
  },
  current_order_content_box:
  {
    marginTop: 1,
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
})