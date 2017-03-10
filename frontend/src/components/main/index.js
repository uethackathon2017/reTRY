import React, {Component} from 'react';
import {Image, View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {actions} from 'react-native-navigation-redux-helpers';
import {Container, Icon} from 'native-base';
import {navPushRoute} from '../../actions/rootNavigation';
import {clearProfile} from '../../actions/profile';

import styles from './styles';

const spacer = <View style={styles.spacer}></View>;

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

    _pushToMe() {
        this._pushTo('me');
        this.props.clearProfile();
    }

    render() {
        return (
            <Container>
                <View style={styles.statusBarBackground}></View>
                <TouchableHighlight onPress={() => this._pushTo('leaders')} style={{flex: 1}}>
                    <View style={styles.leadersBox}>

                        {spacer}
                        <Icon name="trophy" style={StyleSheet.flatten(styles.leadersIcon)}/>
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

                <TouchableHighlight onPress={() => this._pushToMe()} style={{ flex: 1 }}>
                    <View style={StyleSheet.flatten(styles.meBox)}>
                        {spacer}
                        <Icon name="ios-person-outline" style={StyleSheet.flatten(styles.leadersIcon)}/>
                        <Text style={styles.meTitle}>ME </Text>
                        {spacer}
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this._pushTo('play')} style={{ flex: 1 }}>
                    <View style={StyleSheet.flatten(styles.settingsBox)}>
                        {spacer}
                        <Icon name="ios-settings-outline" style={StyleSheet.flatten(styles.settingsIcon)}/>
                        <Text style={styles.settingsTitle}>SETTINGS</Text>
                        {spacer}
                    </View>
                </TouchableHighlight>
            </Container>
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
