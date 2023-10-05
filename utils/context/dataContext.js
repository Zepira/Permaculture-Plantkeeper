
import React, { useState, createContext, useEffect, useContext } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc, query, setDoc } from "firebase/firestore";
import { getUserData, createGarden, getUserGardens, getPlantData, createUserPlant } from "../../service/databaseService";
import { AuthenticationContext } from "./authenticationContext";


export const DataContext = createContext();

export const DataContextProvider = ({ db, children, setIsLoading }) => {

    const [plants, setPlants] = useState(null);
    const [user, setUser] = useState(null);
    const [userGardens, setUserGardens] = useState([]);

    const { userId } = useContext(AuthenticationContext);


    useEffect(() => {
        getUserData(db, userId).then((user) => {
            console.log('Only run this once!');
            setUser(user.data());
            setIsLoading(false);
        });
        getAllUserGardens();
        getAllPlants();
    }, [])


    const createNewGarden = async (newGarden) => {
        createGarden(db, newGarden, userId).then((garden) => {
            getAllUserGardens();
            return garden;
        }).catch((er) => {
            console.log(er);
            return er;
        })
    }

    const getAllUserGardens = () => {
        getUserGardens(db, userId).then((gardens) => {
            setUserGardens(gardens);
        }).catch((er) => {
            console.log(er);
            return er;
        })
    }

    const getAllPlants = () => {
        getPlantData(db).then((plants) => {
            setPlants(plants);
        }).catch((er) => {
            console.log(er);
            return er;
        })
    }

    const createNewPlant = async (newPlant) => {
        createUserPlant(db, newPlant, userId).then((plant) => {
            getAllPlants();
            return plant;
        }).catch((er) => {
            console.log(er);
            return er;
        })
    }

    return (
        <DataContext.Provider
            value={{
                db,
                createNewGarden,
                getAllUserGardens,
                userGardens,
                user,
                getAllPlants,
                plants,
                createNewPlant
            }}>
            {children}
        </DataContext.Provider>
    );
};
