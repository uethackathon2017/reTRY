import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Card} from 'native-base';
import styles, * as fromStyles from './styles';
import {getCurrentGame} from '../../../reducers';
import {connect} from 'react-redux';

const ViEnAnswerCard = ({answer}) => (
    <Card style={StyleSheet.flatten(styles.answerCard)}
          key={answer._id.toString()}
    >
        <Text style={styles.answer}>
            {answer.content + " /" +answer.pronounce[0]+ "/"}
        </Text>
    </Card>
);

const EnViAnswerCard = ({answer}) => (
    <Card style={StyleSheet.flatten(styles.answerCard)}
          key={answer._id.toString()}
    >
        <Text style={styles.answer}>
            {answer.content + " /" +answer.pronounce[0]+ "/"}
        </Text>
    </Card>
);

class ChooseMeaning extends Component {

    render() {

        const {game} = this.props;

        if (game.type === 'vi_en') {
            return (
                <View style={styles.container}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.word}>game.question.content</Text>
                        <Text style={styles.instruction}>game.question.description_en</Text>
                    </View>
                    <View style={styles.answersContainer}>
                        {game.answers.map((answer, index) => {
                            return (
                                <TouchableHighlight
                                    onPress={() => {
                                        dispatch
                                    }}
                                >
                                    <ViEnAnswerCard
                                        answer={answer}
                                    />
                                </TouchableHighlight>
                            )
                        })}
                    </View>
                </View>
            )
        } else if (game.type === 'en-vi'){
            return (
                <View style={styles.container}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.word}>game.question.content</Text>
                        <Text style={styles.instruction}>game.question.description_en</Text>
                    </View>
                    <View style={styles.answersContainer}>
                        {game.answers.map((answer, index) => {
                            return (
                                <TouchableHighlight
                                    onPress={() => {
                                        dispatch
                                    }}
                                >
                                    <ViEnAnswerCard
                                        answer={answer}
                                    />
                                </TouchableHighlight>
                            )
                        })}
                    </View>
                </View>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    game: getCurrentGame(state)
});

export default connect(mapStateToProps)(ChooseMeaning);