import React, {Component} from 'react';
import {getNewWordsCountDown} from '../../reducers';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import styles from './styles';

class CountDownText extends Component {
    render() {
        const {countDown}  = this.props;
        return (
            <Text style={styles.countDown}>Game starts in {countDown}s</Text>
        )
    }
}

const mapStateToProps = (state) => ({
    countDown: getNewWordsCountDown(state)
});

export default connect(mapStateToProps) (CountDownText);