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

const screenWidth = fromTheme.screenWidth;

class Me extends Component {
    componentDidMount() {
        this.props.getProfileApi();
    }

    render() {
        const {
            profile
        } = this.props;

        return (
            <Container style={StyleSheet.flatten(styles.container)}>
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
                            <Text style={styles.userLevel}>Cấp {profile.level}</Text>
                            <View style={styles.userLevelProgress}>
                                <Progress.Bar progress={0.3} color={fromTheme.YELLOW} height={16}
                                              width={(screenWidth - 20)*0.8 - 10}/>
                            </View>
                            <Text style={styles.userLevel}>Cấp {profile.level + 1}</Text>
                        </View>
                        <Text style={styles.userScore}>
                            {(profile.level + 1) * 10 - profile.score} điểm nữa để lên cấp
                        </Text>
                    </View>
                    <AchievementList/>
                </ScrollView>
            </Container>
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