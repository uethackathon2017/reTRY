import { StyleSheet } from 'react-native';
import * as fromTheme from '../../theme';

const screenWidth = fromTheme.screenWidth;
const screenHeight = fromTheme.screenHeight;


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fromTheme.LIGHT_BLUE
    },

    instructionContainer: {
        height: 120,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },

    instructionText: {
        color: 'white',
        marginTop: 32,
        marginLeft: 16,
        marginRight: 16,
        textAlign: 'center'
    },

    carousel: {
        width: screenWidth,
        height: screenHeight - 200
    },

    card: {
        width: screenWidth - 32,
        marginLeft: 16,
        marginRight: 16,
        maxHeight: screenHeight - 250,
        backgroundColor: 'white',
        borderRadius: 10
    },

    header: {
        flex: 0.5,
        backgroundColor: fromTheme.CRIMSON_SKY,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    smallHeader: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    userAvatarContainer: {
        flex: 0.3,
        alignSelf: 'stretch'
    },

    headerImage: {
        flex: 1,
        width: screenWidth - 64,
        alignSelf: 'center',
        resizeMode: 'contain'
    },

    imageOverlay: {
        backgroundColor: 'hsla(0, 0%, 0%, 0.5)',
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },

    word: {
        fontSize: 25,
        color: 'white',
    },

    darkWord: {
        fontSize: 25,
        color: fromTheme.DARK_TEXT,
    },

    pronounce: {
        color: 'white',
    },

    darkPronounce: {
        color: fromTheme.DARK_TEXT,
    },

    wordType: {
        fontStyle: 'italic',
        color: fromTheme.DARK_TEXT,
        fontSize: 12
    },

    meaning: {
        color: fromTheme.DARK_TEXT,
        textAlign: 'center',
        fontSize: 18
    },

    definition: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16
    },

    body: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    countDownContainer: {
        width: screenWidth,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },

    countDown: {
        color: 'white',
        fontWeight: 'bold'
    },


})