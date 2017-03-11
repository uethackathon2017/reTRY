import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './styles';

class TransparentStatusBar extends Component {
    render() {
        return (
            <View style={styles.statusBarBackground}/>
        )
    }
}

export default TransparentStatusBar