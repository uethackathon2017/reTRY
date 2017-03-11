import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Container } from 'native-base';
import GameCountDown from './GameCountdown';
import {connect} from 'react-redux';
import * as fromTheme from '../../theme';
import styles from './styles';
import GameNavigation from './GameNavigation';
import {getSelfScore, getOpponentScore, getSelfData, getOpponentData, getCurrentGameIndexOverTotal} from '../../reducers';

class SelfScoreBar extends Component {
    render() {

        const {selfData} = this.props;

        if (selfData.pictureURL) {
            return (
                <View style={styles.me}>
                    <Image
                        style={[styles.avatar, styles.myAvatar]}
                        source={{ uri: selfData.pictureURL }}
                    />
                    <Text style={[styles.score, styles.myScore]}>{this.props.score}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.me}>
                    <Image
                        style={[styles.avatar, styles.myAvatar]}
                    />
                    <Text style={[styles.score, styles.myScore]}>{this.props.score}</Text>
                </View>
            )
        }
    }
}

const selfMapStateToProps = (state) => ({
    score: getSelfScore(state),
    selfData: getSelfData(state)
});

const SelfScoreBarView = connect(selfMapStateToProps)(SelfScoreBar);

class OpponentScoreBar extends Component {
    render() {

        const {opponentData} = this.props;

        if (opponentData.pictureURL) {

            return (
                <View style={styles.player}>
                    <Text style={[styles.score, styles.playerScore]}>{this.props.score}</Text>
                    <Image
                        style={[styles.avatar, styles.playerAvatar]}
                        source={{ uri: opponentData.pictureURL }}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.player}>
                    <Text style={[styles.score, styles.playerScore]}>{this.props.score}</Text>
                    <Image
                        style={[styles.avatar, styles.playerAvatar]}
                    />
                </View>
            )
        }
    }
}

const opponentMapStateToProps = (state) => ({
    score: getOpponentScore(state),
    opponentData: getOpponentData(state)
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
                    <Text style={styles.gameNumber}>Game {this.props.gameIndexOverTotal}</Text>
                </View>

                <GameNavigation />

            </Container>
        )
    }
}

const gameMapStateToProps = (state) => ({
    gameIndexOverTotal: getCurrentGameIndexOverTotal(state)
});

export default connect(gameMapStateToProps)(Game);