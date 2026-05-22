import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/AuthStore';
export default function SignIn() {
    const navigation = useNavigation<any>();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);
    const [isEmailFocused, setIsEmailFocused] = React.useState(false);

    const { signIn } = useAuthStore()

    const handleSignIn = async () => {
        const success = await signIn(email, password);
        if (success) {
            navigation.navigate('Home');
        }
        else {
            Alert.alert('Error', 'Invalid email or password');
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
            >



                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/Online_Shoping_29.jpg')}
                            style={styles.logo} />

                        <Text style={styles.heading}>Sign In</Text>
                        <Text style={styles.subHeading}>Experience the joy of delicious food</Text>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10, width: '90%', alignSelf: 'center', color: '#60e0ecff' }}>Email Address</Text>
                    <View style={[styles.inputContainer, isEmailFocused ? {
                        borderColor: '#60e0ecff',
                        borderWidth: 2,
                        shadowOpacity: 0.2
                    } : {
                        borderColor: '#e0e0e0',
                        shadowOpacity: 0
                    }]}>

                        <MaterialIcons name='email' size={24} color='#60e0ecff' />
                        <TextInput placeholder='Enter your email' value={email} onChangeText={setEmail}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                            style={{ width: '60%', marginLeft: 10, marginRight: 10 }}
                        />
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10, width: '90%', alignSelf: 'center', color: '#60e0ecff' }}>Password</Text>
                        <View style={[styles.inputContainer, isPasswordFocused ? {
                            borderColor: '#60e0ecff',
                            borderWidth: 2,
                            shadowOpacity: 0.2
                        } : {
                            borderColor: '#e0e0e0',
                            shadowOpacity: 0
                        }]}>
                            <MaterialIcons name='lock' size={24} color='#60e0ecff' />
                            <TextInput placeholder='Enter your password'
                                value={password}
                                onChangeText={setPassword}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                secureTextEntry={!showPassword}
                                style={{ width: '60%' }}
                            />

                            <Pressable onPress={() => setShowPassword(!showPassword)}>
                                <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} style={{ paddingLeft: 30, marginLeft: 30 }} size={24} color='#60e0ecff' />
                            </Pressable>
                        </View>
                    </View>


                    <Pressable style={styles.button} onPress={handleSignIn}>
                        <Text style={styles.text}>Sign In</Text>
                        <MaterialIcons name='arrow-forward' size={24} color='white' style={{ marginLeft: 10 }} />
                    </Pressable>


                    <View style={styles.socialIcon}>
                        <View style={[styles.icon, styles.facebook]}>
                            <EvilIcons name="sc-facebook" size={30} color="black" />
                        </View>
                        <View style={styles.icon}>
                            <AntDesign name="google" size={24} color="black" />
                        </View>
                        <View style={styles.icon}>
                            <Entypo name="instagram" size={24} color="black" />
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Text>Don't have an account?</Text>
                        <Pressable onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{ color: '#60e0ecff' }}>Sign Up</Text>
                        </Pressable>
                    </View>

                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
        // paddingBottom: 30
        //backgroundColor: 'black',


    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    socialIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    button: {
        backgroundColor: '#60e0ecff',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
        width: '90%',
        alignSelf: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#60e0ecff',
        marginBottom: 10,
    },
    subHeading: {
        color: 'gray',
        fontSize: 16,
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 50,
        gap: 10,
        borderRadius: 50,
        overflow: 'hidden',


    },
    logoContainer: {
        alignItems: 'center',       // Centers horizontally
        justifyContent: 'center',    // Centers vertically (if the View has a height)
        marginVertical: 10,
        // Adds some space around the logo
    },
    facebook: {
        padding: 18
    },
    icon: {
        padding: 20,
        borderRadius: 15,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',

    }

})
