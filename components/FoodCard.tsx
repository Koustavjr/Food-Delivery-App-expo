import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCartStore, CartItem } from '../src/store/CartStore'


type FoodCardProps = {
    // food: {
    //     id: string;
    //     name: string;
    //     category: string;
    //     price: number;
    //     rating: number;
    //     time: string;
    //     image: ReturnType<typeof require>;
    //     restaurantId: string;
    //     restaurantName: string;
    // },
    food: CartItem;
    onPress: () => void;
}

const FoodCard = ({ food, onPress }: FoodCardProps) => {
    const { addItem, removeItem, getItemQuantity } = useCartStore();
    return (
        <Pressable style={styles.card} onPress={onPress}>

            <View style={styles.imageContainer}>
                <Image source={food.image} style={styles.image} resizeMode="cover" />
                <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>⭐ {food.rating}</Text>
                </View>
            </View>


            <View style={styles.info}>
                <Text style={styles.category}>{food.category}</Text>
                <Text style={styles.name} numberOfLines={1}>{food.name}</Text>

                <View style={styles.row}>
                    <Text style={styles.price}>${food.price.toFixed(2)}</Text>
                    <Text style={styles.time}>🕐 {food.time}</Text>
                </View>

                <View>


                    <Pressable style={styles.addButton}>
                        <Pressable onPress={() => removeItem(food.id, food.restaurantId)}>
                            <Text style={styles.addButtonText}>-</Text>
                        </Pressable>
                        <Text style={styles.addButtonText}>{getItemQuantity(food.id)}</Text>
                        <Pressable onPress={() => addItem(food, food.restaurantId, food.restaurantName)}>
                            <Text style={styles.addButtonText}>+</Text>
                        </Pressable>
                    </Pressable>
                </View>
            </View>

        </Pressable>
    )
}

export default FoodCard

const styles = StyleSheet.create({
    card: {
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    imageContainer: {
        width: '100%',
        height: 130,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    ratingBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    ratingText: {
        fontSize: 11,
        fontWeight: '600',
    },
    info: {
        padding: 12,
        gap: 4,
    },
    category: {
        fontSize: 11,
        color: '#60e0ec',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#60e0ec',
    },
    time: {
        fontSize: 11,
        color: '#888',
    },
    addButton: {
        marginTop: 8,
        backgroundColor: '#60e0ec',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
})