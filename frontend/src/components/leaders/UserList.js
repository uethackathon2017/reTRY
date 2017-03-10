import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableHighlight, Image} from 'react-native';
import styles from './styles';
import {Thumbnail, Card} from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import theme, * as fromTheme from '../../theme';
import {getLeaders} from '../../reducers';
import {connect} from 'react-redux';
import {getLeaders as getLeadersApi} from '../../actions/leaders';
import {navPushRoute} from '../../actions/rootNavigation';
import {shouldShowPublicProfile} from '../../actions/profile';

class User extends Component {
    static propTypes = {
        reset: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    };

    _pushTo(route, user) {
        this.props.shouldShowPublicProfile(user);
        this.props.navPushRoute(route);
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
            <TouchableHighlight onPress={() => this._pushTo('me', this.props.user)} style={{flex: 1}}
                                underlayColor={fromTheme.LAVENDER}>
                <View style={styles.user}>
                    <View style={this._getUserPositionContainerStyle()}>
                        <Text style={styles.userPosition}>{this.props.position}</Text>
                    </View>
                    <View style={styles.userAvatarContainer}>
                        <Image style={styles.userAvatar} source={{uri: this.props.user.pictureURL}}/>
                    </View>
                    <Text style={styles.userName}>{this.props.user.firstName} {this.props.user.lastName}</Text>
                    <Text style={styles.userLevel}>Cấp {this.props.user.level}</Text>
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
            leaders, navPushRoute, shouldShowPublicProfile
        } = this.props;

        return leaders.map((user, position) => (<User
            navPushRoute={navPushRoute}
            shouldShowPublicProfile={shouldShowPublicProfile}
            key={position}
            position={position + 1}
            user={user}
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
    getLeadersApi, navPushRoute, shouldShowPublicProfile
})(UserList);