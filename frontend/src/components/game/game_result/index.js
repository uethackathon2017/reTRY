import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Card, Icon, Container, Button, Content, Footer} from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import styles, * as fromStyles from './styles';
import PercentageCircle from 'react-native-percentage-circle';
import * as fromTheme from '../../../theme';
import TransparentStatusBar from '../../common/TransparentStatusBar';
import TitleWithBackButton from '../../common/TitleWithBackButton';
import {connect} from 'react-redux';
import {
    getSelfScoreAfterGame,
    getOpponentScoreAfterGame,
    getsSelfDataBeforeGame,
    getOpponentDataBeforeGame
} from '../../../reducers';
import {navPushRoute} from '../../../actions/rootNavigation';

const congrats = require('../../../../assets/images/award/congrats.png');
const STATUS_WIN = 1;
const STATUS_LOSE = -1;
const STATUS_DRAW = 0;

const Avatar = (data) => {
    if (data.pictureURL) {
        return (<Image style={styles.userAvatarLeft}
                       source={{ uri: data.pictureURL }}/>)
    }
    return (<Image style={styles.userAvatarLeft}/>)
};

/**
 * @return {string}
 */
const full_name = (data) => {
    return data.first_name + " " + data.last_name;
};

const score = (level) => {
    return (level - 1) * 30;
};

const level = (score) => {
    return score / 30 + 1;
};

class GameResult extends Component {
    _pushTo(route) {
        this.props.navPushRoute(route);
    }

    _getStatus() {
        const {
            selfScoreAfterGame, opponentScoreAfterGame,
        } = this.props;

        if (selfScoreAfterGame > opponentScoreAfterGame) {
            return STATUS_WIN;
        } else if (selfScoreAfterGame < opponentScoreAfterGame) {
            return STATUS_LOSE;
        } else {
            return STATUS_DRAW;
        }
    }

    _getTitle() {
        const status = this._getStatus();

        switch (status) {
            case STATUS_WIN:
                return "Y O U   W I N !";
            case STATUS_LOSE:
                return "Y O U   L O S E !";
            case STATUS_DRAW:
                return "D R A W !";
            default:
                return "";
        }
    }

    _getCups() {
        const status = this._getStatus();

        switch (status) {
            case STATUS_WIN:
                return (<Image source={congrats} style={styles.awardImage}/>);
            default:
                return (<Image style={styles.awardImage}/>);
        }
    };

    _getProgress() {
        const {
            selfScoreAfterGame,
        } = this.props;

        const selfLevelAfterGame = level(selfScoreAfterGame);

        return (selfScoreAfterGame - score(selfLevelAfterGame)) / 30.0 * 100;
    };

    render() {
        const {
            selfScoreAfterGame, opponentScoreAfterGame, selfDataBeforeGame, opponentDataBeforeGame
        } = this.props;

        return (
            <Container style={StyleSheet.flatten(styles.container)}>
                <ScrollView>
                    <TransparentStatusBar/>
                    <TitleWithBackButton title={this._getTitle()}/>

                    <View style={styles.playersContainer}>
                        <View style={styles.playerContainer}>
                            <View style={styles.avatarAndScoreContainer}>
                                <Text style={styles.scoreLeftValue}>{selfScoreAfterGame}</Text>
                                {Avatar(selfDataBeforeGame)}
                            </View>
                            <Text style={styles.playerNameLeft}>{full_name(selfDataBeforeGame)}</Text>
                            <Text style={styles.levelLeft}>Level {selfDataBeforeGame.level}</Text>
                        </View>
                        <View style={styles.playerContainer}>
                            <View style={styles.avatarAndScoreContainer}>
                                {Avatar(opponentDataBeforeGame)}
                                <Text style={styles.scoreRightValue}>{opponentScoreAfterGame}</Text>
                            </View>
                            <Text style={styles.playerNameRight}>{full_name(opponentDataBeforeGame)}</Text>
                            <Text style={styles.levelRight}>Level {opponentDataBeforeGame.level}</Text>
                        </View>
                    </View>
                    <View style={styles.levelAndAwardContainer}>
                        <View style={styles.awardContainer}>
                            {this._getCups()}
                        </View>

                        <View style={styles.levelupContainer}>
                            <PercentageCircle
                                radius={50}
                                percent={this._getProgress()}
                                color={fromTheme.GREEN}
                                bgcolor={fromTheme.ULTRAMARINE}
                                innerColor={fromTheme.ULTRAMARINE}
                                borderWidth={10}
                            >
                                <Text style={styles.title}>Level {level(selfScoreAfterGame)}</Text>
                            </PercentageCircle>
                        </View>
                    </View>

                    <View style={styles.listButtonContainer}>
                        <View style={styles.button}>
                            <Button iconLeft primary onPress={() => this._pushTo('main')}>
                                <Icon name='home'/>
                                <Text style={styles.buttonText}>Home</Text>
                            </Button>
                        </View>
                        {/*<View style={styles.button}>*/}
                        {/*<Button iconLeft success>*/}
                        {/*<Icon name='ios-chatboxes-outline'/>*/}
                        {/*<Text style={styles.buttonText}>Chat</Text>*/}
                        {/*</Button>*/}
                        {/*</View>*/}

                        {/*<View style={styles.button}>*/}
                        {/*<Button iconLeft info>*/}
                        {/*<Icon name='share'/>*/}
                        {/*<Text style={styles.buttonText}>Share</Text>*/}
                        {/*</Button>*/}
                        {/*</View>*/}
                    </View>


                </ScrollView>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selfScoreAfterGame: getSelfScoreAfterGame(state),
        opponentScoreAfterGame: getOpponentScoreAfterGame(state),
        selfDataBeforeGame: getsSelfDataBeforeGame(state),
        opponentDataBeforeGame: getOpponentDataBeforeGame(state),
    }
};

export default connect(mapStateToProps, {navPushRoute})(GameResult);