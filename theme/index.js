import {
  MD3LightTheme as DefaultTheme,
  configureFonts,
} from "react-native-paper";

import { colours } from "./colours";
import { Text } from "./text";
//import { Spacer } from './components/spacer.component';
//import { fonts, fontWeights, fontSizes, fontConfig } from './fonts';

export const theme = {
  colours,
};

export { Text };

export const paperTheme = {
  ...DefaultTheme,
  //fonts: configureFonts({ config: fontConfig }),
  colors: colours,
};
