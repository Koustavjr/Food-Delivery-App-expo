import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Restaurant } from '../../constants/Restraunt';
import Home from '../(Main)/Home';
import MenuList from '../(Main)/MenuList';
import RestaurantDetail from '../(Main)/RestaurantDetail';

export type RestaurantStackParamList = {
    HomeScreen: undefined;
    RestaurantDetail: { restaurant: Restaurant };
    MenuList: { restaurant: Restaurant };
};

const Stack = createNativeStackNavigator<RestaurantStackParamList>();

const RestaurantStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
            <Stack.Screen name="MenuList" component={MenuList} />
        </Stack.Navigator>
    );
};

export default RestaurantStack;