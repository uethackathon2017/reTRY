import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Platform, ScrollView} from 'react-native';
import styles from './styles';
import {Container} from 'native-base';
import theme, * as fromTheme from '../../theme';
import * as Progress from 'react-native-progress';
import AchievementList from './AchievementList';
import {getProfile} from '../../reducers';
import {connect} from 'react-redux';
import {getProfile as getProfileApi} from '../../actions/profile';
import CacheableImage from 'react-native-cacheable-image';

const screenWidth = fromTheme.screenWidth;
const background = require('../../../assets/images/background/item-4-bg.jpg');

class Me extends Component {
    componentDidMount() {
        this.props.getProfileApi();
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
                        <Text style={styles.title}>P R O F I L E</Text>
                    </View>
                    <View style={styles.userAvatarContainer}>
                        <Image style={styles.userAvatar}
                               source={{uri: profile.pictureURL}}/>
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

const mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
    }
};


export default connect(mapStateToProps, {
    getProfileApi
})(Me);