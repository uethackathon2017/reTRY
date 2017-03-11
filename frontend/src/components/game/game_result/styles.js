import {StyleSheet} from 'react-native';
import * as fromTheme from '../../../theme';

const screenWidth = fromTheme.screenWidth;
const screenHeight = fromTheme.screenHeight;

const userAvatar = {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    alignSelf: 'center',
};

const button = {
    flex: 0.3
};

const scoreValue = {
    fontSize: fromTheme.H3_SIZE,
    alignSelf: 'center',
};

const playerName = {
    fontSize: fromTheme.H3_SIZE,
    marginTop: 10
};

const level = {
    fontSize: fromTheme.H5_SIZE,
    marginTop: 5,
    color: 'white',

};

export default StyleSheet.create({
    header: {},

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: fromTheme.ULTRAMARINE,
    },

    awardImage: {
        marginTop: 10,
        alignSelf: 'center'
    },
    playersContainer: {
        // flex: 1,
        flexDirection: 'row'
    },

    playerContainer: {
        flex: 0.5,
        marginTop: 20,
        flexDirection: 'column',
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
    }
});
