import React, { useState, useMemo } from 'react'
import {
    View, Text, TextInput, FlatList,
    TouchableOpacity, Image, StyleSheet
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Restaurants } from '../../constants/Restraunt'
import { FOODS } from '../../constants/Foods'

export default function Search({ navigation }: any) {
    const [query, setQuery] = useState('')

    const results = useMemo(() => {
        if (query.trim().length === 0) return { restaurants: [], foods: [] }

        const q = query.toLowerCase()

        const matchedRestaurants = Restaurants.filter(r =>
            r.name.toLowerCase().includes(q) ||
            r.cuisine.toLowerCase().includes(q) ||
            r.tags.some(tag => tag.toLowerCase().includes(q))
        )

        const matchedFoods = FOODS.filter(f =>
            f.name.toLowerCase().includes(q) ||
            f.category.toLowerCase().includes(q)
        )

        return { restaurants: matchedRestaurants, foods: matchedFoods }
    }, [query])

    const hasResults = results.restaurants.length > 0 || results.foods.length > 0
    const showEmpty = query.trim().length > 0 && !hasResults

    return (
        <View style={styles.container}>

            <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="gray" style={{ marginRight: 8 }} />
                <TextInput
                    style={styles.input}
                    placeholder="Search restaurants or food..."
                    value={query}
                    onChangeText={setQuery}
                    autoFocus
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                />
                {query.length > 0 && (
                    <TouchableOpacity onPress={() => setQuery('')}>
                        <Ionicons name="close-circle" size={20} color="gray" />
                    </TouchableOpacity>
                )}
            </View>

            {query.trim().length === 0 && (
                <View style={styles.emptyState}>
                    <Ionicons name="search-outline" size={60} color="#ddd" />
                    <Text style={styles.emptyText}>Search for restaurants or food</Text>
                </View>
            )}

            {showEmpty && (
                <View style={styles.emptyState}>
                    <Ionicons name="sad-outline" size={60} color="#ddd" />
                    <Text style={styles.emptyText}>No results for "{query}"</Text>
                </View>
            )}

            {hasResults && (
                <FlatList
                    data={[]}
                    renderItem={null}
                    keyExtractor={() => 'dummy'}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            {results.restaurants.length > 0 && (
                                <>
                                    <Text style={styles.sectionTitle}>
                                        Restaurants ({results.restaurants.length})
                                    </Text>
                                    {results.restaurants.map(item => (
                                        <RestaurantCard
                                            key={item.id}
                                            item={item}
                                            onPress={() =>
                                                navigation.navigate('HomeTab', {
                                                    screen: 'RestaurantDetail',
                                                    params: { restaurant: item }
                                                })
                                            }
                                        />
                                    ))}
                                </>
                            )}

                            {results.foods.length > 0 && (
                                <>
                                    <Text style={styles.sectionTitle}>
                                        Food Items ({results.foods.length})
                                    </Text>
                                    {results.foods.map(item => (
                                        <FoodCard key={item.id} item={item} />
                                    ))}
                                </>
                            )}
                        </>
                    }
                />
            )}
        </View>
    )
}

function RestaurantCard({ item, onPress }: any) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardSub}>{item.cuisine}</Text>
                <View style={styles.cardMeta}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.metaText}>{item.rating}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.metaText}>{item.deliveryTime}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.metaText}>{item.distance}</Text>
                </View>
                <View style={styles.tagRow}>
                    {item.tags.slice(0, 3).map((tag: string) => (
                        <View key={tag} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    )
}

function FoodCard({ item }: any) {
    return (
        <View style={styles.foodCard}>
            <Image source={item.image} style={styles.foodImage} />
            <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardSub}>{item.category}</Text>
                <View style={styles.cardMeta}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.metaText}>{item.rating}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.metaText}>{item.time}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={[styles.metaText, { color: '#E63946', fontWeight: 'bold' }]}>
                        ${item.price}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    emptyText: {
        fontSize: 16,
        color: '#aaa',
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
        marginTop: 8,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    cardImage: {
        width: 90,
        height: 90,
    },
    foodCard: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
    },
    foodImage: {
        width: 80,
        height: 80,
    },
    cardInfo: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        gap: 3,
    },
    cardName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222',
    },
    cardSub: {
        fontSize: 13,
        color: 'gray',
    },
    cardMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    metaText: {
        fontSize: 12,
        color: '#555',
    },
    dot: {
        color: '#ccc',
        fontSize: 12,
    },
    tagRow: {
        flexDirection: 'row',
        gap: 4,
        marginTop: 4,
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    tagText: {
        fontSize: 11,
        color: '#666',
    },
})