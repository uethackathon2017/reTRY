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

const welcome = require('../../../assets/images/logo.jpg');

class TopicCard extends Component {
    
    static propTypes = {
        reset: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    };

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

class TopicList extends Component {
    
    componentDidMount(){
        this.props.getTopicsApi();
    }

    _mapPropsToView() {
        const {
            topics, navPushRoute
        } = this.props;

        return topics.map((topic, position) => (<TopicCard
            key={topic._id}
            navPushRoute={navPushRoute}
            title={topic.name}
            description={topic.description}
        />))
    }

    render() {
        return (
            <View style={styles.achievementList}>
               {this._mapPropsToView()}
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        topics: getTopics(state),
    }
};

export default connect(mapStateToProps, {
    getTopicsApi, navPushRoute
})(TopicList);