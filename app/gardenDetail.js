import React, { useContext, useEffect, useState } from 'react';
import { Text } from "../theme/text";
import { DataContext } from "../utils/context/dataContext";
import { SafeAreaWrapperFullWidth } from "../components/safeAreaWrapper";
import { TouchableOpacity, View } from "react-native";
import { gardenType } from "../utils/constants/constants";
import { router, useLocalSearchParams } from "expo-router";
import { getGardenPlants } from "../service/databaseService";
import { Avatar, Button } from "react-native-paper";

export default GardenDetail = () => {
    const garden = useLocalSearchParams();
    const { db } = useContext(DataContext);
    // const [data, setData] = useState();
    const [plants, setPlants] = useState();
    const [gardenState, setGardenState] = useState();


    useEffect(() => {
        console.log('GARDEN', garden);
        if (garden.id) {
            setPlants(null);
            setGardenState(garden);
            getGardenPlants(db, garden.id).then((plantData) => {
                setPlants(plantData);

            }).catch((er) => { console.log(er) })
                .finally((asd) => {
                    console.log(asd);
                })
        }
    }, [garden])

    return (
        <>
            <SafeAreaWrapperFullWidth>
                <Button onPress={() => router.replace('/myGarden')}>Back</Button>
                <Text variant='smallHeading'>{gardenState && gardenType[gardenState.gardenType].optionText}</Text>
                {plants && plants.map((plant) =>
                    <TouchableOpacity onPress={() => router.push({ pathname: '/plantDetail', params: plant })} key={plant.id} style={{
                        height: 80, borderColor: 'black', borderWidth: 1, marginTop: 20, borderRadius: 20, justifyContent: 'center', paddingLeft: 20
                    }}>
                        <Avatar.Image size={60} source={{ uri: plant.images[0] }} />
                        <Text variant='smallHeading'>{plant.plantName}</Text>

                    </TouchableOpacity>)}
            </SafeAreaWrapperFullWidth>
        </>
    )
}