import React, { useState, useEffect } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import FoodCard from '../../components/FoodCard'
import { FOODS } from '../../constants/Foods'
import RestrauntCard from '../../components/RestrauntCard'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RestaurantStackParamList } from '../Navigator/RestaurantStack'
import { Restaurants } from '../../constants/Restraunt'


type Food = typeof FOODS[0]

type HomeNavProp = NativeStackNavigationProp<RestaurantStackParamList, 'HomeScreen'>;

const Home = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const navigation = useNavigation<HomeNavProp>()
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 4000));
            setIsReady(true);
        };
        loadData();
    }, []);

    if (!isReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f9fc' }}>
                <ActivityIndicator size="large" color="#60e0ec" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>

            <View style={styles.header}>

                <Text style={styles.headline}>What would you like to eat?</Text>
            </View>

            <Text style={styles.sectionTitle}>🔥 Popular Near You</Text>

            <FlatList
                data={FOODS}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={[
                        styles.cardWrapper,
                        selectedId === item.id && styles.cardSelected,
                    ]}>
                        <FoodCard
                            food={item as any}
                            onPress={() => setSelectedId(item.id)}
                        />
                    </View>
                )}
            />

            <Text style={styles.sectionTitle}>🍔 Restaurants Near You</Text>

            <FlatList
                data={Restaurants}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <RestrauntCard
                            Restraunt={item}
                            onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}
                        />
                    </View>
                )}
            />

        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 8,
    },
    greeting: {
        fontSize: 14,
        color: '#888',
    },
    headline: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#60e0ec',
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#60e0ec',
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 12,
    },
    listContent: {
        paddingHorizontal: 20,
        gap: 14,
    },
    cardWrapper: {
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    cardSelected: {
        borderColor: '#60e0ec',
        shadowColor: '#60e0ec',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
})