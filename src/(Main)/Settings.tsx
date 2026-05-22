import React, { useState } from 'react'
import {
    View, Text, StyleSheet, ScrollView,
    TouchableOpacity, Switch, SafeAreaView, Image
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const TEAL = '#60e0ec'
const DARK = '#1a1a2e'
const GRAY = '#f5f7fa'
const BORDER = '#e8eaf0'

type RowProps = {
    icon: keyof typeof Ionicons.glyphMap
    iconColor?: string
    label: string
    value?: boolean
    onToggle?: (v: boolean) => void
    onPress?: () => void
    danger?: boolean
    rightLabel?: string
}

function SettingRow({ icon, iconColor = TEAL, label, value, onToggle, onPress, danger, rightLabel }: RowProps) {
    const isToggle = typeof value === 'boolean'
    return (
        <TouchableOpacity
            style={styles.row}
            activeOpacity={isToggle ? 1 : 0.7}
            onPress={onPress}
        >
            <View style={[styles.iconWrap, { backgroundColor: danger ? '#fff0f0' : '#edfbfd' }]}>
                <Ionicons name={icon} size={20} color={danger ? '#e63946' : iconColor} />
            </View>
            <Text style={[styles.rowLabel, danger && { color: '#e63946' }]}>{label}</Text>
            <View style={styles.rowRight}>
                {rightLabel && <Text style={styles.rightLabel}>{rightLabel}</Text>}
                {isToggle
                    ? <Switch
                        value={value}
                        onValueChange={onToggle}
                        trackColor={{ false: '#ddd', true: TEAL }}
                        thumbColor="#fff"
                    />
                    : !danger && <Ionicons name="chevron-forward" size={18} color="#bbb" />
                }
            </View>
        </TouchableOpacity>
    )
}

function SectionHeader({ title }: { title: string }) {
    return <Text style={styles.sectionHeader}>{title}</Text>
}

export default function Settings() {
    const [notifications, setNotifications] = useState(true)
    const [promos, setPromos] = useState(false)
    const [locationAccess, setLocationAccess] = useState(true)
    const [darkMode, setDarkMode] = useState(false)

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                <View style={styles.profileBanner}>
                    <View style={styles.avatar}>
                        {/*<Text style={styles.avatarText}>JD</Text>*/}
                        <Image source={require('../../assets/avatar.png')} style={styles.avatarImage} />
                    </View>
                    <View>
                        <Text style={styles.profileName}>John Doe</Text>
                        <Text style={styles.profileEmail}>johndoe@email.com</Text>
                    </View>
                    <TouchableOpacity style={styles.editBtn}>
                        <Ionicons name="pencil-outline" size={16} color={TEAL} />
                        <Text style={styles.editBtnText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                <SectionHeader title="Notifications" />
                <View style={styles.card}>
                    <SettingRow icon="notifications-outline" label="Push Notifications" value={notifications} onToggle={setNotifications} />
                    <View style={styles.divider} />
                    <SettingRow icon="pricetag-outline" label="Promo & Offers" value={promos} onToggle={setPromos} />
                </View>

                <SectionHeader title="Preferences" />
                <View style={styles.card}>
                    <SettingRow icon="location-outline" label="Location Access" value={locationAccess} onToggle={setLocationAccess} />
                    <View style={styles.divider} />
                    <SettingRow icon="moon-outline" label="Dark Mode" value={darkMode} onToggle={setDarkMode} />
                    <View style={styles.divider} />
                    <SettingRow icon="language-outline" label="Language" rightLabel="English" onPress={() => { }} />
                </View>

                <SectionHeader title="Account" />
                <View style={styles.card}>
                    <SettingRow icon="card-outline" label="Payment Methods" onPress={() => { }} />
                    <View style={styles.divider} />
                    <SettingRow icon="location-outline" label="Saved Addresses" onPress={() => { }} />
                    <View style={styles.divider} />
                    <SettingRow icon="shield-checkmark-outline" label="Privacy & Security" onPress={() => { }} />
                </View>

                <SectionHeader title="Support" />
                <View style={styles.card}>
                    <SettingRow icon="help-circle-outline" label="Help Center" onPress={() => { }} />
                    <View style={styles.divider} />
                    <SettingRow icon="document-text-outline" label="Terms & Conditions" onPress={() => { }} />
                    <View style={styles.divider} />
                    <SettingRow icon="information-circle-outline" label="App Version" rightLabel="1.0.0" />
                </View>

                <SectionHeader title="" />
                <View style={styles.card}>
                    <SettingRow icon="log-out-outline" label="Log Out" danger onPress={() => { }} />
                    <View style={styles.divider} />
                    <SettingRow icon="trash-outline" label="Delete Account" danger onPress={() => { }} />
                </View>

                <View style={{ height: 32 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: GRAY,
    },
    scroll: {
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    profileBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: DARK,
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        gap: 12,
    },
    avatarImage: {
        width: 52,
        height: 52,
        borderRadius: 26,
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: TEAL,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    profileName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    profileEmail: {
        color: '#aaa',
        fontSize: 13,
        marginTop: 2,
    },
    editBtn: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(96,224,236,0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    editBtnText: {
        color: TEAL,
        fontSize: 13,
        fontWeight: '600',
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '700',
        color: '#999',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 8,
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 12,
    },
    iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowLabel: {
        flex: 1,
        fontSize: 15,
        color: DARK,
        fontWeight: '500',
    },
    rowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    rightLabel: {
        fontSize: 13,
        color: '#aaa',
    },
    divider: {
        height: 1,
        backgroundColor: BORDER,
        marginLeft: 64,
    },
})
