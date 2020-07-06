import React, {Component, Fragment} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity,
         Alert, Image, Modal, TextInput} from 'react-native';
import './variables.js';
import pxToDp from './pxToDp';

const reset = (navigation, routeName) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    navigation.dispatch(resetAction);
}; 

export default class SettingsScreen extends Component 
{
  static navigationOptions = () => {
    return {
      title: "Settings",
      gesturesEnabled: true,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  constructor(props)
  {
    super(props);
    this.state = {
      discount_rate: 0,
    };
  }

  componentWillUnmount() { this.setState = (state,callback)=>{ return; }; }

  componentDidMount()
  {
        
  }

  _onLongPressLogout = () =>
  {
        
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF"/>
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>

          <View style={styles.header}>
            <Text style={styles.headerText}>Settings</Text>
          </View>

          <View style={styles.body}>
            <TouchableOpacity style={styles.account}>
              <Image source={require('./images/boss.png')} style={styles.accountImg}/>
                <Text style={styles.accountText}>Account</Text>
              </TouchableOpacity>

          <TouchableOpacity style={styles.account}>
            <Image source={require('./images/discount.png')} style={styles.accountImg}/>
               <Text style={styles.accountText}>Coupon</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 6,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  account:{
    width: pxToDp(586),
    height: 60,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    marginTop: 10,
    alignItems: "center",
    flexDirection: 'row',
    shadowColor: '#f5f5f5', 
    shadowOffset: {width: 1, height: 1}, 
    shadowRadius: 2, 
    shadowOpacity: 1,
  },
  accountImg:{
    width: 36,
    height: 36,
    marginLeft: 14,
  },
  accountText:{
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
})