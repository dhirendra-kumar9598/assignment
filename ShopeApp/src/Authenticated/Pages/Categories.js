/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Image, View} from 'react-native';
import {Button, Text, Icon} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import Loader from './component/Loader';
import {useSelector, useDispatch} from 'react-redux';
export default function Categories({navigation}) {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [cat, setcat] = useState([]);
  const token = useSelector(state => state.auth.token);
  const getCat = async () => {
    const resp = await fetch(`${process.env.API_URL}/getCat`, {
      headers: {
        token,
      },
    });
    const data = await resp.json();
    console.log(data);
    setcat(data.data);
  };

  // useEffect(() => {
  //   getCat();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getCat();
    }, []),
  );

  return (
    <View style={styles.itemBox}>
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
            <Text variant="titleMedium"> Categories</Text>
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
      {/* <View
        style={{
          marginBottom: 5,
          padding: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "#ff8800",
        }}
      >
        <Text variant="titleLarge" style={{ color: "white" }}>
          Categories
        </Text>
      </View> */}
      <ScrollView>
        <View style={styles.Box}>
          {cat !== undefined && cat.length !== 0 ? (
            cat.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductList', {
                    item: item.category,
                    type: 'cat',
                  })
                }
                key={index}
                style={{width: width / 2}}>
                <View style={styles.imgBox}>
                  <View>
                    <Image
                      source={{
                        uri: item.images[0],
                      }}
                      width={150}
                      height={150}
                      style={styles.img}
                    />
                  </View>
                  <View>
                    <Text variant="titleSmall" style={{textAlign: 'center'}}>
                      {item.category}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{
                height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Loader />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemBox: {
    height: '100%',
  },
  Box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  imgBox: {
    margin: 5,
    padding: 10,
  },
  img: {
    borderWidth: 5,
    borderRadius: 100,
  },
});
