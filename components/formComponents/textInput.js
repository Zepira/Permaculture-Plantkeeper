import React from 'react';

import { TextInput } from "react-native-paper";


export const CustomTextInput = ({ value, onChangeText, label, inputMode }) => {


    return (
        <TextInput
            label={label}
            value={value}
            mode='outlined'
            inputMode={inputMode}
            onChangeText={value => onChangeText(value)}
        />
    )
}