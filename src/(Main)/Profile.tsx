import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '../store/AuthStore'


const TEAL = '#60e0ec'
const TEAL_DARK = '#38b2bf'
const BG = '#f0fcfd'

interface InfoRowProps {
    icon: keyof typeof Ionicons.glyphMap
    label: string
    value: string
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
    <View style={styles.infoRow}>
        <View style={styles.infoIcon}>
            <Ionicons name={icon} size={18} color={TEAL_DARK} />
        </View>
        <View style={styles.infoText}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#ccc" />
    </View>
)

interface StatProps {
    count: string
    label: string
}

const Stat = ({ count, label }: StatProps) => (
    <View style={styles.stat}>
        <Text style={styles.statCount}>{count}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
)

const Profile = () => {
    const { signOut } = useAuthStore();
    return (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

            <View style={styles.banner}>
                <View style={styles.bannerCircle1} />
                <View style={styles.bannerCircle2} />
                <Text style={styles.bannerTitle}>My Profile</Text>
            </View>


            <View style={styles.avatarCard}>
                <View style={styles.avatarRing}>
                    <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
                </View>
                <Text style={styles.name}>John Doe</Text>
                <View style={styles.badge}>
                    <Ionicons name="star" size={12} color="#fff" />
                    <Text style={styles.badgeText}>Premium Member</Text>
                </View>

                <View style={styles.statsRow}>
                    <Stat count="24" label="Orders" />
                    <View style={styles.statDivider} />
                    <Stat count="4.8★" label="Rating" />
                    <View style={styles.statDivider} />
                    <Stat count="3" label="Saved" />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Info</Text>
                <View style={styles.card}>
                    <InfoRow icon="mail-outline" label="Email" value="johndoe@example.com" />
                    <View style={styles.rowDivider} />
                    <InfoRow icon="call-outline" label="Phone" value="+1 (234) 567-890" />
                    <View style={styles.rowDivider} />
                    <InfoRow icon="location-outline" label="Address" value="123 Main St, Anytown, USA" />
                </View>
            </View>



            <View style={styles.logoutWrapper}>
                <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}
                    onPress={signOut}
                >
                    <Ionicons name="log-out-outline" size={18} color="#e05" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 32 }} />
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: BG,
    },

    /* Banner */
    banner: {
        height: 160,
        backgroundColor: TEAL,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        paddingBottom: 60,
        alignItems: 'center',
    },
    bannerCircle1: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: 'rgba(255,255,255,0.12)',
        top: -60,
        left: -40,
    },
    bannerCircle2: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(255,255,255,0.08)',
        top: 20,
        right: -30,
    },
    bannerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 0.5,
    },

    /* Avatar card */
    avatarCard: {
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: -52,
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingTop: 60,
        paddingBottom: 20,
        shadowColor: TEAL,
        shadowOpacity: 0.18,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
    },
    avatarRing: {
        position: 'absolute',
        top: -44,
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: TEAL,
        backgroundColor: '#fff',
        shadowColor: TEAL,
        shadowOpacity: 0.4,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 10,
    },
    avatar: {
        width: 92,
        height: 92,
        borderRadius: 46,
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a2b3c',
        marginBottom: 6,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: TEAL,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 18,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },

    /* Stats */
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 16,
        width: '100%',
        paddingHorizontal: 10,
    },
    stat: {
        flex: 1,
        alignItems: 'center',
    },
    statCount: {
        fontSize: 18,
        fontWeight: '700',
        color: TEAL_DARK,
    },
    statLabel: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: 32,
        backgroundColor: '#eee',
    },

    /* Info rows */
    section: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#888',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 10,
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    infoIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#e8fafb',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    infoText: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 11,
        color: '#aaa',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoValue: {
        fontSize: 14,
        color: '#1a2b3c',
        fontWeight: '500',
        marginTop: 1,
    },
    rowDivider: {
        height: 1,
        backgroundColor: '#f5f5f5',
        marginLeft: 64,
    },

    /* Logout */
    logoutWrapper: {
        marginHorizontal: 20,
        marginTop: 24,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingVertical: 14,
        borderWidth: 1.5,
        borderColor: '#ffccd5',
        shadowColor: '#e00055',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    logoutText: {
        color: '#e00055',
        fontSize: 15,
        fontWeight: '700',
        marginLeft: 6,
    },
})
