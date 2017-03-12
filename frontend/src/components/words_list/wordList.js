// Danh sách các từ hay sai
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { Thumbnail, Card, CardItem, Body, Left, Button, Icon } from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import theme, * as fromTheme from '../../theme';
import * as Progress from 'react-native-progress';
import {getWordsByTopic, getTopic} from '../../reducers';
import {connect} from 'react-redux';

const welcome = require('../../../assets/images/logo.jpg');
const speakerWord = require('../../../assets/images/speaker_word.png');
const bird = require('../../../assets/images/membership/bird.png');
const speaker = require('../../../assets/images/membership/speaker.png');
const chart = require('../../../assets/images/membership/chart.png');

const screenWidth = fromTheme.screenWidth;

class Word extends Component {
    _getThumbnail() {
        const {
            word
        } = this.props;

        if (word.image) {
            return (<Thumbnail source={{uri: word.image}} />)
        } else {
            return (<Thumbnail/>)
        }
    }

    _getPronunciation() {
        const {
            word
        } = this.props;

        if (word.pronunciation.length > 0) {
            return word.pronunciation[0]
        } else {
            return ""
        }
    };

    _getDescription() {
        const {
            word
        } = this.props;

        if (word.example.length > 0) {
            return word.example[0]
        } else {
            return ""
        }
    }

    render() {
        const {
            word
        } = this.props;

        return (
            <Card style={StyleSheet.flatten(styles.achievementCard)}>
                <CardItem >
                    <Left>
                        {this._getThumbnail()}
                        <Body >
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 0.8 }}>
                                        <Text style={styles.achievementTitle}>{word.name}</Text>
                                        <Text style={styles.achievementpronunciation}>{this._getPronunciation()}</Text>
                                        <Text style={styles.achievementNote} note>{this._getDescription()}</Text>
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
    _getWordList() {
        const {
            words
        } = this.props;

        return words.map(word => (<Word word={word}/>))
    }

    render() {
        return (
            <View style={styles.achievementList}>
                {this._getWordList()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        words: getWordsByTopic(state),
        topic: getTopic(state),
    }
};

export default connect(mapStateToProps, {

})(WordList);