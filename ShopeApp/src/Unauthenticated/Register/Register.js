/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {authenticate} from '../../../reduxStore/authSlice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text} from 'react-native-paper';
export default function Register({navigation}) {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [first, setfirst] = useState('');
  const [last, setLast] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [password, setpass] = useState('');
  const dispatch = useDispatch();
  console.log(process.env.API_URL);
  const regUser = async () => {
    if (!first || !last || !phone || !email || !password) {
      alert('Fill all details...');
    } else {
      const resp = await fetch(`${process.env.API_URL}/registerApp`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          fname: first,
          lname: last,
          email,
          phone,
          pass: password,
        }),
      });
      const data = await resp.json();
      console.log(data);

      if (resp.status == 200) {
        await AsyncStorage.setItem('token', data.user);
        dispatch(authenticate(data.user));
      }
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
              Register
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
              placeholder="Firstname"
              // right={
              //   <TextInput.Icon icon={first == "" ? "close" : "account"} />
              // }
              style={styles.inpItem}
              value={first}
              onChangeText={text => setfirst(text)}
              keyboardType="default"
              // error={first == "" ? true : false}
            />
          </View>
          <View>
            <TextInput
              placeholder="Lastname"
              // right={<TextInput.Icon icon={last == "" ? "close" : "account"} />}
              style={styles.inpItem}
              value={last}
              onChangeText={text => setLast(text)}
              keyboardType="default"
              // error={last == "" ? true : false}
            />
          </View>
          <View>
            <TextInput
              placeholder="Phone"
              // right={<TextInput.Icon icon={phone == "" ? "close" : "phone"} />}
              style={styles.inpItem}
              value={phone}
              onChangeText={text => setphone(text)}
              keyboardType="number-pad"
              // error={phone == "" ? true : false}
            />
          </View>
          <View>
            <TextInput
              placeholder="Email"
              // right={<TextInput.Icon icon={email == "" ? "close" : "email"} />}
              style={styles.inpItem}
              value={email}
              onChangeText={text => setemail(text)}
              keyboardType="email-address"
              // error={email == "" ? true : false}
            />
          </View>
          <View>
            <TextInput
              placeholder="Password"
              secureTextEntry
              // right={<TextInput.Icon icon={password == "" ? "close" : "eye"} />}
              style={styles.inpItem}
              value={password}
              onChangeText={text => setpass(text)}
              keyboardType="default"
              // error={password == "" ? true : false}
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
            <Text variant="titleMedium">Already have an account ?</Text>
            <Text
              variant="titleMedium"
              style={{fontWeight: 'bold'}}
              onPress={() => navigation.navigate('login')}>
              Login
            </Text>
          </View>
          <Button mode="contained" onPress={regUser} buttonColor="#3a8b82">
            Register
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
