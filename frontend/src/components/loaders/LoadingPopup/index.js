import React, {Component} from 'react';
import {Text, View, Dimensions, Platform, ActivityIndicator} from 'react-native';
import PopupDialog, {ScaleAnimation} from 'react-native-popup-dialog';

import {connect} from 'react-redux';
import {getIsLoadingPopupShowing} from '../../../reducers';
import theme, * as fromTheme from '../../../theme';
import styles from './styles';
const platform = Platform.OS;

import *as Progress from 'react-native-progress';
const scaleAnimation = new ScaleAnimation();

const getSpinner = () => {
    if (platform === 'ios') {
        return (<Progress.Circle size={80} indeterminate={true} color={fromTheme.LAVENDER}/>);
    } else {
        return ( <ActivityIndicator
                animating={true}
                color={fromTheme.LAVENDER}
                size="large"/>
        );
    }
};

class LoadingPopup extends Component {


    render() {

        return (
            <PopupDialog
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                width={Dimensions.get('window').width - 100}
                height={200}
                style={{flex: 1}}
                dialogAnimation={scaleAnimation}
                dismissOnTouchOutside={false}
                show={this.props.show}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Loading...</Text>

                    {getSpinner()}

                    <Text>Please wait.</Text>
                </View>
            </PopupDialog>
        )

    }
}

const mapStateToProps = (state) => ({
    show: getIsLoadingPopupShowing(state)
});

export default connect(mapStateToProps)(LoadingPopup);