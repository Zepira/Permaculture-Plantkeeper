import React, { useContext, useEffect, useState } from 'react';
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

export default AddPlant = () => {

    const params = useLocalSearchParams();

    const { plants, userPlants, updateUserFavourite, user, updateUserPlantData } = useContext(DataContext);

    const [plant, setPlant] = useState(null);
    const [userPlant, setUserPlant] = useState(null);
    const [isUserPlant, setIsUserPlant] = useState(false);
    const [variety, setVariety] = useState(null);
    const [isFavourite, setIsFavourite] = useState(null);
    const [daysSincePlanted, setDaysSincePlanted] = useState(0);
    const [daysSinceWatered, setDaysSinceWatered] = useState(0);
    const [daysSinceFertilised, setDaysSinceFertilised] = useState(0);
    const [daysSinceWeeded, setDaysSinceWeeded] = useState(0);
    const today = new Date();

    useEffect(() => {
        const originalUserPlant = userPlants !== null ? userPlants.find((plant) => plant.id === params.plantId) : null;
        setUserPlant(originalUserPlant)
        if (originalUserPlant) {
            setPlant({ ...plants.find((plant) => plant.id === originalUserPlant.plantId), ...originalUserPlant });
            setIsUserPlant(true);
            setVariety(originalUserPlant?.variety ? originalUserPlant.variety : null);
            setDaysSincePlanted(Math.round(Math.abs((today - originalUserPlant.plantedDate.toDate()) / (1000 * 60 * 60 * 24))));

            const waterFrequency = 3;
            const daysSinceWatered = originalUserPlant.lastWateredDate ? Math.round(Math.abs((today - originalUserPlant.lastWateredDate.toDate()) / (1000 * 60 * 60 * 24))) : null;
            setDaysSinceWatered(daysSinceWatered != null ? waterFrequency - daysSinceWatered : 0);

            // const fertilisingFrequency = 30
            // const daysFertilised = plant.lastFertilisedDate ? Math.round(Math.abs((today - userPlant.lastWateredDate.toDate()) / (1000 * 60 * 60 * 24))) : null;
            // setDaysSinceFertilised(daysFertilised != null ? fertilisingFrequency - daysFertilised : 0);

            // const weedingFrequency = 60
            // const daysSinceWeeded = plant.lastWeededDate ? Math.round(Math.abs((today - userPlant.lastWateredDate.toDate()) / (1000 * 60 * 60 * 24))) : null;
            // setDaysSinceWeeded(daysSinceWeeded != null ? weedingFrequency - daysSinceWeeded : 0);
        }
        else {
            const plant = plants.find((plant) => plant.id === params.plantId);
            setPlant(plant);
            setIsUserPlant(false);
            setVariety(null);
            setIsFavourite(user.plantFavourites.includes(params.plantId));
        }


    }, [params.plantId]);

    useEffect(() => {
        if (plant) {


        }
    }, [plant]);

    const updatePlantAction = (actionType) => {
        const waterFrequency = 3;
        const fertilisingFrequency = 30
        const weedingFrequency = 60;
        console.log('ALANA', actionType);

        switch (actionType) {
            case 'water':
                const asdas = { ...userPlant, lastWateredDate: today };
                console.log('ALANA', asdas);
                updateUserPlantData(asdas)
                setDaysSinceWatered(waterFrequency);
                break;
            case 'fertilise':
                updateUserPlantData({ ...userPlant, ...userPlant.lastFertilisedDate = today });
                setDaysSinceFertilised(fertilisingFrequency);
                break;
            case 'weed':
                updateUserPlantData({ ...userPlant, ...userPlant.lastWeededDate = today });
                setDaysSinceWeeded(weedingFrequency);
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


    const PlantDetailIcon = ({ iconType, displayText, value }) => {

        return (
            <View style={{ alignContent: 'center', alignItems: 'center' }}>
                <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 150, height: 80, width: 80, padding: 10, backgroundColor: colours.primary }}>
                    {iconType ? <Image source={icons[iconType]} style={{
                        flex: 1,
                        width: null,
                        height: null,
                        resizeMode: 'contain'
                    }} /> :
                        <Text style={{ fontSize: 50, fontWeight: 200, alignSelf: 'center' }}>{value}</Text>
                    }
                </View>
                <Text>{displayText ? displayText : titleCase(iconType)}</Text>
            </View>
        );
    }



    const PlantingCalendar = ({ plantSowingDates }) => {

        const calculateGrowingCalendar = () => {

            let monthArray = [];
            let sowingDates = plantSowingDates.find(x => x.climateZone === 4).sowingDates;
            //let sowingDates = plantSowingDates.find(x => x.climateZone === userData.climateZone).sowingDates;




            Array.from({ length: 12 }, (_, k) => {
                let isMidMonth = false;
                let isEndMonth = false;
                let isStartMonth = false;

                sowingDates.forEach((sowingDate) => {

                    const date = new Date();
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
            {plant && <ImageBackground source={{ uri: variety ? variety.images[0] : plant.images[0] }} style={{ height: 300, resizeMode: 'cover', width: '100%' }} >
                <Button onPress={() => isUserPlant ? router.replace('/gardens/' + plant.gardenId) : router.replace('/plants')}>Back</Button>

            </ImageBackground>
            }
            {plant &&
                <SafeAreaWrapperFullWidth>
                    {plant.plantName && <>

                        <Text style={{ color: 'black' }}>{plant.plantName}</Text>
                        <Text style={{ color: 'black' }}>{plant.scientificName}</Text>
                        {isUserPlant && <><Text style={{ color: 'black' }}>It's a user plant!</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <PlantDetailIcon displayText='Days to Sprout' value={plant.daysToSprout - daysSincePlanted} />
                                <PlantDetailIcon displayText='Days to Transplant' value={(6 * 7) - daysSincePlanted} />
                                <PlantDetailIcon displayText='Mature in' value={plant.sproutToHarvest + plant.daysToSprout - daysSincePlanted} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => updatePlantAction('water')}>
                                    <PlantDetailIcon displayText='Water in' value={daysSinceWatered} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => updatePlantAction('fertilise')}>
                                    <PlantDetailIcon displayText='Fert in' value={daysSinceFertilised} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => updatePlantAction('weed')}>
                                    <PlantDetailIcon displayText='Weed in' value={daysSinceWeeded} />
                                </TouchableOpacity>

                            </View>
                        </>}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <PlantDetailIcon iconType='annual' />
                            <PlantDetailIcon iconType='flower' />
                            <PlantDetailIcon iconType='water0' displayText='Water' />
                        </View>



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

        </>
    )
}