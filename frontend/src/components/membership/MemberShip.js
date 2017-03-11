// Danh sách các từ hay sai
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { Thumbnail, Card, CardItem, Body, Left, Button, Icon } from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import theme, * as fromTheme from '../../theme';

const welcome = require('../../../assets/images/logo.jpg');
const bird = require('../../../assets/images/membership/bird.png');
const speaker = require('../../../assets/images/membership/speaker.png');
const chart = require('../../../assets/images/membership/chart.png');

class FeatureCard extends Component {
    render() {
        return (
            <Card style={StyleSheet.flatten(styles.achievementCard)}>
                <CardItem>
                    <Left>
                        <Thumbnail source={this.props.image} />
                        <Body style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View >
                                <Text style={styles.achievementTitle}>{this.props.title}</Text>
                                <Text style={styles.achievementNote} note>{this.props.description}</Text>
                            </View>
                        </Body>
                    </Left>
                </CardItem>
            </Card>
        )
    }
}

class MemberShip extends Component {
    render() {
        return (
            <View style={styles.achievementList}>
                <FeatureCard title="Offline Mode" description="Study whenever and where you are! No active internet connection is required for our valuable pro members."
                    image={bird} />
                <FeatureCard title="Reading Stats" description="All your reading history and progress will be on your finger tips! Do not just read bindly, follow your progress."
                    image={chart} />
                <FeatureCard title="Audio Playing" description="Hear the world around you! Learn from native pronunciation is recorded for you!"
                    image={speaker}
                />

            </View>
        )
    }
}

export default MemberShip;