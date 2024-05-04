/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {Alert, Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Text, TextInput, Icon, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {db} from '../../../db/config';
export default function AddAddress() {
  const height = Dimensions.get('window').height;
  const navigation = useNavigation();
  const [email, setemail] = useState('');
  const [fullname, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [colony, setColony] = useState('');
  const [house, setHouse] = useState('');
  const [pin, setPin] = useState('');
  console.log(email);

  const SaveData = async () => {
    if (
      !email ||
      !fullname ||
      !phone ||
      !state ||
      !city ||
      !colony ||
      !house ||
      !pin
    ) {
      alert('Fill all details');
    } else {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO address(email, fullname, phone, state, city,colony,house,pin) VALUES(?,?,?,?,?,?,?,?)',
          [email, fullname, phone, state, city, colony, house, pin],
          succ => {
            alert('Data added to database');
            navigation.goBack();
          },
          error => alert('Something went wrong', error),
        );
      });
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          height: height - 80,
        }}>
        <View>
          <View
            style={{
              marginBottom: 5,
              padding: 10,
              display: 'flex',

              alignItems: 'center',

              backgroundColor: '#3a8b82',
            }}>
            <Text variant="titleLarge" style={{color: 'white'}}>
              Enter delivery address
            </Text>
          </View>

          <View style={styles.box}>
            <TextInput
              keyboardType="email-address"
              label="Email address"
              value={email}
              onChangeText={txt => setemail(txt)}
            />
          </View>
          <View style={styles.box}>
            <TextInput
              label="Fullname"
              value={fullname}
              onChangeText={txt => setName(txt)}
            />
          </View>

          <View style={styles.box}>
            <TextInput
              keyboardType="numeric"
              label="Phone number"
              value={phone}
              onChangeText={txt => setPhone(txt)}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: 150, paddingRight: 5, paddingTop: 10}}>
              <TextInput
                label="State"
                value={state}
                onChangeText={txt => setState(txt)}
              />
            </View>
            <View style={{width: 150, paddingTop: 10}}>
              <TextInput
                label="City"
                value={city}
                onChangeText={txt => setCity(txt)}
              />
            </View>
          </View>
          <View style={{paddingTop: 10}}>
            <TextInput
              label="Area/Colony"
              value={colony}
              onChangeText={txt => setColony(txt)}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: 150, paddingRight: 5, paddingTop: 10}}>
              <TextInput
                label="House No"
                value={house}
                onChangeText={txt => setHouse(txt)}
              />
            </View>
            <View style={{width: 150, paddingTop: 10}}>
              <TextInput
                keyboardType="numeric"
                label="Pin code "
                value={pin}
                onChangeText={txt => setPin(txt)}
              />
            </View>
          </View>
        </View>
        <View style={{marginBottom: 10, margin: 10}}>
          <Button
            buttonColor="#3a8b82"
            mode="contained"
            contentStyle={{flexDirection: 'row-reverse'}}
            // onPress={() => navigation.navigate("Payement")}
            onPress={SaveData}>
            Save Address
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  box: {
    padding: 10,
  },
});
