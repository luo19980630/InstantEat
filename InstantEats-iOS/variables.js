// import io from 'socket.io-client';
// import { AsyncStorage } from 'react-native';
// import Storage from 'react-native-storage';

global.variables = { 
  socket: new Object, 
  username: "",
  resturant: "Starbucks Westwood",
  current_order_content: [],
  current_total_price: 0,
  order_history: [{order_resturant: '', order_id: '', order_status: '', order_total_price: 0, order_content: []}],
} 