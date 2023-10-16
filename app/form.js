import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { FAB, IconButton, Portal, ProgressBar, Avatar, Button, Card } from "react-native-paper";
import { SafeAreaWrapper } from "../components/safeAreaWrapper";
import { addGardenForm } from "../utils/constants/forms/addGardenForm";
import { gardenType } from "../utils/constants/constants";
import { colours } from "../theme/colours";
import { Text } from "../theme/text";
import { DataContext } from "../utils/context/dataContext";
import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { addPlantForm } from "../utils/constants/forms/addPlantForm";


export default Form = () => {

    const { formType, id, variety } = useLocalSearchParams();
    const { userGardens } = useContext(DataContext);


    //const [percentageComplete, setPercentageComplete] = useState(0);
    const [currentFormStage, setCurrentFormStage] = useState(0);
    const [formData, setFormData] = useState({});
    const [formComplete, setFormComplete] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [formLength, setFormLength] = useState(0);

    console.log('variety', formType, id, variety);
    const { createNewGarden, createNewPlant } = useContext(DataContext);

    useEffect(() => {

        setCurrentFormStage(0);
        setFormData({});
        setFormComplete(false);
        setQuestions([]);
        setFormLength(0);

    }, []);

    useEffect(() => {

        switch (formType) {
            case 'addGarden': setQuestions(addGardenForm); setFormLength(addGardenForm.length); break;
            case 'addPlant': {
                const plantQuestions = addPlantForm;
                addPlantForm[0].options = userGardens;
                setQuestions(plantQuestions);
                setFormLength(plantQuestions.length);
            } break;
            default: break;
        }


    });

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
                    router.push('/myGarden');
                });
                break;
            }
            case 'addPlant': {
                formData.plantId = id;
                createNewPlant(formData, variety).then((a) => {
                    router.push('/myGarden');
                });
                break;
            }
            default: break;
        }
    }

    return (
        <SafeAreaWrapper>
            <View style={{ flex: 1 }}>
                <Text>{formLength > 0 && questions[currentFormStage].questionText}</Text>


                {/* <ProgressBar progress={(currentFormStage + 1) / (formLength)} color={colours.primary} style={{ borderRadius: 20, marginBottom: 30 }} /> */}
                <ScrollView>
                    {formLength > 0 && questions[currentFormStage].options.map((option) =>

                        <TouchableOpacity onPress={() => progressForm(option.optionMapping ? option.optionMapping : option.id)} key={option.id ? option.id : option.optionMapping} style={{
                            height: 80, borderColor: 'black', borderWidth: 1, marginTop: 20, borderRadius: 20, flex: 1, justifyContent: 'center', paddingLeft: 20
                        }}>

                            <Text variant='smallHeading'>{option.gardenType ? gardenType[option.gardenType].optionText : option.optionText}</Text>
                            <Text>{option.optionDetail}</Text>





                        </TouchableOpacity>

                    )}
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    )

}