import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { FAB, IconButton, Portal, ProgressBar, Avatar, Button, Card } from "react-native-paper";
import { SafeAreaWrapper } from "../safeAreaWrapper";
import { gardenType } from "../../utils/constants/forms/constants";
import { addGardenForm } from "../../utils/constants/forms/addGardenForm";
import { colours } from "../../theme/colours";
import { Text } from "../../theme/text";
import { DataContext } from "../../utils/context/dataContext";



export const FormComponent = ({ route, navigation }) => {
    const { questions, formType } = route.params;

    const formLength = questions.length
    //const [percentageComplete, setPercentageComplete] = useState(0);
    const [currentFormStage, setCurrentFormStage] = useState(0);
    const [formData, setFormData] = useState({});
    const [formComplete, setFormComplete] = useState(false);

    const { createNewGarden } = useContext(DataContext);

    useEffect(() => {

        setCurrentFormStage(0);
        setFormData({});
        setFormComplete(false);

    }, []);

    useEffect(() => {
        if (formComplete) {
            completeForm();
        }
    }, [formData]);

    const progressForm = (updatedValue) => {

        setFormData({ ...formData, [questions[currentFormStage].databaseValue]: updatedValue });
        if (currentFormStage + 1 === formLength) {
            setFormComplete(true);
        } else {
            setCurrentFormStage(currentFormStage + 1);

        }
    }

    const completeForm = () => {
        switch (formType) {
            case 'addGarden': {
                createNewGarden(formData).then((a) => {
                    navigation.navigate('MyGarden');
                })

                break;
            }
            default: break;
        }
    }

    return (
        <SafeAreaWrapper>
            <View style={{ flex: 1 }}>
                <Text>{questions[currentFormStage].questionText}</Text>


                <ProgressBar progress={(currentFormStage + 1) / (formLength)} color={colours.primary} style={{ borderRadius: 20, marginBottom: 30 }} />
                <ScrollView>
                    {questions[currentFormStage].options.map((option) =>

                        <TouchableOpacity onPress={() => progressForm(option.optionMapping)} key={option.optionMapping} style={{
                            height: 80, borderColor: 'black', borderWidth: 1, marginTop: 20, borderRadius: 20, flex: 1, justifyContent: 'center', paddingLeft: 20
                        }}>

                            <Text variant='smallHeading'>{option.optionText}</Text>
                            <Text>{option.optionDetail}</Text>





                        </TouchableOpacity>

                    )}
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    )

}