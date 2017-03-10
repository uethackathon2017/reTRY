import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { Icon } from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import theme, * as fromTheme from '../../theme';

class Topic extends Component {

    render() {
        return (

            <View style={styles.topicContainer}>
                <View style={styles.topicImage}>
                    <Image style={styles.userAvatar} source={{ uri: 'http://graph.facebook.com/100002307472131/picture?type=square' }} />
                </View>
                <View style={styles.topicMainContentContainer}>
                    <View style={styles.topicNameContainer}>
                        <Text style={styles.topicName}>Sky</Text>
                    </View>
                    <View style={styles.topicDescriptionContainer}>
                        
                    </View>
                </View>

                <View style={styles.topicDownloadContainer}>
                    <Icon active name='download' />
                </View>

            </View>

        )
    }
}

class TopicList extends Component {

    render() {
        return (
            <ScrollView styles={{flex:1}}>
            
                <Topic />
                <Topic />
                <Topic />
                <Topic />
            
            
            </ScrollView>
        )
    }
}


export default TopicList