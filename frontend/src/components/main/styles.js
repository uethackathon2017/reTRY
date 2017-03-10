import React, {StyleSheet} from 'react-native';
import theme, * as fromTheme from '../../theme';

export const boxHeight = (fromTheme.screenHeight - fromTheme.STATUSBAR_HEIGHT) / 4;

const box = {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
};

const icon = {
    fontSize: 100
};

const title = {};

module.exports = StyleSheet.create({
    container: {
        flex: 1
    },

    statusBarBackground: {
        height: fromTheme.STATUSBAR_HEIGHT,
        backgroundColor: fromTheme.INDIGO,
    },

    spacer: {
        width: 0
    },

    leadersBox: {
        backgroundColor: fromTheme.INDIGO,
        ...box,
        height: boxHeight
    },

    leadersIcon: {
        ...icon,
        color: 'white'
    },


    leadersTitle: {
        ...title,
        color: 'white'
    },

    playBox: {
        backgroundColor: fromTheme.CRIMSON_SKY,
        ...box,
        height: boxHeight
    },

    playIcon: {
        ...icon
    },

    playTitle: {
        ...title
    },


    meBox: {
        backgroundColor: fromTheme.ULTRAMARINE,
        ...box,
        height: boxHeight
    },

    meIcon: {
        ...icon,
        color: 'white'
    },

    meTitle: {
        ...title,
        color: 'white'
    },


    settingsBox: {
        backgroundColor: fromTheme.LIGHT_BLUE,
        ...box,
        height: boxHeight
    },

    settingsIcon: {
        ...icon
    },

    settingsTitle: {
        ...title
    }
});
