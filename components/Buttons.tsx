import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


type ButtonProps = {
    text: string;
    targetScreen: string;
    onPress: () => void;
}
const Buttons = ({ text, targetScreen, onPress }: ButtonProps) => {
    return (
        <View>

            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
                <MaterialIcons name='arrow-forward' size={24} color='white' style={{ marginLeft: 10 }} />
            </Pressable>
        </View>
    )
}

export default Buttons

const styles = StyleSheet.create({


    button: {
        backgroundColor: '#60e0ecff',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})