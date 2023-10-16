import React, { useContext, useEffect, useState } from 'react';
import { Text } from "../../theme/text";
import { DataContext } from "../../utils/context/dataContext";
import { SafeAreaWrapperFullWidth } from "../../components/safeAreaWrapper";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import { gardenType } from "../../utils/constants/constants";
import { Avatar, Button, IconButton, Modal, Portal } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { icons } from "../../utils/constants/assets"
import { colours } from "../../theme/colours";
import { titleCase } from "../../utils/utils";

export default AddPlant = () => {

    const params = useLocalSearchParams();

    const { plants, userPlants, updateUserFavourite, user } = useContext(DataContext);

    const userPlant = userPlants ? userPlants.find((plant) => plant.plantId === params.plantId) : {};
    const plant = plants ? { ...plants.find((plant) => plant.id === params.plantId), ...userPlant } : {};

    console.log('ALANAA', userPlant);
    const isUserPlant = params.origin === 'garden';
    //const [showModal, setShowModal] = useState(false);
    const [variety, setVariety] = useState(plant.variety);
    const [isFavourite, setIsFavourite] = useState(
        user?.plantFavourites && user.plantFavourites.length > 0 && user.plantFavourites.includes(plant ? plant.plantId : ''));

    const updateFavourites = () => {
        updateUserFavourite(plant.plantId).then(() => {
            setIsFavourite(!isFavourite);
        });

    }

    // const addPlant = ({ id, variety }) => {
    //     setShowModal(false);
    //     router.push({ pathname: 'form', params: { formType: 'addPlant', id, variety: variety.varietyName } })
    // }


    const PlantDetailIcon = ({ iconType, displayText }) => {
        // console.log('PlantDetailIcon', iconType);

        return (
            <View style={{ alignContent: 'center', alignItems: 'center' }}>
                <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 150, height: 80, width: 80, padding: 10, backgroundColor: colours.primary }}>
                    <Image source={icons[iconType]} style={{
                        flex: 1,
                        width: null,
                        height: null,
                        resizeMode: 'contain'
                    }} />
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
            {Object.keys(plant) && <ImageBackground source={{ uri: plant.images[0] }} style={{ height: 300, resizeMode: 'cover', width: '100%' }} >
                <Button onPress={() => isUserPlant ? router.replace('/gardens/' + plant.gardenId) : router.replace('/plants')}>Back</Button>

            </ImageBackground>
            }
            {Object.keys(plant) &&
                <SafeAreaWrapperFullWidth>
                    {plant.plantName && <>

                        <Text style={{ color: 'black' }}>{plant.plantName}</Text>
                        <Text style={{ color: 'black' }}>{plant.scientificName}</Text>
                        {isUserPlant && <Text style={{ color: 'black' }}>It's a user plant!</Text>}
                        <IconButton
                            icon={isFavourite ? "heart" : "heart-outline"}
                            color={colours.primary}
                            size={20}
                            onPress={() => updateFavourites()}
                        />
                        {!isUserPlant && <Button onPress={() => router.push({ pathname: '/form', params: { formType: 'addPlant', id: plant.id } })}>Add to Garden</Button>}
                    </>}
                </SafeAreaWrapperFullWidth >
            }

        </>
    )
}