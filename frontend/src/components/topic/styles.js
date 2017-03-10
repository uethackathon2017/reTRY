import React, { StyleSheet } from 'react-native';
import theme, * as fromTheme from '../../theme';

const screenWidth = fromTheme.screenWidth;
const screenHeight = fromTheme.screenHeight;

const userPositionContainer = {
    flex: 0.1,
    alignSelf: 'center',
    padding: 5,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
};
const userAvatar = {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    alignSelf: 'center',
    borderColor: fromTheme.GRAPE
}

export default StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    titleRow: {
        
        width: screenWidth,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: fromTheme.INDIGO,
    },

    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    statusBarBackground: {
        width: screenWidth,
        height: fromTheme.STATUSBAR_HEIGHT,
        backgroundColor: fromTheme.INDIGO
    },

    topicContainer: {
        flexDirection: 'row',
        marginTop:10
    },
    topicImage: {
        flex: 0.3,
    },
    userAvatar:{
        ...userAvatar,
        
    },
    topicMainContentContainer: {
        flex: 0.6,
        flexDirection: 'column'
    },
    topicNameContainer: {
        
    },
    topicName:{
        color:fromTheme.CRIMSON_SKY,
        fontSize:fromTheme.H2_SIZE,
        alignSelf:'center'
    },
    topicDescriptionContainer: {
        
    },
    topicDownloadContainer: {
        flex: 0.1,
        
    }
});