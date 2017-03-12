import {StyleSheet} from 'react-native';
import * as fromTheme from '../../../theme';

const userAvatar = {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    alignSelf: 'center',
};

const button = {
    flex: 0.3
};

const scoreValue = {
    fontSize: fromTheme.H3_SIZE,
    alignSelf: 'center',
    ...fromTheme.BG_TRANSPARENT,
};

const playerName = {
    fontSize: fromTheme.H3_SIZE,
    marginTop: 10,
    ...fromTheme.BG_TRANSPARENT,
};

const level = {
    fontSize: fromTheme.H5_SIZE,
    marginTop: 5,
    color: 'white',
    ...fromTheme.BG_TRANSPARENT,
};

export default StyleSheet.create({
    header: {},

    container: {
        width: null,
        height: null,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: fromTheme.ULTRAMARINE,
    },

    awardImage: {
        marginTop: 10,
        alignSelf: 'center',
    },
    playersContainer: {
        // flex: 1,
        flexDirection: 'row'
    },

    playerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    playContainerTouchable: {
        flex: 0.5,
        marginTop: 20,
        justifyContent: 'center',
    },

    userAvatarLeft: {
        ...userAvatar,
        borderColor: fromTheme.YELLOW,
    },
    userAvatarRight: {
        ...userAvatar,
        borderColor: fromTheme.CRIMSON_SKY
    },

    scoreLeftValue: {
        ...scoreValue,
        color: fromTheme.YELLOW,
        marginRight: 10
    },
    scoreRightValue: {
        ...scoreValue,
        color: fromTheme.CRIMSON_SKY,
        marginLeft: 10
    },

    playerNameLeft: {
        ...playerName,
        alignSelf: 'flex-end',
        marginRight: 5,
        color: fromTheme.YELLOW
    },
    playerNameRight: {
        ...playerName,
        alignSelf: 'flex-start',
        marginLeft: 5,
        color: fromTheme.CRIMSON_SKY
    },
    avatarAndScoreContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    levelLeft: {
        ...level,
        alignSelf: 'flex-end',
        marginRight: 5
    },

    levelRight: {
        ...level,
        alignSelf: 'flex-start',
        marginLeft: 5
    },

    levelupContainer: {
        alignSelf: 'center',
        marginTop: 20,
        flex: 0.5
    },

    button: {
        ...button,
        marginLeft: 20,
        alignSelf: 'center'
    },
    buttonPlay: {
        ...button,
        // backgroundColor: fromTheme.YELLOW
    },
    buttonText: {
        color: 'white'
    },
    levelAndAwardContainer: {
        flexDirection: 'row',
    },
    awardContainer: {
        flex: 0.5
    },

    title: {
        ...fromTheme.BG_TRANSPARENT,
        color: 'white',
    }
});
