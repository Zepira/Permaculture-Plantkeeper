import React, { useContext, useEffect, useState } from 'react';
import { Text } from "../../theme/text";
import { DataContext } from "../../utils/context/dataContext";
import { SafeAreaWrapperFullWidth } from "../../components/safeAreaWrapper";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Portal, Modal } from "react-native-paper";
import { router } from "expo-router";

export default Plant = () => {

    const { plants, updateUserFavourite, user } = useContext(DataContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState();

    // useEffect(() => {

    //     if (userData)
    //         setData(userData)
    // }, [userData])

    const addPlant = ({ id, variety }) => {
        setShowModal(false);
        router.push({ pathname: 'form', params: { formType: 'addPlant', id, variety: variety.varietyName } })
    }

    return (
        <>
            <SafeAreaWrapperFullWidth>
                <Text>Browse for plants</Text>

                {plants && plants.map((plant) =>

                    <TouchableOpacity onPress={() => router.push({ pathname: '/(plants)/' + plant.id, params: { origin: 'plants' } })} key={plant.id} style={{
                        height: 80, borderColor: 'black', borderWidth: 1, marginTop: 20, borderRadius: 20, flex: 1, justifyContent: 'center', paddingLeft: 20
                    }}>
                        <Avatar.Image size={60} source={{ uri: plant.images[0] }} />
                        <Text variant='smallHeading'>{plant.plantName}</Text>

                    </TouchableOpacity>
                )}

                {/* <Portal >
                    <Modal visible={showModal} transparent={true} onDismiss={() => setShowModal(false)}  >
                        <View style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'white',
                            padding: 20
                        }}>
                            <PlantDetail plant={selectedPlant} onBack={() => setShowModal(false)} onAddPlant={addPlant} updateUserFavourite={(plantId) => updateUserFavourite(plantId)} isUserFavourite={
                                user?.plantFavourites && user.plantFavourites.length > 0 && user.plantFavourites.includes(selectedPlant ? selectedPlant.id : '')
                            } />
                        </View>
                    </Modal>
                </Portal> */}
            </SafeAreaWrapperFullWidth>
        </>
    )
}