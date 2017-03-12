// Danh sách các từ hay sai
import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableHighlight, Image} from 'react-native';
import styles from './styles';
import {Thumbnail, Card, CardItem, Body, Left} from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import theme, * as fromTheme from '../../theme';
import {getTopics} from '../../reducers';
import {connect} from 'react-redux';
import {getTopics as getTopicsApi} from '../../actions/topics';
import {navPushRoute} from '../../actions/rootNavigation';
import {getWordsByTopicApi} from '../../actions/words';

const defaultIcon = require('../../../assets/images/logo.jpg');

class TopicCard extends Component {

    static propTypes = {
        reset: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    };

    _pushTo(route, topic) {
        this.props.navPushRoute(route);
        this.props.getWordsByTopicApi(topic);
    }

    _getImage() {
        const {
            topic
        } = this.props;

        if (topic.imageURL) {
            return (<Image style={styles.topicIcon} source={{uri: topic.imageURL}}/>)
        } else {
            return (<Image style={styles.topicIcon} source={defaultIcon}/>)
        }
    }

    render() {
        const {
            topic
        } = this.props;

        return (
            <TouchableHighlight onPress={() => this._pushTo('wordList', topic)} style={styles.topicTouchable}
                                underlayColor={fromTheme.LAVENDER}>
                <View style={styles.topic}>
                    <View style={styles.topicIconContainer}>
                        {this._getImage()}
                    </View>
                    <View style={styles.topicBody}>
                        <View style={styles.topicTitleContainer}>
                            <Text style={styles.topicTitle}>{topic.name}</Text>
                        </View>
                        <View style={styles.topicDescriptionContainer}>
                            <Text>{topic.description}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

class TopicList extends Component {

    componentDidMount() {
        this.props.getTopicsApi();
    }

    _mapPropsToView() {
        const {
            topics, navPushRoute, getWordsByTopicApi
        } = this.props;

        return topics.map((topic, position) => (<TopicCard
            key={topic._id}
            navPushRoute={navPushRoute}
            getWordsByTopicApi={getWordsByTopicApi}
            topic={topic}
        />))
    }

    render() {
        return (
            <ScrollView>
                {this._mapPropsToView()}
            </ScrollView>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        topics: getTopics(state),
    }
};

export default connect(mapStateToProps, {
    getTopicsApi, navPushRoute, getWordsByTopicApi
})(TopicList);