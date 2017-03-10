import React, {Component} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import styles from './styles';
import {Container, ListItem} from 'native-base';
import theme, * as fromTheme from '../../theme';
import UserList from './UserList';

class Leaders extends Component {
    render() {
        return (
            <Container style={StyleSheet.flatten(styles.container)}>
                <View style={styles.statusBarBackground}/>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>L E A D E R B O A R D S</Text>
                </View>
                <UserList/>
            </Container>
        )
    }
}

export default Leaders;