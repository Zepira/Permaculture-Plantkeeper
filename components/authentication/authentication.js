import LottieView from "lottie-react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import styled from "styled-components/native";

import { Text, theme } from "../../theme";
import { colours } from "../../theme/colours";
import { AuthenticationContext } from "../../utils/context/authenticationContext";

const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../assets/background.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const AccountContainer = styled.View`
  position: absolute;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.85);
  width: 100%;
  height: 75%;
  border-top-right-radius: 45px;
  border-top-left-radius: 45px;
  align-items: center;
  padding-horizontal: 35px;
  padding-top: 20px;
`;

const FieldsContainer = styled.View`
  width: 100%;
  margin-top: 20px;
`;

const PrimaryButton = styled(TouchableOpacity)`
  background-color: ${colours.darkGreen};
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  height: 48px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const SecondaryButton = styled(TouchableOpacity)`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  border-color: ${colours.darkGreen};
  border-width: 3px;
  border-radius: 14px;
  height: 48px;
  margin-bottom: 15px;
`;

const InputField = styled(TextInput).attrs({
  selectionColor: colours.darkGreen,
  activeUnderlineColor: colours.darkGreen,
  underlineColor: colours.darkGreen,
  textColor: "black",
  autoCapitalize: "none",
})`
  background-color: white;

  height: 48px;

  margin-bottom: 20px;
`;

export const AuthenticationComponent = () => {
  const [hasExistingAccount, setHasExistingAccount, error] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const { logInWithEmailAndPassword, registerWithEmailAndPassword } =
    useContext(AuthenticationContext);
  const animation = useRef(null);

  const submit = () => {
    if (hasExistingAccount) {
      logInWithEmailAndPassword(emailAddress, password);
    } else {
      console.log(emailAddress, password);
      registerWithEmailAndPassword(emailAddress, password);
    }
  };

  return (
    <AccountBackground>
      <AccountCover />
      <View style={{ position: "absolute", top: "8%" }}>
        <LottieView
          autoPlay
          style={{ height: 140 }}
          key="animation"
          source={require("../../assets/plant-item.json")}
        />
      </View>
      <AccountContainer>
        <Text style={{ paddingHorizontal: 50, textAlign: "center" }}>
          {hasExistingAccount ? "Welcome to PlantKeeper" : "Create an acount"}
        </Text>
        <FieldsContainer>
          <InputField
            label="Email"
            value={emailAddress}
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={(u) => setEmailAddress(u)}
          />
          <InputField
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            onChangeText={(p) => {
              console.log(p);
              setPassword(p);
            }}
          />
          {error && (
            <View
              style={{ marginBottom: -15, marginTop: -15, paddingLeft: 15 }}
            >
              <Text>{error}</Text>
            </View>
          )}
          <PrimaryButton
            title="Sign In"
            onPress={() => submit(emailAddress, password)}
          >
            <Text style={{ color: "white" }}>
              {hasExistingAccount ? "Sign In" : "Sign Up"}
            </Text>
          </PrimaryButton>
          <SecondaryButton
            onPress={() => setHasExistingAccount(!hasExistingAccount)}
          >
            <Text style={{ color: `${colours.darkGreen}` }}>
              {hasExistingAccount
                ? "Create an account"
                : "I already have an account"}
            </Text>
          </SecondaryButton>
          {hasExistingAccount && (
            <Pressable style={{ alignItems: "center" }}>
              <Text>Forgot your password?</Text>
            </Pressable>
          )}
        </FieldsContainer>
      </AccountContainer>
    </AccountBackground>
  );
};
