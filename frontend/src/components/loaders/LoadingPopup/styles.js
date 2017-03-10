import React, {StyleSheet} from 'react-native';

import theme, * as fromTheme from '../../../theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    title: {
        fontWeight: 'bold',
        fontSize: 16
    }
});
