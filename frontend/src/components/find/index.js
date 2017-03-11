/**
 * Created by tranvietthang on 3/2/17.
 */


import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Platform, Image} from 'react-native';
import {connect} from 'react-redux';
import MinimalButton from '../button/minimalButton';
import styles from './styles';
import *as Progress from 'react-native-progress';
import theme, * as fromTheme from '../../theme';
import {navPopRoute} from '../../actions/rootNavigation';
import {Container} from 'native-base';
import FoundPopup from './FoundPopup';
import {startFinding, cancelFinding} from '../../actions/games';

const platform = Platform.OS;
const background = fromTheme.FIND_BG_IMG;

const getSpinner = () => {
    if (platform === 'ios') {
        return (<Progress.Circle size={80} indeterminate={true} color={fromTheme.DARK_TEXT}/>);
    } else {
        return (<ActivityIndicator
                animating={true}
                color={fromTheme.DARK_TEXT}
                size="large"/>
        );
    }
};

class FindScreen extends Component {

    componentDidMount() {
        this.props.startFinding();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image style={StyleSheet.flatten(styles.container)} source={background}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {getSpinner()}
                        <Text style={styles.finding}>Finding player...</Text>
                    </View>
                    <View style={styles.cancelBtn}>
                        <MinimalButton text="Cancel"
                                       onPress={() => {
                                this.props.cancelFinding();
                                this.props.navPopRoute();
                            }}
                        />
                    </View>
                </Image>
                <FoundPopup />
            </View>
        )
    }
}

export default connect(null, {
    navPopRoute,
    startFinding,
    cancelFinding
})(FindScreen);
