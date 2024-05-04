/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function FloatingList({data, type}) {
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {data.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductList', {
                  item: item.title,
                  type: type,
                })
              }
              key={index}>
              <View
                key={index}
                style={{
                  padding: 5,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                  borderRadius: 10,
                }}>
                <Image
                  source={item.url}
                  style={{height: 70, width: 70, borderRadius: 100}}
                />
                <Text variant="titleMedium">{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
