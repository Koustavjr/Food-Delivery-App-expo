import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import GettingStarted from '../(Auth)/GettingStarted'
import SignIn from '../(Auth)/SignIn'
import SignUp from '../(Auth)/SignUp'
import HomeTab from './HomeTab'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useAuthStore } from '../store/AuthStore'

const Stack = createStackNavigator()

const AppNavigator = () => {

    const isSignedIn = useAuthStore((state) => state.isSignedIn)

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={isSignedIn ? 'Home' : 'GettingStarted'}>
                    {isSignedIn ?
                        <Stack.Screen name='Home' component={HomeTab} options={{ headerShown: false }} />
                        :
                        <>
                            <Stack.Screen name='GettingStarted' component={GettingStarted} options={{ headerShown: false }} />
                            <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
                            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
                        </>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}

export default AppNavigator
