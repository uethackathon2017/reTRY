import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Icon} from 'native-base';
import styles, * as fromStyles from './styles';

const AnswerCard = ({word}) => (
    <Card style={StyleSheet.flatten(styles.answerCard)}>
        <Text style={styles.answer}>
            {word}
        </Text>
    </Card>
);

class Listen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <Icon name="play" style={StyleSheet.flatten(styles.playIcon)}/>
                    <Text style={styles.instruction}>Click to here</Text>
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

export default Listen;