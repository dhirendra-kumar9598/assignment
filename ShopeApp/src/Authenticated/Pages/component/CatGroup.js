import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Loader from './Loader';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-paper';
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
import {useSelector, useDispatch} from 'react-redux';
export default function CatGroup({product}) {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const date = new Date();
  const [month, setMonth] = useState(monthNames[date.getMonth()]);
  const [value, setVal] = useState([]);
  const token = useSelector(state => state.auth.token);
  const getGroup = async () => {
    const resp = await fetch(`${process.env.API_URL}/catItem`, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        token: token,
        item: product,
      },
    });
    const val = await resp.json();
    setVal(val);
    console.log(val);
  };
  useEffect(() => {
    getGroup();
  }, []);

  const printFun = val => {
    console.log(navigation);
  };

  return (
    <View>
      {/* <View>
        <View style={styles.banner}>
          <View
            // source={{
            //   uri: "https://plus.unsplash.com/premium_photo-1696863126083-00f45d5f9112?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8",
            // }}
            style={{
              width: 350,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ff8800",
            }}
          >
            <View style={{}}>
              <Text
                variant="headlineMedium"
                style={{ color: "black" }}
              >{`${product} collection`}</Text>
            </View>
          </View>
        </View>
      </View> */}

      <View style={styles.imgArrival}>
        {value.length !== 0 ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetail', {item: value.item[0]})
                }
                // onPress={() => printFun(item)}
              >
                <View style={{}}>
                  <View>
                    <Image
                      source={{
                        uri: value.item[0].images[0],
                        width: width - 20,
                        height: 250,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <View>
                      <Text variant="titleMedium">{value.item[0].title} </Text>
                    </View>
                    <View>
                      <Text variant="titleSmall" style={{color: '#3a8b82'}}>
                        {value.item[0].brand}
                      </Text>
                    </View>
                    <View>
                      <Text variant="bodyMedium">Rs {value.item[0].price}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {value.item.slice(1).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('ProductDetail', {item: item})
                  }
                  // onPress={() => printFun(item)}
                >
                  <View style={styles.imgBox}>
                    <View>
                      <Image
                        source={{
                          uri: item.images[0],
                          width: 100,
                          height: 100,
                        }}
                      />
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexDirection: 'column',
                        // justifyContent: "space-evenly",
                        // alignItems: "center",
                      }}>
                      <Text
                        variant="titleMedium"
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {' '}
                        {item.title}{' '}
                      </Text>
                      <Text variant="titleSmall" style={{color: '#3a8b82'}}>
                        {item.brand}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <Loader />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    display: 'flex',

    margin: 10,
  },
  body: {
    padding: 5,
    backgroundColor: '#ffffff',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    flexWrap: 'wrap',
  },
  imgBox: {
    // backgroundColor: "#ffd2af",
    padding: 10,
    width: 190,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 1,
    // borderWidth: 1,
    // borderColor: "#3a8b82",
    // borderRadius: 10,
    backgroundColor: '#96b1ac',
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
