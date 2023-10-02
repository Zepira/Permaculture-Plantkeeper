import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FAB, IconButton, Portal } from "react-native-paper";
import { colours } from "../theme/colours";
import { theme } from "../theme";
import { addGardenForm } from "../utils/constants/forms/addGardenForm";


export const AddNewButton = ({ navigation }) => {

    const [addPressed, setAddPressed] = useState(false);
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    const styles = StyleSheet.create({
        fab: {


            marginBottom: 70,
            marginRight: 30,
            borderRadius: 50
        },
    });

    return (
        <>
            {/* TODO - animate! */}
            {/* <View style={{ position: 'absolute', marginTop: 0, bottom: 50, right: 0 }}>
                {addPressed &&
                    <View>
                        <IconButton onPress={() => navigation.navigate('Plant')} style={{ position: 'absolute', right: 65, bottom: 65 }} icon="leaf" iconColor={'white'} mode="contained" containerColor={colours.primary} size={15} />
                        <IconButton onPress={() => navigation.navigate('Garden', { screen: 'AddGarden' })} style={{ position: 'absolute', right: 80, bottom: 30 }} icon="bucket" iconColor={'white'} mode="contained" containerColor={colours.plantKeeperMidGreen} size={15} />
                    </View>
                }
                <IconButton style={{ position: 'absolute', right: 15, bottom: 15 }} icon="plus" iconColor={'white'} mode="contained" containerColor={colours.primary} size={40} onPress={() => setAddPressed(!addPressed)} />
            </View> */}
            <Portal>
                {/* <FAB
                    icon="plus"
                    style={styles.fab}
                    theme={theme}
                    color="white"
                    onPress={() => console.log('Pressed')} /> */}
                <FAB.Group
                    open={open}
                    visible
                    backdropColor='transparent'
                    fabStyle={styles.fab}
                    color="white"
                    icon={open ? 'plus' : 'plus'}
                    actions={[
                        {
                            icon: 'leaf',
                            label: 'Add Plant',
                            style: { borderRadius: 50, marginRight: 15, },
                            onPress: () => console.log('Pressed email'),
                        },
                        {
                            icon: 'barley',
                            label: 'Add Garden',
                            style: {
                                borderRadius: 50, marginRight: 15
                            },
                            onPress: () => navigation.navigate('Form', { questions: addGardenForm, formType: 'addGarden' }),
                        }
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open

                        }
                    }}
                />
            </Portal>
        </>);



}