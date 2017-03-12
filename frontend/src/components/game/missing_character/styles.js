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

    answersContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-around'

    },

    answerCharacterContainer: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    answer: {
        fontSize: 20,
        color: 'white'
    },

    playIcon: {
        color: 'white',
        fontSize: 50
    },

    instruction: {
        marginTop: 8,
        color: 'white',
        textAlign: 'center'
    },
});
