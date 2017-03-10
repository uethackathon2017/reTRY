import { Platform } from 'react-native';
import _ from 'lodash';

import variable from '../../src/theme';

export default (variables = variable) => {
  const contentTheme = {
      '.padder': {
        padding: variables.contentPadding,
      },
      flex: 1,
      backgroundColor: 'transparent',
      'NativeBase.Segment': {
        borderWidth: 0,
        backgroundColor: 'transparent'
      }
  };

  return contentTheme;
};
