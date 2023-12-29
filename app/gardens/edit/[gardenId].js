
import { useLocalSearchParams, router } from "expo-router";
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text } from "react-native";
import { gardenType } from "../../../utils/constants/constants";
import { DataContext } from "../../../utils/context/dataContext";
import { TopActionButton, TopActionButtonContainer } from "../../../components/buttons/topActionButton";
import { Button, TextInput } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";



export default EditGarden = () => {

    const params = useLocalSearchParams();

    const { userGardens, updateGarden } = useContext(DataContext);

    const [userGarden, setUserGarden] = useState();
    const [gardenName, setGardenName] = useState("");


    useFocusEffect(

        useCallback(() => {

            const garden = userGardens.find((garden) => garden.id === params.gardenId);
            setUserGarden(garden);
            if (garden.gardenName) {
                setGardenName(garden.gardenName);
            }

        }, [params, userGardens])
    );

    const saveGarden = () => {
        updateGarden({ ...userGarden, gardenName: gardenName })
        setUserGarden({ ...userGarden, gardenName: gardenName })
    }



    return (
        <View style={{ padding: 20 }}>
            <TopActionButtonContainer>
                <TopActionButton onPressAction={() => router.replace('/gardens/' + params.gardenId)} icon="arrow-left" />
            </TopActionButtonContainer>
            {userGarden && <View>
                <Text>{userGarden.gardenName ? userGarden.gardenName : gardenType[userGarden.gardenType].optionText}</Text>
                <TextInput
                    label="Garden Name"
                    value={gardenName}
                    onChangeText={gardenName => setGardenName(gardenName)}
                />
                <Button onPress={() => saveGarden()}>Submit</Button>
            </View>
            }
        </View>
    );
}