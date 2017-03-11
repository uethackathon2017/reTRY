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
    },

    topic: {
        flex: 1,
        width: screenWidth - 20,
        flexDirection: 'row',
        padding: 20,
        minHeight: 100,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
    },

    topicTouchable: {
        marginTop: 10,
        marginBottom: 10,
    },

    topicIconContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    topicIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'center',
    },

    topicBody: {
        flex: 0.8,
        flexDirection: 'column',
        paddingLeft: 10,
    },

    topicTitleContainer: {
        flex: 0.4,
        alignItems: 'flex-start',
    },

    topicDescriptionContainer: {
        flex: 0.6,
    },

    topicTitle: {
        ...fromTheme.BG_TRANSPARENT,
        color: 'black',
    },
});