import { StatusBar, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';


export const SafeAreaWrapper = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: 'white';
  marginHorizontal: 15px;
`;

export const SafeAreaWrapperFullWidth = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: 'white';
`;