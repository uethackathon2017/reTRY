import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';
import theme, * as fromTheme from '../../theme';

class MinimalButton extends Component {

    render() {
        return (
            <TouchableHighlight
                style={styles.container}
                onPress={this.props.onPress}
                underlayColor="hsla(0, 0%, 0%, 0.2)"
            >
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }

}

export default MinimalButton;


const styles = StyleSheet.create({
    container: {
        borderColor: fromTheme.DARK_TEXT,
        borderWidth: 1
    },
    text: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 32,
        paddingLeft: 32,
        color: fromTheme.DARK_TEXT,
        fontSize: 16
    }
});