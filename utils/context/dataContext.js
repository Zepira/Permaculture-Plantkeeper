import {
  getFirestore,
  collection,
  getDocs,
  doc,
  query,
  setDoc,
  updateDoc,
  getDoc,
  where,
} from "firebase/firestore";
import React, { useState, createContext, useEffect, useContext } from "react";

import { AuthenticationContext } from "./authenticationContext";
import {
  getUserData,
  createGarden,
  getUserGardens,
  getPlantData,
  createUserPlant,
  updateUserFavourites,
  getUserPlants,
  updateUserPlant,
  updateUserGarden,
  deleteUserGarden,
  deleteUserPlant,
} from "../../service/databaseService";

export const DataContext = createContext();

export const DataContextProvider = ({ db, children, user }) => {
  const [plants, setPlants] = useState(null);
  const [userPlants, setUserPlants] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userGardens, setUserGardens] = useState([]);

  //const { user } = useContext(AuthenticationContext);
  //const user = { id: "test-user-id" };

  useEffect(() => {
    getUserData(db, user.uid).then((userData) => {
      console.log("Only run this once!");
      setUserData(userData.data());
      console.log(userData.data());
      //setIsLoading(false);
    });
    getAllUserGardens();
    getAllPlants();
    getAllUserPlants();
  }, []);

  const updateUserData = () => {
    getUserData(db, user.uid).then((userData) => {
      console.log("Only run this once!");
      setUserData(userData.data());
      //setIsLoading(false);
    });
  };

  const updateUserPlantData = (updatedPlant) => {
    async function updatePlant() {
      const b = await updateUserPlant(db, updatedPlant);
      return b;
    }

    async function updateUserPlantList() {
      const a = await getDocs(
        query(collection(db, "userPlants"), where("user", "==", user.uid)),
      );
      return a;
    }

    async function runAsyncFunctions() {
      const a = await updatePlant();
      const userPlantsList = await updateUserPlantList();
      const docs = userPlantsList.docs.map((f) => ({
        ...f.data(),
        ...{ id: f.id },
      }));
      return docs;
    }

    runAsyncFunctions()
      .then((result) => {
        setUserPlants(result);

        return result;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });

    return runAsyncFunctions();
  };

  const updateUserFavourite = async (plantId) => {
    const updatedFavourites = user.plantFavourites ? user.plantFavourites : [];
    const index = updatedFavourites.indexOf(plantId);

    if (index === -1) {
      updatedFavourites.push(plantId);
    } else {
      updatedFavourites.splice(index, 1);
    }
    console.log(updatedFavourites, plantId);
    return updateUserFavourites(db, user.uid, updatedFavourites).then(() => {
      updateUserData();
    });
  };

  const createNewGarden = async (newGarden) => {
    createGarden(db, newGarden, user.uid)
      .then((garden) => {
        getAllUserGardens();
        return garden;
      })
      .catch((er) => {
        console.log(er);
        return er;
      });
  };

  const getAllUserGardens = async () => {
    getUserGardens(db, user.uid)
      .then((gardens) => {
        setUserGardens(gardens);
        console.log("updateGarden");
      })
      .catch((er) => {
        console.log(er);
        return er;
      });
  };

  const getAllPlants = () => {
    getPlantData(db)
      .then((plants) => {
        setPlants(plants);
      })
      .catch((er) => {
        console.log(er);
        return er;
      });
  };

  const getAllUserPlants = () => {
    getUserPlants(db, user.uid)
      .then((plants) => {
        setUserPlants(plants);
      })
      .catch((er) => {
        console.log(er);
        return er;
      });
  };

  const createNewPlant = async (newPlant, variety) => {
    console.log("newPlant", newPlant);
    createUserPlant(db, newPlant, variety, user.uid)
      .then((plant) => {
        getAllPlants();
        getAllUserPlants();
        return plant;
      })
      .catch((er) => {
        console.log(er);
        return er;
      });
  };

  const updateGarden = async (updatedGarden) => {
    async function updateUserGarden() {
      const b = await updateDoc(
        doc(db, "userGardens", updatedGarden.id),
        updatedGarden,
      );
      return b;
    }

    async function updateUserGardenList() {
      const a = await getDocs(
        query(collection(db, "userGardens"), where("user", "==", user.uid)),
      );
      return a;
    }

    async function runAsyncFunctions() {
      const a = await updateUserGarden();
      const userGardensList = await updateUserGardenList();
      const docs = userGardensList.docs.map((f) => ({
        ...f.data(),
        ...{ id: f.id },
      }));
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
  };

  const deleteGarden = async (gardenId) => {
    deleteUserGarden(db, gardenId)
      .then(() => {
        getAllUserGardens();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePlant = async (plantId) => {
    deleteUserPlant(db, plantId)
      .then(() => {
        getAllPlants();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <DataContext.Provider
      value={{
        db,
        createNewGarden,
        getAllUserGardens,
        userGardens,
        userData,
        getAllPlants,
        plants,
        createNewPlant,
        updateUserFavourite,
        getAllUserPlants,
        userPlants,
        updateUserPlantData,
        updateGarden,
        deleteGarden,
        deletePlant,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
