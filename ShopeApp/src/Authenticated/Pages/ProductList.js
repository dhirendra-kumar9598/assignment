import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Image, View} from 'react-native';
import {Text, Icon} from 'react-native-paper';
import Loader from './component/Loader';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import {useSelector, useDispatch} from 'react-redux';
export default function ProductList({route, navigation}) {
  const [item, setItem] = useState(route.params.item);
  const [type, setTYpe] = useState(route.params.type);
  const [value, setVal] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.token);

  const getItem = async () => {
    const resp =
      type == 'cat'
        ? await fetch(`${process.env.API_URL}/catItem`, {
            method: 'get',
            headers: {
              'content-type': 'application/json',
              item: item,
              token,
            },
          })
        : await fetch(`${process.env.API_URL}/brandItem`, {
            method: 'post',
            headers: {
              'content-type': 'application/json',
              item: item,
              token,
            },
          });

    const val = await resp.json();
    if (resp.status == 200) {
      setVal(val.item);
      console.log(val);
    } else {
      // ToastAndroid.show("No products found", ToastAndroid.SHORT);
      setError('No items found');
    }
    setLoading(false);
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <View style={{marginBottom: 50}}>
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
        {/* <View>
          <View>
            <Text>{route.params.item} </Text>
          </View>
        </View> */}
      </View>

      {loading == true && (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height,
            width,
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      )}

      <ScrollView style={styles.itemBox} showsVerticalScrollIndicator={false}>
        <View style={styles.Box}>
          {value.length !== 0 ? (
            value.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetail', {item})}
                key={index}
                style={{display: 'flex', width: width / 2}}>
                <View style={styles.imgBox}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <View style={{backgroundColor: 'red', padding: 3}}>
                      <Text variant="bodyMedium" style={{color: 'white'}}>
                        {item.discountPercentage} %
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Image
                      source={{
                        uri: item.images[0],
                      }}
                      width={150}
                      height={150}
                    />
                  </View>
                  <View>
                    <View>
                      <Text variant="titleSmall" style={{textAlign: 'center'}}>
                        {item.brand}
                      </Text>
                    </View>
                    <View>
                      <Text variant="titleSmall" style={{textAlign: 'center'}}>
                        Rs {item.price}
                      </Text>
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
                width,
              }}>
              <Text>No products</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemBox: {
    // backgroundColor: "#ffffff",
    height: '100%',
  },
  Box: {
    width,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: "space-evenly",
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  imgBox: {
    paddingVertical: 20,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ffd2af',
  },
  img: {
    borderWidth: 5,
    borderRadius: 100,
  },
});
