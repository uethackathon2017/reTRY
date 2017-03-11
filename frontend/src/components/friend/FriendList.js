// Danh sách các từ hay sai
import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableHighlight, Image} from 'react-native';
import styles from './styles';
import {Thumbnail, Card, CardItem, Body, Left, Button, Icon} from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import theme, * as fromTheme from '../../theme';

const welcome = require('../../../assets/images/logo.jpg');

class FriendCard extends Component {
    render() {
        return (
            <Card style={StyleSheet.flatten(styles.achievementCard)}>
                <CardItem>
                    <Left>
                        <Thumbnail source={welcome}/>
                        <Body style={{flexDirection:'row'}}>
                            <View style={{flex: 0.7}}>
                                <Text style={styles.achievementTitle}>{this.props.title}</Text>
                                <Text note>{this.props.description}</Text>
                            </View>
                        
                            <View style={{flex: 0.3}}>
                                <Button bordered iconLeft >
                                    <Icon name='ios-chatboxes-outline' />
                                </Button>
                        </View>
                        

                        </Body>
                    </Left>
                </CardItem>
            </Card>
        )
    }
}

class FriendList extends Component {
    render() {
        return (
            <View style={styles.achievementList}>
                {/*<View style={styles.achievementListTitleContainer}>
                    <Text style={styles.achievementListTitle}>THÀNH TÍCH</Text>
                </View>*/}
                <FriendCard title="Nguyễn Văn Nhật" description="Level 2"/>
                <FriendCard title="Trần Minh Tuấn" description="Level 7"/>
                <FriendCard title="Trần Việt Thắng" description="Level 2"/>
                <FriendCard title="Đặng Hải Triều" description="Level 5"/>
            </View>
        )
    }
}

export default FriendList;