import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text, TouchableHighlight, Image, TouchableOpacity, Animated } from 'react-native';
import { MAX_WORKING_STACK, MEMORIZED_TRESHOLD } from '../constants';
import * as color from '../color';

const FlashCards = ({ route, navigation }) => {
    const { setName } = route.params;

    // use parameter to fetch study words
    // KR : knoledge rating: 0, +1 if correct, -1 if incorrect
    // use max_working_stack to pull that number of cards from backend
    let [words, setWords] = useState([
        {
            'word_id': 1,
            'japanese': 'こんにちは',
            'english': 'hello',
            'knowledge_rating': 0,
            'last_review': ''
        },
        {
            'word_id': 2,
            'japanese': '食べる',
            'english': 'to eat',
            'knowledge_rating': 0,
            'last_review': 's'
        }
    
    ]);

    const [flipped, setFlipped] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState();

    const rotateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setDisplayText(() => flipped ? words[wordIndex]['japanese'] : words[wordIndex]['english']);
    }, [flipped, wordIndex]);


    const [isAnimating, setIsAnimating] = useState(false);
    
    const flipCard = () => {
        if (isAnimating) {
            return;
        }

        setIsAnimating(true);

        Animated.timing(rotateValue, {
            toValue: flipped ? 0 : 1,
            duration: 600,
            useNativeDriver: true,
        }).start(
            ({ finished }) => {
                if (finished) {
                  setIsAnimating(false);
                }
            }
        );

    }

    // change display text to other language when flipped
    const changeFlipped = rotateValue.addListener(({value}) => {
        if (value >= 0.5 && !flipped) {
            setFlipped(true);
            rotateValue.removeListener(changeFlipped);
        }
        else if (value < 0.5 && flipped) {
            setFlipped(false);
            rotateValue.removeListener(changeFlipped);
        }
    });

    const viewRotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const textRotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-180deg'],
    });

    const textOpacity = rotateValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 1],
    });

    const getNextCard = (correct) => {
        if (correct) {
            words[wordIndex]['knowledge_rating'] += 1
        } else {
            words[wordIndex]['knowledge_rating'] = 0
        }

        console.log(words[wordIndex]['knowledge_rating']);

        // TODO for backend sync: update word knowledge rating

        if (words[wordIndex]['knowledge_rating'] >= MEMORIZED_TRESHOLD) {
            words.splice(wordIndex, 1);
            // push in a new word from backend fetch
        }

        if (!words.length) {
            navigation.goBack();
            return;
        } 

        setWordIndex((cur) => (cur + 1) % words.length );

        rotateValue.setValue(0);
        setFlipped(false); // this updates the flipped state but also updates the word index display
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.backContainer}>
                <TouchableHighlight underlayColor="transparent" activeOpacity={0.5} style={styles.backButton} onPress={() => {navigation.goBack()}}>
                    <Image source={require('../assets/x-icon-inverted.png')} style={styles.backImage} />
                </TouchableHighlight>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity underlayColor="transparent" activeOpacity={0.9} style={styles.cardHolder} onPress={flipCard}>
                    <Animated.View style={[styles.animatedView, { transform: [{ rotateY: viewRotate }] }]}>
                        <Animated.Text style={[styles.animatedText, { transform: [{ rotateY: textRotate }], opacity: textOpacity }]}>
                            {displayText}
                        </Animated.Text>
                    </Animated.View>
                </TouchableOpacity>
                <View style={styles.nextCardContainer}>
                    <TouchableHighlight underlayColor="red" activeOpacity={0.5} style={styles.nextCardButton} onPress={() => getNextCard(false)}>
                        <Text style={styles.nextCardText}>x</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="green" activeOpacity={0.5} style={styles.nextCardButton} onPress={() => getNextCard(true)}>
                        <Text style={styles.nextCardText}>✓</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default FlashCards;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.BACKGROUND,
        alignItems: 'center',
    },
    backContainer: {
        width: '90%',
        height: '10%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    backButton: {
        width: 25,
        height: 30,
        
    },
    backImage: {
        objectFit: 'contain',
        width: '100%',
        height: '100%',
    },
    cardContainer: {
        width: '90%',
        height: '90%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
    },
    cardHolder: {
        width: '100%',
        height: '80%',
    }, 
    animatedView: {
        width: '100%',
        height: '100%',
        borderColor: color.ACCENT,
        borderWidth: 2,
        backgroundColor: color.BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    animatedText: {
        color: color.PRIMARY,
        fontSize: 25,
    },
    nextCardContainer: {
        width: '100%',
        height: '12%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    nextCardButton: {
        width: '49%',
        height: '90%',
        borderColor: color.ACCENT,
        borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20
    },
    nextCardText: {
        textAlign: 'center',
        color: color.PRIMARY,
        fontSize: 20
    }

});
