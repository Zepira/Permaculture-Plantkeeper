import { gardenType, lighting } from "../constants";

export const addGardenForm = [
    {
        index: 0,
        questionText: 'what type of garden would you like to ad?',
        databaseValue: 'gardenType',
        questionType: 'select',
        options: gardenType
    },
    {
        index: 0,
        questionText: 'How much sun does this spot get?',
        databaseValue: 'lighting',
        questionSubText: '',
        questionType: 'radioGroup',
        options: lighting
    }
    // {
    //     index: 1,
    //     questionText: 'What would you like to call your garden?',
    //     databaseValue: 'gardenName',
    //     questionSubText: '',
    //     questionType: 'textInput',
    //     fieldValue: ''

    // },
    // {
    //     index: 2,
    //     questionText: 'What type of garden is it?',
    //     databaseValue: 'gardenType',
    //     questionSubText: '',
    //     questionType: 'select',
    //     options: GARDEN_TYPE
    // },
    // {
    //     index: 3,
    //     questionText: 'What is the length of the garden bed? (cm)',
    //     databaseValue: 'gardenBedLength',
    //     questionSubText: '',
    //     questionType: 'textInput',
    //     value: ''

    // },
    // {
    //     index: 4,
    //     questionText: 'What is the width of the garden bed? (cm)',
    //     databaseValue: 'gardenBedWidth',
    //     questionSubText: '',
    //     questionType: 'textInput'

    // },
    // {
    //     index: 5,
    //     questionText: 'Does it have automated watering set up?',
    //     databaseValue: 'automatedWatering',
    //     questionSubText: '',
    //     questionType: 'radioGroup',
    //     options: [{
    //         optionText: 'Yes',
    //         optionMapping: true,
    //     },
    //     {
    //         optionText: 'No',
    //         optionMapping: false,
    //     }],
    // },
];