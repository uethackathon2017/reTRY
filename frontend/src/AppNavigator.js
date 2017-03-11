import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental, View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import MainPage from './components/main';
import LoginPage from './components/login';
import FindPage from './components/find';
import MePage from './components/me';
import NewWordsPage from './components/new_words';
import GamePage from './components/game';
import LeadersPage from './components/leaders';
import GameResultPage from './components/game/game_result';
import TopicPage from './components/topic';
import FriendPage from './components/friend';

const { popRoute, } = actions;

const {
    CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            const routes = this.props.navigation.routes;

            if (routes[routes.length - 1].key === 'home' || routes[routes.length - 1].key === 'login') {
                return false;
            }

            this.props.popRoute(this.props.navigation.key);
            return true;
        });
    }

    componentDidUpdate() {

    }

    popRoute() {
        this.props.popRoute();
    }

    _renderScene(props) { // eslint-disable-line class-methods-use-this
        switch (props.scene.route.key) {
            case 'login':
                return <LoginPage />;
            case 'main':
                return <MainPage />;
            case 'find':
                return <FindPage />;
            case 'me':
                return <MePage />;
            case 'newWords':
                return <NewWordsPage />;
            case 'game':
                return <GamePage />;
            case 'leaders':
                return <LeadersPage />;
            case 'gameResult':
                return <GameResultPage />;
            case 'topics':
                return <TopicPage />;
            case 'friends':
                return <FriendPage />;
            default:
                return <MainPage />;
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>


                <StatusBar
                    barStyle="light-content"
                    translucent={true}
                    backgroundColor="hsla(0, 0%, 0%, 0.2)"
                />

                <NavigationCardStack
                    navigationState={this.props.navigation}
                    renderScene={this._renderScene}
                />

            </View>
        );
    }
}

AppNavigator.propTypes = {
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
        key: React.PropTypes.string,
        routes: React.PropTypes.array,
    }),
};

function bindAction(dispatch) {
    return {
        popRoute: (key) => dispatch(popRoute(key)),
    };
}

const mapStateToProps = state => ({
    navigation: state.rootNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
