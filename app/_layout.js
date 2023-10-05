import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { paperTheme } from '../theme';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import { AuthenticationContextProvider } from "../utils/context/authenticationContext";
import { DataContextProvider } from "../utils/context/dataContext";
import { LoadingComponent } from "../components/loadingComponent";
import { Tabs } from 'expo-router/tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AddNewButton } from "../components/addNewButton";
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

const firebaseConfig = {
    apiKey: "AIzaSyDoc-ySKA5K9ZQhrEfpGN-3eKhjwFlASo8",
    authDomain: "plantkeeper-67879.firebaseapp.com",
    projectId: "plantkeeper-67879",
    storageBucket: "plantkeeper-67879.appspot.com",
    messagingSenderId: "557631108634",
    appId: "1:557631108634:web:1997fc3ad86fad7eefc3a3",
    measurementId: "G-YYDLKKFCX9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TAB_ICON = {
    index: 'home',
    myGarden: 'leaf',
    Search: 'search',
    Plant: 'leaf',
    Camera: 'camera'
};

const screenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];

    return {
        //tabBarShowLabel: false,

        headerShown: false, //set on individual pages if required
        tabBarStyle: { height: 90 },
        tabBarIcon: ({ size, color, focused }) => <View style={{ backgroundColor: focused ? 'white' : 'white', padding: 9, borderRadius: 100 }}><Ionicons name={iconName} size={size} color={color} /></View>,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
    }
}

// const Tab = createBottomTabNavigator();


export default function Layout() {

    const [isLoading, setIsLoading] = useState(true);
    return (
        <PaperProvider theme={paperTheme}>

            <AuthenticationContextProvider>
                <DataContextProvider db={db} setIsLoading={setIsLoading}>
                    {isLoading && <LoadingComponent theme={paperTheme} />}
                    {/* <Stack initialRouteName="home" /> */}
                    <Tabs screenOptions={screenOptions} >
                        <Tabs.Screen
                            name="index"
                            options={{
                                // This tab will no longer show up in the tab bar.
                                href: '/',
                                title: 'home'
                            }}
                        />
                        <Tabs.Screen
                            name="myGarden"
                            options={{
                                // This tab will no longer show up in the tab bar.
                                href: '/myGarden',

                            }}
                        />
                        <Tabs.Screen
                            name="form"
                            options={{
                                // This tab will no longer show up in the tab bar.
                                href: null,

                            }}
                        />

                        <Tabs.Screen
                            name="addPlant"
                            options={{
                                // This tab will no longer show up in the tab bar.
                                href: null,

                            }}
                        />

                        <Tabs.Screen
                            name="plantDetail"
                            options={{
                                // This tab will no longer show up in the tab bar.
                                href: null,

                            }}
                        />
                        <Tabs.Screen
                            name="gardenDetail"
                            options={{
                                // This tab will no longer show up in the tab bar.
                                href: null,

                            }}
                        />


                    </Tabs>
                    <AddNewButton />

                </DataContextProvider>
            </AuthenticationContextProvider>
            <StatusBar style="auto" />
        </PaperProvider>

    );

}
