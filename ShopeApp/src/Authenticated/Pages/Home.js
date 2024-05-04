/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Main from './Main';
import Categories from './Categories';
import Wishlist from './Wishlist';
import Profile from './Profile';
import {Icon} from 'react-native-paper';
const Home = ({navigation}) => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      activeColor="#ff8800"
      inactiveColor="white"
      barStyle={{backgroundColor: 'white'}}
      tabBarLabel={false}
      labeled={false}
      backBehavior="history">
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarLabel: 'Home',

          tabBarIcon: ({color}) => (
            <Icon source={'home'} size={30} color="#3a8b82" />
          ),
        }}
      />

      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarLabel: 'Categories',

          tabBarIcon: ({color}) => (
            <Icon source={'view-grid'} size={30} color="#3a8b82" />
          ),
        }}
      />

      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarLabel: 'Cart',

          tabBarIcon: ({color}) => (
            <Icon source={'cart-outline'} size={30} color="#3a8b82" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',

          tabBarIcon: ({color}) => (
            <Icon source={'account'} size={30} color="#3a8b82" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Home;
