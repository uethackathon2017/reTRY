import { Platform } from 'react-native';
import _ from 'lodash';

import variable from '../../src/theme';

export default (variables = variable) => {
  const iconTheme = {
    fontSize: variables.iconFontSize,
    color: '#000',
  };


  return iconTheme;
};
