import { Platform } from 'react-native';
import _ from 'lodash';

import variable from '../../src/theme';

export default (variables = variable) => {
  const h2Theme = {
      color: variables.textColor,
      fontSize: variables.fontSizeH2,
      lineHeight: variables.lineHeightH2,
  };


  return h2Theme;
};
