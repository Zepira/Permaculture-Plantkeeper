import { doc, setDoc, getDoc, getDocs, collection, query, where, addDoc } from 'firebase/firestore';
import { useEffect } from "react";
import { gardenType } from "../utils/constants/constants";

const getUserData = async (db, userId) => {
    console.log('getUserData');
    return getDoc(doc(db, 'users', userId));
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

const createUserPlant = async (db, newPlant, userId) => {
    console.log('createUserPlant', newPlant);
    newPlant.user = userId;
    try {
        return addDoc(collection(db, 'userPlants'), newPlant);
    } catch (e) {
        console.log(e);
        throw (e);
    }
}

const getGardenPlants = async (db, gardenId) => {

    async function getGardenPlants() {
        const gardenPlants = await getDocs(query(collection(db, 'userPlants'), where('gardenId', '==', gardenId)));
        return gardenPlants.docs;
    }

    async function getPlantDetail(plantId) {
        const plant = await getDoc(doc(db, 'plants', plantId));
        console.log('ALANA', plant.data());
        return plant;
    }

    async function runAsyncFunctions() {
        const gardenPlantData = await getGardenPlants();
        const updatedGardenPlantData = [];

        for (let i = 0; i < gardenPlantData.length; i++) {
            const gardenPlant = gardenPlantData[i].data()
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





    // let fullPlantList = [];
    // try {

    //     const getGardenPlants = async () => {
    //         const gardenPlants = await getDocs(query(collection(db, 'userPlants'), where('gardenId', '==', gardenId)));
    //         return gardenPlants.docs;
    //     }

    //     const getPlants = async (plantId) => {
    //         const plant = await getDoc(doc(db, 'plants', plantId));
    //         return plant;
    //     }


    //     getGardenPlants().then((gardenPlants) => {
    //         let gardenPlantData;
    //         gardenPlants.forEach((gardenPlant) => {
    //             gardenPlantData = gardenPlant.data();

    //             getPlants(gardenPlantData.plantId).then((plant) => {

    //                 gardenPlantData = { ...gardenPlantData, ...plant.data() }

    //                 return gardenPlantData;
    //             })
    //         })




    //         //console.log('ALANA', gardenPlantData);

    //         return gardenPlantData;
    //         // result.forEach((gardenPlant) => {
    //         //     getPlants(gardenPlant.plantId).then((plant) => {
    //         //         console.log('HELLO', plant.data());
    //         //     })
    //         // })
    //     }).then((result) => {
    //         fullPlantList = result;
    //         return result;
    //     })
    //     return fullPlantList;
    //     // .then((plant) => {
    //     //     plantData = { ...plantData, ...plants.data() }

    //     // }
    //     // return getDocs(query(collection(db, 'userPlants'), where('gardenId', '==', gardenId))).then((plantData) => {

    //     //         plantData.forEach((plantDoc) => {
    //     //             let plantData = plantDoc.data();
    //     //             plantData.id = plantDoc.id;
    //     //             getDoc(doc(db, 'plants', plantData.plantId)).then((plant) => {
    //     //                 plantData = { ...plantData, ...plants.data() }

    //     //                 fullPlantList.push(plantData);
    //     //             });
    //     //         }
    //     //         );
    //     //         //const plants = plantData.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));
    //     //         console.log('getGardenPlants', fullPlantList);
    //     //         return fullPlantList;
    //     //     })
    // } catch (e) {
    //     console.log(e);
    //     throw (e);
    // }
}



export { getUserData, getPlantData, createGarden, getUserGardens, createUserPlant, getGardenPlants };