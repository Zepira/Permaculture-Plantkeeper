import React, { useContext, useEffect } from 'react';
import { HomePage } from "../pages/homePage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from "react-native";
import { MyGardenPage } from "../pages/myGardenPage";
import { FormComponent } from "../components/formComponent/formComponent";
import { createStackNavigator } from "@react-navigation/stack";
import { colours } from "../theme/colours";
import Ionicons from '@expo/vector-icons/Ionicons';



const TAB_ICON = {
    Home: 'home',
    MyGarden: 'leaf',
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

const Tab = createBottomTabNavigator();



export const AppNavigator = () => {

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator screenOptions={screenOptions} >
                <Tab.Screen name="Home" component={HomeNavigator} />
                <Tab.Screen name="MyGarden" component={MyGardenPage} />
            </Tab.Navigator>
        </View>
    )

}


const HomeNavigator = () => {
    const AppStack = createStackNavigator();

    return (

        <View style={{ flex: 1 }}>

            <AppStack.Navigator
                screenOptions={screenOptions} >
                <AppStack.Screen name="HomePage" component={HomePage} />
                <AppStack.Screen name="Form" component={FormComponent} />
            </AppStack.Navigator>
        </View>

    );
}