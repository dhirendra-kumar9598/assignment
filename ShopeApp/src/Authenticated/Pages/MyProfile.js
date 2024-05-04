/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
export default function MyProfile({navigation}) {
  const token = useSelector(state => state.auth.token);
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [image, selectImage] = useState(null);
  const apiUrl = process.env.API_URL;

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const resp = await fetch(`${process.env.API_URL}/userDetails`, {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          token,
        },
      });
      const data = await resp.json();
      console.log(data);
      if (resp.status === 200) {
        console.log('data ->', data.data.email);
        setfirstname(data.data.firstname);
        setlastname(data.data.lastname);
        setemail(data.data.email);
        setaddress(data.data.address);
        setphone(JSON.stringify(data.data.phone));
        setProfilePicture(data.data.imageUrl);
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(address);
  const updateUser = async () => {
    // const p = phone.json();
    const resp = await fetch(`${process.env.API_URL}/updateUser`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        token,
      },
      body: JSON.stringify({
        fname: firstname,
        lname: lastname,
        address,
        phone,
        email,
      }),
    });
    const data = await resp.json();
    if (resp.status == 200) {
      ToastAndroid.show('Details updated', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  const uploadImage = async () => {
    // try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    selectImage(res[0]);
    console.log(image);

    const data = new FormData();

    if (image != null) {
      data.append('file', {
        uri: res[0].path,
        type: res[0].mime,
        name: res[0].name,
      });
      console.log('called', data);
      const resu = await fetch(`${apiUrl}/uploadImage`, {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          token,
        },
        body: data,
      });
      console.log('executed', resu);
      const result = await resu.json();
      console.log(result);
      if (resu) {
        console.log('success');
      } else {
        console.log('error');
      }
    }
    // } catch (error) {
    //   alert(error);
    // }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, []),
  );
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
        // backgroundColor: "#ffffff",
      }}>
      <View>
        <View
          style={{
            marginBottom: 5,
            padding: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: '#3a8b82',
          }}>
          <Text variant="titleLarge" style={{color: 'white'}}>
            My Details
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Image
              source={{uri: `${apiUrl}/${profilePicture}`}}
              style={{width: 100, height: 100, borderRadius: 100}}
            />
          </View>
          <TouchableOpacity onPress={uploadImage}>
            <View style={{backgroundColor: '#3a8b82', padding: 3, margin: 10}}>
              <Text variant="titleMedium" style={{color: 'white'}}>
                Update picture
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{margin: 10}}>
          <Text variant="bodyMedium"> Firstname</Text>
          <TextInput
            mode="flat"
            placeholder="Name"
            // backgroundColor="#ffffff"
            activeUnderlineColor="#FF8800"
            activeOutlineColor="#FF8800"
            value={firstname}
            onChangeText={text => setfirstname(text)}
          />
        </View>
        <View style={{margin: 10}}>
          <Text variant="bodyMedium"> Lastname</Text>

          <TextInput
            mode="flat"
            placeholder="Name"
            // backgroundColor="#ffffff"
            activeUnderlineColor="#FF8800"
            activeOutlineColor="#FF8800"
            value={lastname}
            onChangeText={text => setlastname(text)}
          />
        </View>
        <View style={{margin: 10}}>
          <Text variant="bodyMedium"> Email</Text>

          <TextInput
            mode="flat"
            placeholder="Email"
            // backgroundColor="#ffffff"
            activeUnderlineColor="#FF8800"
            activeOutlineColor="#FF8800"
            value={email}
            onChangeText={text => setemail(text)}
            disabled={true}
          />
        </View>
        <View style={{margin: 10}}>
          <Text variant="bodyMedium">Phone</Text>

          <TextInput
            mode="flat"
            placeholder="Phone"
            // backgroundColor="#ffffff"
            activeUnderlineColor="#FF8800"
            activeOutlineColor="#FF8800"
            value={phone}
            onChangeText={text => setphone(text)}
          />
        </View>
        <View style={{margin: 10}}>
          <Text variant="bodyMedium"> Address</Text>

          <TextInput
            mode="flat"
            placeholder="Address"
            // backgroundColor="#ffffff"
            activeUnderlineColor="#FF8800"
            activeOutlineColor="#FF8800"
            value={address}
            onChangeText={text => setaddress(text)}
          />
        </View>
      </View>
      <View
        style={{paddingBottom: 10, paddingHorizontal: 20, marginBottom: 50}}>
        <Button mode="contained" buttonColor="#3a8b82" onPress={updateUser}>
          SAVE CHANGES
        </Button>
      </View>
    </View>
  );
}
