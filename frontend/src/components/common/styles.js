import React, { StyleSheet } from 'react-native';
import theme, * as fromTheme from '../../theme';

const screenWidth = fromTheme.screenWidth;
const screenHeight = fromTheme.screenHeight;

export default StyleSheet.create({
    titleRow: {
        flexDirection: 'row',
        width: screenWidth,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderBottomWidth: 0,
    },

    title: {
        flex: 0.6,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        ...fromTheme.BG_TRANSPARENT,
    },

    backButtonContainer: {
        flex: 0.2,
        alignItems: 'center',
    },

    statusBarBackground: {
        width: screenWidth,
        height: fromTheme.STATUSBAR_HEIGHT,
        backgroundColor: 'transparent',
    },
});