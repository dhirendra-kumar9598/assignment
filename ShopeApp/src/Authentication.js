import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Authenticated from './Authenticated/Authenticated';
import Unauthenticated from './Unauthenticated/Unauthenticated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authenticate} from '../reduxStore/authSlice/authSlice';
import {config, db} from '../db/config';
export default function Authentication() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const Stack = createNativeStackNavigator();
  const getAuthentication = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token != null) {
      dispatch(authenticate(token));
    }
  };
  useEffect(() => {
    getAuthentication();
    config();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {token ? (
          <Stack.Screen name="authenticated" component={Authenticated} />
        ) : (
          <Stack.Screen name="unauthenticated" component={Unauthenticated} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
