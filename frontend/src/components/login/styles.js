import React from 'react-native';
const {StyleSheet} = React;
import theme, * as fromTheme from '../../theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: fromTheme.LIGHT_BLUE,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    welcome: {
        height: 150,
        width: 150
    },

    logo: {
        height: 150,
        width: 150
    },

    guide: {
        color: 'white',
        ...fromTheme.BG_TRANSPARENT,
    }
});
