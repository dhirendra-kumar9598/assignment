import React, { useContext } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { authContext } from "../../../utils/AuthProvider";
import { Button } from "react-native-paper";
export default function LogOut() {
  // const { setisLogged } = useContext(authContext);
  const logout = () => {
    // AsyncStorage.removeItem("token");
    // setisLogged(false);
  };
  return (
    <View>
      <Button mode="Contained" onPress={logout}>
        
        Log Out
      </Button>
    </View>
  );
}
