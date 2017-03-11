import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Container } from 'native-base';
import GameCountDown from './GameCountdown';

import * as fromTheme from '../../theme';
import styles from './styles';
import GameNavigation from './GameNavigation';

class Game extends Component {
    render() {
        return (
            <Container style={StyleSheet.flatten(styles.container)}>
                <View style={styles.scoreBrand}>
                    <View style={styles.me}>
                        <Image
                            style={[styles.avatar, styles.myAvatar]}
                            source={{ uri: "http://knowledge-commons.com/static/assets/images/avatar.png" }}
                        />
                        <Text style={[styles.score, styles.myScore]}>54</Text>
                    </View>

                    <View style={{
                        marginTop: fromTheme.STATUSBAR_HEIGHT - 15
                    }}>
                        <GameCountDown/>
                    </View>


                    <View style={styles.player}>
                        <Text style={[styles.score, styles.playerScore]}>54</Text>
                        <Image
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