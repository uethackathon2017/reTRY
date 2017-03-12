import React, {Component} from 'react';
import {StyleSheet,  Image, ScrollView} from 'react-native';
import styles from './styles';
import WordList from './wordList';
import {connect} from 'react-redux';
import TitleWithPlayButton from '../common/TitleWithPlayButton'
import TransparentStatusBar from '../common/TransparentStatusBar'
import {getTopic} from '../../reducers';

const background = require('../../../assets/images/background/item-4-bg.jpg');

class Vocabulary extends Component {

    _getTitle() {
        const {
            topic,
        } = this.props;

        if (topic.name) {
            return topic.name;
        } else {
            return "V O C A B U L A R Y";
        }
    }

    render() {
        return (
            <Image style={StyleSheet.flatten(styles.container)} source={background}>
                <TransparentStatusBar />
                <TitleWithPlayButton title={this._getTitle()}/>

                <ScrollView>
                    <WordList />
                </ScrollView>
            </Image >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        topic: getTopic(state),
    }
};

export default connect(mapStateToProps, {})(Vocabulary);