import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { universal } from '../styles/Universal';
import * as color from '../color';

const HomeScreen = ({ navigation }) => {


    // will be fetched from firebase
    const sets = ['Verbs', 'Nouns', 'Adverbs'];

    return (
        <SafeAreaView style={universal.container} edges={['top', 'bottom']}>
            <View style={universal.title}>
                <Text style={universal.header}>Sets</Text>
            </View>
            <ScrollView style={styles.scrollview}>
                {sets.map(set => (
                    <TouchableHighlight underlayColor="transparent" activeOpacity={0.5} key={set} style={styles.border} onPress={() => navigation.navigate('StudySet', { setName: set })}>
                        <Text style={styles.setTitle}>{set}</Text>
                    </TouchableHighlight>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;


const styles = StyleSheet.create({
    scrollview: {
        width: '100%',
        height: 'auto'
    },
    border: {
        borderTopColor: color.ACCENT,
        borderTopWidth: 1,
        borderBottomColor: color.ACCENT,
        borderBottomWidth: 1,
        marginTop: -1,
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    setTitle: {
        fontSize: 18,
        color: color.PRIMARY
    },
    text: {
        color: color.PRIMARY
    }
});
