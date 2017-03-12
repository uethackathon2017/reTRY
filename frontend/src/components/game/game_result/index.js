import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableHighlight} from 'react-native';
import styles from './styles';
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
import {shouldShowPublicProfile} from '../../../actions/profile';

const award_win = require('../../../../assets/images/award/congrats.png');
const award_lose = require('../../../../assets/images/award/sad.png');
const award_draw = require('../../../../assets/images/award/draw.png');
const background = require('../../../../assets/images/background/item-4-bg.jpg');
const STATUS_WIN = 1;
const STATUS_LOSE = -1;
const STATUS_DRAW = 0;

const Avatar = (data, style) => {
    if (data.pictureURL) {
        return (<Image style={style}
                       source={{ uri: data.pictureURL }}/>)
    }
    return (<Image style={style}/>)
};

const score = (level) => {
    return (level - 1) * 30;
};

const level = (score) => {
    return score / 30 + 1;
};

class GameResult extends Component {

    _seeOpponent() {
        this.props.shouldShowPublicProfile(this.props.opponentDataBeforeGame);
        this.props.navPushRoute('me');
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
                return (<Image source={award_win} style={styles.awardImage}/>);
            case STATUS_LOSE:
                return (<Image source={award_lose} style={styles.awardImage}/>);
            case STATUS_DRAW:
                return (<Image source={award_draw} style={styles.awardImage}/>);
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
            <Image style={styles.container} source={background}>
                <ScrollView>
                    <TransparentStatusBar/>
                    <TitleWithBackButton title={this._getTitle()}/>

                    <View style={styles.playersContainer}>
                        <View style={styles.playerContainer}>
                            <View style={styles.avatarAndScoreContainer}>
                                <Text style={styles.scoreLeftValue}>{selfScoreAfterGame}</Text>
                                {Avatar(selfDataBeforeGame, styles.userAvatarLeft)}
                            </View>
                            <Text style={styles.playerNameLeft}>{selfDataBeforeGame.firstName} {selfDataBeforeGame.lastName}</Text>
                            <Text style={styles.levelLeft}>Level {selfDataBeforeGame.level}</Text>
                        </View>
                        <TouchableHighlight onPress={() => this._seeOpponent()} style={styles.playerContainer} underlayColor="#ffffff50">
                            <View style={styles.playerContainer}>
                                <View style={styles.avatarAndScoreContainer}>
                                    {Avatar(opponentDataBeforeGame, styles.userAvatarRight)}
                                    <Text style={styles.scoreRightValue}>{opponentScoreAfterGame}</Text>
                                </View>
                                <Text style={styles.playerNameRight}>{opponentDataBeforeGame.firstName} {opponentDataBeforeGame.lastName}</Text>
                                <Text style={styles.levelRight}>Level {opponentDataBeforeGame.level}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.levelAndAwardContainer}>
                        <View style={styles.awardContainer}>
                            {this._getCups()}
                        </View>

                        {/*<View style={styles.levelupContainer}>
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
                        </View>*/}
                    </View>
                </ScrollView>
            </Image>
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

export default connect(mapStateToProps, {navPushRoute, shouldShowPublicProfile})(GameResult);