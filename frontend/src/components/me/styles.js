import React, {StyleSheet} from 'react-native';
import theme, * as fromTheme from '../../theme';

const screenWidth = fromTheme.screenWidth;
const screenHeight = fromTheme.screenHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: fromTheme.ULTRAMARINE,
    },

    titleRow: {
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },

    title: {
        ...fromTheme.BG_TRANSPARENT,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    statusBarBackground: {
        width: screenWidth,
        height: fromTheme.STATUSBAR_HEIGHT,
        backgroundColor: fromTheme.ULTRAMARINE,
    },

    userAvatar: {
        marginTop: 20,
        marginBottom: 20,
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        alignSelf: 'center',
    },

    userAvatarContainer: {},

    userName: {
        ...fromTheme.BG_TRANSPARENT,
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
    },

    userLevelContainer: {
        marginTop: 20,
        marginBottom: 20,
        width: screenWidth,
        paddingLeft: 10,
        paddingRight: 10,
    },

    userLevelProgressContainer: {
        flexDirection: 'row',
    },

    userLevelProgress: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    userScore: {
        ...fromTheme.BG_TRANSPARENT,
        color: 'white',
        alignSelf: 'center',
    },

    userLevel: {
        ...fromTheme.BG_TRANSPARENT,
        flex: 0.1,
        color: 'white',
        textAlign: 'center',
    },

    achievementList: {
        width: screenWidth,
    },

    achievementListTitle: {
        ...fromTheme.BG_TRANSPARENT,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },

    achievementListTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth,
        backgroundColor: fromTheme.BLACK_CHERRY,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10,
    },

    achievementCard: {
        width: screenWidth - 32,
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: 'white',
    },

    achievementTitle: {
        ...fromTheme.BG_TRANSPARENT,
        color: fromTheme.BLACK_CHERRY,
        fontWeight: 'bold',
    },
});