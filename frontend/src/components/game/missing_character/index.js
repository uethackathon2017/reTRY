import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Icon} from 'native-base';
import styles, * as fromStyles from './styles';

const AnsweCharacter = ({character}) => (
    <View style={styles.answerCharacterContainer}>
        <Text style={styles.answer}>
            {character}
        </Text>
    </View>
);

class MissingWord extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <Text style={styles.word}>F_ck</Text>
                    <Text style={styles.instruction}>Find a missing character</Text>
                </View>
                <View style={styles.answersContainer}>
                    <AnsweCharacter character="A"/>
                    <AnsweCharacter character="B"/>
                    <AnsweCharacter character="C"/>
                    <AnsweCharacter character="D"/>
                </View>
            </View>
        )
    }
}

export default MissingWord;