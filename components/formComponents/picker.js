import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

import { Text } from "../../theme";

export const CustomPicker = ({ value, options, onChangeSelect, label }) => {
  return (
    <View>
      <Text>{label}</Text>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => onChangeSelect(itemValue)}
      >
        {options.map((option) => {
          return (
            <Picker.Item
              style={{ fontSize: 14 }}
              key={option.optionMapping}
              label={option.optionText}
              value={option.optionMapping}
            />
          );
        })}
      </Picker>
    </View>
  );
};
