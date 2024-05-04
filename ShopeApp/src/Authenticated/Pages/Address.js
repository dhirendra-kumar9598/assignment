/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {ToastAndroid, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import {db} from '../../../db/config';
// import { authContext } from "../../utils/AuthProvider";
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setDeliveryAddress} from '../../../reduxStore/authSlice/authSlice';
export default function Address({navigation}) {
  const token = useSelector(state => state.auth.token);
  const address = useSelector(state => state.auth.address);
  const dispatch = useDispatch();
  const [currAdd, selectAdd] = useState([
    {
      city: 'lko',
      colony: 'lko',
      email: 'abc@gmail.com',
      fullname: 'abc',
      house: '123',
      id: 1,
      phone: '9876543210',
      pin: '1234',
      state: 'up',
    },
  ]);
  // console.log(currAdd);
  // const {deliveryAdd, setDelivery} = useContext(authContext);
  // console.log(deliveryAdd);

  const [addressList, setAddress] = useState([]);

  const listAdd = async () => {
    console.log('executing');
    let sql = 'SELECT * FROM address';
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, resultSet) => {
          var length = resultSet.rows.length;
          let address = [];
          for (var i = 0; i < length; i++) {
            // console.log(resultSet.rows.item(i));
            address.push(resultSet.rows.item(i));
          }
          setAddress(address);
          console.log(address);
        },
        error => {
          console.log('List user error', error);
        },
      );
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      listAdd();
    }, []),
  );
  return (
    <View style={{height: '100%'}}>
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
          My Address
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Icon source={'plus'} size={25} />
        </View>
        <View style={{}}>
          <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
            <Text>Add new address</Text>
          </TouchableOpacity>
        </View>
      </View>
      {addressList.length !== 0
        ? addressList.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // selectAdd(item);
                dispatch(setDeliveryAddress(item));
                // setDelivery(item);
                ToastAndroid.show('Address selected', ToastAndroid.SHORT);
              }}>
              <View
                style={{
                  margin: 10,
                  borderWidth: 1,
                  padding: 5,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: '#3a8b82',
                  backgroundColor: '#96b1ac',
                  borderRadius: 10,
                }}>
                <View>
                  <View
                    style={{
                      width: 25,
                      height: 25,
                      borderWidth: 2,
                      borderColor: '#3a8b82',
                      borderRadius: 20,
                      margin: 10,
                      backgroundColor:
                        address != null
                          ? address.id === item.id
                            ? '#3a8b82'
                            : 'white'
                          : 'white',
                    }}></View>
                </View>
                <View>
                  <View>
                    <Text variant="headlineSmall">{item.fullname}</Text>
                  </View>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text variant="bodyLarge" style={{marginRight: 3}}>
                      {item.house}
                    </Text>
                    <Text variant="bodyLarge" style={{marginRight: 3}}>
                      {item.colony}
                    </Text>
                    <Text variant="bodyLarge" style={{marginRight: 3}}>
                      {item.city}
                    </Text>
                    <Text variant="bodyLarge" style={{marginRight: 3}}>
                      {item.state}
                    </Text>
                    <Text variant="bodyLarge" style={{marginRight: 3}}>
                      {item.pin}
                    </Text>
                  </View>
                  <View>
                    <Text variant="bodyLarge">{item.phone}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        : ''}
    </View>
  );
}
