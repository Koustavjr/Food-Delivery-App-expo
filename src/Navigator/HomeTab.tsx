import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Home from '../(Main)/Home';
import Search from '../(Main)/Search';
import Orders from '../(Main)/Order';
import Profile from '../(Main)/Profile';
import RestaurantStack from './RestaurantStack';
import ProfileDrawer from './ProfileDrawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const HomeTab = () => {


    return (




        <Tab.Navigator
            initialRouteName='HomeTab'
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarActiveTintColor: 'skyblue',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    paddingBottom: 8,
                    height: 80,
                },

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';

                    if (route.name === 'HomeTab') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'fast-food' : 'fast-food-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }


                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name='HomeTab' component={RestaurantStack} />
            <Tab.Screen name='Search' component={Search} />
            <Tab.Screen name='Orders' component={Orders} />
            <Tab.Screen name='Profile' component={ProfileDrawer} />
        </Tab.Navigator>


    );
};

export default HomeTab;