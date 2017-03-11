// Danh sách các từ hay sai
import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableHighlight, Image} from 'react-native';
import styles from './styles';
import {Thumbnail, Card, CardItem, Body, Left} from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import theme, * as fromTheme from '../../theme';

const awardIcon = '../../../assets/images/161 - Star (Flat).png';

class AchievementCard extends Component {
    render() {
        return (
            <Card style={StyleSheet.flatten(styles.achievementCard)}>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: this.props.image}}/>
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
        return this.props.awards.map(award => {
            if (award.image) {
                return (<AchievementCard key={award._id} title={award.title} description={award.description}
                                         image={award.image}/>)
            } else {
                return (<AchievementCard key={award._id} title={award.title} description={award.description}
                                         image={awardIcon}/>)
            }
        });
    }

    render() {
        return (
            <View style={styles.achievementList}>
                <View style={styles.achievementListTitleContainer}>
                    <Text style={styles.achievementListTitle}>THÀNH TÍCH</Text>
                </View>
                {this._mapPropsToView()}
            </View>
        )
    }
}

export default AchievementList;