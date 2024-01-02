import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text } from "../../theme/text";
import { DataContext } from "../../utils/context/dataContext";
import { SafeAreaWrapperFullWidth } from "../../components/safeAreaWrapper";
import { Image, ImageBackground, Pressable, TouchableOpacity, View } from "react-native";
import { gardenType } from "../../utils/constants/constants";
import { Avatar, Button, IconButton, Modal, Portal } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { icons } from "../../utils/constants/assets"
import { colours } from "../../theme/colours";
import { titleCase } from "../../utils/utils";
import { CircularProgressIndicator } from "../../components/circularProgressIndicator";
import { useFocusEffect } from "@react-navigation/native";
import { LoadingComponent } from "../../components/loadingComponent";
import { TopActionButton, TopActionButtonContainer } from "../../components/buttons/topActionButton";

export default PlantDetail = () => {

    const params = useLocalSearchParams();
    console.log(params);

    const { plants, userPlants, updateUserFavourite, user, updateUserPlantData } = useContext(DataContext);

    const [plant, setPlant] = useState(null);
    const [userPlant, setUserPlant] = useState(null);
    const [isUserPlant, setIsUserPlant] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [variety, setVariety] = useState(null);
    const [isFavourite, setIsFavourite] = useState(null);
    const [daysSincePlanted, setDaysSincePlanted] = useState(0);
    const [daysTillNextPlantStage, setDaysTillNextPlantStage] = useState(null);
    const [daysToWaterIn, setDaysToWaterIn] = useState(0);
    const [daysToFertiliseIn, setDaysToFertiliseIn] = useState(0);
    const [daysToWeedIn, setDaysToWeedIn] = useState(0);
    const [growthStageIcon, setGrowthStageIcon] = useState(null);
    const today = new Date();

    const waterFrequency = 3;
    const fertilisingFrequency = 30;
    const weedingFrequency = 60;

    const calculateDaysUntilActionDue = (lastActionDate, frequency) => {

        if (lastActionDate) {
            const daysSinceAction = Math.round(Math.abs((today - lastActionDate.toDate()) / (1000 * 60 * 60 * 24)));
            console.log('daysSinceAction', daysSinceAction);

            return daysSinceAction > frequency ? 0 : frequency - daysSinceAction;
        } else {
            return 0;
        }

    };

    useFocusEffect(

        useCallback(() => {

            setIsLoading(true);
            console.log('HASDASDAASDSDASD');

            if (userPlants, plants) {
                const originalUserPlant = userPlants !== null ? userPlants.find((plant) => plant.id === params.plantId) : null;
                if (originalUserPlant) {

                    setUserPlant(originalUserPlant);
                    const plantDetail = plants.find((plant) => plant.id === originalUserPlant.plantId);
                    setPlant({ ...plantDetail, ...originalUserPlant });
                    setIsUserPlant(true);
                    setVariety(originalUserPlant?.variety ? originalUserPlant.variety : null);
                    const daysSincePlantedDate = Math.round(Math.abs((today - originalUserPlant.plantedDate.toDate()) / (1000 * 60 * 60 * 24)))
                    setDaysSincePlanted(daysSincePlantedDate);

                    switch (originalUserPlant.growthStage) {
                        case 1: setGrowthStageIcon('seed'); setDaysTillNextPlantStage(plantDetail.daysToSprout); console.log('seed sprouts in ', plantDetail.daysToSprout, 'days since planted: ', Math.round(Math.abs((today - originalUserPlant.plantedDate.toDate()) / (1000 * 60 * 60 * 24)))); break;
                        case 2: setGrowthStageIcon('sprout'); setDaysTillNextPlantStage(plantDetail.sproutToHarvest); console.log('sprout ready to harvest in ', plantDetail.sproutToHarvest, 'days since planted: ', Math.round(Math.abs((today - originalUserPlant.plantedDate.toDate()) / (1000 * 60 * 60 * 24)))); break;
                        case 3: setGrowthStageIcon('flower-tulip'); setDaysTillNextPlantStage(0); break;
                        default: setGrowthStageIcon('sprout'); setDaysTillNextPlantStage(0); break;
                    }



                    const daysSinceLastWatered = calculateDaysUntilActionDue(originalUserPlant.lastWateredDate, waterFrequency);
                    setDaysToWaterIn(daysSinceLastWatered);

                    const daysSinceLastFertilised = calculateDaysUntilActionDue(originalUserPlant.lastFertilisedDate, fertilisingFrequency);
                    setDaysToFertiliseIn(daysSinceLastFertilised);

                    const daysSinceLastWeeded = calculateDaysUntilActionDue(originalUserPlant.lastWeededDate, weedingFrequency);
                    setDaysToWeedIn(daysSinceLastWeeded);
                    setIsLoading(false);
                }
                else {
                    const plant = plants.find((plant) => plant.id === params.plantId);
                    console.log('HASDASDASDASD', plant);
                    setPlant(plant);
                    setIsUserPlant(false);
                    setVariety(null);
                    setIsFavourite(user.plantFavourites.includes(params.plantId));
                    setIsLoading(false);
                }

            } else {
                setIsLoading(true);
            }

        }, [plants, userPlants, params, waterFrequency])

    );

    const updatePlantAction = (actionType) => {

        switch (actionType) {
            case 'water':
                updateUserPlantData({ ...userPlant, lastWateredDate: today });
                setDaysToWaterIn(waterFrequency);
                break;
            case 'fertilise':
                updateUserPlantData({ ...userPlant, lastFertilisedDate: today });
                setDaysToFertiliseIn(fertilisingFrequency);
                break;
            case 'weed':
                updateUserPlantData({ ...userPlant, lastWeededDate: today });
                setDaysToWeedIn(weedingFrequency);
                break;
            default:
                break;
        }


    }

    const updateFavourites = () => {
        updateUserFavourite(plant.id).then(() => {
            setIsFavourite(!isFavourite);
        });

    }


    // const PlantDetailIcon = ({ iconType, displayText, value }) => {

    //     return (
    //         <View style={{ alignContent: 'center', alignItems: 'center' }}>
    //             <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 150, height: 80, width: 80, padding: 10, backgroundColor: colours.primary }}>
    //                 {iconType ? <Image source={icons[iconType]} style={{
    //                     flex: 1,
    //                     width: null,
    //                     height: null,
    //                     resizeMode: 'contain'
    //                 }} /> :
    //                     <Text style={{ fontSize: 50, fontWeight: 200, alignSelf: 'center' }}>{value}</Text>
    //                 }
    //             </View>
    //             <Text>{displayText ? displayText : titleCase(iconType)}</Text>
    //         </View>
    //     );
    // }

    const PlantingCalendar = ({ plantSowingDates }) => {

        const calculateGrowingCalendar = () => {

            let monthArray = [];
            let sowingDates = plantSowingDates.find(x => x.climateZone === 4).sowingDates;

            Array.from({ length: 12 }, (_, k) => {
                let isMidMonth = false;
                let isEndMonth = false;
                let isStartMonth = false;

                sowingDates.forEach((sowingDate) => {

                    const sowingMonth = sowingDate.toDate().getMonth();

                    // if (date.getMonth() === sowingMonth && !isSowableNow) {
                    //     setIsSowableNow(true);
                    // }

                    if (k === sowingMonth) {
                        isMidMonth = true;
                    }
                });

                monthArray.push({
                    monthKey: k,
                    isStartMonth: isStartMonth,
                    isEndMonth: isEndMonth,
                    isMidMonth: isMidMonth
                });
            });




            let updatedMonthAray = monthArray;
            monthArray.forEach((month, index,) => {

                if (monthArray[index].isMidMonth) {

                    if (index === 11) {
                        updatedMonthAray[index].isEndMonth = true;
                    } if (index !== 11 && !monthArray[index + 1].isMidMonth) {
                        updatedMonthAray[index].isEndMonth = true;
                    }
                    if (index === 0) {
                        updatedMonthAray[index].isStartMonth = true;
                    }
                    if (index !== 0 && !monthArray[index - 1].isMidMonth) {
                        updatedMonthAray[index].isStartMonth = true;
                    }

                }

            });


            return updatedMonthAray;

        };

        return (<View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 7 }}>
                {Array.from({ length: 12 }, (_, k) => {
                    const date = new Date();
                    const isCurrentMonth = date.getMonth() === k;
                    date.setMonth(k);
                    const monthName = date.toLocaleString('en-AU', { month: 'short' });
                    return (
                        <View key={k} style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 2 }}>
                            {isCurrentMonth && <Avatar.Icon icon="triangle" size={15} color='black' style={{ backgroundColor: 'rgba(255,255,255,0.4)', transform: 'rotate(180deg)', alignSelf: 'center', marginBottom: -5 }} />
                            }
                            <Text style={{ fontSize: 12, alignSelf: 'center' }}>{monthName}</Text>
                        </View>
                    );
                }
                )}
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: colours.transparent, padding: 5, borderRadius: 20, borderColor: colours.primary, borderWidth: 1 }}>

                {calculateGrowingCalendar().map((month) => {
                    const isGrowingMonth = month.isStartMonth | month.isEndMonth | month.isMidMonth;

                    return <View key={month.monthKey} style={{ backgroundColor: isGrowingMonth ? colours.primary : colours.transparent, flex: 1, height: 20, borderBottomLeftRadius: month.isStartMonth ? 20 : 0, borderTopLeftRadius: month.isStartMonth ? 20 : 0, borderTopRightRadius: month.isEndMonth ? 20 : 0, borderBottomRightRadius: month.isEndMonth ? 20 : 0 }}>

                    </View>;
                }
                )}
            </View>
        </View>);

    }

    return (
        <>
            {isLoading ? <LoadingComponent /> : <>
                {plant && <ImageBackground source={{ uri: variety ? variety.images[0] : plant.images[0] }} style={{ height: 300, resizeMode: 'cover', width: '100%' }} >
                    <TopActionButtonContainer>
                        <TopActionButton onPressAction={() => isUserPlant ? router.replace('/gardens/' + userPlant.gardenId) : router.replace('/plants')} icon="arrow-left" />

                        {isUserPlant && <TopActionButton onPressAction={() => router.replace('/plants/edit/' + userPlant.id)} icon="cog" />}

                    </TopActionButtonContainer>


                </ImageBackground>
                }
                {plant &&
                    <SafeAreaWrapperFullWidth style={{ padding: 20 }}>
                        {plant.plantName && <>

                            <Text style={{ color: 'black' }}>{plant.plantName}</Text>
                            <Text style={{ color: 'black' }}>{plant.scientificName}</Text>
                            <Text style={{ color: 'black' }}>{plant.plantName}</Text>
                            {/* Totally great icons and stuff */}
                            {isUserPlant && <>
                                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <PlantDetailIcon displayText='Days to Sprout' value={plant.daysToSprout - daysSincePlanted} />
                                <PlantDetailIcon displayText='Days to Transplant' value={(6 * 7) - daysSincePlanted} />
                                <PlantDetailIcon displayText='Mature in' value={plant.sproutToHarvest + plant.daysToSprout - daysSincePlanted} />
                            </View> */}
                                {isUserPlant &&
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity onPress={() => updatePlantAction('water')}>
                                            <CircularProgressIndicator percentage={daysToWaterIn} max={waterFrequency} />
                                            <Text>{daysToWaterIn > 0 ? `Water in ${daysToWaterIn} days` : `Water now`}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => updatePlantAction('fertilise')}>
                                            <CircularProgressIndicator percentage={daysToFertiliseIn} max={fertilisingFrequency} />
                                            <Text>{daysToFertiliseIn > 0 ? `Fertilise in ${daysToFertiliseIn} days` : `Fertilise now`}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => updatePlantAction('weed')}>
                                            <CircularProgressIndicator percentage={daysToWeedIn} max={weedingFrequency} />
                                            <Text>{daysToWeedIn > 0 ? `Weed in ${daysToWeedIn} days` : `Weed now`}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </>}

                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <PlantDetailIcon iconType='annual' />
                            <PlantDetailIcon iconType='flower' />
                            <PlantDetailIcon iconType='water0' displayText='Water' />
                        </View> */}


                            {isUserPlant && <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
                                <CircularProgressIndicator percentage={daysSincePlanted > daysTillNextPlantStage ? daysTillNextPlantStage : daysSincePlanted} max={daysTillNextPlantStage} radius={100} icon={growthStageIcon} />
                            </View>
                            }
                            <PlantingCalendar plantSowingDates={plant.sowingDates} />


                            {!isUserPlant && <>
                                <Button onPress={() => router.push({ pathname: '/form', params: { formType: 'addPlant', id: plant.id } })}>Add to Garden</Button>
                                <IconButton
                                    icon={isFavourite ? "heart" : "heart-outline"}
                                    color={colours.primary}
                                    size={20}
                                    onPress={() => updateFavourites()}
                                />
                            </>}
                        </>}
                    </SafeAreaWrapperFullWidth >
                }
            </>}
        </>
    )
}