import React, { useContext, useEffect, useState } from 'react';
import { Text } from "../theme/text";
import { DataContext } from "../utils/context/dataContext";
import { SafeAreaWrapperFullWidth } from "../components/safeAreaWrapper";
import { TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import { router } from "expo-router";

export default AddPlant = () => {

    const { plants } = useContext(DataContext);
    const [data, setData] = useState();


    // useEffect(() => {

    //     if (userData)
    //         setData(userData)
    // }, [userData])

    return (
        <>
            <SafeAreaWrapperFullWidth>
                <Text>Browse for plants</Text>

                {plants && plants.map((plant) =>

                    <TouchableOpacity onPress={() => router.push({ pathname: '/plantDetail', params: plant })} key={plant.id} style={{
                        height: 80, borderColor: 'black', borderWidth: 1, marginTop: 20, borderRadius: 20, flex: 1, justifyContent: 'center', paddingLeft: 20
                    }}>
                        <Avatar.Image size={60} source={{ uri: plant.images[0] }} />
                        <Text variant='smallHeading'>{plant.plantName}</Text>

                    </TouchableOpacity>
                )}
            </SafeAreaWrapperFullWidth>
        </>
    )
}