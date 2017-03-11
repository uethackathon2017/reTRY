import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Platform, ScrollView } from 'react-native';
import styles from './styles';
import { Container } from 'native-base';
import theme, * as fromTheme from '../../theme';
import * as Progress from 'react-native-progress';
import TopicList from './TopicList';
import { getProfile } from '../../reducers';
import { connect } from 'react-redux';
import { getProfile as getProfileApi } from '../../actions/profile';
import CacheableImage from 'react-native-cacheable-image';
import TitleWithBackButton from '../common/TitleWithBackButton'
import TransparentStatusBar from '../common/TransparentStatusBar'
const screenWidth = fromTheme.screenWidth;
const background = require('../../../assets/images/background/item-4-bg.jpg');

class Topics extends Component {

    render() {
        return (
            <Image style={StyleSheet.flatten(styles.container)} source={background}>
                <TransparentStatusBar />
                <TitleWithBackButton title="T O P I C S" />
                <TopicList />
            </Image>
        )
    }
}



export default Topics