import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Platform, ScrollView} from 'react-native';
import styles from './styles';
import {Container} from 'native-base';
import theme, * as fromTheme from '../../theme';
import * as Progress from 'react-native-progress';
import TopicList from './TopicList';
import {getProfile} from '../../reducers';
import {connect} from 'react-redux';
import {getProfile as getProfileApi} from '../../actions/profile';
import CacheableImage from 'react-native-cacheable-image';

const screenWidth = fromTheme.screenWidth;
const background = require('../../../assets/images/background/item-4-bg.jpg');

class Topic extends Component {

    render() {
     return (
            <Image style={StyleSheet.flatten(styles.container)} source={background}>
                <View style={styles.statusBarBackground}/>
                <ScrollView>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>T O P I C S</Text>
                    </View>
                    <TopicList/>
                </ScrollView>
            </Image>
        )
    }
}



export default Topic