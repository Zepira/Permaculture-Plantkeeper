import { colours } from './colours';
import { Text } from './text';
//import { Spacer } from './components/spacer.component';
//import { fonts, fontWeights, fontSizes, fontConfig } from './fonts';
import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';


export const theme = {
    colours,
};

export { Text };

export const paperTheme = {
    ...DefaultTheme,
    //fonts: configureFonts({ config: fontConfig }),
    colors: colours,


};