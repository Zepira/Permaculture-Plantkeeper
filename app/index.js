import React, { useContext, useEffect, useState } from 'react';
import { Text } from "react-native-paper";
import { DataContext } from "../utils/context/dataContext";
import { SafeAreaWrapperFullWidth } from "../components/safeAreaWrapper";
import { View } from "react-native";
import { AddNewButton } from "../components/addNewButton";

export default function Home() {

    const { user } = useContext(DataContext);
    const [data, setData] = useState();


    // useEffect(() => {

    //     if (userData)
    //         setData(userData)
    // }, [userData])

    return (
        <>
            <SafeAreaWrapperFullWidth>
                <Text>hello, {user?.firstName}</Text>
                <Text>All the shit will go here</Text>
            </SafeAreaWrapperFullWidth>
            {/* <AddNewButton navigation={navigation} /> */}
        </>
    )
}