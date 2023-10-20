


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
        options: [
            {
                optionText: 'Seed',
                optionMapping: 1
            },
            {
                optionText: 'Seedling',
                optionMapping: 2
            },
            {
                optionText: 'Mature Plant',
                optionMapping: 3
            },
            {
                optionText: 'Cutting',
                optionMapping: 4
            }
        ]
    }];

