// Danh sách các từ hay sai
import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableHighlight, Image} from 'react-native';
import styles from './styles';
import {Thumbnail, Card, CardItem, Body, Left} from 'native-base';
import theme, * as fromTheme from '../../theme';

const defaultIcon = fromTheme.DEFAULT_AWARD_ICON;

class AchievementCard extends Component {
    render() {
        return (
            <Card style={StyleSheet.flatten(styles.achievementCard)}>
                <CardItem>
                    <Left>
                        <Thumbnail source={this.props.image}/>
                        <Body>
                        <Text style={styles.achievementTitle}>{this.props.title}</Text>
                        <Text note>{this.props.description}</Text>
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

        return awards.map((award, index) => {
            if (award.image) {
                return (<AchievementCard key={index} title={award.title} description={award.description}
                                         image={{uri: award.image}}/>);
            } else {
                return (<AchievementCard key={index} title={award.title} description={award.description}
                                         image={defaultIcon}/>);
            }
        });
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