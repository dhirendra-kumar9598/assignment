/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {Button, Text, Icon} from 'react-native-paper';

import {cat} from './Data/Cat';

import CatGroup from './component/CatGroup';
import Logo from '../../../assets/images/logo/logo2.png';
import BannerCarousel from './component/BannerCarousel';
import FloatingList from './component/FloatingList';
import brands from './Data/Brands';
import {useSelector, useDispatch} from 'react-redux';
export default function Main({navigation}) {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [products, setProduct] = useState([]);
  const [phone, setPhone] = useState([]);
  const token = useSelector(state => state.auth.token);
  console.log('token =>', token);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date();

  const [month, setMonth] = useState(monthNames[date.getMonth()]);

  const getCat = async () => {
    const resp = await fetch(`${process.env.API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-type': 'apllication/json',
        token: token,
      },
    });
    const data = await resp.json();
    setProduct(data);
    console.log(data);
  };
  useEffect(() => {
    getCat();
  }, []);

  return (
    <View style={{marginBottom: 40}}>
      <View style={styles.heading}>
        <View>
          <Image source={Logo} style={{width: 150, height: 30}} />
        </View>
      </View>

      <ScrollView>
        <FloatingList data={cat} type="cat" />

        {/* banner starts */}
        <BannerCarousel />
        <View style={{paddingTop: 5, marginTop: 5, paddingLeft: 5}}>
          <Text variant="titleMedium">Brands</Text>
        </View>
        <FloatingList data={brands} type="brand" />

        <View style={styles.imgArrival}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* {phone.length !== 0 ? (
              phone.map((item, index) => (
                <View style={styles.imgBox} key={index}>
                  <View>
                    <Image
                      source={{
                        uri: item.images[0],
                        width: 100,
                        height: 150,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <Text variant="titleMedium">{item.title} </Text>
                    </View>
                    <Text variant="titleSmall" style={{ color: "#FF683E" }}>
                      {item.brand}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Loader />
            )} */}
          </ScrollView>
        </View>

        <View style={{marginVertical: 20}}>
          <View style={{marginVertical: 20}}>
            <Text variant="titleMedium">Best of Laptops</Text>
          </View>
          <CatGroup product="laptops" />
        </View>

        <View style={{marginVertical: 20}}>
          <View style={{marginVertical: 20}}>
            <Text variant="titleMedium">Best of Smartphones</Text>
          </View>
          <CatGroup product="smartphones" />
        </View>

        <View style={{marginVertical: 20}}>
          <View style={{marginVertical: 20}}>
            <Text variant="titleMedium">Best of Fragrance</Text>
          </View>
          <CatGroup product="fragrance" />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    padding: 10,
  },
  body: {
    padding: 5,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
  },
  banner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrival: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: 5,
  },
  imgArrival: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
  },
  imgBox: {
    // backgroundColor: "#B1BDC5",
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 130,
    borderEndWidth: 1,
    borderColor: '#c6c6c6',
    borderRadius: 10,
    margin: 5,
  },
  imgBox2: {
    // backgroundColor: "#B1BDC5",
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 150,

    borderEndWidth: 1,
    borderColor: '#c6c6c6',
    borderRadius: 10,
    margin: 2,
  },
});
