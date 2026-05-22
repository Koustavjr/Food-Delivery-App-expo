import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RestaurantStackParamList } from '../Navigator/RestaurantStack';

type Props = NativeStackScreenProps<RestaurantStackParamList, 'RestaurantDetail'>;

const RestaurantDetail = ({ route, navigation }: Props) => {
    const { restaurant } = route.params;

    return (
        <SafeAreaView style={styles.safe} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

                <View style={styles.heroContainer}>
                    <Image source={restaurant.image} style={styles.hero} resizeMode="cover" />


                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="#fff" />
                    </TouchableOpacity>

                    <View style={[styles.badge, { backgroundColor: restaurant.isOpen ? '#4caf50' : '#f44336' }]}>
                        <Text style={styles.badgeText}>{restaurant.isOpen ? 'Open' : 'Closed'}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.nameRow}>
                        <Text style={styles.name}>{restaurant.name}</Text>
                        <View style={styles.ratingPill}>
                            <MaterialIcons name="star" size={14} color="#FFD700" />
                            <Text style={styles.ratingText}>{restaurant.rating}</Text>
                        </View>
                    </View>

                    <Text style={styles.cuisine}>{restaurant.cuisine} Cuisine</Text>
                    <Text style={styles.description}>{restaurant.description}</Text>


                    <View style={styles.tagsRow}>
                        {restaurant.tags.map((tag, i) => (
                            <View key={i} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>


                    <View style={styles.statsRow}>
                        <StatItem icon="schedule" label={restaurant.deliveryTime} sub="Delivery" />
                        <View style={styles.divider} />
                        <StatItem icon="delivery-dining" label={`$${restaurant.deliveryFee}`} sub="Fee" />
                        <View style={styles.divider} />
                        <StatItem icon="place" label={restaurant.distance} sub="Away" />
                        <View style={styles.divider} />
                        <StatItem icon="shopping-bag" label={`$${restaurant.minOrder}`} sub="Min Order" />
                    </View>


                    <View style={styles.contactRow}>
                        <MaterialIcons name="location-on" size={16} color="#60e0ec" />
                        <Text style={styles.contactText}>{restaurant.address}</Text>
                    </View>
                    <View style={styles.contactRow}>
                        <MaterialIcons name="phone" size={16} color="#60e0ec" />
                        <Text style={styles.contactText}>{restaurant.phone}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>⭐ Popular Items</Text>
                    <FlatList
                        data={restaurant.menu.filter(i => i.isPopular)}
                        keyExtractor={i => i.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
                        renderItem={({ item }) => (
                            <View style={styles.menuPreviewCard}>
                                <Image source={item.image} style={styles.menuPreviewImg} resizeMode="cover" />
                                {item.isVeg !== undefined && (
                                    <View style={[styles.vegDot, { backgroundColor: item.isVeg ? '#4caf50' : '#f44336' }]} />
                                )}
                                <Text style={styles.menuPreviewName} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.menuPreviewPrice}>${item.price.toFixed(2)}</Text>
                            </View>
                        )}
                    />
                </View>


                <TouchableOpacity
                    style={styles.menuBtn}
                    onPress={() => navigation.replace('MenuList', { restaurant })}
                    activeOpacity={0.85}
                >
                    <MaterialIcons name="restaurant-menu" size={20} color="#fff" />
                    <Text style={styles.menuBtnText}>View Full Menu</Text>
                    <MaterialIcons name="arrow-forward-ios" size={16} color="#fff" />
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const StatItem = ({ icon, label, sub }: { icon: any; label: string; sub: string }) => (
    <View style={styles.statItem}>
        <MaterialIcons name={icon} size={18} color="#60e0ec" />
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statSub}>{sub}</Text>
    </View>
);

export default RestaurantDetail;

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#f7f9fc' },
    heroContainer: { height: 240, position: 'relative' },
    hero: { width: '100%', height: '100%' },
    backBtn: {
        position: 'absolute', top: 16, left: 16,
        backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20,
        padding: 8, width: 38, height: 38, justifyContent: 'center', alignItems: 'center',
    },
    badge: {
        position: 'absolute', top: 16, right: 16,
        paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12,
    },
    badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
    card: {
        backgroundColor: '#fff', marginHorizontal: 16, marginTop: -24,
        borderRadius: 20, padding: 20,
        shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 12, elevation: 4,
    },
    nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    name: { fontSize: 22, fontWeight: '800', color: '#1a1a1a', flex: 1 },
    ratingPill: {
        flexDirection: 'row', alignItems: 'center', gap: 3,
        backgroundColor: '#fffbea', paddingHorizontal: 10, paddingVertical: 4,
        borderRadius: 12, borderWidth: 1, borderColor: '#FFD700',
    },
    ratingText: { fontSize: 13, fontWeight: '700', color: '#b8860b' },
    cuisine: { fontSize: 13, color: '#60e0ec', fontWeight: '600', marginBottom: 8 },
    description: { fontSize: 14, color: '#666', lineHeight: 21, marginBottom: 14 },
    tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 },
    tag: { backgroundColor: '#f0fbfd', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
    tagText: { fontSize: 12, color: '#60e0ec', fontWeight: '600' },
    statsRow: {
        flexDirection: 'row', justifyContent: 'space-between',
        backgroundColor: '#f7f9fc', borderRadius: 14, padding: 14, marginBottom: 16,
    },
    statItem: { alignItems: 'center', flex: 1 },
    statLabel: { fontSize: 13, fontWeight: '700', color: '#1a1a1a', marginTop: 4 },
    statSub: { fontSize: 11, color: '#999', marginTop: 2 },
    divider: { width: 1, backgroundColor: '#e0e0e0' },
    contactRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
    contactText: { fontSize: 13, color: '#555', flex: 1 },
    section: { marginTop: 24 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1a1a1a', marginLeft: 20, marginBottom: 14 },
    menuPreviewCard: {
        width: 130, backgroundColor: '#fff', borderRadius: 14,
        overflow: 'hidden',
        shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
    },
    menuPreviewImg: { width: '100%', height: 90 },
    vegDot: {
        position: 'absolute', top: 6, right: 6,
        width: 10, height: 10, borderRadius: 5, borderWidth: 1.5, borderColor: '#fff',
    },
    menuPreviewName: { fontSize: 13, fontWeight: '700', color: '#1a1a1a', paddingHorizontal: 10, paddingTop: 8 },
    menuPreviewPrice: { fontSize: 13, color: '#60e0ec', fontWeight: '700', paddingHorizontal: 10, paddingBottom: 10, marginTop: 2 },
    menuBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
        backgroundColor: '#60e0ec', marginHorizontal: 20, marginTop: 28,
        paddingVertical: 16, borderRadius: 16,
        shadowColor: '#60e0ec', shadowOpacity: 0.35, shadowRadius: 10, elevation: 5,
    },
    menuBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});