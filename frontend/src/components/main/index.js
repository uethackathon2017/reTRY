import React, {Component} from 'react';
import {Image, View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {actions} from 'react-native-navigation-redux-helpers';
import {Container, Icon} from 'native-base';
import {navPushRoute} from '../../actions/rootNavigation';
import {clearProfile} from '../../actions/profile';
import TransparentStatusBar from '../common/TransparentStatusBar';
import styles from './styles';

const spacer = <View style={styles.spacer}></View>;
const background = require('../../../assets/images/background/item-2-bg.jpg');

class Main extends Component {  //eslint-disable-line

    static propTypes = {
        reset: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    };

    _pushTo(route) {
        this.props.navPushRoute(route);
    }

    render() {
        return (
            <Image source={background} style={StyleSheet.flatten(styles.container)}>
                <TransparentStatusBar/>
                <TouchableHighlight onPress={() => this._pushTo('leaders')} style={{flex: 1}}>
                    <View style={styles.leadersBox}>

                        {spacer}
                        <Icon name="ios-trophy-outline" style={StyleSheet.flatten(styles.leadersIcon)}/>
                        <Text style={styles.leadersTitle}>LEADERS </Text>
                        {spacer}

                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this._pushTo('find')} style={{ flex: 1 }}>
                    <View style={styles.playBox}>
                        {spacer}
                        <Icon name="ios-play-outline" style={StyleSheet.flatten(styles.playIcon)}/>
                        <Text style={styles.playTitle}>PLAY </Text>
                        {spacer}
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => {
                    this.props.clearProfile(); this._pushTo('me');
                }} style={{ flex: 1 }}>
                    <View style={StyleSheet.flatten(styles.meBox)}>
                        {spacer}
                        <Icon name="ios-person-outline" style={StyleSheet.flatten(styles.leadersIcon)}/>
                        <Text style={styles.meTitle}>ME </Text>
                        {spacer}
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this._pushTo('topics')} style={{ flex: 1 }}>
                    <View style={StyleSheet.flatten(styles.settingsBox)}>
                        {spacer}
                        <Icon name="ios-grid-outline" style={StyleSheet.flatten(styles.settingsIcon)}/>
                        <Text style={styles.settingsTitle}>TOPICS</Text>
                        {spacer}
                    </View>
                </TouchableHighlight>
            </Image>
        );
    }
}


const
    mapStateToProps = state => ({
        navigation: state.rootNavigation,
    });

export default connect(mapStateToProps, {
    navPushRoute, clearProfile
})(Main);
