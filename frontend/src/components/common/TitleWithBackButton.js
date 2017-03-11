import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import BackButton from '../button/BackButton';

class TitleWithBackButton extends Component {
    render() {
        return (
            <View style={styles.titleRow}>
                <View style={styles.backButtonContainer}>
                    <BackButton/>
                </View>
                <Text style={styles.title}>{this.props.title}</Text>
                <View style={{flex: 0.2}}/>
            </View>
        )
    }
}

export default TitleWithBackButton;