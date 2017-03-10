import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableHighlight, Image} from 'react-native';
import styles from './styles';
import {Thumbnail, Card} from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import theme, * as fromTheme from '../../theme';

class User extends Component {
    _onPress() {
    }

    _getUserPositionContainerStyle() {
        if (this.props.position == 1) {
            return styles.top1UserPositionContainer;
        }

        if (this.props.position == 2) {
            return styles.top2UserPositionContainer;
        }

        if (this.props.position == 3) {
            return styles.top3UserPositionContainer;
        }

        return styles.normalUserPositionContainer;
    }

    render() {
        return (
            <TouchableHighlight onPress={this._onPress} style={{flex: 1}} underlayColor={fromTheme.LAVENDER}>
                <View style={styles.user}>
                    <View style={this._getUserPositionContainerStyle()}>
                        <Text style={styles.userPosition}>{this.props.position}</Text>
                    </View>
                    <View style={styles.userAvatarContainer}>
                        <Image style={styles.userAvatar} source={{uri: this.props.avatar}}/>
                    </View>
                    <Text style={styles.userName}>{this.props.name}</Text>
                    <Text style={styles.userLevel}>Cấp {this.props.level}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

class UserList extends Component {
    render() {
        return (
            <ScrollView>
                <User
                    position={1}
                    name="Nguyễn Văn Nhật"
                    avatar="http://graph.facebook.com/100002307472131/picture?type=square"
                    level="150"
                />
                <User
                    position={2}
                    name="Trần Minh Tuấn"
                    avatar="http://graph.facebook.com/100008765054235/picture?type=square"
                    level="100"
                />
                <User
                    position={3}
                    name="Trần Việt Thắng"
                    avatar="http://graph.facebook.com/100002928642615/picture?type=square"
                    level="50"
                />
            </ScrollView>
        )
    }
}

export default UserList;