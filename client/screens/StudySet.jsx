import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text, TouchableHighlight, Image, ScrollView, Button } from 'react-native';
import { universal } from '../styles/Universal';
import * as color from '../color';

const StudySet = ({ route, navigation }) => {
    const { setName } = route.params;

    // use parameter to fetch study words
    // TODO: here
    const words = [
        {
            'jpn': 'こんにちは',
            'eng': 'hello'
        },
        {
            'jpn': '食べる',
            'eng': 'to eat'
        }
    
    ]


    return (
        <SafeAreaView style={universal.container} edges={['top', 'bottom']}>
            <View style={universal.backContainer}>
                <TouchableHighlight underlayColor="transparent" activeOpacity={0.5} style={universal.backButton} onPress={() => {navigation.goBack()}}>
                    <Image source={require('../assets/x-icon-inverted.png')} style={universal.backImage} />
                </TouchableHighlight>
            </View>
            
            <View style={styles.topSection}>
                <View style={styles.title}>
                    <Text style={ styles.header}>{ setName }</Text>
                </View>
                <View style={styles.studyOptions}>
                    <TouchableHighlight underlayColor="transparent" activeOpacity={0.5} style={styles.studyButton} onPress={() => navigation.navigate('FlashCards', { setName: setName })}>
                        <Image source={require('../assets/flashcard.png')} style={styles.flashcardImage} />
                    </TouchableHighlight>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Flashcards</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.scrollview}>
                {words.map(item => (
                    <View key={item['jpn']} style={styles.border}>
                        <Text style={styles.words}>{item['jpn']}</Text>
                        <Text style={styles.words}>{item['eng']}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default StudySet;


const styles = StyleSheet.create({
    topSection: {
        borderBottomColor: color.ACCENT,
        borderBottomWidth: 1,
        width: '100%',
        height: '30%'
    },
    title: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 25,
        color: color.PRIMARY
    },
    studyOptions: {
        width: '100%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    studyButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.SECONDARY,
        borderRadius: '50%'
    },
    flashcardImage: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
    },
    option: {
        height: 50,
        justifyContent: 'center',
    },
    optionText: {
        fontSize: 16,
        color: color.PRIMARY
    },
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
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    words: {
        width: '30%',
        textAlign: 'center',
        color: color.PRIMARY
    },
});
