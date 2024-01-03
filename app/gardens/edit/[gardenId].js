
import { useLocalSearchParams, router } from "expo-router";
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View } from "react-native";
import { gardenType, lighting } from "../../../utils/constants/constants";
import { DataContext } from "../../../utils/context/dataContext";
import { TopActionButton, TopActionButtonContainer } from "../../../components/buttons/topActionButton";
import { Button, Dialog, Portal } from "react-native-paper";
import { CustomTextInput } from "../../../components/formComponents/textInput";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { colours } from "../../../theme/colours";
import { Text } from "../../../theme";



export default EditGarden = () => {

    const params = useLocalSearchParams();

    const { userGardens, updateGarden, deleteGarden } = useContext(DataContext);

    const [userGarden, setUserGarden] = useState();
    const [gardenName, setGardenName] = useState("");
    const [selectedGardenType, setSelectedGardenType] = useState();
    const [selectedLighting, setSelectedLighting] = useState();
    const [customWateringFrequency, setCustomWateringFrequency] = useState(0);
    const [customWeedingFrequency, setCustomWeedingFrequency] = useState(0);
    const [customFertilisingFrequency, setCustomFertilisingFrequency] = useState(0);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);


    useFocusEffect(

        useCallback(() => {

            const garden = userGardens.find((garden) => garden.id === params.gardenId);
            setUserGarden(garden);
            setSelectedGardenType(gardenType[garden.gardenType].optionMapping);
            setSelectedLighting(lighting[garden.lighting - 1].optionMapping);
            setCustomWateringFrequency(garden.wateringFrequency);
            setCustomFertilisingFrequency(garden.fertilisingFrequency);
            setCustomWeedingFrequency(garden.weedingFrequency);
            if (garden.gardenName) {
                setGardenName(garden.gardenName);
            }

        }, [params, userGardens])
    );

    const saveGarden = () => {
        const updatedGarden = {
            ...userGarden,
            gardenName: gardenName,
            gardenType: selectedGardenType,
            lighting: selectedLighting,
            wateringFrequency: customWateringFrequency,
            weedingFrequency: customWeedingFrequency,
            fertilisingFrequency: customFertilisingFrequency
        }

        updateGarden(updatedGarden).then(() => {
            setUserGarden(updatedGarden);
            router.replace('/gardens/' + params.gardenId);
        })

    }

    const onDeleteGarden = () => {
        setShowConfirmDelete(false);
        deleteGarden(userGarden.id).then(() => router.replace('/gardens'));
    }



    return (
        <View >
            <TopActionButtonContainer>
                <TopActionButton onPressAction={() => router.replace('/gardens/' + params.gardenId)} icon="arrow-left" />
            </TopActionButtonContainer>
            {userGarden && <View style={{ gap: 10, padding: 20 }}>
                <Text variant="smallHeading">{userGarden.gardenName ? userGarden.gardenName : gardenType[userGarden.gardenType].optionText}</Text>
                <CustomTextInput
                    label="Garden Name"
                    value={gardenName}

                    onChangeText={gardenName => setGardenName(gardenName)}
                />
                <Picker
                    selectedValue={selectedGardenType}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedGardenType(itemValue)
                    }>
                    {gardenType.map((gardenTypeOption) => {
                        return <Picker.Item key={gardenTypeOption.optionMapping} label={gardenTypeOption.optionText} value={gardenTypeOption.optionMapping} />
                    })}

                </Picker>
                <Picker
                    selectedValue={selectedLighting}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLighting(itemValue)
                    }>
                    {lighting.map((lightingOption) => {
                        return <Picker.Item key={lightingOption.optionMapping} label={lightingOption.optionText} value={lightingOption.optionMapping} />
                    })}

                </Picker>
                <CustomTextInput
                    label="Custom watering frequency"
                    value={customWateringFrequency}
                    inputMode='numeric'

                    onChangeText={wateringFrequency => setCustomWateringFrequency(wateringFrequency)}
                />
                <CustomTextInput
                    label="Custom weeding frequency"
                    value={customWeedingFrequency}
                    inputMode='numeric'

                    onChangeText={weedingFrequency => setCustomWeedingFrequency(weedingFrequency)}
                />
                <CustomTextInput
                    label="Custom fertilising frequency"
                    value={customFertilisingFrequency}
                    inputMode='numeric'

                    onChangeText={fertilisingFrequency => setCustomFertilisingFrequency(fertilisingFrequency)}
                />
                <Button buttonColor={colours.primary} textColor='white' onPress={() => saveGarden()}>Submit</Button>
                <Button buttonColor={colours.error} textColor='white' onPress={() => setShowConfirmDelete(true)}>Delete</Button>
            </View>
            }
            <Portal>
                <Dialog visible={showConfirmDelete} onDismiss={() => setShowConfirmDelete(false)}>
                    <Dialog.Title>Delete</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Are you sure you want to delete this garden?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => onDeleteGarden()}>Delete</Button>
                        <Button onPress={() => setShowConfirmDelete(false)}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}