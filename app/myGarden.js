import React, { useContext, useEffect, useState } from 'react';
import { Text } from "react-native-paper";
import { DataContext } from "../utils/context/dataContext";
import { SafeAreaWrapperFullWidth } from "../components/safeAreaWrapper";
import { View } from "react-native";
import { gardenType } from "../utils/constants/constants";

export default MyGarden = () => {

    const { user, userGardens } = useContext(DataContext);
    const [data, setData] = useState();


    // useEffect(() => {

    //     if (userData)
    //         setData(userData)
    // }, [userData])

    return (
        <>
            <SafeAreaWrapperFullWidth>

                {userGardens.map((garden) =>
                    <View key={garden.id}>
                        <Text>{gardenType[garden.gardenType].optionText}</Text>
                    </View>
                )}
            </SafeAreaWrapperFullWidth>
        </>
    )
}