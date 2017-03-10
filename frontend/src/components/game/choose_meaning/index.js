import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Card} from 'native-base';
import styles, * as fromStyles from './styles';
import {getCurrentGame} from '../../../reducers';
import {connect} from 'react-redux';
import {answer} from '../../../actions/games';

const ViEnAnswerCard = ({answer, answerFunction, index, quizId}) => (
    <Card style={StyleSheet.flatten(styles.answerCard)}
          key={answer._id.toString()}
    >
        <TouchableHighlight
            onPress={() => {
            answerFunction(quizId, index);
         }}
        >
            <Text style={styles.answer}>
                {answer.content + " /" + answer.pronounce[0] + "/"}
            </Text>
        </TouchableHighlight>
    </Card>

);

const EnViAnswerCard = ({answer, answerFunction, index, quizId}) => (
    <Card style={StyleSheet.flatten(styles.answerCard)}
          key={answer._id.toString()}
    >
        <TouchableHighlight
            onPress={() => {
            answerFunction(quizId, index);
         }}
        >
            <Text style={styles.answer}>
                {answer.content}
            </Text>
        </TouchableHighlight>
    </Card>
);

class ChooseMeaning extends Component {

    render() {

        const {game} = this.props;

        if (game.type === 'vi_en') {
            return (
                <View style={styles.container}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.word}>{game.question.content}</Text>
                        <Text style={styles.instruction}>{game.question.description_en}</Text>
                    </View>
                    <View style={styles.answersContainer}>
                        {game.answers.map((answer, index) => {
                            return (
                                <ViEnAnswerCard
                                    answer={answer}
                                    answerFunction={this.props.answer}
                                    index={index}
                                    quizId={game._id}
                                />
                            )
                        })}
                    </View>
                </View>
            )
        } else if (game.type === 'en_vi') {
            return (
                <View style={styles.container}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.word}>game.question.content + " /" + game.question.pronounce[0]+"/"</Text>
                        <Text style={styles.instruction}>game.question.description_en</Text>
                    </View>
                    <View style={styles.answersContainer}>
                        {game.answers.map((answer, index) => {
                            return (

                                <EnViAnswerCard
                                    answer={answer}
                                    answerFunction={this.props.answer}
                                    index={index}
                                    quizId={game._id}
                                />

                            )
                        })}
                    </View>
                </View>
            );
        } else {
            return (<View/>)
        }
    }
}

const mapStateToProps = (state) => ({
    game: getCurrentGame(state)
});

export default connect(mapStateToProps, {
    answer
})(ChooseMeaning);