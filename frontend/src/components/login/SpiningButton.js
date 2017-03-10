import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, Animated, Easing, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
const logo = require('../../../assets/images/logo.png');
import {loginWithFacebook} from '../../actions/login';
import {navReplaceAt} from '../../actions/rootNavigation';
import {getLoginStatus} from '../../reducers';
import * as types from '../../actions/types';

class SpinningButton extends Component {


    constructor() {
        super();
        this.state = {
            spinValue: new Animated.Value(0),
            scaleValue: new Animated.Value(1)
        };
    }

    _cycleAnimation() {
        Animated.timing(
            this.state.spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear
            }
        ).start((o) => {
            if (o.finished) {
                this.setState({
                    spinValue: new Animated.Value(0)
                });
                this._cycleAnimation()
            }
        })
    }

    componentWillUnmount() {
        this.state.spinValue.stopAnimation();
        this.state.scaleValue.stopAnimation();
    }

    _bounceAnimation() {
        Animated.spring(                          // Base: spring, decay, timing
            this.state.scaleValue,                 // Animate `bounceValue`
            {
                toValue: 1,                         // Animate to smaller size
                friction: 1,                          // Bouncier spring
            }
        ).start();
    }

    componentDidMount() {
        this._cycleAnimation();
    }

    render() {
        // Second interpolate beginning and end values (in this case 0 and 1)
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        const scale = this.state.scaleValue;


        return (
            <TouchableWithoutFeedback
                onPress={() => {
                        this._bounceAnimation();
                        this.props.loginWithFacebook();
                    }}
                onPressIn={() => {
                        this.state.scaleValue.setValue(1.2);
                    }}
                disabled={!this.props.active}
            >
                <Animated.Image source={logo}
                                style={{transform: [{rotate: spin},{ scale: scale}], width: 150, height: 150 }}/>
            </TouchableWithoutFeedback>
        )
    }
}

const getActive = (state) => getLoginStatus(state) == types.LOGIN_NONE;


const mapStateToProps = (state) => ({
    active: getActive(state)
});


export default connect(mapStateToProps, {
    loginWithFacebook,
    navReplaceAt,
})(SpinningButton);