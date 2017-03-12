import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button, Icon} from 'native-base';
import {connect} from 'react-redux';
import {logout} from '../../actions/login'
import {navPushRoute} from '../../actions/rootNavigation'
import theme, * as fromTheme from '../../theme';

class BackButton extends Component {
    _find() {
        this.props.navPushRoute('find');
    }

    render() {
        return (
            <Button light transparent onPress={() => this._find()}>
                <Icon name='ios-play'
                      style={{color: fromTheme.CRIMSON_SKY, alignSelf: 'center'}}/>
                <Text style={{color: 'white', alignSelf: 'center', textAlign: 'center', fontWeight: 'bold'}}>Play</Text>
            </Button>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, {
    logout, navPushRoute
})(BackButton);
