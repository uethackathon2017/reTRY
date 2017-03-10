// Danh sách các từ hay sai
import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableHighlight, Image} from 'react-native';
import styles from './styles';
import {Thumbnail, Card, CardItem} from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import theme, * as fromTheme from '../../theme';

class WordCard extends Component {
    render() {
        return (
            <Card style={StyleSheet.flatten(styles.wordCard)}>
                <CardItem header>
                    <Text>Word</Text>
                </CardItem>
                {/*<View style={styles.header}>
                 <Text style={styles.word}>Fuck</Text>
                 <Text style={styles.pronounce}>/fʌk/</Text>
                 </View>
                 <View style={styles.body}>
                 <View style={styles.definition}>
                 <Text style={styles.wordType}>- noun -</Text>
                 <Text style={styles.meaning}>Giao cấu, bạn tình. Bla bla bla bla bla bla</Text>
                 </View>
                 </View>*/}
            </Card>
        )
    }
}

class WordList extends Component {
    render() {
        return (
            <View style={styles.wordList}>
                <View style={styles.wordListTitleContainer}>
                    <Text style={styles.wordListTitle}>TỪ ĐÃ HỌC</Text>
                </View>
                <WordCard/>
                <WordCard/>
                <WordCard/>
                <WordCard/>
                <WordCard/>
                <WordCard/>
                <WordCard/>
                <WordCard/>
            </View>
        )
    }
}

export default WordList;