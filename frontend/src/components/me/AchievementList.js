// Danh sách các từ hay sai
import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableHighlight, Image} from 'react-native';
import styles from './styles';
import {Thumbnail, Card, CardItem, Body, Left} from 'native-base';
import theme, * as fromTheme from '../../theme';

const defaultIcon = fromTheme.DEFAULT_AWARD_ICON;

class AchievementCard extends Component {
    _getThumbnail() {
        const {
            award
        } = this.props;

        if (award.imageURL) {
            return (<Thumbnail style={StyleSheet.flatten(styles.achievementIcon)} source={{uri: award.imageURL}}/>)
        } else {
            return (<Thumbnail style={StyleSheet.flatten(styles.achievementIcon)} source={defaultIcon}/>)
        }
    }

    render() {
        const {
            award
        } = this.props;

        return (
            <Card style={StyleSheet.flatten(styles.achievementCard)}>
                <CardItem>
                    <Left>
                        {this._getThumbnail()}
                        <Body>
                        <Text style={styles.achievementTitle}>{award.title}</Text>
                        <Text note>{award.description}</Text>
                        </Body>
                    </Left>
                </CardItem>
            </Card>
        )
    }
}

class AchievementList extends Component {
    _mapPropsToView() {
        const {
            awards
        } = this.props;

        return awards.map((award, index) => (<AchievementCard key={index} award={award}/>));
    }

    render() {
        return (
            <View style={styles.achievementList}>
                <View style={styles.achievementListTitleContainer}>
                    <Text style={styles.achievementListTitle}>ACHIEVEMENTS</Text>
                </View>
                {this._mapPropsToView()}
            </View>
        )
    }
}

export default AchievementList;