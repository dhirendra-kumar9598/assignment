import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Icon, Searchbar, Text} from 'react-native-paper';
import Loader from './component/Loader';
import {useNavigation} from '@react-navigation/native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default function Search() {
  const navigation = useNavigation();
  const [product, setProduct] = useState([]);
  const [oldData, setOld] = useState([]);
  const [search, setSearch] = useState('');

  const getCat = async () => {
    const resp = await fetch(`${process.env.API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-type': 'apllication/json',
      },
    });
    const data = await resp.json();
    setProduct(data);
    setOld(data);
    console.log(data);
  };
  useEffect(() => {
    getCat();
  }, []);

  const handleSearch = query => {
    if (search == '') {
      setProduct(oldData);
    } else {
      const filtered = product.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.brand.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      );
      console.log(filtered);
      if (filtered.length > 0) {
        setProduct(filtered);
        setSearch(query);
      }
    }
  };

  useEffect(() => {
    if (search.length < 1) {
      setProduct(oldData);
    }
  }, [search]);

  return (
    <View style={{height: '100%'}}>
      <View style={{}}>
        <Searchbar
          placeholder="Search"
          iconColor="#3a8b82"
          borderColor="#3a8b82"
          mode="bar"
          clearIcon={'close'}
          onClearIconPress={() => setProduct(oldData)}
          value={search}
          onChangeText={txt => {
            handleSearch(txt);
            setSearch(txt);
            buttonColor = '';
          }}
        />
      </View>
      <View>
        <ScrollView>
          <View style={styles.imgArrival}>
            {product.length != 0 ? (
              product.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate('ProductDetail', {item})}>
                  <View style={styles.imgBox}>
                    <View>
                      <Image
                        source={{
                          uri: item.images[0],
                          width: 150,
                          height: 150,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                        }}>
                        <Text numberOfLines={1} variant="titleMedium">
                          {item.title}
                        </Text>
                      </View>
                      <Text
                        numberOfLines={1}
                        variant="titleSmall"
                        style={{color: '#3a8b82'}}>
                        {item.brand}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Loader />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  arrival: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imgArrival: {
    display: 'flex',
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-evenly',
    marginBottom: 60,
  },
  imgBox: {
    // backgroundColor: "#c6c6c6",
    display: 'flex',
    // justifyContent: "flex-start",
    alignItems: 'center',
    width: width / 2.5,
    margin: 2,
    padding: 10,
    // borderWidth: 1,
    // borderColor: "#ffd2af",
  },
});
