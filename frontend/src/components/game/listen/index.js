import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Card, Icon} from 'native-base';
import styles, * as fromStyles from './styles';
import {downLoadFile} from '../../../api/download';
import {play} from '../../../helpers/playSound';
import RNFS from 'react-native-fs';
import {getCurrentGame, getCurrentAnswerKey, getCurrentRightAnswerKey} from '../../../reducers';
import {connect} from 'react-redux';
import {answer} from '../../../actions/games';
import * as fromTheme from '../../../theme';
import {setColorForCard} from '../../../helpers/answerCard';

const AnswerCard = ({answer, answerFunction, index, quizId, answerKey, rightAnswerKey}) => (
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
            underlayColor={fromTheme.LINEN}
            onPress={() => {
                if (answerKey == -1) {
                     answerFunction(quizId, index);
                } else {
                    console.log('Can\'t answer');
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

class Listen extends Component {
    render() {
        const {game, answerKey, rightAnswerKey} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <TouchableHighlight
                        onPress={() => {
                            let basePath = RNFS.DocumentDirectoryPath;
                            let fileName = (new Date()).getTime();
                            downLoadFile(game.question.audio, basePath + "/" +fileName)
                            .then(des => play(fileName, basePath))
                            .then(() => {
                                console.log("Play OK!");
                            })
                            .catch((error) => {
                                console.log(error);
                                 Alert.alert('Error', error.message, [
                                    {
                                        text: 'OK',
                                        onPress: () => {

                                        }
                                    }
                                 ]);
                            })
                        }}>
                        <View>
                            <Icon name="play" style={StyleSheet.flatten(styles.playIcon)}/>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.instruction}>{game.question.description_en}</Text>

                </View>
                <View style={styles.answersContainer}>
                    {game.answers.map((answer, index) => {
                        return (
                            <AnswerCard
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
    }
}

const mapStateToProps = (state) => ({
    game: getCurrentGame(state),
    answerKey: getCurrentAnswerKey(state),
    rightAnswerKey: getCurrentRightAnswerKey(state)
});

export default connect(mapStateToProps, {
    answer
})(Listen);