
import React, { useState, createContext, useEffect, useContext } from 'react';
import { getFirestore, collection, getDocs, doc, query, setDoc, updateDoc, getDoc, where, } from "firebase/firestore";
import { getUserData, createGarden, getUserGardens, getPlantData, createUserPlant, updateUserFavourites, getUserPlants, updateUserPlant, updateUserGarden, deleteUserGarden } from "../../service/databaseService";
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

    const getAllUserGardens = async () => {
        getUserGardens(db, userId).then((gardens) => {
            setUserGardens(gardens);
            console.log('updateGarden')
            return;
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

    const updateGarden = async (updatedGarden) => {

        async function updateUserGarden() {
            const b = await updateDoc(doc(db, 'userGardens', updatedGarden.id), updatedGarden);
            return b;
        }

        async function updateUserGardenList() {
            const a = await getDocs(query(collection(db, 'userGardens'), where('user', '==', userId)))
            return a;
        }

        async function runAsyncFunctions() {
            const a = await updateUserGarden();
            const userGardensList = await updateUserGardenList();
            const docs = userGardensList.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));
            return docs;
        }

        runAsyncFunctions()
            .then((result) => {
                setUserGardens(result);


                return result;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });


        return runAsyncFunctions();



        // getAllUserGardens().then((garden) => {
        //     console.log('updateGarden')
        //     return garden;
        // });

        // }).catch((e) => {
        //     console.log('it errored', e);
        // })

    }

    const deleteGarden = async (gardenId) => {
        deleteUserGarden(db, gardenId).then(() => {
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
                updateGarden,
                deleteGarden
            }}>
            {children}
        </DataContext.Provider>
    );
};
