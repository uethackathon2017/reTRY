import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Card} from 'native-base';
import styles, * as fromStyles from './styles';
import {getCurrentGame, getCurrentAnswerKey, getCurrentRightAnswerKey} from '../../../reducers';
import {connect} from 'react-redux';
import {answer} from '../../../actions/games';
import * as fromTheme from '../../../theme';

const setColorForCard = (index, answerKey, rightAnswerKey) => {

    let color;

    if (rightAnswerKey == -1) {
        // not have result yet

        if (index === answerKey) {
            color = 'yellow'
        } else {
            color =  'white'
        }
    } else {
        // have result

        if (index === answerKey && answerKey === rightAnswerKey) {
            // true answer
            color = 'green'
        } else if (index === answerKey && answerKey !== rightAnswerKey){
            // wrong answer
            color = 'red'
        } else {
            // other
            color=  'white'
        }
    }


    console.log(color);
    return color;
};

const ViEnAnswerCard = ({answer, answerFunction, index, quizId, answerKey, rightAnswerKey}) => (
    <Card style={{
        width: fromTheme.screenWidth - 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: setColorForCard(index, answerKey, rightAnswerKey)
    }}
          key={answer._id.toString()}
    >
        <TouchableHighlight
            onPress={() => {
                if (answerKey == -1) {
                     answerFunction(quizId, index);
                }
             }}
            style={{flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}
        >
            <Text style={styles.answer}>
                {answer.content + " /" + answer.pronounce[0] + "/"}
            </Text>
        </TouchableHighlight>
    </Card>

);

const EnViAnswerCard = ({answer, answerFunction, index, quizId, answerKey, rightAnswerKey}) => (
    <Card style={{
        width: fromTheme.screenWidth - 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: setColorForCard(index, answerKey, rightAnswerKey)
    }}
          key={answer._id.toString()}
    >
        <TouchableHighlight
            onPress={() => {
                if (answerKey == -1) {
                     answerFunction(quizId, index);
                }

            }}
            style={{flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}
        >
            <Text style={styles.answer}>
                {answer.content}
            </Text>
        </TouchableHighlight>
    </Card>
);

class ChooseMeaning extends Component {

    render() {

        const {game, answerKey, rightAnswerKey} = this.props;

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
                                    key={answer._id.toString()}
                                    answer={answer}
                                    answerFunction={this.props.answer}
                                    index={index}
                                    quizId={game._id}
                                    answerKey={answerKey}
                                    rightAnswerKey={rightAnswerKey}
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
                        <Text style={styles.word}>{game.question.content + " /" + game.question.pronounce[0]+"/"}</Text>
                        <Text style={styles.instruction}>{game.question.description_en}</Text>
                    </View>
                    <View style={styles.answersContainer}>
                        {game.answers.map((answer, index) => {
                            return (
                                <EnViAnswerCard
                                    key={answer._id.toString()}
                                    answer={answer}
                                    answerFunction={this.props.answer}
                                    index={index}
                                    quizId={game._id}
                                    answerKey={answerKey}
                                    rightAnswerKey={rightAnswerKey}
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
    game: getCurrentGame(state),
    answerKey: getCurrentAnswerKey(state),
    rightAnswerKey: getCurrentRightAnswerKey(state)
});

export default connect(mapStateToProps, {
    answer
})(ChooseMeaning);