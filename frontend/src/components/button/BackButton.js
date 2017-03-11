import React, {Component} from 'react';
import {Button, Icon} from 'native-base';
import {connect} from 'react-redux';
import {navPopRoute} from '../../actions/rootNavigation'

class BackButton extends Component {
    _popRoute() {
        this.props.navPopRoute();
    }

    render() {
        return (
            <Button light transparent onPress={() => this._popRoute()}>
                <Icon name='arrow-back' style={{color: 'white', alignSelf: 'center'}}/>
            </Button>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, {
    navPopRoute
})(BackButton);
