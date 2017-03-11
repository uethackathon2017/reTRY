// Danh sách các từ hay sai
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { Thumbnail, Card, CardItem, Body, Left, Button, Icon } from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import theme, * as fromTheme from '../../theme';
import * as Progress from 'react-native-progress';

const welcome = require('../../../assets/images/logo.jpg');
const speakerWord = require('../../../assets/images/speaker_word.png');
const bird = require('../../../assets/images/membership/bird.png');
const speaker = require('../../../assets/images/membership/speaker.png');
const chart = require('../../../assets/images/membership/chart.png');

const screenWidth = fromTheme.screenWidth;

class Word extends Component {
    render() {
        return (

            <Card style={StyleSheet.flatten(styles.achievementCard)}>
                <CardItem >
                    <Left>
                        <Thumbnail source={this.props.image} />
                        <Body >
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 0.8 }}>
                                        <Text style={styles.achievementTitle}>{this.props.title}</Text>
                                        <Text style={styles.achievementpronunciation}>{this.props.pronunciation}</Text>
                                        <Text style={styles.achievementNote} note>{this.props.description}</Text>
                                    </View>
                                    <View style={{ flex: 0.2 }}>
                                        <Image style={styles.imageSpeaker} source={speakerWord} />
                                    </View>
                                </View>

                            </View>
                        </Body>
                    </Left>
                </CardItem>
            </Card>

        )
    }
}

class WordList extends Component {
    render() {
        return (
            <View style={styles.achievementList}>
                <Word title="Benefit" description="A clean environment is of great benefit to our health."
                    pronunciation="'peɪtənt"
                    image={bird} />
                <Word title="Booming" description="Mr.Obama had a booming career when he was electe as presient of the US."
                    pronunciation="'ˈbuːmɪŋ"
                    image={chart} />
                <Word title="Catastrophic" description="The radiantion contamination had catastrophic effects on the ecosystem."
                    pronunciation="katəˈstrɒfɪk"
                    image={speaker}
                />
                <Word title="Catastrophic" description="The radiantion contamination had catastrophic effects on the ecosystem."
                    pronunciation="katəˈstrɒfɪk"
                    image={speaker}
                />
                <Word title="Catastrophic" description="The radiantion contamination had catastrophic effects on the ecosystem."
                    pronunciation="katəˈstrɒfɪk"
                    image={speaker}
                />
                <Word title="Catastrophic" description="The radiantion contamination had catastrophic effects on the ecosystem."
                    pronunciation="katəˈstrɒfɪk"
                    image={speaker}
                />
                <Word title="Catastrophic" description="The radiantion contamination had catastrophic effects on the ecosystem."
                    pronunciation="katəˈstrɒfɪk"
                    image={speaker}
                />
                <Word title="Catastrophic" description="The radiantion contamination had catastrophic effects on the ecosystem."
                    pronunciation="katəˈstrɒfɪk"
                    image={speaker}
                />
                <Word title="Catastrophic" description="The radiantion contamination had catastrophic effects on the ecosystem."
                    pronunciation="katəˈstrɒfɪk"
                    image={speaker}
                />
                <Word title="Catastrophic" description="The radiantion contamination had catastrophic effects on the ecosystem."
                    pronunciation="katəˈstrɒfɪk"
                    image={speaker}
                />
                <Word title="Catastrophic" description="The radiantion contamination had catastrophic effects on the ecosystem."
                    pronunciation="katəˈstrɒfɪk"
                    image={speaker}
                />
                <Word title="Catastrophic" description="The radiantion contamination had catastrophic effects on the ecosystem."
                    pronunciation="katəˈstrɒfɪk"
                    image={speaker}
                />

            </View>
        )
    }
}

export default WordList;