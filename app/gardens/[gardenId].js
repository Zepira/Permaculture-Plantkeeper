import React, { useContext, useEffect, useState } from 'react';
import { Text } from "../../theme/text";
import { DataContext } from "../../utils/context/dataContext";
import { SafeAreaWrapperFullWidth } from "../../components/safeAreaWrapper";
import { TouchableOpacity, View } from "react-native";
import { gardenType } from "../../utils/constants/constants";
import { router, useLocalSearchParams } from "expo-router";
import { getGardenPlants } from "../../service/databaseService";
import { Avatar, Button, Modal, Portal } from "react-native-paper";

export default GardenDetail = () => {
    const params = useLocalSearchParams();

    const { user, userGardens, db } = useContext(DataContext);

    const garden = userGardens.find((garden) => garden.id === params.gardenId);
    const [plants, setPlants] = useState();
    const [showModal, setShowModal] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState();

    useEffect(() => {
        if (garden.id) {
            setPlants(null);
            getGardenPlants(db, garden.id).then((plantData) => {

                setPlants(plantData);
            }).catch((er) => { console.log(er) })
                .finally((asd) => {
                    console.log(asd);
                })
        }
    }, [])

    return (
        <>
            <SafeAreaWrapperFullWidth>
                <Button onPress={() => router.back()}>Back</Button>
                <Text variant='smallHeading'>{garden && gardenType[garden.gardenType].optionText}</Text>
                {plants && plants.map((plant, index) =>
                    <TouchableOpacity onPress={() => router.push({ pathname: '/(plants)/' + plant.id, params: { origin: 'garden' } })} key={index} style={{
                        borderColor: 'black', borderWidth: 1, marginTop: 20, borderRadius: 20, justifyContent: 'center', padding: 20
                    }}>
                        <Avatar.Image size={60} source={{ uri: plant?.variety ? plant.variety.images[0] : plant.images[0] }} />
                        <Text variant='smallHeading'>{plant.plantName}</Text>


                    </TouchableOpacity>)}

                <Portal >
                    <Modal visible={showModal} transparent={true} onDismiss={() => setShowModal(false)}  >
                        <View style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'white',
                            padding: 20

                        }}>
                            {/* <PlantDetail plant={selectedPlant} onBack={() => setShowModal(false)} /> */}

                        </View>
                    </Modal>
                </Portal>
            </SafeAreaWrapperFullWidth>
        </>
    )
}
