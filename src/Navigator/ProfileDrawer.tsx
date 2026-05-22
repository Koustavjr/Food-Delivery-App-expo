import { StyleSheet } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../(Main)/Profile'
import Settings from '../(Main)/Settings'
import Help from '../(Main)/Help'
import Order from '../(Main)/Order'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import HomeTab from './HomeTab';
import CustomDrawer from '../(Main)/CustomDrawer';


const Drawer = createDrawerNavigator<any>()

const ProfileDrawer = () => {
    return (


        // <Drawer.Navigator initialRouteName='Profile' screenOptions={{ headerShown: true }}>
        //     <Drawer.Screen name="Profile" component={Profile} />
        //     <Drawer.Screen name="Settings" component={Settings} />
        //     <Drawer.Screen name="Help" component={Help} />
        //     <Drawer.Screen name="Order" component={Order} />
        // </Drawer.Navigator>

        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="Help" component={Help} />
            <Drawer.Screen name="Order" component={Order} />
        </Drawer.Navigator>

    )
}

export default ProfileDrawer

const styles = StyleSheet.create({})