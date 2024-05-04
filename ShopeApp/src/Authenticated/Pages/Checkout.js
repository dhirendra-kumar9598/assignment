/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
export default function Checkout({route, navigation}) {
  const token = useSelector(state => state.auth.token);
  const deliveryAdd = useSelector(state => state.auth.address);
  const [price, SetPrice] = useState(route.params.totalp);
  const [item, setItem] = useState(route.params.item);
  const {height} = Dimensions.get('window');
  console.log('token =>', token);

  return (
    <ScrollView>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: height,
          margin: 10,

          // backgroundColor: "white",
        }}>
        <View>
          <View style={{marginTop: 10}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text variant="titleMedium">Deliver to</Text>
              </View>
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    padding: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    margin: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Address')}>
                    <Text variant="titleMedium">Change</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              <View>
                <View>
                  <Text variant="headlineSmall">{deliveryAdd.fullname}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text variant="bodyLarge" style={{marginRight: 3}}>
                    {deliveryAdd.house}
                  </Text>
                  <Text variant="bodyLarge" style={{marginRight: 3}}>
                    {deliveryAdd.colony}
                  </Text>
                  <Text variant="bodyLarge" style={{marginRight: 3}}>
                    {deliveryAdd.city}
                  </Text>
                  <Text variant="bodyLarge" style={{marginRight: 3}}>
                    {deliveryAdd.state}
                  </Text>
                  <Text variant="bodyLarge" style={{marginRight: 3}}>
                    {deliveryAdd.pin}
                  </Text>
                </View>
                <View>
                  <Text variant="bodyLarge">{deliveryAdd.phone}</Text>
                </View>
              </View>
            </View>
          </View>

          {item.map((items, index) => (
            <View style={{display: 'flex', flexDirection: 'row'}} key={index}>
              <View>
                <Image
                  source={{
                    uri: items.images[0],
                  }}
                  width={100}
                  height={100}
                />
              </View>

              <View style={{}}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text variant="titleMedium">{items.title}</Text>
                </View>
                <View style={{paddingTop: 20}}>
                  <Text> Rs {items.price} </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={{marginBottom: 40}}>
          <Button
            disabled={deliveryAdd.length == 0 ? true : false}
            buttonColor="#3a8b82"
            mode="contained">
            Buy
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
