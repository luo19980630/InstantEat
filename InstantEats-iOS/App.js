import { TouchableOpacity } from 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuScreen from './Menu';
import CartScreen from './Cart';
import SettingsScreen from './Settings';
import { StyleSheet, Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName="Menu"
      lazy="false"
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({focused}) => (
            focused ?
            <TouchableOpacity><Image source={require('./images/home_selected.png')} style={styles.tabImg}/></TouchableOpacity> :
            <TouchableOpacity><Image source={require('./images/home_unselected.png')} style={styles.tabImg}/></TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            focused ?
            <TouchableOpacity><Image source={require('./images/cart_selected.png')} style={styles.tabImg}/></TouchableOpacity> :
            <TouchableOpacity><Image source={require('./images/cart_unselected.png')} style={styles.tabImg}/></TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            focused ?
            <TouchableOpacity><Image source={require('./images/account_selected.png')} style={styles.tabImg}/></TouchableOpacity> :
            <TouchableOpacity><Image source={require('./images/account_unselected.png')} style={styles.tabImg}/></TouchableOpacity>
          ),
        }}
      />

    </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabImg: {
    width: 34,
    height: 34
  }
})