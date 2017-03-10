import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Image } from 'react-native';
import styles from './styles';
import { Container, ListItem } from 'native-base';
import theme, * as fromTheme from '../../theme';
import TopicList from './TopicList';

const background = require('../../../assets/images/background/item-8-bg.jpg');

class Topics extends Component {
    render() {
        return (
            <View style={StyleSheet.flatten(styles.container)} >
                <View style={styles.statusBarBackground} />
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Topics</Text>
                </View>
                <TopicList />
            </View>
        )
    }
}

export default Topics;