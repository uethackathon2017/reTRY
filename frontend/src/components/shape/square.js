import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import theme, * as fromTheme from '../../../native-base-theme/variables/platform';

class Square extends Component {
    constructor() {
        super();

    }
    render() {
        return (
            <View style={styles.square} />
        )
    }
};

const styles = StyleSheet.create({
    square: {
        width: 200,
        height: 200,
        backgroundColor: "red"
    }
});

export default Square;