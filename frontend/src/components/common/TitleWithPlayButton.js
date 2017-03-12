import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import PlayButton from '../button/PlayButton';
import BackButton from '../button/BackButton';

class TitleWithLogout extends Component {
    render() {
        return (
            <View style={styles.titleRow}>
                <View style={styles.backButtonContainer}>
                    <BackButton/>
                </View>
                <Text style={styles.title}>{this.props.title}</Text>
                <View style={styles.backButtonContainer}>
                    <PlayButton/>
                </View>
            </View>
        )
    }
}

export default TitleWithLogout;