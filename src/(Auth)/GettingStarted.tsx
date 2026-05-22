import { Nunito_400Regular_Italic, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Buttons from '../../components/Buttons';
import { FEATURES } from '../../constants/Features';
import { useNavigation } from '@react-navigation/native';


const GettingStarted = () => {
    const [fontsLoaded] = useFonts({
        Pacifico_400Regular,
        Nunito_400Regular_Italic,
        Nunito_600SemiBold,
    });


    const navigation = useNavigation<any>()

    const quickOpacity = useRef(new Animated.Value(0)).current;
    const quickX = useRef(new Animated.Value(-40)).current;

    const biteOpacity = useRef(new Animated.Value(0)).current;
    const biteX = useRef(new Animated.Value(40)).current;

    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleY = useRef(new Animated.Value(40)).current;

    const featuresOpacity = useRef(new Animated.Value(0)).current;
    const featuresY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        const timing = (val: Animated.Value, toValue: number, duration = 900) =>
            Animated.timing(val, { toValue, duration, useNativeDriver: true });

        Animated.parallel([
            timing(quickOpacity, 1),
            timing(quickX, 0),
            timing(biteOpacity, 1),
            timing(biteX, 0),
            timing(subtitleOpacity, 1),
            timing(subtitleY, 0),
            Animated.sequence([
                Animated.delay(200),
                Animated.parallel([
                    timing(featuresOpacity, 1),
                    timing(featuresY, 0),
                ]),
            ]),
        ]).start();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/Online_Shoping_29.jpg')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.titleRow}>
                    <Animated.Text
                        style={[
                            styles.title,
                            { color: '#60e0ecff', opacity: quickOpacity, transform: [{ translateX: quickX }] },
                        ]}
                    >
                        Quick
                    </Animated.Text>
                    <Animated.Text
                        style={[
                            styles.title,
                            { color: '#847b7b26', opacity: biteOpacity, transform: [{ translateX: biteX }] },
                        ]}
                    >
                        Bite
                    </Animated.Text>
                </View>

                <Animated.Text
                    style={[styles.subtitle, { opacity: subtitleOpacity, transform: [{ translateY: subtitleY }] }]}
                >
                    Order from your favourite restaurants and get food delivered to your doorstep in minutes.
                </Animated.Text>

                <Animated.View
                    style={[styles.featuresRow, { opacity: featuresOpacity, transform: [{ translateY: featuresY }] }]}
                >
                    {FEATURES.map((f, i) => (
                        <View key={i} style={styles.featureItem}>
                            <View style={styles.featureIconBox}>
                                <MaterialIcons name={f.icon} size={22} color="#60e0ec" />
                            </View>
                            <Text style={styles.featureLabel}>{f.label}</Text>
                        </View>
                    ))}
                </Animated.View>

                {/* <Buttons text="Get Started" onPress={() => navigation.navigate('SignIn')} /> */}

                <Buttons text="Get Started" targetScreen='SignIn' onPress={() => navigation.navigate('SignIn')} />

            </View>
        </SafeAreaView>
    );
};

export default GettingStarted;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 24,
        marginTop: 30,
    },
    imageContainer: {
        width: 260,
        height: 260,
        borderRadius: 130,
        overflow: 'hidden',
        alignSelf: 'center',
        marginTop: 28,
        marginBottom: 18,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    title: {
        fontFamily: 'Pacifico_400Regular',
        fontSize: 42,
        letterSpacing: 1,
    },
    subtitle: {
        fontFamily: 'Nunito_400Regular_Italic',
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: 32,
        marginBottom: 24,
    },
    featuresRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 16,
        marginBottom: 28,
    },
    featureItem: {
        alignItems: 'center',
        gap: 8,
    },
    featureIconBox: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: '#f0fbfd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    featureLabel: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
    },
});