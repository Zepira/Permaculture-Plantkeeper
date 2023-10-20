import React, { useContext, useEffect, useState } from 'react';
import { Text } from "../../theme/text";
import { DataContext } from "../../utils/context/dataContext";
import { SafeAreaWrapperFullWidth } from "../../components/safeAreaWrapper";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { gardenType } from "../../utils/constants/constants";
import { router } from "expo-router";
import { Avatar, Modal, Portal } from "react-native-paper";

export default MyGarden = () => {

    const { user, userGardens } = useContext(DataContext);
    const [data, setData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [selectedGarden, setSelectedGarden] = useState();

    // useEffect(() => {

    //     if (userData)
    //         setData(userData)
    // }, [userData])

    return (
        <>
            <SafeAreaWrapperFullWidth>

                <ScrollView>
                    {userGardens.map((garden) =>
                        <TouchableOpacity onPress={() => router.push('/gardens/' + garden.id)} key={garden.id} style={{
                            borderColor: 'black', borderWidth: 1, marginTop: 20, borderRadius: 20, flex: 1, justifyContent: 'center', padding: 20
                        }}>
                            <Avatar.Image size={60} source={{ uri: gardenType[garden.gardenType].defaultImage }} />
                            <Text variant='smallHeading'>{gardenType[garden.gardenType].optionText}</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>

                {/* <Portal >
                    <Modal visible={showModal} transparent={true} onDismiss={() => setShowModal(false)}  >
                        <View style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'white',
                            padding: 20
                        }}>
                            <GardenDetail garden={selectedGarden} db={db} onBack={() => setShowModal(false)} />
                        </View>
                    </Modal>
                </Portal> */}
            </SafeAreaWrapperFullWidth>
        </>
    )
}