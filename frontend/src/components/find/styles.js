/**
 * Created by tranvietthang on 3/2/17.
 */

import React, {StyleSheet} from 'react-native';

import theme, * as fromTheme from '../../theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: fromTheme.CRIMSON_SKY,
    },

    finding: {
        color: fromTheme.DARK_TEXT,
        marginTop: 20,
        ...fromTheme.BG_TRANSPARENT,
    },

    cancelBtn: {
        marginBottom: 32
    },

    dialogContainer: {
        flex: 1
    },

    boxingImage: {
        width: 100,
        height: 100
    },

    dialogTopContainer: {
        flex: 0.4,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: fromTheme.LIGHT_BLUE
    },

    dialogBottomContainer: {
        flex: 0.6,
        alignItems: 'center',
    },

    dialogTitle: {
        fontSize: 17,
        paddingTop: 10
    },

    avatarContainer: {
        flex: 0.45
    },

    avatar: {
        alignSelf: 'center',
        height: 100,
        width: 100,
        borderRadius: 50,
    },

    nameAndDescription: {
        flex: 0.55,
        alignSelf: 'stretch',
        marginRight: 16
    },

    infoSection: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch'
    },

    ready: {
        flex: 0.2
    },

    name: {
        fontWeight: 'bold',
        marginTop: 32
    },

    description: {
        flexWrap: 'wrap',
        marginTop: 16
    }
});
