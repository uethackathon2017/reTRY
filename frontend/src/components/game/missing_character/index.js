import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Card, Icon} from 'native-base';
import styles, * as fromStyles from './styles';
import {connect} from 'react-redux';
import {getCurrentGame, getCurrentAnswerKey, getCurrentRightAnswerKey} from '../../../reducers';
import {answer} from '../../../actions/games';
import {setColorForTransparentCard} from '../../../helpers/answerCard';
import * as fromTheme from '../../../theme';

const AnswerCharacter = ({character, answerFunction, quizId, index, answerKey, rightAnswerKey}) => (

    <View style={[styles.answerCharacterContainer, {
        backgroundColor: setColorForTransparentCard(index, answerKey, rightAnswerKey)
    }]}>
        <TouchableHighlight
            underlayColor={fromTheme.LINEN}
            onPress={() => {
                if (answerKey == -1) {
                     answerFunction(quizId, index);
                }
            }}
            style={{flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}
        >
            <Text style={styles.answer}>
                {character}
            </Text>
        </TouchableHighlight>
    </View>
);

class MissingWord extends Component {
    render() {
        const {game, answerKey, rightAnswerKey} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <Text style={styles.word}>{game.question.content}</Text>
                    <Text style={styles.instruction}>{game.question.content.description_en}</Text>
                </View>
                <View style={styles.answersContainer}>
                    {
                        game.answers.map((answer, index) => {
                            console.log("INDEX: " + index);
                            return (<AnswerCharacter
                                character={answer.content}
                                index={index}
                                key={index}
                                answerFunction={this.props.answer}
                                quizId={game._id}
                                answerKey={answerKey}
                                rightAnswerKey={rightAnswerKey}
                            />)
                        })
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    game: getCurrentGame(state),
    answerKey: getCurrentAnswerKey(state),
    rightAnswerKey: getCurrentRightAnswerKey(state)
});

export default connect(mapStateToProps, {
    answer
})(MissingWord);