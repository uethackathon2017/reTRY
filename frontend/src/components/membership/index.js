import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Platform, ScrollView } from 'react-native';
import styles from './styles';
import { Container, Button, Icon } from 'native-base';
import theme, * as fromTheme from '../../theme';
import * as Progress from 'react-native-progress';
import MemberShip from './MemberShip';
import { getProfile } from '../../reducers';
import { getProfile as getProfileApi } from '../../actions/profile';
import CacheableImage from 'react-native-cacheable-image';
import TitleWithBackButton from '../common/TitleWithBackButton';
import TransparentStatusBar from '../common/TransparentStatusBar';
import {navPopRoute} from '../../actions/rootNavigation';
import {connect} from 'react-redux';
import {upgradeMembership} from '../../actions/profile';

const screenWidth = fromTheme.screenWidth;
const background = require('../../../assets/images/background/item-4-bg.jpg');

class Friend extends Component {

    _popRoute() {
        this.props.upgradeMembership();
        this.props.navPopRoute();
    }

    render() {
        return (
            <Image style={StyleSheet.flatten(styles.container)} source={background}>
                <TransparentStatusBar/>
                <TitleWithBackButton title="M E M B E R S H I P S"/>
                <ScrollView>
                    <MemberShip />
                    <View style={{ alignSelf: 'center', marginTop: 20 }}>
                        <Button iconLeft light primary onPress={() => this._popRoute()}>
                            <Text style={{ color: 'white' }}>Get reTRY PRO</Text>
                        </Button>
                    </View>
                </ScrollView>
            </Image>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, {
    navPopRoute, upgradeMembership
})(Friend);