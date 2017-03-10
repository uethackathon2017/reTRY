import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'native-base';
import styles, * as fromStyles from './styles';

const AnswerCard = ({word}) => (
    <Card style={StyleSheet.flatten(styles.answerCard)}>
        <Text style={styles.answer}>
            {word}
        </Text>
    </Card>
);

class ChooseMeaning extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <Text style={styles.word}>Fuck</Text>
                    <Text style={styles.pronounce}>/fʌk/</Text>
                    <Text style={styles.instruction}>Find meanings in Vietnamese</Text>
                </View>
                <View style={styles.answersContainer}>
                    <AnswerCard word="A"/>
                    <AnswerCard word="A"/>
                    <AnswerCard word="A"/>
                    <AnswerCard word="A"/>
                </View>
            </View>
        )
    }
}

export default ChooseMeaning;