import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Platform, ScrollView } from 'react-native';
import styles from './styles';
import { Container, Button, Icon } from 'native-base';
import theme, * as fromTheme from '../../theme';
import * as Progress from 'react-native-progress';
import WordList from './wordList';
import { getProfile } from '../../reducers';
import { connect } from 'react-redux';
import { getProfile as getProfileApi } from '../../actions/profile';
import CacheableImage from 'react-native-cacheable-image';
import TitleWithBackButton from '../common/TitleWithBackButton'
import TransparentStatusBar from '../common/TransparentStatusBar'

const screenWidth = fromTheme.screenWidth;
const background = require('../../../assets/images/background/item-4-bg.jpg');

class Vocabulary extends Component {

    render() {
        return (
            <Image style={StyleSheet.flatten(styles.container)} source={background}>
                <TransparentStatusBar />
                <TitleWithBackButton title="V O C B U L A R Y" />

                <ScrollView>
                    <WordList />
                </ScrollView>
            </Image >
        )
    }
}



export default Vocabulary