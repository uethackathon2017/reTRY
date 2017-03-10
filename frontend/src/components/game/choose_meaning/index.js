import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'native-base';
import styles, * as fromStyles from './styles';
import {getCurrentGame} from '../../../reducers';
import {connect} from 'react-redux';

const AnswerCard = ({word}) => (
    <Card style={StyleSheet.flatten(styles.answerCard)}
          key={word._id.toString()}
    >
        <Text style={styles.answer}>
            {word}
        </Text>
    </Card>
);

class ChooseMeaning extends Component {

    render() {

        const {game} = this.props;

        if (game.type ==='vi_en') {
            return (
                <View style={styles.container}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.word}>game.question.content</Text>
                        <Text style={styles.instruction}>game.question.description_en</Text>
                    </View>
                    <View style={styles.answersContainer}>
                        {game.answers.map((answer, index) => {
                            return  <AnswerCard
                                word={answer.content}
                            />
                        })}
                    </View>
                </View>
            )
        } else {
            return (<View/>);
        }
    }
}

const mapStateToProps = (state) => ({
    game: getCurrentGame(state)
});

export default connect(mapStateToProps)(ChooseMeaning);