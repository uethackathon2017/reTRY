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
        backgroundColor: '#30415D80',
    },

    spacer: {
        width: 0
    },

    leadersBox: {
        backgroundColor: '#30415D80',
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
        backgroundColor: '#CF676680',
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
        backgroundColor: '#03142480',
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
        backgroundColor: '#8EAEBD80',
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
