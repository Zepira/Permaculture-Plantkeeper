import React, { useContext, useEffect, useState } from 'react';
import { Text } from "../theme/text";
import { DataContext } from "../utils/context/dataContext";
import { SafeAreaWrapperFullWidth } from "../components/safeAreaWrapper";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { gardenType } from "../utils/constants/constants";
import { Avatar, Button } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";

export default AddPlant = () => {
    const plantData = useLocalSearchParams();

    const [plant, setPlant] = useState({});
    const [isUserPlant, setIsUserPlant] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        setPlant(plantData);
        setIsUserPlant((typeof plantData.gardenId !== 'undefined'));
    }, [plantData])

    return (
        <>
            <SafeAreaWrapperFullWidth>
                {plantData.plantName && <>
                    <ImageBackground source={{ uri: plant.images }} style={{ height: 300, resizeMode: 'cover', width: '100%' }} >
                        <Button onPress={() => isUserPlant ? router.replace('/gardenDetail') : router.replace('/addPlant')}>Back</Button>

                    </ImageBackground>
                    <Text style={{ color: 'black' }}>{plant.plantName}</Text>
                    <Text style={{ color: 'black' }}>{plant.scientificName}</Text>
                    {isUserPlant && <Text style={{ color: 'black' }}>It's a user plant!</Text>}
                    {!isUserPlant && <Button onPress={() => router.push({ pathname: '/form', params: { formType: 'addPlant', id: plant.id } })}>Add to Garden</Button>}
                </>}
            </SafeAreaWrapperFullWidth>
        </>
    )
}