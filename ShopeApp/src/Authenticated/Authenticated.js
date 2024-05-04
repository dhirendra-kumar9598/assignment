import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from './Pages/Home';
import Checkout from './Pages/Checkout';

import ProductDetail from './Pages/ProductDetail';
import MyProfile from './Pages/MyProfile';
import ProductList from './Pages/ProductList';
import Address from './Pages/Address';
import AddAddress from './Pages/AddAddress';

export default function App_nav() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#ff8800',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          title: 'Shipping Information',
        }}
      />

      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          title: 'My Profile',
        }}
      />

      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
    </Stack.Navigator>
  );
}
