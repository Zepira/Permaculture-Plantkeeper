import { Stack } from 'expo-router';

const screenOptions = () => {

    return {
        //tabBarShowLabel: false,

        headerShown: false, //set on individual pages if required
        tabBarStyle: { height: 90 },

        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey'
    }
}

export default PlantsLayout = () => {
    return (<Stack screenOptions={screenOptions} />);
};
