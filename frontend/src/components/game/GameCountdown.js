import React, {Component} from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import {Text} from 'react-native';
import styles from './styles';
import {getGameCountDown, getCurrentGame} from '../../reducers';
import {connect} from 'react-redux'
import * as fromTheme from '../../theme';

class GameCountdown extends Component {
    render() {

        const {countDown, duration} = this.props;

        return (
            <PercentageCircle
                radius={20}
                percent={Math.floor(countDown/duration) * 100}
                color={fromTheme.CRIMSON_SKY}
                bgcolor={fromTheme.ULTRAMARINE}
                innerColor={fromTheme.ULTRAMARINE}
                borderWidth={4}
            >
                <Text style={styles.countDownText}>{countDown}</Text>
            </PercentageCircle>
        )
    }
}

const mapStateToProps = (state) => ({
    countDown: getGameCountDown(state),
    duration: getCurrentGame(state).duration
});


export default connect(mapStateToProps)(GameCountdown);
