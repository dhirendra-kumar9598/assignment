/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  useColorScheme,
  ToastAndroid,
} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../../../reduxStore/authSlice/authSlice';
export default function Login({navigation}) {
  const dispatch = useDispatch();
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  const [email, setemail] = useState('');
  const [password, setpass] = useState('');

  console.log(email, password);
  const signUser = async () => {
    console.log('function called');
    const resp = await fetch(`${process.env.API_URL}/login`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        pass: password,
      }),
    });
    const data = await resp.json();
    if (resp.status == 200) {
      console.log(data.user);
      await AsyncStorage.setItem('token', data.user);
      dispatch(login(data.user));
    } else if (resp.status == 400) {
      console.log(data);
      return ToastAndroid.show('User not found', ToastAndroid.SHORT);
    } else if (resp.status == 500) {
      console.log(data);
      return ToastAndroid.show('Wrong password', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          height,
          width,
          padding: 20,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <View>
            <Text variant="headlineMedium" style={{fontWeight: 'bold'}}>
              Login
            </Text>
          </View>
          <View>
            <Image
              source={require('../../../assets/images/logo/logo2.png')}
              style={{
                borderTopWidth: 5,
                borderRadius: 20,
                height: 70,
                width: 300,
              }}
            />
          </View>
        </View>
        <View style={styles.inpBox}>
          <View>
            <TextInput
              label="Email"
              right={<TextInput.Icon icon="email" />}
              style={styles.inpItem}
              onChangeText={text => setemail(text)}
            />
          </View>
          <View>
            <TextInput
              label="Password"
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
              style={styles.inpItem}
              onChangeText={text => setpass(text)}
            />
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              margin: 5,
            }}>
            <Text variant="titleMedium">New User ?</Text>
            <Text
              variant="titleMedium"
              style={{fontWeight: 'bold'}}
              onPress={() => navigation.navigate('register')}>
              Register
            </Text>
          </View>
          <Button mode="contained" onPress={signUser} buttonColor="#3a8b82">
            Sign In
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inpItem: {
    backgroundColor: 'white',
    color: 'red',
  },
  inpBox: {
    padding: 30,
  },
});
