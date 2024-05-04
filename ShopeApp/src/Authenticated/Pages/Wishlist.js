/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {Button, Icon, Text, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
export default function Wishlist({navigation}) {
  const token = useSelector(state => state.auth.token);
  const height = Dimensions.get('window').height;
  const [count, setCount] = useState(0);
  const [item, setItem] = useState([]);
  const [price, SetPrice] = useState(0);
  const [totalp, setTotal] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const getData = async () => {
    const resp = await fetch(`${process.env.API_URL}/cart`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        token,
      },
    });
    const data = await resp.json();
    setItem(data.data);
    console.log('DATA =>', data);
    const total = data.data.reduce((sum, item) => sum + item.price, 0);
    SetPrice(total);
    setCount(data.data.length);
    setTotal(total + 40);
    console.log(count);
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  const removeFrmCart = async id => {
    const token = await AsyncStorage.getItem('token');
    console.log(id, token);
    const resp = await fetch(`${process.env.API_URL}/removeFrmCart`, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        token,
        id,
      },
    });
    const data = await resp.json();
    if (resp.status == 200) {
      getData();
      ToastAndroid.show('Item removed from cart', ToastAndroid.SHORT);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
      }}>
      <View
        style={{
          marginBottom: 5,

          padding: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#3a8b82',
        }}>
        <View>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon source={'arrow-left'} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View>
            <Text variant="titleMedium"> Cart ({count} items)</Text>
          </View>
        </View>
        <View>
          <View>{/* <Icon source={"cart-outline"} size={30} /> */}</View>
        </View>
      </View>

      <ScrollView
        style={{width: width}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {item !== undefined && item.length !== 0 ? (
          item.map((items, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('ProductDetail', {item: items})
              }>
              <View style={styles.productBox}>
                <View>
                  <Image
                    source={{
                      uri: items.images[0],
                    }}
                    width={100}
                    height={100}
                  />
                </View>
                <View style={{marginLeft: 5}}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                    }}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Text variant="titleMedium">{items.title}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      width: '70%',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <View>
                          <Text variant="bodyMedium">Quantity :1</Text>
                        </View>
                      </View>
                      <View style={{paddingTop: 20}}>
                        <Text variant="bodyMedium"> Rs {items.price} </Text>
                      </View>
                    </View>
                    {/* <View>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        borderWidth: 1,
                        width: 110,
                        height: 40,
                        borderColor: "#FF8800",
                        borderRadius: 10,
                        backgroundColor: "#FF8800",
                      }}
                    >
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => setCount(count - 1)}
                          disabled={count < 2 ? true : false}
                        >
                          <Icon
                            source="minus"
                            size={30}
                            color="white"
                            mode="contained"
                          />
                        </TouchableOpacity>
                      </View>
                      <View>
                        <Text
                          variant="headlineSmall"
                          style={{ color: "white" }}
                        >
                          {items.quantity}
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity onPress={() => setCount(count + 1)}>
                          <Icon
                            source="plus"
                            size={30}
                            color="white"
                            mode="contained"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View> */}
                    <Button
                      mode="contained"
                      buttonColor="black"
                      contentStyle={{flexDirection: 'row-reverse'}}
                      onPress={() => removeFrmCart(items.id)}>
                      Remove
                    </Button>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height,
            }}>
            <Text variant="titleSmall">No items...</Text>
          </View>
        )}
      </ScrollView>

      <View>
        {item.length !== 0 ? (
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <View>
                <Text variant="titleSmall">Sub total</Text>
              </View>

              <View>
                <Text variant="titleSmall">Delivery charge</Text>
              </View>
              <View>
                <Text variant="titleSmall">Total</Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <View>
                <Text variant="titleSmall">Rs {price}</Text>
              </View>

              <View>
                <Text variant="titleSmall">Rs 40</Text>
              </View>
              <View>
                <Text variant="titleSmall">Rs {totalp}</Text>
              </View>
            </View>
          </View>
        ) : (
          ''
        )}
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            alignItems: 'flex-end',
          }}></View>
      </View>
      <View style={{marginBottom: 5, padding: 5}}>
        <Button
          disabled={item.length == 0 ? true : false}
          mode="contained"
          icon={'arrow-right'}
          buttonColor="#3a8b82"
          contentStyle={{flexDirection: 'row-reverse'}}
          onPress={() => navigation.navigate('Checkout', {totalp, item})}>
          Proceed to Checkout
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  productBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#96b1ac',
    padding: 5,
    margin: 5,
    // borderWidth: 1,
    // borderColor: "#ff8800",
    // width: "80%",
  },
});
