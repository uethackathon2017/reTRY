import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Platform, ScrollView } from 'react-native';
import styles from './styles';
import { Container, Button, Icon } from 'native-base';
import theme, * as fromTheme from '../../theme';
import * as Progress from 'react-native-progress';
import MemberShip from './MemberShip';
import { getProfile } from '../../reducers';
import { connect } from 'react-redux';
import { getProfile as getProfileApi } from '../../actions/profile';
import CacheableImage from 'react-native-cacheable-image';

const screenWidth = fromTheme.screenWidth;
const background = require('../../../assets/images/background/item-4-bg.jpg');

class Friend extends Component {

    render() {
        return (
            <Image style={StyleSheet.flatten(styles.container)} source={background}>
                <View style={styles.statusBarBackground} />

                <View style={styles.titleRow}>
                    <Text style={styles.title}>M E M B E R S H I P S</Text>
                </View>
                <ScrollView>
                    <MemberShip />
                    <View style={{ alignSelf: 'center', marginTop: 20 }}>
                        <Button iconLeft light primary>
                            <Icon name='home' style={{ color: 'white' }} />
                            <Text style={{ color: 'white' }}>Get reTRY PRO</Text>
                        </Button>
                    </View>
                </ScrollView>
            </Image>
        )
    }
}



export default Friend