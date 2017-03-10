import React, { Component } from 'react';
import { Text } from 'react-native';
import { getFindingCountDown } from '../../reducers';
import styles from './styles';
import { connect } from 'react-redux'
import {getCountDown} from '../../reducers';

class CountDownText extends Component {

    render() {
        const {countDown}  = this.props;

        return (
            <Text style={styles.ready}>Game is ready in {countDown}s</Text>
        )
    }
}

const mapStateToProps = (state) => ({
    countDown: getCountDown(state)
});

export default connect(mapStateToProps)(CountDownText);
