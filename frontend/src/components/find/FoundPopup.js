import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Dimensions, ActivityIndicator, Image} from 'react-native';
import {connect} from 'react-redux';
const boxingImage = require('../../../assets/images/boxing.png');
import PopupDialog, {ScaleAnimation} from 'react-native-popup-dialog';
import styles from './styles';
import {getFindStatus, getOpponentData} from '../../reducers';
import CountDownText from './CountDownText';

class FoundPopup extends Component {
    render() {
        const {opponent, shouldShowDialog} = this.props;

        const imageElement =  () => {
            if (opponent && opponent.pictureURL) {
                return (<Image
                    style={styles.avatar}
                    source={{uri: opponent.pictureURL}}
                />)
            } else {
                return (<Image
                    style={styles.avatar}
                />)
            }
        };

        return (
            <PopupDialog
                show={shouldShowDialog}
                width={Dimensions.get('window').width - 50}
                dismissOnTouchOutside={false}
                closeOnTouchOutside={false}
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                haveOverlay={true}
                onDismissed={
                () => {

                }
            }

            >
                <View style={styles.dialogContainer}>
                    <View style={styles.dialogTopContainer}>
                        <Image source={boxingImage}
                               style={styles.boxingImage}
                        />
                    </View>
                    <View style={styles.dialogBottomContainer}>
                        <View style={styles.infoSection}>
                            <View style={styles.avatarContainer}>
                                {imageElement()}
                            </View>
                            <View style={styles.nameAndDescription}>
                                <Text style={styles.name}
                                      numberOfLines={1}
                                      ellipsizeMode='tail'
                                >{opponent.firstName} {opponent.lastName}</Text>
                                <Text style={styles.description}
                                      ellipsizeMode='tail'
                                      numberOfLines={3}
                                >
                                    {opponent.description}
                                </Text>
                            </View>
                        </View>
                        <CountDownText/>
                    </View>
                </View>
            </PopupDialog>
        )
    }
}


const checkShouldShowDialog = (state) => getFindStatus(state) === 'complete';

const mapStateToProps = (state) => ({
    shouldShowDialog: checkShouldShowDialog(state),
    opponent:getOpponentData(state)
});

export default connect(mapStateToProps)(FoundPopup);