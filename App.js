import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors, colours } from "./src/theme/colours";
import { Provider as PaperProvider } from 'react-native-paper';
import { paperTheme } from './src/theme';
import { initializeApp } from 'firebase/app';

import { getFirestore } from "firebase/firestore";
import { Navigation } from "./src/navigation";
import React, { useState } from "react";
import { AuthenticationContextProvider } from "./src/utils/context/authenticationContext";
import { DataContextProvider } from "./src/utils/context/dataContext";
import { LoadingComponent } from "./src/components/loadingComponent";

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



export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <PaperProvider theme={paperTheme}>

        <AuthenticationContextProvider>
          <DataContextProvider db={db} setIsLoading={setIsLoading}>
            {isLoading && <LoadingComponent theme={paperTheme} />}
            <Navigation theme={paperTheme} />

          </DataContextProvider>
        </AuthenticationContextProvider>
        <StatusBar style="auto" />
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
