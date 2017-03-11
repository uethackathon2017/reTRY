import React, {Component} from 'react';
import {StyleSheet, View, Text, StatusBar, Image} from 'react-native';
import styles from './styles';
import {Container, ListItem} from 'native-base';
import theme, * as fromTheme from '../../theme';
import UserList from './UserList';

const background = fromTheme.LEADERS_BG_IMG;

class Leaders extends Component {
    render() {
        return (
            <Image style={StyleSheet.flatten(styles.container)} source={background}>
                <View style={styles.statusBarBackground}/>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>L E A D E R B O A R D S</Text>
                </View>
                <UserList/>
            </Image>
        )
    }
}

export default Leaders;