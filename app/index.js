import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import { AddNewButton } from "../components/buttons/addNewButton";
import { CircularProgressIndicator } from "../components/circularProgressIndicator";
import { SafeAreaWrapperFullWidth } from "../components/safeAreaWrapper";
import { AuthenticationContext } from "../utils/context/authenticationContext";
import { DataContext } from "../utils/context/dataContext";

export default function Home() {
  const { logout } = useContext(AuthenticationContext);
  const { userData } = useContext(DataContext);
  const [data, setData] = useState();

  // useEffect(() => {

  //     if (userData)
  //         setData(userData)
  // }, [userData])

  return (
    <>
      <SafeAreaWrapperFullWidth>
        <Text>hello, {userData?.email}</Text>
        <Text>All the shit will go here</Text>
        <Button onPress={() => logout()}>Logout</Button>
        {/* <CircularProgressIndicator /> */}
      </SafeAreaWrapperFullWidth>
      {/* <AddNewButton navigation={navigation} /> */}
    </>
  );
}
