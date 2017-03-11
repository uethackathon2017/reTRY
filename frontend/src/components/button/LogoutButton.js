import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button, Icon} from 'native-base';
import {connect} from 'react-redux';
import {logout} from '../../actions/login'
import {navPopRoute, navReplaceAt, navResetRoute} from '../../actions/rootNavigation'

class BackButton extends Component {
    _logout() {
        this.props.logout();
        this.props.navResetRoute();
    }

    render() {
        return (
            <Button light transparent onPress={() => this._logout()}>
                {/*<Icon name='exit-to-app' android="md-exit" ios="ios-exit"*/}
                {/*style={{color: 'white', alignSelf: 'center'}}/>*/}
                <Text style={{color: 'white', alignSelf: 'center'}}>Sign out</Text>
            </Button>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, {
    logout, navResetRoute
})(BackButton);
