import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Pressable, TouchableOpacity } from 'react-native'
import { useCartStore } from '../store/CartStore'
import { FlatList } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

const Order = () => {
    const { items, totalItems, totalPrice, clearCart, deleteItem, isInCart } = useCartStore();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.text}>Order</Text>

                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>
                            Your cart is empty
                        </Text>
                    }
                    renderItem={({ item }) => (
                        <View style={[styles.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <View style={styles.card}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                                <Text style={{ color: '#888' }}>Qty: {item.quantity}</Text>
                                <Text style={{ color: '#888' }}>Restaurant: {item.restaurantName}</Text>
                            </View>
                            <TouchableOpacity onPress={() => deleteItem(item.id, item.restaurantId)}>
                                <MaterialIcons name="delete" size={20} color="#f44336" />
                            </TouchableOpacity>
                        </View>
                    )}
                />

                {items.length > 0 && (
                    <View style={styles.totalsRow}>
                        <Text style={styles.totalText}>Total Items: {totalItems()}</Text>
                        <Text style={styles.totalText}>Total: ${totalPrice().toFixed(2)}</Text>
                    </View>
                )}
                {items.length > 0 && (
                    <Pressable style={styles.clearButton} onPress={clearCart}>
                        <Text style={styles.clearButtonText}>Pay Now</Text>
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    )
}
export default Order

const styles = StyleSheet.create({
    clearButton: {
        backgroundColor: '#60e0ec',
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
        marginBottom: 10
    },
    clearButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',

    },
    safeArea: {
        flex: 1,
        backgroundColor: '#f8fffe',
    },
    container: {
        flex: 1,
        backgroundColor: '#f8fffe',
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    text: {
        fontSize: 30,
        fontWeight: '800',
        color: '#60e0ec',
        letterSpacing: -0.5,
        marginBottom: 16,
    },
    list: {
        gap: 12,
        paddingBottom: 24,
    },
    card: {
        //  backgroundColor: '#fff',
        //  borderRadius: 16,
        padding: 16,
        gap: 6,
        // shadowColor: '#60e0ec',
        // shadowOpacity: 0.1,
        // shadowRadius: 8,
        // shadowOffset: { width: 0, height: 2 },
        // elevation: 3,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a2e',
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '700',
        color: '#60e0ec',
    },
    totalsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingTop: 10,
        marginBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    totalText: {
        fontSize: 25,
        color: '#60e0ec',
        fontWeight: '600',
    },
})
