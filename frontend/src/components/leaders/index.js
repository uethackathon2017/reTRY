import React, {Component} from 'react';
import {StyleSheet, View, Text, StatusBar, Image} from 'react-native';
import styles from './styles';
import {Container, ListItem} from 'native-base';
import theme, * as fromTheme from '../../theme';
import UserList from './UserList';
import TransparentStatusBar from '../common/TransparentStatusBar';
import TitleWithBackButton from '../common/TitleWithBackButton';

const background = fromTheme.LEADERS_BG_IMG;

class Leaders extends Component {
    render() {

        return (
            <Image style={StyleSheet.flatten(styles.container)} source={background}>
                <TransparentStatusBar/>
                <TitleWithBackButton title="L E A D E R B O A R D S"/>
                <UserList/>
            </Image>
        )
    }
}

export default Leaders;