import React from "react";
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function Loader({ data }) {
  setTimeout(() => {
    return <Text>No items...</Text>;
  }, 5000);
  return (
    <View
     
    >
      <ActivityIndicator color="#3a8b82"  />
    </View>
  );
}
