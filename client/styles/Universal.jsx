import { StyleSheet } from 'react-native';
import * as color from '../color';

export const universal = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.BACKGROUND,
        alignItems: 'center',
    },
    title: {
        borderBottomColor: color.ACCENT,
        borderBottomWidth: 1,
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 25,
        color: color.PRIMARY
    },
    backContainer: {
        width: '90%',
        height: 50,
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
});