import styled from 'styled-components/native';

const body = () => `
    font-size: 12px;
`;

const title = () => `
    font-size: 48px;
    color:white;
`;

const smallHeading = () => `
    font-size: 20px;
`;

const variants = {
    title,
    body,
    smallHeading
};

export const Text = styled.Text`
  ${({ variant }) => variants[variant]()}
`;

Text.defaultProps = {
    variant: 'body',
};