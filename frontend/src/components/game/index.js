import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Container } from 'native-base';
import GameCountDown from './GameCountdown';
import {connect} from 'react-redux';
import * as fromTheme from '../../theme';
import styles from './styles';
import GameNavigation from './GameNavigation';
import {getSelfScore, getOpponentScore} from '../../reducers';

class SelfScoreBar extends Component {
    render() {
        return (
            <View style={styles.me}>
                <Image
                    style={[styles.avatar, styles.myAvatar]}
                    source={{ uri: "http://knowledge-commons.com/static/assets/images/avatar.png" }}
                />
                <Text style={[styles.score, styles.myScore]}>{this.props.score}</Text>
            </View>
        )
    }
}

const selfMapStateToProps = (state) => ({
    score: getSelfScore(state)
});

const SelfScoreBarView = connect(selfMapStateToProps)(SelfScoreBar);

class OpponentScoreBar extends Component {
    render() {
        return (
            <View style={styles.player}>
                <Text style={[styles.score, styles.playerScore]}>{this.props.score}</Text>
                <Image
                    style={[styles.avatar, styles.playerAvatar]}
                    source={{ uri: "http://knowledge-commons.com/static/assets/images/avatar.png" }}
                />
            </View>
        )
    }
}

const opponentMapStateToProps = (state) => ({
    score: getOpponentScore(state)
});

const OpponentScoreBarView = connect(opponentMapStateToProps)(OpponentScoreBar);


class Game extends Component {
    render() {
        return (
            <Container style={StyleSheet.flatten(styles.container)}>
                <View style={styles.scoreBrand}>
                    <SelfScoreBarView/>

                    <View style={{
                        marginTop: fromTheme.STATUSBAR_HEIGHT - 15
                    }}>
                        <GameCountDown/>
                    </View>

                    <OpponentScoreBarView/>
                </View>

                <View style={styles.gameNumberContainer}>
                    <Text style={styles.gameNumber}>Game 1/10</Text>
                </View>

                <GameNavigation />

            </Container>
        )
    }
}

export default Game;