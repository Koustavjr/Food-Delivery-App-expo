import React, { useState } from 'react'
import {
    View, Text, StyleSheet, ScrollView,
    TouchableOpacity, SafeAreaView, Linking, LayoutAnimation,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const TEAL = '#60e0ec'
const DARK = '#1a1a2e'
const GRAY = '#f5f7fa'
const BORDER = '#e8eaf0'

const FAQ_DATA = [
    {
        q: 'How do I track my order?',
        a: 'Go to the Orders tab and tap on your active order. You\'ll see a live map with your delivery agent\'s location and an estimated arrival time.',
    },
    {
        q: 'Can I cancel my order?',
        a: 'Yes, you can cancel within 2 minutes of placing the order. After that, cancellations depend on the restaurant\'s policy. Go to Orders → your order → Cancel.',
    },
    {
        q: 'How do I add a new delivery address?',
        a: 'Go to Settings → Saved Addresses → tap the "+" button to add a new address. You can set it as your default address anytime.',
    },
    {
        q: 'Why was I charged twice?',
        a: 'This is usually a temporary authorization hold by your bank. It should automatically reverse within 3–5 business days. If it doesn\'t, contact our support team.',
    },
    {
        q: 'How do I apply a promo code?',
        a: 'On the checkout screen, scroll down to the "Promo Code" field, enter your code and tap "Apply". The discount will reflect in your total instantly.',
    },
    {
        q: 'What if the restaurant is closed?',
        a: 'If a restaurant you ordered from closes before preparing your food, you\'ll receive a full refund automatically within 24 hours.',
    },
]

function FaqItem({ item }: { item: typeof FAQ_DATA[0] }) {
    const [open, setOpen] = useState(false)

    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setOpen(v => !v)
    }

    return (
        <View style={styles.faqItem}>
            <TouchableOpacity style={styles.faqHeader} onPress={toggle} activeOpacity={0.7}>
                <Text style={styles.faqQ}>{item.q}</Text>
                <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={TEAL} />
            </TouchableOpacity>
            {open && <Text style={styles.faqA}>{item.a}</Text>}
        </View>
    )
}

export default function Help() {
    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                <View style={styles.heroBanner}>
                    <View style={styles.heroIcon}>
                        <Ionicons name="headset-outline" size={34} color="#fff" />
                    </View>
                    <Text style={styles.heroTitle}>How can we help?</Text>
                    <Text style={styles.heroSub}>
                        Browse FAQs or reach out to our support team — we're available 24/7.
                    </Text>
                </View>

                <Text style={styles.sectionHeader}>Quick Support</Text>
                <View style={styles.quickRow}>
                    <TouchableOpacity
                        style={styles.quickCard}
                        onPress={() => Linking.openURL('tel:+1800000000')}
                    >
                        <View style={[styles.quickIcon, { backgroundColor: '#edfbfd' }]}>
                            <Ionicons name="call-outline" size={22} color={TEAL} />
                        </View>
                        <Text style={styles.quickLabel}>Call Us</Text>
                        <Text style={styles.quickSub}>24/7 support</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.quickCard}
                        onPress={() => Linking.openURL('mailto:support@foodapp.com')}
                    >
                        <View style={[styles.quickIcon, { backgroundColor: '#fff3e0' }]}>
                            <Ionicons name="mail-outline" size={22} color="#FF9800" />
                        </View>
                        <Text style={styles.quickLabel}>Email Us</Text>
                        <Text style={styles.quickSub}>Reply in 1 hr</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickCard}>
                        <View style={[styles.quickIcon, { backgroundColor: '#f3e5f5' }]}>
                            <Ionicons name="chatbubble-ellipses-outline" size={22} color="#9C27B0" />
                        </View>
                        <Text style={styles.quickLabel}>Live Chat</Text>
                        <Text style={styles.quickSub}>Instant reply</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionHeader}>Frequently Asked Questions</Text>
                <View style={styles.faqCard}>
                    {FAQ_DATA.map((item, i) => (
                        <React.Fragment key={i}>
                            <FaqItem item={item} />
                            {i < FAQ_DATA.length - 1 && <View style={styles.divider} />}
                        </React.Fragment>
                    ))}
                </View>

                <TouchableOpacity style={styles.reportBtn}>
                    <Ionicons name="flag-outline" size={18} color="#e63946" />
                    <Text style={styles.reportText}>Report a problem</Text>
                </TouchableOpacity>

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
    heroBanner: {
        backgroundColor: DARK,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
        gap: 10,
    },
    heroIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: TEAL,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    heroTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    heroSub: {
        color: '#aaa',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '700',
        color: '#999',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 12,
        marginLeft: 4,
    },
    quickRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 24,
    },
    quickCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 14,
        alignItems: 'center',
        gap: 6,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    quickIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quickLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: DARK,
    },
    quickSub: {
        fontSize: 11,
        color: '#aaa',
    },
    faqCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    faqItem: {
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    faqQ: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: DARK,
        lineHeight: 20,
    },
    faqA: {
        marginTop: 10,
        fontSize: 13,
        color: '#666',
        lineHeight: 20,
    },
    divider: {
        height: 1,
        backgroundColor: BORDER,
        marginHorizontal: 16,
    },
    reportBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#fff0f0',
        borderRadius: 14,
        paddingVertical: 14,
    },
    reportText: {
        color: '#e63946',
        fontWeight: '600',
        fontSize: 14,
    },
})
