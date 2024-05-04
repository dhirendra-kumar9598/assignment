import React from 'react';
// import {authContext} from '../../utils/AuthProvider';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {Button, Icon, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogOut from './component/LogOut';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../../reduxStore/authSlice/authSlice';
export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const logOut = async () => {
    const token = await AsyncStorage.removeItem('token');
    dispatch(logout());
  };
  return (
    <View style={styles.box}>
      <View>
        <View
          style={{
            marginBottom: 5,
            padding: 10,
            display: 'flex',
            backgroundColor: '#3a8b82',
          }}>
          <Text variant="titleLarge">Profile</Text>
        </View>

        <ScrollView style={{marginBottom: 20}}>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
              <View>
                <Text variant="bodyLarge">My Profile</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('Address')}>
              <View>
                <Text variant="bodyLarge">Manage Addresses</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <View>
              <Text variant="bodyLarge">My Payements</Text>
            </View>
          </View>
          <View style={styles.item}>
            <TouchableOpacity>
              <View>
                <Text variant="bodyLarge">Customer Support</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity>
              <View>
                <Text variant="bodyLarge">Chat</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity>
              <View>
                <Text variant="bodyLarge">About Us</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity>
              <View>
                <Text variant="bodyLarge">Contact Us</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity>
              <View>
                <Text variant="bodyLarge">Faqs</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity>
              <View>
                <Text variant="bodyLarge">Privacy Policy</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity>
              <View>
                <Text variant="bodyLarge">Terms & Conditions</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity>
              <View>
                <Text variant="bodyLarge">Shipping Policy</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity>
              <View>
                <Text variant="bodyLarge">Return Policy</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity>
              <View>
                <Text variant="bodyLarge">Rate Us</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity>
              <View>
                <Text variant="bodyLarge">Delete Account</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity onPress={logOut}>
              <View>
                <Text variant="bodyLarge">Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '95%',
    // backgroundColor: "#ffffff",
  },
  item: {
    borderWidth: 1,
    padding: 10,
    margin: 5,

    backgroundColor: '#96b1ac',
    borderRadius: 10,
    borderColor: '#96b1ac',
  },
  itemLast: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
});
