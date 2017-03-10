import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import LoadingPopup from './components/loaders/LoadingPopup';
import {Container, Content, Text, View, StyleProvider} from 'native-base';
import Modal from 'react-native-modalbox';

import AppNavigator from './AppNavigator';
import ProgressBar from './components/loaders/ProgressBar';

import getTheme from '../native-base-theme/components';
import theme from './theme';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal1: {
        height: 300,
    },
});

class App extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {

    }

    render() {

        return (
            <StyleProvider style={getTheme(theme)}>
                <View style={{flex: 1}}>
                    <AppNavigator />
                    <LoadingPopup />
                </View>
            </StyleProvider>
        );
    }
}

export default App;
