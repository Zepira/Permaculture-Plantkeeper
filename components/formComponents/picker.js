import React from 'react';

import { TextInput } from "react-native-paper";
import { Text } from "../../theme";
// import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";


export const CustomPicker = ({ value, options, onChangeSelect, label }) => {


    return (
        <View>
            {/* <Text>{label}</Text>
            <Picker
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) =>
                    onChangeSelect(itemValue)
                }>
                {options.map((option) => {
                    return <Picker.Item key={option.optionMapping} label={option.optionText} value={option.optionMapping} />
                })}
            </Picker> */}
        </View>
    )
}