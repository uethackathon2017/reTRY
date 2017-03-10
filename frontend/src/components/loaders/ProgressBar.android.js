/* @flow */

import React, {Component} from 'react';
import { ProgressBarAndroid } from 'react-native';
import computeProps from 'native-base/src/Utils/computeProps';


export default class SpinnerNB extends Component {

  prepareRootProps() {
    const type = {
      height: 40,
    };

    const defaultProps = {
      style: type,
    };

    return computeProps(this.props, defaultProps);
  }


  render() {
    const getColor = () => {
      if (this.props.color) {
        return this.props.color;
      } else if (this.props.inverse) {
        return this.getTheme().inverseProgressColor;
      }

      return this.getTheme().defaultProgressColor;
    };

    return (
      <ProgressBarAndroid
        {...this.prepareRootProps()}
        styleAttr="Horizontal"
        indeterminate={false}
        progress={this.props.progress ? this.props.progress / 100 : 0.5}
        color={getColor()}
      />
        );
  }

}
