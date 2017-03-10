import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Card, Icon, Container, Button, Content } from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import styles, * as fromStyles from './styles';
import PercentageCircle from 'react-native-percentage-circle';
import * as fromTheme from '../../../theme';
class GameResult extends Component {
    constructor() {
        super();

    }
    render() {
        return (
            <Container style={StyleSheet.flatten(styles.container)} >
                <ScrollView>
                    <View style={styles.statusBarBackground} />
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>Y O U  W I N !</Text>
                    </View>
                    <View style={styles.playersContainer}>
                        <View style={styles.playerContainer}>
                            <View style={styles.avatarAndScoreContainer}>
                                <Text style={styles.scoreLeftValue}>91</Text>
                                <Image style={styles.userAvatarLeft} source={{ uri: 'http://graph.facebook.com/100002307472131/picture?type=square' }} />
                            </View>

                            <Text style={styles.playerNameLeft}>Trần Minh Tuấn</Text>
                            <Text style={styles.levelLeft}>Level 2</Text>
                        </View>
                        <View style={styles.playerContainer}>
                            <View style={styles.avatarAndScoreContainer}>
                                <Image style={styles.userAvatarRight} source={{ uri: 'http://graph.facebook.com/100002307472131/picture?type=square' }} />
                                <Text style={styles.scoreRightValue}>91</Text>
                            </View>
                            <Text style={styles.playerNameRight}>Trần Minh Tuấn</Text>
                            <Text style={styles.levelRight}>Level 1</Text>
                        </View>
                    </View>
                    <View style={styles.levelupContainer}>
                        <PercentageCircle
                            radius={50}
                            percent={50}
                            color={fromTheme.GREEN}
                            bgcolor={fromTheme.ULTRAMARINE}
                            innerColor={fromTheme.ULTRAMARINE}
                            borderWidth={10}
                        >
                            <Text style={styles.title}>Level 2</Text>
                        </PercentageCircle>
                    </View>
                    <View style={styles.listButtonContainer}>


                        <View style={styles.button}>
                            <Button iconLeft primary>
                                <Icon name='home' />
                                <Text style={styles.buttonText}>Home</Text>
                            </Button>
                        </View>
                        <View style={styles.button}>
                            <Button iconLeft success>
                                <Icon name='ios-chatboxes-outline' />
                                <Text style={styles.buttonText}>Chat</Text>
                            </Button>
                        </View>

                        <View style={styles.button}>
                            <Button iconLeft info>
                                <Icon name='share' />
                                <Text style={styles.buttonText}>Share</Text>
                            </Button>
                        </View>




                    </View>
                </ScrollView>
            </Container>
        )
    }
}

export default GameResult;