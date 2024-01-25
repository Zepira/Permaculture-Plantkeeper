import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useFonts as useQuicksand,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  signInWithPopup,
  getReactNativePersistence,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { AuthenticationComponent } from "../components/authentication/authentication";
import { AddNewButton } from "../components/buttons/addNewButton";
import { LoadingComponent } from "../components/loadingComponent";
import { paperTheme } from "../theme";
import { AuthenticationContextProvider } from "../utils/context/authenticationContext";
import { DataContextProvider } from "../utils/context/dataContext";

const firebaseConfig = {
  apiKey: "AIzaSyDoc-ySKA5K9ZQhrEfpGN-3eKhjwFlASo8",
  authDomain: "plantkeeper-67879.firebaseapp.com",
  projectId: "plantkeeper-67879",
  storageBucket: "plantkeeper-67879.appspot.com",
  messagingSenderId: "557631108634",
  appId: "1:557631108634:web:1997fc3ad86fad7eefc3a3",
  measurementId: "G-YYDLKKFCX9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// let auth;
// console.log("ALANA app", app);
// if (!auth) {
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//   });
// }

const TAB_ICON = {
  index: "home",
  gardens: "leaf",
  Search: "search",
  plants: "leaf",
  Camera: "camera",
};

const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    //tabBarShowLabel: false,

    headerShown: false, //set on individual pages if required
    tabBarStyle: { height: 90 },
    tabBarIcon: ({ size, color, focused }) => (
      <View
        style={{
          backgroundColor: focused ? "white" : "white",
          padding: 9,
          borderRadius: 100,
        }}
      >
        <Ionicons name={iconName} size={size} color={color} />
      </View>
    ),
    tabBarActiveTintColor: "black",
    tabBarInactiveTintColor: "grey",
    style: { zIndex: 1000 },
  };
};

// const Tab = createBottomTabNavigator();

export default function Layout() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const [quicksandLoaded] = useQuicksand({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  if (!quicksandLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <AuthenticationContextProvider auth={auth} db={db}>
        {isLoading && <LoadingComponent theme={paperTheme} />}
        {/* <Stack initialRouteName="home" /> */}
        {user && (
          <DataContextProvider db={db} user={user}>
            <Tabs screenOptions={screenOptions}>
              <Tabs.Screen
                name="index"
                options={{
                  // This tab will no longer show up in the tab bar.
                  href: "/",
                  title: "Home",
                }}
              />
              <Tabs.Screen
                name="gardens"
                options={{
                  // This tab will no longer show up in the tab bar.
                  href: "/gardens",
                  title: "My Garden",
                }}
              />
              <Tabs.Screen
                name="plants"
                options={{
                  // This tab will no longer show up in the tab bar.
                  href: "/plants",
                  title: "Plants",
                }}
              />
              <Tabs.Screen
                name="form"
                options={{
                  // This tab will no longer show up in the tab bar.
                  href: null,
                }}
              />

              {/* <Tabs.Screen
                            name="plants/[plantId]"
                            options={{
                                // This tab will no longer show up in the tab bar.
                                href: null,

                            }}
                        /> */}
            </Tabs>
            <AddNewButton />
          </DataContextProvider>
        )}
        {!user && <AuthenticationComponent />}
      </AuthenticationContextProvider>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
