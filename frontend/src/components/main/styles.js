import React, {StyleSheet} from 'react-native';
import theme, * as fromTheme from '../../theme';

export const boxHeight = (fromTheme.screenHeight - fromTheme.STATUSBAR_HEIGHT) / 4;

const screenWidth = fromTheme.screenWidth;

const box = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 0.5,
    width: screenWidth,
};

const icon = {
    flex: 0.5,
    fontSize: 100,
    alignSelf: 'center',
    textAlign: 'center',
};

const title = {
    fontWeight: '500',
    ...fromTheme.BG_TRANSPARENT,
    flex: 0.5,
    fontSize: fromTheme.H4_SIZE,
    alignSelf: 'center',
    textAlign: 'center',
};

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },

    spacer: {
        width: 0
    },

    leadersBox: {
        backgroundColor: '#00000050',
        ...box,
        height: boxHeight,
        width: screenWidth,
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
        backgroundColor: '#da7d79',
        ...box,
        height: boxHeight,
        width: screenWidth,
    },

    playIcon: {
        ...icon,
        color: 'white',
    },

    playTitle: {
        ...title,
        color: 'white',
    },


    meBox: {
        backgroundColor: '#00000050',
        ...box,
        height: boxHeight,
        width: screenWidth,
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
        backgroundColor: '#00000050',
        ...box,
        height: boxHeight,
        width: screenWidth,
    },

    settingsIcon: {
        ...icon,
        color: 'white',
    },

    settingsTitle: {
        ...title,
        color: 'white',
    }
});
