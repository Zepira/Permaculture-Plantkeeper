import { growthStages } from "../constants";



export const addPlantForm =
    [{
        index: 0,
        questionText: `Where is this plant located?`,
        databaseValue: 'gardenId',
        questionSubText: '',
        questionType: 'select',
    },
    {
        index: 1,
        questionText: `How old is the plant?`,
        databaseValue: 'growthStage',
        questionSubText: '',
        questionType: 'select',
        options: growthStages
    }];

