import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, router } from "expo-router";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";

import {
  TopActionButton,
  TopActionButtonContainer,
} from "../../../components/buttons/topActionButton";
import { CustomPicker } from "../../../components/formComponents/picker";
import { CustomTextInput } from "../../../components/formComponents/textInput";
import { SafeAreaWrapper } from "../../../components/safeAreaWrapper";
import { colours } from "../../../theme/colours";
import { Spacer } from "../../../theme/spacers";
import {
  gardenType,
  growthStages,
  lighting,
} from "../../../utils/constants/constants";
import { DataContext } from "../../../utils/context/dataContext";

export default EditPlant = () => {
  const params = useLocalSearchParams();

  const { plants, userPlants, updateUserPlantData, deletePlant, userGardens } =
    useContext(DataContext);
  const [plant, setPlant] = useState(null);
  const [userPlant, setUserPlant] = useState(null);
  const [variety, setVariety] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [plantName, setPlantName] = useState(null);
  const [customWateringFrequency, setCustomWateringFrequency] = useState(null);
  const [customWeedingFrequency, setCustomWeedingFrequency] = useState(null);
  const [customFertilisingFrequency, setCustomFertilisingFrequency] =
    useState(null);
  const [growthStage, setgrowthStage] = useState(null);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showTransplantMenu, setShowTransplantMenu] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

      if (userPlants) {
        const originalUserPlant =
          userPlants !== null
            ? userPlants.find((plant) => plant.id === params.plantId)
            : null;

        setUserPlant(originalUserPlant);
        const plantDetail = plants.find(
          (plant) => plant.id === originalUserPlant.plantId,
        );
        setPlant({ ...plantDetail, ...originalUserPlant });
        setVariety(
          originalUserPlant?.variety
            ? originalUserPlant.variety.varietyName
            : null,
        );
        setCustomWateringFrequency(
          originalUserPlant.wateringFrequency
            ? originalUserPlant.wateringFrequency
            : null,
        );
        setCustomWeedingFrequency(
          originalUserPlant.weedingFrequency
            ? originalUserPlant.weedingFrequency
            : null,
        );
        setCustomFertilisingFrequency(
          originalUserPlant.fertilisingFrequency
            ? originalUserPlant.fertilisingFrequency
            : null,
        );
        setPlantName(
          originalUserPlant.plantName
            ? originalUserPlant.plantName
            : plantDetail.plantName,
        );
      } else {
        setIsLoading(true);
      }
    }, [plants, userPlants, params]),
  );

  const onSavePlant = (updatedGardenId) => {
    const varietyDetailsIndex = variety
      ? plant.varieties.findIndex((a) => a.varietyName == variety)
      : null;
    console.log("variety", variety, varietyDetailsIndex);
    const updatedPlant = {
      ...userPlant,
      plantName,
      ...(variety !== null && varietyDetailsIndex >= 0
        ? { variety: plant.varieties[varietyDetailsIndex] }
        : {}),
      ...(customWateringFrequency
        ? { wateringFrequency: customWateringFrequency }
        : {}),
      ...(customWeedingFrequency
        ? { weedingFrequency: customWeedingFrequency }
        : {}),
      ...(customFertilisingFrequency
        ? { fertilisingFrequency: customFertilisingFrequency }
        : {}),
      growthStage: growthStage ? growthStage : userPlant.growthStage,
      gardenId: updatedGardenId || userPlant.gardenId,
    };

    updateUserPlantData(updatedPlant);
    setUserPlant(updatedPlant);
    router.replace("/plants/" + params.plantId);
  };

  const onDelete = () => {
    setShowConfirmDelete(false);
    deletePlant(params.plantId).then(() =>
      router.replace("/gardens/" + userPlant.gardenId),
    );
  };

  console.log(plant?.varieties);

  return (
    <SafeAreaWrapper>
      <TopActionButtonContainer>
        <TopActionButton
          onPressAction={() => router.replace("/plants/" + params.plantId)}
          icon="arrow-left"
        />
      </TopActionButtonContainer>
      {userPlant && (
        <ScrollView style={{ gap: 10 }}>
          <Text>{plantName}</Text>
          <CustomTextInput
            label="Plant Name"
            value={plantName}
            mode="outlined"
            onChangeText={(plantName) => setPlantName(plantName)}
          />

          <CustomTextInput
            label="Custom watering frequency"
            value={customWateringFrequency}
            inputMode="numeric"
            mode="outlined"
            onChangeText={(wateringFrequency) =>
              setCustomWateringFrequency(wateringFrequency)
            }
          />
          <CustomTextInput
            label="Custom weeding frequency"
            value={customWeedingFrequency}
            inputMode="numeric"
            mode="outlined"
            onChangeText={(weedingFrequency) =>
              setCustomWeedingFrequency(weedingFrequency)
            }
          />
          <CustomTextInput
            label="Custom fertilising frequency"
            value={customFertilisingFrequency}
            inputMode="numeric"
            mode="outlined"
            onChangeText={(fertilisingFrequency) =>
              setCustomFertilisingFrequency(fertilisingFrequency)
            }
          />
          <CustomPicker
            label="Plant growth stage"
            value={growthStage}
            options={growthStages}
            onChangeSelect={setgrowthStage}
          />

          <Text>Variety</Text>
          <Picker
            selectedValue={variety}
            onValueChange={(itemValue, itemIndex) => setVariety(itemValue)}
          >
            {plant.varieties.map((variety, index) => (
              <Picker.Item
                style={{ fontSize: 14 }}
                key={index}
                label={variety.varietyName}
                value={variety.varietyName}
              />
            ))}
          </Picker>
          <Spacer height={20} />
          <Button
            buttonColor={colours.primary}
            textColor="white"
            onPress={() => onSavePlant()}
          >
            Save
          </Button>
          <Button
            buttonColor="blue"
            textColor="white"
            onPress={() => setShowTransplantMenu(true)}
          >
            Transplant
          </Button>
          <Button
            buttonColor={colours.error}
            textColor="white"
            onPress={() => setShowConfirmDelete(true)}
          >
            Delete
          </Button>
        </ScrollView>
      )}
      <Portal>
        <Dialog
          visible={showConfirmDelete}
          onDismiss={() => setShowConfirmDelete(false)}
        >
          <Dialog.Title>Delete</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to delete this plant?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => onDelete()}>Delete</Button>
            <Button onPress={() => setShowConfirmDelete(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={showTransplantMenu}
          onDismiss={() => setShowTransplantMenu(false)}
        >
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ marginBottom: 10 }}>
              Which area is this plant being moved to?
            </Text>
            <ScrollView>
              {userGardens.map((garden, index) => (
                <TouchableOpacity
                  style={{ marginVertical: 10 }}
                  key={index}
                  onPress={() => onSavePlant(garden.id)}
                >
                  <Text>
                    {garden.gardenName ||
                      gardenType[garden.gardenType].optionText}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </SafeAreaWrapper>
  );
};
