
import React, { useState, createContext, useEffect, useContext } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc, query, setDoc } from "firebase/firestore";
import { getUserData, createGarden, getUserGardens, getPlantData, createUserPlant, updateUserFavourites, getUserPlants, updateUserPlant, updateUserGarden } from "../../service/databaseService";
import { AuthenticationContext } from "./authenticationContext";


export const DataContext = createContext();

export const DataContextProvider = ({ db, children, setIsLoading }) => {

    const [plants, setPlants] = useState(null);
    const [userPlants, setUserPlants] = useState(null);
    const [user, setUser] = useState(null);
    const [userGardens, setUserGardens] = useState([]);

    const { userId } = useContext(AuthenticationContext);

    useEffect(() => {
        getUserData(db, userId).then((userData) => {
            console.log('Only run this once!');
            setUser(userData.data());
            setIsLoading(false);
            console.log(user);
        });
        getAllUserGardens();
        getAllPlants();
        getAllUserPlants();
    }, []);

    const updateUserData = () => {
        getUserData(db, userId).then((userData) => {
            console.log('Only run this once!');
            setUser(userData.data());
            setIsLoading(false);
        });
    }

    const updateUserPlantData = (updatedPlant) => {
        console.log('updateUserPlantData', updatedPlant)
        updateUserPlant(db, updatedPlant).then((plant) => {
            return;
        }).catch((e) => {
            console.log(e);
        })
    }


    const updateUserFavourite = async (plantId) => {

        const updatedFavourites = user.plantFavourites ? user.plantFavourites : [];
        const index = updatedFavourites.indexOf(plantId);

        if (index === -1) {
            updatedFavourites.push(plantId);
        } else {
            updatedFavourites.splice(index, 1);
        }
        console.log(updatedFavourites, plantId);
        return updateUserFavourites(db, userId, updatedFavourites)
            .then(() => {
                updateUserData();
                return;
            }
            );
    }

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

    const getAllUserPlants = () => {
        getUserPlants(db, userId).then((plants) => {
            setUserPlants(plants);
        }).catch((er) => {
            console.log(er);
            return er;
        })
    }

    const createNewPlant = async (newPlant, variety) => {
        console.log('newPlant', newPlant)
        createUserPlant(db, newPlant, variety, userId).then((plant) => {
            getAllPlants();
            getAllUserPlants();
            return plant;
        }).catch((er) => {
            console.log(er);
            return er;
        })
    }

    const updateGarden = (updatedGarden) => {

        updateUserGarden(db, updatedGarden).then(() => {
            getAllUserGardens();
            return;
        }).catch((e) => {
            console.log(e);
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
                createNewPlant,
                updateUserFavourite,
                getAllUserPlants,
                userPlants,
                updateUserPlantData,
                updateGarden
            }}>
            {children}
        </DataContext.Provider>
    );
};
