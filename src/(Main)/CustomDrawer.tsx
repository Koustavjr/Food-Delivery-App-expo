
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/AuthStore';


export default function CustomDrawer(props: any) {

    const { signOut } = useAuthStore();
    return (

        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ flex: 1 }}
        >


            {/*<DrawerItemList {...props} />*/}


            <View style={styles.divider} />
            <DrawerItem
                label="Profile"
                icon={({ color, size }) => (
                    <Ionicons name="person-outline" size={size} color={color} />
                )}
                onPress={() => props.navigation.navigate('Profile')}
            />
            <DrawerItem
                label="Settings"
                icon={({ color, size }) => (
                    <Ionicons name="settings-outline" size={size} color={color} />
                )}
                onPress={() => props.navigation.navigate('Settings')}
            />
            <DrawerItem
                label="Help"
                icon={({ color, size }) => (
                    <Ionicons name="help-circle-outline" size={size} color={color} />
                )}
                onPress={() => props.navigation.navigate('Help')}
            />

            <DrawerItem
                label="Logout"
                labelStyle={{ color: 'red' }}
                icon={({ color, size }) => (
                    <Ionicons name="log-out-outline" size={size} color="red" />
                )}
                onPress={() => {
                    //props.navigation.closeDrawer();
                    signOut();

                }}
            />

        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    userSection: {
        padding: 20,
        backgroundColor: '#E63946',
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 10,
    },
    userName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        color: '#ffcdd2',
        fontSize: 13,
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 8,
        marginHorizontal: 16,
    },
});