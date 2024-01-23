import React from "react";
import { colours } from "../../theme/colours";
import { TouchableOpacity, View, StatusBar } from "react-native";
import { Avatar, TouchableRipple } from "react-native-paper";


export const TopActionButton = ({ onPressAction, icon }) => {

    return (
        <TouchableRipple onPress={() => onPressAction()}>
            <Avatar.Icon icon={icon} size={40} color='white' style={{ backgroundColor: colours.surfaceVariant }} />
        </TouchableRipple>);
}

export const TopActionButtonContainer = ({ children }) => <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>{children}</View>