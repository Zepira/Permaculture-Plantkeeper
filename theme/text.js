import styled from "styled-components/native";

import { colors } from "./colours";
import { fonts, fontSizes, fontWeights } from "./fonts";

const body = () => `
font-family: ${fonts.quicksandSemiBold};
    font-size: ${fontSizes.body};
`;

const title = () => `
    font-family:${fonts.quicksandBold};
    font-size: ${fontSizes.title};
`;

const smallHeading = () => `
    font-size: 20px;
`;
const button = () => `
    font-size: ${fontSizes.button};
`;

const error = () => `
    color: ${colors.ui.error};
    font-size: ${fontSizes.caption};
`;

const label = () => `
    font-family: ${fonts.quicksandMedium};
    font-size: ${fontSizes.body};
    font-weight: ${fontWeights.medium};
    color: ${colors.grey};
`;

const h1 = () => `
    font-family:${fonts.quicksandBold};
    font-size: ${fontSizes.h1};
    color:${colors.plantKeeperDarkestGreen};
`;

const h2 = () => `
    font-size: ${fontSizes.h2};
    color:${colors.plantKeeperH2};
    font-family: ${fonts.quicksandSemiBold}
`;

const caption = () => `
    font-size: ${fontSizes.caption};
    color:${colors.plantKeeperCaption}
`;
const hint = () => `
    font-size: ${fontSizes.body};
`;

const variants = {
  title,
  body,
  smallHeading,
  button,
  label,
  caption,
  error,
  hint,
  h2,
  h1,
};

export const Text = styled.Text`
  ${({ variant }) => variants[variant]()}
`;

Text.defaultProps = {
  variant: "body",
};
