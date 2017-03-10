import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Container } from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import PercentageCircle from 'react-native-percentage-circle';

import * as fromTheme from '../../theme';
import styles from './styles';
import GameNavigation from './GameNavigation';

class Game extends Component {
    render() {
        return (
            <Container style={StyleSheet.flatten(styles.container)}>
                <View style={styles.scoreBrand}>
                    <View style={styles.me}>
                        <CacheableImage
                            style={[styles.avatar, styles.myAvatar]}
                            source={{ uri: "http://knowledge-commons.com/static/assets/images/avatar.png" }}
                        />
                        <Text style={[styles.score, styles.myScore]}>54</Text>
                    </View>

                    <View style={{
                        marginTop: fromTheme.STATUSBAR_HEIGHT - 15
                    }}>
                        <PercentageCircle
                            radius={20}
                            percent={50}
                            color={fromTheme.CRIMSON_SKY}
                            bgcolor={fromTheme.ULTRAMARINE}
                            innerColor={fromTheme.ULTRAMARINE}
                            borderWidth={4}
                        >
                            <Text style={styles.countDownText}>5</Text>
                        </PercentageCircle>
                    </View>


                    <View style={styles.player}>
                        <Text style={[styles.score, styles.playerScore]}>54</Text>
                        <CacheableImage
                            style={[styles.avatar, styles.playerAvatar]}
                            source={{ uri: "http://knowledge-commons.com/static/assets/images/avatar.png" }}
                        />
                    </View>
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