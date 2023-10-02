import { doc, setDoc, getDoc, getDocs, collection, query, where, addDoc } from 'firebase/firestore';
import { useEffect } from "react";
import { gardenType } from "../utils/constants/forms/constants";

const getUserData = async (db, userId) => {
    return getDoc(doc(db, 'users', userId));
}

const getPlantData = async (db) => {
    return getDocs(query(collection(db, 'plants'))).then((plantData) => {
        const docs = plantData.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));
        return docs
    })
}

const createGarden = async (db, newGarden, userId) => {
    newGarden.user = userId;
    newGarden.wateringFrequency = gardenType[newGarden.gardenType].wateringFrequency;
    newGarden.fertilisingFrequency = gardenType[newGarden.gardenType].fertilisingFrequency;
    newGarden.weedingFrequency = gardenType[newGarden.gardenType].weedingFrequency;
    return addDoc(collection(db, 'userGardens'), newGarden);
}

const getUserGardens = async (db, userId) => {
    return getDocs(query(collection(db, 'userGardens'), where('user', '==', userId))).then((plantData) => {
        const docs = plantData.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));
        return docs
    })
}



export { getUserData, getPlantData, createGarden, getUserGardens };