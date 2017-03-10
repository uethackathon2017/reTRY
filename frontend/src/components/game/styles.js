import { StyleSheet } from 'react-native';
import * as fromTheme from '../../theme';

const screenWidth = fromTheme.screenWidth;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fromTheme.ULTRAMARINE,
    },

    scoreBrand: {
        marginTop: fromTheme.STATUSBAR_HEIGHT,
        height: 50,
        width: screenWidth,
        flexDirection: 'row',
    },

    name: {
        color: 'white'
    },

    score: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },

    myScore: {
        marginLeft: 8
    },

    playerScore: {
        marginRight: 8
    },

    me: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
        flex: 0.4
    },

    player: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 8,
        flex: 0.4
    },

    avatar: {
        height: 32,
        width: 32,
        borderRadius: 16
    },

    myAvatar: {

    },

    countDownText: {
        color: 'white',
        fontSize: 17
    },

    gameNumberContainer: {
        width: fromTheme.screenWidth,
        height: 25,
        justifyContent: 'center'
    },

    gameNumber: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});