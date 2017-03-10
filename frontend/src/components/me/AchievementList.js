// Danh sách các từ hay sai
import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableHighlight, Image} from 'react-native';
import styles from './styles';
import {Thumbnail, Card, CardItem, Body, Left} from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import theme, * as fromTheme from '../../theme';

const welcome = require('../../../assets/images/logo.jpg');

class AchievementCard extends Component {
    render() {
        return (
            <Card style={StyleSheet.flatten(styles.achievementCard)}>
                <CardItem>
                    <Left>
                        <Thumbnail source={welcome}/>
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
    render() {
        return (
            <View style={styles.achievementList}>
                <View style={styles.achievementListTitleContainer}>
                    <Text style={styles.achievementListTitle}>THÀNH TÍCH</Text>
                </View>
                <AchievementCard title="Đối thủ khó nhằn" description="Thắng 3 ván liên tiếp"/>
                <AchievementCard title="Vạn sự khởi đầu nan" description="Thua trong ván đầu tiên"/>
                <AchievementCard title="Khởi đầu suôn sẻ" description="Thắng trong ván đầu tiên"/>
                <AchievementCard title="Khởi đầu" description="Chơi ván đầu tiên"/>
            </View>
        )
    }
}

export default AchievementList;