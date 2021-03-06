import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, Animated, Easing, TouchableWithoutFeedback, Alert} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import theme, * as fromTheme from '../../theme';
import styles from './styles';
import {loginWithFacebook, cancelLoginWithFacebook} from '../../actions/login';
import {navReplaceAt} from '../../actions/rootNavigation';
import {getLoginStatus, getLoginErrorMessage} from '../../reducers';
import SpinningButton from './SpiningButton';
import * as actionTypes from '../../actions/types';

const welcome = fromTheme.WELCOME_IMG;
const background = fromTheme.LOGIN_BG_IMG;

class LoginPage extends Component {

    render() { // eslint-disable-line class-methods-use-this

        let shouldAnimate = true;
        const {status} = this.props;
        if (status == actionTypes.APILOGIN_FAIlURE || status == actionTypes.FBLOGIN_FAIlURE) {
            Alert.alert('Error', this.props.message, [
                {
                    text: 'OK',
                    onPress: () => this.props.cancelLoginWithFacebook()
                }
            ]);
        }

        if (status == actionTypes.APILOGIN_SUCCESS) {
            this.props.navReplaceAt('main');
            shouldAnimate = false
        }

        return (
            <Image style={StyleSheet.flatten(styles.container)} source={background}>
                <Image source={welcome} style={styles.welcome}/>
                <SpinningButton />
                <Text style={styles.guide}>Click the logo to login with FACEBOOK</Text>
            </Image>
        );
    }
}


const mapStateToProps = (state) => ({
    status: getLoginStatus(state),
    message: getLoginErrorMessage(state)
});


export default connect(mapStateToProps, {
    loginWithFacebook,
    navReplaceAt,
    cancelLoginWithFacebook
})(LoginPage);