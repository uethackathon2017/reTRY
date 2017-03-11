import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Platform, ScrollView} from 'react-native';
import styles from './styles';
import theme, * as fromTheme from '../../theme';
import * as Progress from 'react-native-progress';
import AchievementList from './AchievementList';
import {getProfile, checkShouldGetApi} from '../../reducers';
import {connect} from 'react-redux';
import {getProfile as getProfileApi} from '../../actions/profile';
import TitleWithLogout from '../common/TitleWithLogout';
import TitleWithBackButton from '../common/TitleWithBackButton';
import TransparentStatusBar from '../common/TransparentStatusBar';
import {Button, Icon} from 'native-base';

const screenWidth = fromTheme.screenWidth;
const background = fromTheme.ME_BG_IMG;
const diamond = require('../../../assets/images/diamond.png');

class Me extends Component {
    componentDidMount() {
        this.props.getProfileApi();
    }

    _getTitleComponent() {
        const {
            isCurrentUser
        } = this.props;

        if (isCurrentUser) {
            return (<TitleWithLogout title="P R O F I L E"/>);
        } else {
            return (<TitleWithBackButton title="P R O F I L E"/>);
        }
    }

    _getNameComponent() {
        const {
            isCurrentUser, profile
        } = this.props;

        if (isCurrentUser) {
            return (
                <View style={styles.userNameContainer}>
                    <View style={{flex: 0.3}}></View>
                    <Text style={styles.userName}>{profile.firstName} {profile.lastName}</Text>
                    <Button light transparent small style={styles.upgradeButton}>
                        <View style={styles.diamondContainer}>
                            <Image source={diamond} style={styles.diamond}/>
                        </View>
                        <Text style={styles.upgradeText}>UPGRADE</Text>
                    </Button>
                </View>
            )
        } else {
            return (<Text style={styles.userName}>{profile.firstName} {profile.lastName}</Text>);
        }
    }

    render() {
        const {
            profile
        } = this.props;

        const score = (level) => {
            return (level - 1) * 30;
        };

        const level = (score) => {
            return score / 30 + 1;
        };

        return (
            <Image style={StyleSheet.flatten(styles.container)} source={background}>
                <TransparentStatusBar/>
                <ScrollView>
                    {this._getTitleComponent()}
                    <View style={styles.userAvatarContainer}>
                        {Avatar(profile)}
                    </View>
                    {this._getNameComponent()}
                    <View style={styles.userLevelContainer}>
                        <View style={styles.userLevelProgressContainer}>
                            <Text style={styles.userLevel}>Level {profile.level}</Text>
                            <View style={styles.userLevelProgress}>
                                <Progress.Bar progress={(profile.score - score(profile.level))/30.0}
                                              color={fromTheme.YELLOW} height={16}
                                              width={(screenWidth - 20)*0.8 - 10}/>
                            </View>
                            <Text style={styles.userLevel}>Level {profile.level + 1}</Text>
                        </View>
                        <Text style={styles.userScore}>
                            {score(profile.level + 1) - profile.score} more scores to level up
                        </Text>
                    </View>
                    <AchievementList awards={profile.awards}/>
                </ScrollView>
            </Image>
        )
    }
}

const Avatar = (profile) => {
    if (profile.pictureURL) {
        return (<Image style={styles.userAvatar}
                       source={{uri: profile.pictureURL}}/>)
    } else {
        return (<Image style={styles.userAvatar}/>)
    }
};

const mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        isCurrentUser: checkShouldGetApi(state),
    }
};


export default connect(mapStateToProps, {
    getProfileApi
})(Me);