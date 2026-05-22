import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { CartItem, useCartStore } from '../store/CartStore';

import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RestaurantStackParamList } from '../Navigator/RestaurantStack';

type Props = NativeStackScreenProps<RestaurantStackParamList, 'MenuList'>;

const MenuList = ({ route, navigation }: Props) => {
    const { restaurant } = route.params;
    const { addItem, removeItem } = useCartStore()

    const menu = restaurant.menu ?? [];
    const categories = ['All', ...Array.from(new Set(menu.map(i => i.category)))];
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered: any = activeCategory === 'All'
        ? menu
        : menu.filter(i => i.category === activeCategory);

    const renderItem = ({ item }: { item: CartItem }) => (
        <View style={styles.itemCard}>
            <Image source={item.image} style={styles.itemImg} resizeMode="cover" />
            <View style={styles.itemInfo}>
                <View style={styles.itemTopRow}>
                    {item.isVeg !== undefined && (
                        <View style={[styles.vegIndicator, { borderColor: item.isVeg ? '#4caf50' : '#f44336' }]}>
                            <View style={[styles.vegDot, { backgroundColor: item.isVeg ? '#4caf50' : '#f44336' }]} />
                        </View>
                    )}
                    {item.isPopular && (
                        <View style={styles.popularBadge}>
                            <Text style={styles.popularText}>⭐ Popular</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
                <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                        <MaterialIcons name="add" size={18} color="#fff" onPress={() => addItem(item, restaurant.id, restaurant.name)} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safe} edges={['top']}>


            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={20} color="#1a1a1a" />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <Text style={styles.menuCount}>{menu.length} items</Text>
                </View>
            </View>

            <FlatList
                data={categories}
                keyExtractor={c => c}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContent}
                renderItem={({ item: cat }) => (
                    <TouchableOpacity
                        style={[styles.catChip, activeCategory === cat && styles.catChipActive]}
                        onPress={() => setActiveCategory(cat)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <FlatList
                data={filtered}
                keyExtractor={i => i.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={styles.empty}>No items in this category.</Text>
                }
            />
        </SafeAreaView>
    );
};

export default MenuList;

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#f7f9fc' },
    header: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        paddingHorizontal: 16, paddingVertical: 14,
        backgroundColor: '#fff',
        borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
    },
    backBtn: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center',
    },
    restaurantName: { fontSize: 18, fontWeight: '800', color: '#1a1a1a' },
    menuCount: { fontSize: 12, color: '#999', marginTop: 1 },
    categoriesContent: { paddingHorizontal: 16, paddingVertical: 14, gap: 10 },
    catChip: {
        paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20,
        backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#e0e0e0',
    },
    catChipActive: { backgroundColor: '#60e0ec', borderColor: '#60e0ec' },
    catText: { fontSize: 13, fontWeight: '600', color: '#666' },
    catTextActive: { color: '#fff' },
    listContent: { paddingHorizontal: 16, paddingBottom: 24, gap: 14 },
    itemCard: {
        flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
    },
    itemImg: { width: 110, height: 110 },
    itemInfo: { flex: 1, padding: 12, justifyContent: 'space-between' },
    itemTopRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
    vegIndicator: {
        width: 14, height: 14, borderRadius: 2, borderWidth: 1.5,
        justifyContent: 'center', alignItems: 'center',
    },
    vegDot: { width: 6, height: 6, borderRadius: 3 },
    popularBadge: {
        backgroundColor: '#fffbea', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 8,
    },
    popularText: { fontSize: 10, fontWeight: '700', color: '#b8860b' },
    itemName: { fontSize: 15, fontWeight: '800', color: '#1a1a1a', marginBottom: 4 },
    itemDesc: { fontSize: 12, color: '#888', lineHeight: 18, marginBottom: 8 },
    itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    itemPrice: { fontSize: 16, fontWeight: '800', color: '#60e0ec' },
    addBtn: {
        backgroundColor: '#60e0ec', width: 30, height: 30, borderRadius: 15,
        justifyContent: 'center', alignItems: 'center',
    },
    empty: { textAlign: 'center', color: '#aaa', marginTop: 60, fontSize: 15 },
});
