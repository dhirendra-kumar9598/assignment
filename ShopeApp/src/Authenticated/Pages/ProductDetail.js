/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Image, ToastAndroid, ScrollView, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Button, Icon, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
export default function ProductDetail({route, navigation}) {
  const token = useSelector(state => state.auth.token);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [data, setData] = useState(route.params.item);
  const [image, setImage] = useState(data.images[0]);
  const [saved, setSaved] = useState(false);
  const [relatedProd, setRelated] = useState(null);

  //add to cart
  const addToCart = async () => {
    console.log('hello');
    const resp = await fetch(`${process.env.API_URL}/addToCart`, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        token: token,
        id: data.id,
      },
    });
    const val = await resp.json();
    console.log(val);
    if (resp == 200) {
      ToastAndroid.show('Added to cart', ToastAndroid.SHORT);
    }
    IsItemCart();
  };

  const IsItemCart = async () => {
    const resp = await fetch(`${process.env.API_URL}/isItemInCart`, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        token: token,
        id: data.id,
      },
    });
    const val = await resp.json();
    if (resp.status == 200) {
      setSaved(true);
      console.log('in true =', saved);
    } else if (resp.status == 401) {
      setSaved(false);
      console.log('in false =', saved);
    }
  };

  // useEffect(() => {
  //   IsItemCart();
  //   getRelated();
  //   console.log(saved);
  // }, []);

  const removeFrmCart = async () => {
    const resp = await fetch(`${process.env.API_URL}/removeFrmCart`, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        token: token,
        id: data.id,
      },
    });
    const val = await resp.json();
    if (resp.status == 200) {
      setSaved(false);
      ToastAndroid.show('Removed from cart', ToastAndroid.SHORT);
    }
  };

  const getRelated = async () => {
    console.log('related =>', route.params.item.category);
    const resp = await fetch(`${process.env.API_URL}/catItem`, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        token,
        item: route.params.item.category,
      },
    });
    const val = await resp.json();
    setRelated(val.item);
    console.log(val);
  };

  useFocusEffect(
    React.useCallback(() => {
      IsItemCart();
      getRelated();
    }, []),
  );

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
            <Text variant="bodyMedium">{data.title}</Text>
          </View>
        </View>
        <View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
              <Icon source={'cart-outline'} size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{padding: 10, marginBottom: 50}}>
          <View>
            <View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Image
                  source={{
                    uri: image,
                  }}
                  width={300}
                  height={300}
                />
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <TouchableOpacity onPress={() => setImage(data.images[0])}>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 10,
                    }}>
                    <Image
                      source={{
                        uri: data.images[0],
                      }}
                      width={60}
                      height={60}
                      style={{
                        borderWidth: 1,
                        borderRadius: 100,
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setImage(data.images[1])}>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 10,
                    }}>
                    <Image
                      source={{
                        uri: data.images[1],
                      }}
                      width={60}
                      height={60}
                      style={{
                        borderWidth: 1,
                        borderRadius: 100,
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setImage(data.images[2])}>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 10,
                    }}>
                    <Image
                      source={{
                        uri: data.images[2],
                      }}
                      width={60}
                      height={60}
                      style={{
                        borderWidth: 1,
                        borderRadius: 100,
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <View>
                <Text variant="titleMedium">{data.title}</Text>
              </View>
              <View>
                <View>
                  <Text variant="titleSmall">{data.brand}</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      backgroundColor: 'green',
                      borderRadius: 20,
                      padding: 5,
                      margin: 5,
                    }}>
                    <Text variant="titleMedium" style={{color: 'white'}}>
                      {data.rating}
                    </Text>
                    <Icon source="star" size={26} color="white" />
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  backgroundColor: '#80cd8d',
                }}>
                <View>
                  <Text variant="titleSmall" style={{color: 'green'}}>
                    Special price
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <View
                    style={{margin: 5, display: 'flex', flexDirection: 'row'}}>
                    <Icon source="arrow-down" size={25} color="green" />
                    <Text variant="titleMedium" style={{color: 'green'}}>
                      {data.discountPercentage}%
                    </Text>
                  </View>
                  {/* <View>
                <Text>{((data.discountPercentage/100)).toPrecision(5)}</Text>
              </View> */}
                  <View style={{margin: 5}}>
                    <Text variant="titleMedium"> Rs {data.price}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingVertical: 10,
                }}>
                <View>
                  <Text variant="titleMedium">Product description</Text>
                </View>
                <View>
                  <Text variant="bodyMedium">{data.description}</Text>
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVerticle: 10,
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Icon source={'cash-check'} size={30} />
                  </View>
                  <View>
                    <Text variant="bodyMedium">Cash On Delivery</Text>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Icon source={'book-cancel-outline'} size={30} />
                  </View>
                  <View>
                    <Text variant="bodyMedium">No Cancellable</Text>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Icon source={'archive-cancel-outline'} size={30} />
                  </View>
                  <View>
                    <Text variant="bodyMedium">No Returnable</Text>
                  </View>
                </View>
              </View>

              <View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text variant="titleMedium">Similar Products</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ProductList', {
                          item: route.params.item.category,
                        })
                      }>
                      <Icon source={'arrow-right'} size={25} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {relatedProd != null
                      ? relatedProd.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() =>
                              navigation.push('ProductDetail', {item: item})
                            }>
                            <View
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 130,
                                borderWidth: 1,
                                borderRadius: 5,
                                padding: 10,
                                paddingVertical: 10,
                                margin: 10,
                              }}>
                              <View>
                                <Image
                                  source={{
                                    uri: item.images[1],
                                  }}
                                  width={100}
                                  height={100}
                                />
                              </View>
                              <View>
                                <Text variant="bodyMedium">{item.title}</Text>
                              </View>
                              <View>
                                <Text variant="bodyMedium">
                                  Rs {item.price}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))
                      : null}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width,
        }}>
        {saved ? (
          <TouchableOpacity
            onPress={removeFrmCart}
            style={{
              padding: 15,
              width: width / 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text variant="bodyMedium">Remove from cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={addToCart}
            style={{
              padding: 15,
              width: width / 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text variant="bodyMedium">Add to Cart</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Checkout', {
              item: [data],
              totalp: data['price'],
            })
          }
          style={{
            backgroundColor: '#3a8b82',
            padding: 10,
            width: width / 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text variant="bodyMedium">Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
