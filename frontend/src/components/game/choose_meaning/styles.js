import { StyleSheet } from 'react-native';
import * as fromTheme from '../../../theme';



export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fromTheme.ULTRAMARINE,
    },

    questionContainer: {
        width: fromTheme.screenWidth,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },

    word: {
        fontSize: 25,
        color: 'white',
    },

    pronounce: {
        color: 'white',
    },

    answersContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 16
    },

    answerCard: {
        width: fromTheme.screenWidth - 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    answer: {
        fontSize: 20,
        color: fromTheme.DARK_TEXT
    },

    instruction: {
        marginTop: 8,
        color: 'white',
        textAlign: 'center'
    },
});
