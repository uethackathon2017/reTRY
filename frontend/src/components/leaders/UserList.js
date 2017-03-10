import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableHighlight, Image} from 'react-native';
import styles from './styles';
import {Thumbnail, Card} from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import theme, * as fromTheme from '../../theme';
import {getLeaders} from '../../reducers';
import {connect} from 'react-redux';
import {getLeaders as getLeadersApi} from '../../actions/leaders';

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
    componentDidMount() {
        this.props.getLeadersApi();
    }

    _mapDataToView() {
        const {
            leaders
        } = this.props;

        return leaders.map((user, position) => (<User
            key={position}
            position={position + 1}
            name={user.firstName + " " + user.lastName}
            avatar={user.pictureURL}
            level={user.level}
        />))
    }

    render() {
        return (
            <ScrollView>
                {this._mapDataToView()}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        leaders: getLeaders(state),
    }
};

export default connect(mapStateToProps, {
    getLeadersApi
})(UserList);