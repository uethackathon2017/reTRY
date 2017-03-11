import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Platform, ScrollView} from 'react-native';
import styles from './styles';
import {Container, Button, Icon} from 'native-base';
import theme, * as fromTheme from '../../theme';
import * as Progress from 'react-native-progress';
import AchievementList from './AchievementList';
import {getProfile} from '../../reducers';
import {connect} from 'react-redux';
import {getProfile as getProfileApi} from '../../actions/profile';
import {navPopRoute} from '../../actions/rootNavigation'

const screenWidth = fromTheme.screenWidth;
const background = fromTheme.ME_BG_IMG;

class Me extends Component {
    componentDidMount() {
        this.props.getProfileApi();
    }

    _popRoute() {
        this.props.navPopRoute();
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
                <View style={styles.statusBarBackground}/>
                <ScrollView>
                    <View style={styles.titleRow}>
                        <View style={styles.backButtonContainer}>
                            <Button light transparent onPress={() => this._popRoute()}>
                                <Icon name='arrow-back' style={styles.backButtonIcon}/>
                            </Button>
                        </View>
                        <Text style={styles.title}>P R O F I L E</Text>
                        <View style={{flex: 0.2}}/>
                    </View>
                    <View style={styles.userAvatarContainer}>
                        {Avatar(profile)}
                    </View>
                    <Text style={styles.userName}>{profile.firstName} {profile.lastName}</Text>
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
    }
};


export default connect(mapStateToProps, {
    getProfileApi, navPopRoute
})(Me);