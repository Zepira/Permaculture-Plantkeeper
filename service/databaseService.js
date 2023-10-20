import { doc, setDoc, getDoc, getDocs, collection, query, where, addDoc, updateDoc } from 'firebase/firestore';
import { useEffect } from "react";
import { gardenType } from "../utils/constants/constants";

const getUserData = async (db, userId) => {
    console.log('getUserData');
    return getDoc(doc(db, 'users', userId));
}

const getUserPlants = async (db, userId) => {
    console.log('getUserPlants', userId);
    return getDocs(query(collection(db, 'userPlants'), where('user', '==', userId))).then((plantData) => {
        const docs = plantData.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));
        return docs
    })
}

const updateUserPlant = async (db, updatedPlant) => {
    console.log('updateUserPlant', updatedPlant);
    return updateDoc(doc(db, 'userPlants', updatedPlant.id), updatedPlant);
}

const updateUserFavourites = (db, userId, updatedFavourites) => {
    console.log(updatedFavourites);
    return updateDoc(doc(db, 'users', userId), {
        plantFavourites: updatedFavourites
    });
}

const getPlantData = async (db) => {
    console.log('getPlantData');
    return getDocs(query(collection(db, 'plants'))).then((plantData) => {
        const docs = plantData.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));
        return docs
    })
}

const createGarden = async (db, newGarden, userId) => {
    console.log('createGarden');
    newGarden.user = userId;
    newGarden.wateringFrequency = gardenType[newGarden.gardenType].wateringFrequency;
    newGarden.fertilisingFrequency = gardenType[newGarden.gardenType].fertilisingFrequency;
    newGarden.weedingFrequency = gardenType[newGarden.gardenType].weedingFrequency;
    return addDoc(collection(db, 'userGardens'), newGarden);
}

const getUserGardens = async (db, userId) => {
    console.log('getUserGardens');
    return getDocs(query(collection(db, 'userGardens'), where('user', '==', userId))).then((plantData) => {
        const docs = plantData.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));
        return docs
    })
}

const createUserPlant = async (db, newPlant, variety, userId) => {
    console.log('createUserPlant', newPlant, variety);
    newPlant.user = userId;
    newPlant.plantedDate = new Date();
    try {
        if (variety) {
            const plantDetails = await getDoc(doc(db, 'plants', newPlant.plantId));
            const varietyList = plantDetails.data();

            varietyList.varieties.forEach((selectedVariety) => {

                if (selectedVariety.varietyName == variety) {
                    newPlant.variety = selectedVariety;
                }
            });

        }
        return addDoc(collection(db, 'userPlants'), newPlant);
    } catch (e) {
        console.log(e);
        throw (e);
    }
}

const getGardenPlants = async (db, gardenId) => {

    async function getGardenPlants() {
        const gardenPlants = await getDocs(query(collection(db, 'userPlants'), where('gardenId', '==', gardenId)));
        const docs = gardenPlants.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));
        return docs;
    }

    async function getPlantDetail(plantId) {
        const plant = await getDoc(doc(db, 'plants', plantId));
        return plant;
    }

    async function runAsyncFunctions() {

        const gardenPlantData = await getGardenPlants();
        console.log('hasdasd', gardenPlantData);
        const updatedGardenPlantData = [];

        for (let i = 0; i < gardenPlantData.length; i++) {
            const gardenPlant = gardenPlantData[i];
            const result = await getPlantDetail(gardenPlant.plantId);
            updatedGardenPlantData.push({ ...gardenPlant, ...result.data() });
        }

        return updatedGardenPlantData;
    }

    runAsyncFunctions()
        .then((result) => {
            return result;
        })
        .catch((error) => {
            console.error(error);
            return error;
        });


    return runAsyncFunctions();
}



export { getUserData, getPlantData, createGarden, getUserGardens, createUserPlant, getGardenPlants, updateUserFavourites, getUserPlants, updateUserPlant };